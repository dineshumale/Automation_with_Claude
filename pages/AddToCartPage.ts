import {Page,Locator,expect} from '@playwright/test'
export class AddToCart
{
    private readonly page:Page;
    private readonly bookLink:Locator
    private readonly mybook:Locator
    private readonly cartBtn:Locator
    private readonly cartBtn_main:Locator

    constructor(page:Page)
    {
        this.page=page;
        this.bookLink=page.locator('.header-menu').getByRole('link', { name: 'Books' })
        this.mybook=page.getByRole("link",{name:"Computing and Internet"})
        this.cartBtn=page.locator("#add-to-cart-button-13")
        this.cartBtn_main=page.getByRole("link",{name:"Shopping cart"})


    }

    async open_BookLink()
    {
        await this.bookLink.click()
    }
    async MyBook_Click()
    {
        await this.mybook.first().click()
    }

      async CartLink_Click()
    {
        await this.cartBtn.click()
        // wait until the site confirms the add; otherwise we may open the cart too early
        await expect(this.page.locator("#bar-notification")).toContainText("The product has been added to your shopping cart")
    }

       async CartmainLink_Click()
    {
        await this.cartBtn_main.first().click()
    }


}