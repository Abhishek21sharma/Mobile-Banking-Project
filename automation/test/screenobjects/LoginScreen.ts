import { Constants } from "../../config/Constants.js";

/**
 * @author: Abhishek S
 * private screen locators -  to be used within the screen class
 * single class for both iOS and Android locators&methods
 * Following DRY principle to make project scalable easily
 * Using TypeScript: getter's() to get the screen locators
 */
export class LoginScreen {
  //best-easy way to handle if locator differes platform-wise
  //using conditional to handle if standard key is not available
  // return $(driver.isAndroid ? `android=new UiSelector().resourceId()` : `//XCUIElementTypeTextField[@name='']`);
  //this will save us creating two different screenfiles for android & iOS with basically same flow but different locators

  private get pinInputField() {
    return $(`~${Constants.PIN_INPUT_FIELD_KEY}`);
  }

  private get loginButton() {
    return $(`~${Constants.LOGIN_BUTTON_KEY}`);
  }

  private get errorMessage() {
    return $(`~${Constants.INVALID_PIN_ERROR}`);
  }

  async enterPin(pin: string) {
    const pinField = this.pinInputField;
    await pinField.waitForDisplayed({ timeout: Constants.GLOBAL_TIMEOUT });
    await pinField.clearValue();
    await pinField.setValue(pin);
  }

  async clickLoginButton() {
    const button = this.loginButton;
    await button.waitForDisplayed({ timeout: Constants.GLOBAL_TIMEOUT });
    await button.click();
  }

  async login(pin: string) {
    await this.enterPin(pin);
    await this.clickLoginButton();
  }

  async isLoginPageDisplayed() {
    try {
      const field = this.pinInputField;
      return await field.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  async getErrorMessage() {
    try {
      const error = this.errorMessage;
      await error.waitForDisplayed({ timeout: Constants.GLOBAL_TIMEOUT });
      return await error.getText();
    } catch (error) {
      return "";
    }
  }

  async isErrorMessageDisplayed() {
    try {
      const error = this.errorMessage;
      return await error.isDisplayed();
    } catch (error) {
      return false;
    }
  }
}
