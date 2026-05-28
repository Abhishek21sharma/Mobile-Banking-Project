import { platform } from "node:os";
import { Constants } from "../../config/Constants.js";

/**
 * @author: Abhishek S
 * private screen locators -  to be used within the screen class
 * single class for both iOS and Android locators&methods
 * Following DRY principle to make project scalable easily
 * Using TypeScript: getter's() to get the screen locators
 */

export class DashboardScreen {
  //best-easy way to handle if locator differes platform-wise
  //using conditional to handle if standard key is not available
  // return $(driver.isAndroid ? `android=new UiSelector().resourceId()` : `//XCUIElementTypeTextField[@name='']`);
  //this will save us creating two different screenfiles for android & iOS with basically same flow but different locators

  private get accountsContainer() {
    return $(`~${Constants.ACCOUNTS_LIST_CONTAINER_KEY}`);
  }

  private getAccountCard(accountId: string) {
    return $(`~${Constants.ACCOUNT_CARD_KEY_PREFIX}${accountId}`);
  }

  private getAccountName(accountId: string) {
    return $(`~${Constants.ACCOUNT_NAME_KEY_PREFIX}${accountId}`);
  }

  private getAccountBalance(accountId: string) {
    return $(`~${Constants.ACCOUNT_BALANCE_KEY_PREFIX}${accountId}']`);
  }

  async isDashboardDisplayed() {
    try {
      const container = this.accountsContainer;
      return await container.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  async getAccountsCount() {
    try {
      const accounts = await $$(
        driver.isAndroid
          ? `android=new UiSelector().descriptionStartsWith(${Constants.ACCOUNT_CARD_KEY_PREFIX})`
          : `-ios predicate string:name BEGINSWITH ${Constants.ACCOUNT_CARD_KEY_PREFIX}`,
      );
      return accounts.length;
    } catch (error) {
      return 0;
    }
  }

  async getAccountNameText(accountId: string) {
    const nameElement = this.getAccountName(accountId);
    await nameElement.waitForDisplayed({ timeout: Constants.GLOBAL_TIMEOUT });
    return await nameElement.getText();
  }

  async getAccountBalanceText(accountId: string) {
    const balanceElement = this.getAccountBalance(accountId);
    await balanceElement.waitForDisplayed({
      timeout: Constants.GLOBAL_TIMEOUT,
    });
    return await balanceElement.getText();
  }

  async isAccountDisplayed(accountId: string) {
    try {
      const account = this.getAccountCard(accountId);
      return await account.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  async clickOnAccount(accountId: string) {
    const account = this.getAccountCard(accountId);
    await account.waitForDisplayed({ timeout: Constants.GLOBAL_TIMEOUT });
    await account.click();
  }

  async isAccountBalanceDisplayed(accountId: string) {
    try {
      const balance = await this.getAccountBalanceText(accountId);
      return balance.length > 0 && balance.includes("£");
    } catch (error) {
      return false;
    }
  }

  async getAllAccountNames() {
    try {
      const nameElements = await $$(
        `//XCUIElementTypeStaticText[contains(@name, '${Constants.ACCOUNT_NAME_KEY_PREFIX}')]`,
      );
      const names: string[] = [];
      for (const element of nameElements) {
        names.push(await element.getText());
      }
      return names;
    } catch (error) {
      return [];
    }
  }
}
