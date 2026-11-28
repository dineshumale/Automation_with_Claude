import { Page, Locator } from '@playwright/test'

export class ViewModePage {
    private readonly page: Page
    private readonly viewModeDropdown: Locator
    // public so the test can check them
    readonly gridContainer: Locator
    readonly listContainer: Locator

    constructor(page: Page) {
        this.page = page
        this.viewModeDropdown = page.locator('#products-viewmode')
        this.gridContainer = page.locator('.product-grid')
        this.listContainer = page.locator('.product-list')
    }

    // option = 'Grid' or 'List' (the visible text in the dropdown)
    async switchTo(option: string) {
        await this.viewModeDropdown.selectOption({ label: option })
    }
}
