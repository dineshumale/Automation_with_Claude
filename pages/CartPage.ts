import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  async verifyProductInCart(name: string, qty: number) {
    const row = this.page.locator('table.cart tr.cart-item-row', { hasText: name });
    await expect(row).toBeVisible();
    await expect(row.locator('input.qty-input')).toHaveValue(String(qty));
  }

  async checkout() {
    await this.page.locator('#termsofservice').check();
    await this.page.locator('#checkout').click();
  }
}
