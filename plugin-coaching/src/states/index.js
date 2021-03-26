import { combineReducers } from "redux";

import { reduce as WhisperReducer } from "./WhisperState";

// Register your redux store under a unique namespace
export const namespace = "whisper";

// Combine the reducers
export default combineReducers({
  WhisperButton: WhisperReducer,
});
