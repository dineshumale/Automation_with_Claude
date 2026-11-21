import { Page, expect } from '@playwright/test';

export class ProductPage {
  constructor(private readonly page: Page) {}

  async setQuantity(qty: number) {
    await this.page.locator('input.qty-input').fill(String(qty));
  }

  async addToCart() {
    await this.page.locator('input.add-to-cart-button').click();
    const notification = this.page.locator('#bar-notification');
    await expect(notification).toContainText('The product has been added to your shopping cart');
    await notification.locator('.close').click();
  }

  async goToCart() {
    await this.page.locator('#topcartlink a.ico-cart').click();
    await expect(this.page).toHaveURL(/\/cart/);
  }
}
