import type { Options } from "@wdio/types";
import { config as sharedconfig } from "./wdio.shared.conf";

export const config: WebdriverIO.Config = {
  ...sharedconfig,
  capabilities: [
    {
      platformName: "iOS",
      "appium:deviceName": "iPhone 15 pro",
      "appium:platformVersion": "17.5",
      "appium:automationName": "XCUITest",
      "appium:udid": "00008120-0000000000000000",
      "appium:app": process.env.APP_IOS_PATH,
      "appium:autoGrantPermissions": true,
      //reduce animation
      //'appium:settings[animationCoolOffTimeout]': 0,
      "appium:autoWebview": false,
      "appium:newCommandTimeout": 3600,
    },
  ],
};
