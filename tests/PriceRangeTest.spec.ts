import { test, expect } from '@playwright/test'
import { PriceRange } from '../pages/PriceRange'
import { SortPage } from '../pages/SortByPricePage'

test.describe("Price Range Test", () => {

    test("Price Range below 1000", async ({ page }) => {
        const sort = new SortPage(page)
        const price = new PriceRange(page)

        await sort.open()
        await price.open_ComputerLink()
        await price.open_sublist('Desktops')

        await price.PriceFilter_Click('Under 1000.00')
        await expect(page).toHaveURL(/price=-1000/)

        const requiredprices=await price.allPrices()
        expect(requiredprices.length).toBeGreaterThan(0)
        for(const p of requiredprices)
        {
            expect(p).toBeLessThan(1000)

        }
       
    })
})
