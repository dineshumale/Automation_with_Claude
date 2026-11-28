import {Page,Locator} from '@playwright/test'

export class ViewMode1
{
    private readonly page:Page;
    private readonly viewDropdown:Locator
    readonly gridContainer: Locator
    readonly listContainer: Locator

    constructor(page:Page)
    {
        this.page=page;
        this.viewDropdown=page.locator("#products-viewmode")
        this.gridContainer = page.locator('.product-grid')
        this.listContainer = page.locator('.product-list')

    }

    async mySwitch(option:string)
    {
        await this.viewDropdown.selectOption({label:option})

    }


}