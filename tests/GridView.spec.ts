import { test, expect } from '@playwright/test'
import { SortPage } from '../pages/SortByPricePage'
import { ViewModePage } from '../pages/GridViewPage'

test.describe('Page view', () => {

    const views = [
        { option: 'List', viewmode: 'list' },
        { option: 'Grid', viewmode: 'grid' },
    ]

    for (const { option, viewmode } of views) {
        test(`S09 - View as ${option}`, async ({ page }) => {
            const sort = new SortPage(page)
            const view = new ViewModePage(page)

            await sort.open()
            await sort.Open_BookLink()
            await view.switchTo(option)

            // wait for the reload
            await expect(page).toHaveURL(new RegExp(`viewmode=${viewmode}`))

            // check the right layout is shown and the other one is not
            if (viewmode === 'list') {
                await expect(view.listContainer).toBeVisible()
                await expect(view.gridContainer).toHaveCount(0)
            } else {
                await expect(view.gridContainer).toBeVisible()
                await expect(view.listContainer).toHaveCount(0)
            }
        })
    }
})
