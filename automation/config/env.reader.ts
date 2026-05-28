import * as dotenv from "dotenv";
import * as path from "path";

const envName = process.env.TEST_ENV || "dev";
const envPath = path.resolve(process.cwd(), `.env.${envName}`);
dotenv.config({ path: envPath });

// This ensures team know exactly what configuration is available
interface EnvironmentConfig {
  readonly envName: string;
  readonly apiBaseUrl: string;
  readonly testUser: string;
  readonly testPass: string;
  readonly TEST_PIN: string;
  readonly APP_ANDROID_PATH: string;
  readonly APP_IOS_PATH: string;
  readonly globalTimeout: number;
}

function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Env Configuration Error: Missing required variable '${key}' in .env.${envName} file.`,
    );
  }
  return value;
}

//freeze the object so properties are locked for modification by spec files
export const EnvConfig: EnvironmentConfig = Object.freeze({
  envName: envName,
  apiBaseUrl: getRequiredEnv("API_BASE_URL"),
  testUser: getRequiredEnv("TEST_USER"),
  testPass: getRequiredEnv("TEST_PASS"),
  TEST_PIN: getRequiredEnv("TEST_PIN"),
  APP_ANDROID_PATH: getRequiredEnv("APP_ANDROID_PATH"),
  APP_IOS_PATH: getRequiredEnv("APP_IOS_PATH"),
  globalTimeout: parseInt(process.env.GLOBAL_TIMEOUT || "15000", 10),
});
