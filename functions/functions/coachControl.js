const TokenValidator = require("twilio-flex-token-validator").functionValidator;

exports.handler = TokenValidator(async function (context, event, callback) {
  // CORS Handling
  const response = new Twilio.Response();
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
  response.appendHeader("Content-Type", "application/json");

  // Just OPTIONS, repond with 200
  if (Object.keys(event).length === 0) {
    response.setStatusCode(200);
    callback(null, response);
  }

  const client = context.getTwilioClient();

  let conferenceParticipants = event.conferenceParticipants || [];

  // Determine call sid of supervisor - if joining, check existing call sids and pick new one, otherwise take submitted sid
  let supervisorCallSid = await new Promise((resolve) => {
    if (event.supervisorCallSid) {
      resolve(event.supervisorCallSid);
    }
    client
      .conferences(event.conferenceSid)
      .participants.list({ limit: 20 })
      .then((participantList) =>
        participantList.forEach((p) => {
          if (conferenceParticipants.indexOf(p.callSid) < 0) {
            resolve(p.callSid);
          }
        })
      );
  });

  // Toggle coaching mode
  client
    .conferences(event.conferenceSid)
    .participants(supervisorCallSid)
    .update({
      callSidToCoach: event.callSidToCoach,
      coaching: event.coachingActive,
      muted: !event.coachingActive,
    })
    .then((participant) => {
      response.setBody(participant);
      callback(null, response);
    })
    .catch((err) => {
      response.setBody({ error: err.message });
      response.setStatusCode(500);
      callback(null, response);
    });
});
