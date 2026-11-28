import {Page,Locator} from '@playwright/test'

export class AllProducts
{
    private readonly page:Page
    private readonly bookLink:Locator
    private readonly all_Products:Locator
    constructor(page:Page)
    {
        this.page=page;
        this.bookLink=page.locator('.header-menu').getByRole('link', { name: 'Books' })
        this.all_Products=page.locator(".product-title")
    }

     async open_BookLink()
    {
        await this.bookLink.click()
    }
     async PrintAllProducts(): Promise<string[]>
    {
        // wait until the product list is on the page; count() alone does not wait
        await this.all_Products.first().waitFor()

        const names = (await this.all_Products.allInnerTexts()).map(n => n.trim())
        names.forEach((name, i) => console.log(`${i + 1}. ${name}`))
        return names
    }

    async PrintAllProducts2()
    {
        // wait until the product list is on the page; count() alone does not wait
        await this.all_Products.first().waitFor()

        const names = await this.all_Products.allInnerTexts()
        console.log(names)
    }
}