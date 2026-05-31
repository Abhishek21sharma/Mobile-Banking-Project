export const ANDROID_PROFILES = {
  pixel7: {
    "appium:deviceName": "Pixel_7_Emulator",
    "appium:platformVersion": "14.0",
  },
  samsungS24: {
    "appium:deviceName": "Samsung_Galaxy_S24",
    "appium:platformVersion": "15.0",
    "appium:udid": "RZ8M30XYZ", // Physical device tracking
  },
  cloud_pixel8: {
    "appium:deviceName": "Google Pixel 8",
    "appium:platformVersion": "14.0",
    "bstack:options": { deviceName: "Google Pixel 8" }, // BrowserStack specific mapping
  },
};
export type AndroidProfileKey = keyof typeof ANDROID_PROFILES;
