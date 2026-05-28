import { DashboardScreen } from "../screenobjects/DashboardScreen.js";
import { LoginScreen } from "../screenobjects/LoginScreen.js";
import { Constants } from "../../config/Constants.js";
import { EnvConfig } from "../../config/env.reader.js";

describe("Mobile Banking App - Smoke Test Suite", async () => {
  EnvConfig.apiBaseUrl;
  let loginScreen: LoginScreen;
  let dashboardScreen: DashboardScreen;

  /**
   * Hooks added here to initialize the screenobject classes
   */
  beforeEach(() => {
    loginScreen = new LoginScreen();
    dashboardScreen = new DashboardScreen();
  });

  it("@smoke - should successful login", async () => {
    const isLoginPageDisplayed = await loginScreen.isLoginPageDisplayed();
    expect(isLoginPageDisplayed).toBe(true);

    await loginScreen.enterPin(EnvConfig.TEST_PIN);
    await loginScreen.clickLoginButton();

    //to confirm if login is success
    const isDashboardDisplayed = await dashboardScreen.isDashboardDisplayed();
    expect(isDashboardDisplayed).toBe(true);
  });

  it("@smoke - should display account details", async () => {
    //complete login first
    await loginScreen.login(EnvConfig.TEST_PIN);
    const isDashboardDisplayed = await dashboardScreen.isDashboardDisplayed();
    expect(isDashboardDisplayed).toBe(true);

    //Dashboard - Account screen verification
    const accountsCount = await dashboardScreen.getAccountsCount();
    expect(accountsCount).toBe(Constants.EXPECTED_ACCOUNTS_COUNT);

    const isAccount1Displayed = await dashboardScreen.isAccountDisplayed(
      Constants.ACCOUNT_1_ID,
    );
    expect(isAccount1Displayed).toBe(true);

    const account1Name = await dashboardScreen.getAccountNameText(
      Constants.ACCOUNT_1_ID,
    );
    expect(account1Name).toContain(Constants.ACCOUNT_1_NAME);

    const isAccount1BalanceDisplayed =
      await dashboardScreen.isAccountBalanceDisplayed(Constants.ACCOUNT_1_ID);
    expect(isAccount1BalanceDisplayed).toBe(true);

    const account1Balance = await dashboardScreen.getAccountBalanceText(
      Constants.ACCOUNT_1_ID,
    );
    expect(account1Balance).toBeTruthy();
  });

  it("@smoke - Should reject invalid PIN and display error message", async () => {
    const isLoginPageDisplayed = await loginScreen.isLoginPageDisplayed();
    expect(isLoginPageDisplayed).toBe(true);

    await loginScreen.enterPin(Constants.IN_VALID_PIN);
    await loginScreen.clickLoginButton();

    const isErrorDisplayed = await loginScreen.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBe(true);

    // Verify we're still on login page
    const stillOnLogin = await loginScreen.isLoginPageDisplayed();
    expect(stillOnLogin).toBe(true);
  });
});
