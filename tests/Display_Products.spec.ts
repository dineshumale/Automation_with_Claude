import {test,expect} from '@playwright/test'

import { LoginPage } from '../pages/LoginPage'

import { AddToCart } from '../pages/AddToCartPage';

import { AllProducts } from '../pages/DisplayProducts';

const email = process.env.USER_EMAIL;
const password = process.env.USER_PASSWORD;

if (!email || !password) {
  throw new Error('USER_EMAIL and USER_PASSWORD must be set in .env');
}

test.describe('Display all products',()=>{

    test('All products display',async({page})=>{
        let loginObj=new LoginPage(page);
        await loginObj.open()
        await loginObj.login(email, password)

        let products=new AllProducts(page)
        await products.open_BookLink()
        const names = await products.PrintAllProducts()

        // check something was actually displayed
        expect(names.length).toBeGreaterThan(0)

        // show the list in the HTML report (npx playwright show-report)
        await test.info().attach('Books products', { body: names.join('\n'), contentType: 'text/plain' })
            console.log("---Printing my Way--->")
          await products.PrintAllProducts2()


       
        

        

    })
})