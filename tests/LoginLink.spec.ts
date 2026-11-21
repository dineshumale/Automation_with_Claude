import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const email = process.env.USER_EMAIL;
const password = process.env.USER_PASSWORD;

if (!email || !password) {
  throw new Error('USER_EMAIL and USER_PASSWORD must be set in .env');
}

test.describe('Login', () => {
  test('user can log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(email, password);
    await expect(loginPage.logoutLink).toBeVisible();
  });

  test('shows an error for a wrong password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(email, 'wrong-password');
    await expect(loginPage.errorMessage).toContainText('Login was unsuccessful');
  });
});
