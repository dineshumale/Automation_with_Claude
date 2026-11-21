import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  private readonly loginLink: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  readonly logoutLink: Locator;
  readonly errorMessage: Locator;

  constructor(private readonly page: Page) {
    this.loginLink = page.getByRole('link', { name: 'Log in' });
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.logoutLink = page.getByRole('link', { name: 'Log out' });
    this.errorMessage = page.locator('.validation-summary-errors');
  }

  async open() {
    await this.page.goto('/');
    await this.loginLink.click();
    await expect(this.page).toHaveURL(/\/login/);
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
