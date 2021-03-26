import React from "react";
import { FlexPlugin } from "flex-plugin";
import WhisperButtonContainer from "./components/WhisperButton/WhisperButton.Container";
import reducers, { namespace } from "./states";
import { Actions } from "./states/WhisperState";
import * as Flex from "@twilio/flex-ui";

const PLUGIN_NAME = "CoachingPlugin";

export default class CoachingPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerReducers(manager);

    flex.Supervisor.TaskOverviewCanvas.Content.add(
      <WhisperButtonContainer key="whisperbutton" />
    );

    flex.Actions.addListener("afterMonitorCall", (payload) =>
      this.dispatch(Actions.startMonitor(payload))
    );

    flex.Actions.addListener("afterStopMonitoringCall", () =>
      this.dispatch(Actions.stopMonitor())
    );

    manager.voiceClient.on("disconnect", () =>
      this.dispatch(Actions.stopMonitor())
    );
  }

  dispatch = (f) => Flex.Manager.getInstance().store.dispatch(f);

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(
        `You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${Flex.VERSION}`
      );
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
