import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries:  process.env.CI ? 2 : 0,
  timeout: 60_000,
  reporter: 'html',
  use: {
    baseURL: 'https://demowebshop.tricentis.com',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    headless:true
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
