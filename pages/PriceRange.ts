import { Page, Locator } from '@playwright/test'

export class PriceRange {
    private readonly page: Page
    private readonly ComputerLink: Locator
    private readonly sublist: Locator
    private readonly priceFilter: Locator


    constructor(page: Page) {
        this.page = page;
        // click the link itself, not the <ul> that holds it
        this.ComputerLink = page.locator('.header-menu').getByRole('link', { name: 'Computers' })
        // left category box (the top-menu sublist is hidden until hover)
        this.sublist = page.locator('.listbox .sublist')
        this.priceFilter = page.locator(".price-range-selector")

    }

    async open_ComputerLink() {
        await this.ComputerLink.click()
    }

    // subCategory = 'Desktops', 'Notebooks', ...

    async open_sublist(subCategory: string) {
        await this.sublist.getByRole("link", { name: subCategory }).click()
    }

    async PriceFilter_Click(range: string) {
        await this.priceFilter.getByRole("link", { name: range }).click()

    }

    async allPrices() {

        let allprices = this.page.locator(".prices .price.actual-price")
        await allprices.first().waitFor()
        const texts = await allprices.allInnerTexts()
        return texts.map(t => parseFloat(t.replace(/[^\d.]/g, '')))
    }
}
