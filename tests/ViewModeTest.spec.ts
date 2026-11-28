import {test,expect} from '@playwright/test'
import { SortPage } from '../pages/SortByPricePage'
import { ViewMode1 } from '../pages/ViewModePage'

const view1=[
   { option:"List",viewmode:'list'},
   {option:"Grid",viewmode:'grid'},
]

for(const {option,viewmode} of view1)
{
    test(`view as ${option}`,async({page})=>{
        const sort = new SortPage(page)
        const view=new ViewMode1(page)

        await sort.open()
        await sort.Open_BookLink()
        await view.mySwitch(option)
        // wait for the reload, otherwise Grid passes before the switch happens
        await expect(page).toHaveURL(new RegExp(`viewmode=${viewmode}`))
        if (viewmode === 'list') {
                await expect(view.listContainer).toBeVisible()
                await expect(view.gridContainer).toHaveCount(0)
            } else {
                await expect(view.gridContainer).toBeVisible()
                await expect(view.listContainer).toHaveCount(0)
            }
    })
}