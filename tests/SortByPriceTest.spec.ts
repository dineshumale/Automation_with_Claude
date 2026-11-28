import { test, expect } from '@playwright/test'
import { SortPage } from '../pages/SortByPricePage'

// case-insensitive, locale-aware string comparison
const byName = (a: string, b: string) => a.localeCompare(b, undefined, { sensitivity: 'base' })

test.describe('Sorting products', () => {

    test('S06 - Sort by Price: Low to High', async ({ page }) => {
        const sort = new SortPage(page)
        await sort.open()
        await sort.Open_BookLink()
        await sort.sortBy('Price: Low to High')

        // the site reloads the page with the sort in the URL
        await expect(page).toHaveURL(/orderby=10/)

        const prices = await sort.getPrice()
        expect(prices.length).toBeGreaterThan(0)                    // not empty
        expect(prices).toEqual([...prices].sort((a, b) => a - b))   // ascending
    })

    const nameSorts = [
        { option: 'Name: A to Z', orderby: 5, compare: byName },
        { option: 'Name: Z to A', orderby: 6, compare: (a: string, b: string) => byName(b, a) },
    ]

    for (const { option, orderby, compare } of nameSorts) {
        test(`S07 - Sort by ${option}`, async ({ page }) => {
            const sort = new SortPage(page)
            await sort.open()
            await sort.Open_BookLink()
            await sort.sortBy(option)

            // wait for the reload, otherwise we could read titles from the previous page
            await expect(page).toHaveURL(new RegExp(`orderby=${orderby}`))

            const names = await sort.getProductNames()
            expect(names.length).toBeGreaterThan(0)
            expect(names).toEqual([...names].sort(compare))
        })
    }
})
