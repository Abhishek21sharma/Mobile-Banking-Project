/**
 * @author as
 * this explains how to test on BW
 * in parallel
 * where each spec will run on it's individual device
 * easily scalable
 */

import { config as sharedConfig } from "./wdio.shared.conf";

export const config: WebdriverIO.Config = {
  ...sharedConfig,

  //BS configs
  maxInstances: 3, //telle BS upfront to just spin up 3 instances only ..
  user: process.env.BS_user,
  key: process.env.BS_key,
  hostname: "hub.browserstack.com",

  //note: do not declare global spec file
  //rather declare it in individual capablity set

  specs: [],

  capabilities: [
    {
      //WORKER 1 -->   //spec1 - runs on emulator 1 of type 14 version

      "wdio:specs": ["../src/specs/login.spec.ts"],
      //login test

      platformName: "Android",
      "appium:automationName": "UiAutomator2",
      "appium:app": process.env.BROWSERSTACK_APP_ID,
      //platform cabablities

      "bstack:options": {
        deviceName: "Google Pixel 8",
        platformVersion: "14.0",
      },
      //bw capablities
    },
    {
      //WORKER 2 -->  //spec2 - runs on emulator 2 of type 15 version

      "wdio:specs": ["../src/specs/payment.spec.ts"],
      //login test

      platformName: "Android",
      "appium:automationName": "UiAutomator2",
      "appium:app": process.env.BROWSERSTACK_APP_ID,
      //platform cabablities

      "bstack:options": {
        deviceName: "Samsung Galaxy S24",
        platformVersion: "15.0",
      },
      //bw capablities
    },
    {
      //WORKER 3 -->  //spec3 - runs on emulator 2 of type 15 version

      "wdio:specs": ["../src/specs/settings.spec.ts"],
      //settings screen test

      platformName: "Android",
      "appium:automationName": "UiAutomator2",
      "appium:app": process.env.BROWSERSTACK_APP_ID,
      //platform cabablities

      "bstack:options": {
        deviceName: "One Plus",
        platformVersion: "12.0",
      },
      //bw capablities
    },
  ],
};
