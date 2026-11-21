import { test, expect } from '@playwright/test';

test('launch browser and open a website', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
  console.log('Page title:', await page.title());
});
