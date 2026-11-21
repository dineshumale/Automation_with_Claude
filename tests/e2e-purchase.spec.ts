import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage, Address } from '../pages/CheckoutPage';

const PRODUCT = '14.1-inch Laptop';
const QTY = 1;

const address: Address = {
  firstName: 'Test',
  lastName: 'User',
  email: `test.user.${Date.now()}@example.com`,
  country: 'United States',
  city: 'New York',
  address1: '123 Main Street',
  zip: '10001',
  phone: '5551234567',
};

test('E2E: add product to cart and complete purchase as guest', async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await test.step('Open home page', () => home.open());

  await test.step('Search and open product', async () => {
    await home.searchFor('laptop');
    await home.openProductFromResults(PRODUCT);
  });

  await test.step('Add product to cart', async () => {
    await product.setQuantity(QTY);
    await product.addToCart();
    await product.goToCart();
  });

  await test.step('Verify cart and proceed to checkout', async () => {
    await cart.verifyProductInCart(PRODUCT, QTY);
    await cart.checkout();
    await checkout.checkoutAsGuest();
  });

  await test.step('Billing address', () => checkout.fillBillingAddress(address));
  await test.step('Shipping address', () => checkout.continueShippingAddress());
  await test.step('Shipping method', () => checkout.selectShippingMethod(/Ground/));
  await test.step('Payment method', () => checkout.selectPaymentMethod(/Cash On Delivery/i));
  await test.step('Payment information', () => checkout.continuePaymentInfo());

  await test.step('Confirm order', async () => {
    const orderNumber = await checkout.confirmOrder();
    console.log(`Order placed successfully. Order number: ${orderNumber}`);
    test.info().annotations.push({ type: 'Order number', description: orderNumber });
  });
});
