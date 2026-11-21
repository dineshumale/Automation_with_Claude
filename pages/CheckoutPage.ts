import { Page, expect } from '@playwright/test';

export interface Address {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  address1: string;
  zip: string;
  phone: string;
}

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async checkoutAsGuest() {
    await this.page.locator('input.checkout-as-guest-button').click();
    await expect(this.page).toHaveURL(/\/onepagecheckout/);
  }

  async fillBillingAddress(a: Address) {
    const p = this.page;
    await p.locator('#BillingNewAddress_FirstName').fill(a.firstName);
    await p.locator('#BillingNewAddress_LastName').fill(a.lastName);
    await p.locator('#BillingNewAddress_Email').fill(a.email);
    await p.locator('#BillingNewAddress_CountryId').selectOption({ label: a.country });
    await p.locator('#BillingNewAddress_City').fill(a.city);
    await p.locator('#BillingNewAddress_Address1').fill(a.address1);
    await p.locator('#BillingNewAddress_ZipPostalCode').fill(a.zip);
    await p.locator('#BillingNewAddress_PhoneNumber').fill(a.phone);
    await p.locator('#billing-buttons-container input.new-address-next-step-button').click();
  }

  async continueShippingAddress() {
    await this.page.locator('#shipping-buttons-container input.new-address-next-step-button').click();
  }

  async selectShippingMethod(label: RegExp) {
    await this.page.getByLabel(label).check();
    await this.page.locator('#shipping-method-buttons-container input.shipping-method-next-step-button').click();
  }

  async selectPaymentMethod(label: RegExp) {
    await this.page.getByLabel(label).check();
    await this.page.locator('#payment-method-buttons-container input.payment-method-next-step-button').click();
  }

  async continuePaymentInfo() {
    await expect(this.page.locator('#checkout-payment-info-load')).toBeVisible();
    await this.page.locator('#payment-info-buttons-container input.payment-info-next-step-button').click();
  }

  async confirmOrder(): Promise<string> {
    await expect(this.page.locator('#checkout-confirm-order-load')).toBeVisible();
    await this.page.locator('#confirm-order-buttons-container input.confirm-order-next-step-button').click();

    await expect(this.page).toHaveURL(/\/checkout\/completed/);
    await expect(this.page.locator('.order-completed .title')).toHaveText(
      'Your order has been successfully processed!'
    );
    const orderText = await this.page.locator('.order-completed .details li').first().innerText();
    const orderNumber = orderText.replace(/\D/g, '');
    expect(orderNumber).not.toBe('');
    return orderNumber;
  }
}
