import React from "react";
import { IconButton, Manager } from "@twilio/flex-ui";
const axios = require("axios");

class WhisperButton extends React.Component {
  constructor(props) {
    super(props);
  }

  startCoach = () => {
    this.props.changeWhisperState();
    const body = {
      conferenceSid: this.props.conferenceSid,
      callSidToCoach: this.props.callSidToCoach,
      conferenceParticipants: this.props.participants,
      coachingActive: true,
      Token: Manager.getInstance().store.getState().flex.session.ssoTokenPayload
        .token,
    };
    axios
      .post(process.env.COACHING_FUNCTION, body)
      .then((response) => this.props.startWhisper(response.data.callSid));
  };

  stopCoach = () => {
    this.props.changeWhisperState();
    const body = {
      conferenceSid: this.props.conferenceSid,
      supervisorCallSid: this.props.callSid,
      coachingActive: false,
      Token: Manager.getInstance().store.getState().flex.session.ssoTokenPayload
        .token,
    };

    axios
      .post(process.env.COACHING_FUNCTION, body)
      .then(() => this.props.stopWhisper());
  };

  render() {
    if (this.props.isMonitoring) {
      return (
        <IconButton
          icon={
            this.props.changeInProgress
              ? "More"
              : this.props.isCoaching
              ? "MuteBold"
              : "Mute"
          }
          key="whisperbutton"
          onClick={() =>
            this.props.changeInProgress
              ? null
              : this.props.isCoaching
              ? this.stopCoach()
              : this.startCoach()
          }
          style={{ width: "44px", height: "44px", marginBottom: "6px" }}
          themeOverride={
            this.props.isCoaching
              ? this.props.theme.Supervisor.TaskCanvas.MonitorActiveButton
              : this.props.theme.Supervisor.TaskCanvas.Button
          }
        ></IconButton>
      );
    } else {
      return null;
    }
  }
}

export default WhisperButton;
