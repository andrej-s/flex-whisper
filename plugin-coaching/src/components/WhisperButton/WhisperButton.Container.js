import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Actions } from "../../states/WhisperState";
import WhisperButton from "./WhisperButton";

const mapStateToProps = (state) => {
  return {
    callSid: state["whisper"].WhisperButton.callSid,
    conferenceSid: state["whisper"].WhisperButton.conferenceSid,
    callSidToCoach: state["whisper"].WhisperButton.callSidToCoach,
    participants: state["whisper"].WhisperButton.participants,
    isMonitoring: state["whisper"].WhisperButton.isMonitoring,
    isCoaching: state["whisper"].WhisperButton.isCoaching,
    changeInProgress: state["whisper"].WhisperButton.changeInProgress,
  };
};

const mapDispatchToProps = (dispatch) => ({
  stopWhisper: bindActionCreators(Actions.stopWhisper, dispatch),
  startWhisper: bindActionCreators(Actions.startWhisper, dispatch),
  changeWhisperState: bindActionCreators(Actions.changeWhisperState, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(WhisperButton);
