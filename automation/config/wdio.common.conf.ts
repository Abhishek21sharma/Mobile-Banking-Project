/**
 * @see this is a optional file
 * we can use this approch if we want just same
 * config file or the shared approch as suggested in this project
 */
// Determine platform at runtime (default to Android if not specified)
const isIOS = process.env.PLATFORM?.toUpperCase() === "IOS";
export const config: WebdriverIO.Config = {
  capabilities: [
    {
      // Dynamic Core Platform Selector
      platformName: isIOS ? "iOS" : "Android",
      "appium:automationName": isIOS ? "XCUITest" : "UiAutomator2",

      // Dynamic Device Properties (Reads from CLI, falls back to local emulator)
      "appium:deviceName":
        process.env.DEVICE_NAME || (isIOS ? "iPhone 15" : "Pixel_7_Emulator"),
      "appium:platformVersion":
        process.env.PLATFORM_VERSION || (isIOS ? "17.2" : "14.0"),

      // Dynamic UDID (Crucial for real devices / cloud grids like BrowserStack)
      ...(process.env.UDID && { "appium:udid": process.env.UDID }),

      "appium:app":
        process.env.APP_PATH ||
        (isIOS ? "./apps/bancorp.app" : "./apps/bancorp.apk"),
      "appium:ensureWebviewsHavePages": true,
      "appium:nativeWebScreenshot": true,
      "appium:newCommandTimeout": 3600,
    },
  ],

  // ... rest of your config
};
