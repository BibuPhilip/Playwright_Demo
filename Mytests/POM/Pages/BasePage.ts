import {Page, Locator,expect} from '@playwright/test'

export abstract class BasePage{
    constructor (protected readonly page:Page){ }

    protected async goToURL(path: string){
        await this.page.goto(path);
    }

    protected async basePageClick(selector:string | Locator){
        await this.toLocator(selector).click();
    }

    protected async basePageFill(selector:string | Locator, value:string){
        await this.toLocator(selector).fill(value);
    }

    protected async basePageCheckboxChecked(selector:string | Locator){
        await this.toLocator(selector).check();
    }

    protected async basePageCheckboxUnchecked(selector:string | Locator){
        await this.toLocator(selector).uncheck();
    }

    protected async basePageCheckboxStatus(selector: string | Locator, status:boolean){
        await expect(this.toLocator(selector)).toBeChecked({checked:status});
    }

    protected async basePageExpectVisible(selector:string | Locator){
        await expect(this.toLocator(selector)).toBeVisible();
    }

    protected async basePageExpectElementContainsText(selector:string | Locator, value:string){
        await expect(this.toLocator(selector)).toContainText(value);
    }

    /****************** Utility ***********************/
    //This ulility is used to convert a string selector to a locator
    protected toLocator(selector:string | Locator):Locator{
        return typeof selector === 'string' ? this.page.locator(selector) : selector;
    }


}