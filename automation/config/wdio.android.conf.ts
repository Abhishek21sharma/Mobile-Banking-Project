import type { Options } from "@wdio/types"; //explict imported wdio types here to type not found error for WebdriverIO as type
import { config as sharedconfig } from "./wdio.shared.conf";

export const config: WebdriverIO.Config = {
  ...sharedconfig, //this will load everything from sharedconfig
  capabilities: [
    {
      platformName: "Android",
      "appium:deviceName": "Android GoogleAPI Emulator",
      "appium:platformVersion": "16.0",
      "appium:automationName": "UiAutomator2",
      // Dynamically pull the iOS binary path
      "appium:app": process.env.APP_ANDROID_PATH,
      //stop animation
      "appium:disableWindowAnimation": true,
      "appium:autoGrantPermissions": true,
      "appium:autoWebview": false,
      "appium:newCommandTimeout": 3600,
    },
  ],
};
