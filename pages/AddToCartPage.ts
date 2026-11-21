import {Page,Locator} from '@playwright/test'
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
        this.bookLink=page.locator("(//a[normalize-space()='Books'])[3]")
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
    }

       async CartmainLink_Click()
    {
        await this.cartBtn_main.first().click()
    }


}