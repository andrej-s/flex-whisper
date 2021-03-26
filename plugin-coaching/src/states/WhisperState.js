const START_MONITOR = "START_MONITOR";
const STOP_MONITOR = "STOP_MONITOR";
const START_WHISPER = "START_WHISPER";
const STOP_WHISPER = "STOP_WHISPER";
const CHANGE_STATE = "CHANGE_STATE";

const initialState = {
  callSid: null,
  conferenceSid: null,
  callSidToCoach: null,
  participants: [],
  isMonitoring: false,
  isCoaching: false,
  changeInProgress: false,
};

export class Actions {
  static startMonitor = (payload) => ({
    type: START_MONITOR,
    payload,
  });

  static stopMonitor = () => ({
    type: STOP_MONITOR,
  });

  static stopWhisper = () => ({
    type: STOP_WHISPER,
  });

  static startWhisper = (callSid) => ({
    type: START_WHISPER,
    callSid,
  });

  static changeWhisperState = () => ({ type: CHANGE_STATE });
}

export function reduce(state = initialState, action) {
  switch (action.type) {
    case START_MONITOR: {
      return {
        ...state,
        isMonitoring: true,
        isCoaching: false,
        conferenceSid: action.payload.task.conference.conferenceSid,
        participants: action.payload.task.conference.participants.map(
          (participant) => participant.callSid
        ),
        callSidToCoach: action.payload.task.conference.liveWorkers[0].callSid,
      };
    }

    case STOP_MONITOR: {
      return initialState;
    }

    case START_WHISPER: {
      return {
        ...state,
        isCoaching: true,
        callSid: action.callSid,
        changeInProgress: false,
      };
    }

    case STOP_WHISPER: {
      return {
        ...state,
        isCoaching: false,
        changeInProgress: false,
      };
    }

    case CHANGE_STATE: {
      return {
        ...state,
        changeInProgress: true,
      };
    }

    default:
      return state;
  }
}
