import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 1, // 1 local retry to absorb slow/flaky network to the demo site
  timeout: 60_000,
  reporter: 'html',
  use: {
    baseURL: 'https://demowebshop.tricentis.com',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    headless:true
  },
  projects: [
    // Locally use installed Google Chrome (Playwright's headless Chromium is blocked on this PC); CI uses bundled Chromium
    { name: 'chromium', use: { ...devices['Desktop Chrome'], channel: process.env.CI ? undefined : 'chrome' } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
