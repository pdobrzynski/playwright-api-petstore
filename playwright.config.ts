import { defineConfig } from "@playwright/test";
import { config } from "dotenv";

config();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: process.env.URL,
    trace: "on-first-retry",
    extraHTTPHeaders: {
      apiKey: "special-key",
    },
  },
});
