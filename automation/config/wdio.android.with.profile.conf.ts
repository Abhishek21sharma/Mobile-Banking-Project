import { config as sharedConfig } from "./wdio.shared.conf";
import {
  ANDROID_PROFILES,
  AndroidProfileKey,
} from "./profiles/android.profile";

//read the profile from env variable
const selectedProfile = (process.env.PROFILE as AndroidProfileKey) ?? "pixel7";
const deviceCapablities = ANDROID_PROFILES[selectedProfile];

export const config: WebdriverIO.Config = {
  ...sharedConfig, // taking all from shared config.
  capabilities: [
    {
      platformName: "Android",
      "appium:automationName": "UiAutomater2",
      "appium:disableWindowAnimation": true,
      ...deviceCapablities, //inject the capablities here as per the profi;e selected
    },
  ],
};
