export const Constants = {
  //Global timeout
  GLOBAL_TIMEOUT: 20000,

  //error msgs
  INVALID_PIN_ERROR: "Invalid PIN. Try 1234.",

  //Login screen elements
  PIN_INPUT_FIELD_KEY: "pin_input_field",
  LOGIN_BUTTON_KEY: "login_submit_button",

  //dashboard screen elements
  ACCOUNTS_LIST_CONTAINER_KEY: "accounts_screen_root",
  ACCOUNT_CARD_KEY_PREFIX: "account_row_",
  ACCOUNT_NAME_KEY_PREFIX: "account_name_",
  ACCOUNT_BALANCE_KEY_PREFIX: "account_balance_",
  TEST_PIN: "",

  //test data
  EXPECTED_ACCOUNTS_COUNT: "1",
  ACCOUNT_1_ID: "01",
  ACCOUNT_1_NAME: "John Smith",
  IN_VALID_PIN: "1111",
} as const;
