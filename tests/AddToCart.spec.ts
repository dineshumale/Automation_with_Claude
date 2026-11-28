import{test ,expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { AddToCart } from '../pages/AddToCartPage'

const email = process.env.USER_EMAIL;
const password = process.env.USER_PASSWORD;

if (!email || !password) {
  throw new Error('USER_EMAIL and USER_PASSWORD must be set in .env');
}

test.describe('Login and add to Cart',()=>{

    test('login with valid credentials',async({page})=>{

        const loginPage = new LoginPage(page);
            await loginPage.open();
            await loginPage.login(email, password);
            await expect(loginPage.logoutLink).toBeVisible();

        const cart=new AddToCart(page)
        await cart.open_BookLink();
        await cart.MyBook_Click()
        await cart.CartLink_Click()
        await cart.CartmainLink_Click()
        await expect(page.locator('.cart-item-row', { hasText: 'Computing and Internet' })).toBeVisible();

    })
})