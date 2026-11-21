import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle(/Demo Web Shop/);
  }

  async searchFor(term: string) {
    await this.page.locator('#small-searchterms').fill(term);
    await this.page.locator('input.search-box-button').click();
  }

  async openProductFromResults(name: string) {
    await this.page.locator('.product-title a', { hasText: name }).first().click();
    await expect(this.page.locator('.product-name h1')).toHaveText(name);
  }
}
