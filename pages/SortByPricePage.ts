import { Page, Locator } from '@playwright/test'

export class SortPage {
    private readonly page: Page;
    private readonly BookLink: Locator
    private readonly dropdown_Option: Locator
    private readonly actualPrice: Locator;
    private readonly productTitles: Locator

    constructor(page: Page) {
        this.page = page;
        // scoped to the top menu: 'Books' link exists twice on the page (top menu + left categories)
        this.BookLink = page.locator('.header-menu').getByRole('link', { name: 'Books' })
        this.dropdown_Option = page.locator("#products-orderby")
        this.actualPrice = page.locator(".prices  .price.actual-price")
        this.productTitles = page.locator(".item-box .product-title")
    }

    async open() {
        // baseURL from playwright.config.ts, so '/' = https://demowebshop.tricentis.com/
        await this.page.goto('/')
    }

    async Open_BookLink() {
        await this.BookLink.click()
    }

    async sortBy(optionText: string) {
        await this.dropdown_Option.selectOption({ label: optionText })
    }

    async getPrice(): Promise<number[]> {
        // wait until at least one price is visible; allInnerTexts() does not wait
        await this.actualPrice.first().waitFor()

        const texts = await this.actualPrice.allInnerTexts()
        // remove anything that is not a digit or a dot (e.g. "1,200.00" -> "1200.00"), then convert to number
        return texts.map(t => parseFloat(t.replace(/[^\d.]/g, '')))
    }

    async getProductNames(): Promise<string[]> {
        // wait until at least one title is visible; allInnerTexts() does not wait
        await this.productTitles.first().waitFor()

        const names = await this.productTitles.allInnerTexts()
        return names.map(n => n.trim())
    }
}
