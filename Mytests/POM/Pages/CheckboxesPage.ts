import { BasePage } from "./BasePage.js";
import { Page,Locator} from '@playwright/test'

export class CheckboxesPage extends BasePage{
    private readonly firstBox:Locator;
    private readonly secondBox:Locator ;
    private readonly form:Locator;

    constructor(public readonly page: Page){
        super(page);
        this.firstBox = this.page.locator('#checkboxes').locator('input').nth(0)
        this.secondBox = this.page.locator('#checkboxes').locator('input').nth(1)
        this.form = this.page.locator('#checkboxes');
    }

    async openCheckboxesPage(){
        await this.goToURL('/checkboxes');
        await this.basePageExpectVisible(this.form);
    }

    async checkFirstCheckbox(){
        await this.basePageCheckboxChecked(this.firstBox);
    }

    async uncheckFirstCheckbox(){
        await this.basePageCheckboxUnchecked(this.firstBox);
    }

    async checkSecondCheckbox(){
        await this.basePageCheckboxChecked(this.secondBox);
    }

    async uncheckSecondCheckbox(){
        await this.basePageCheckboxUnchecked(this.secondBox);
    }

    async assertFirstCheckboxState(isFirstChecked: boolean){
        await this.basePageCheckboxStatus(this.firstBox,isFirstChecked);
    }

    async assertSecondCheckboxState(isSecondChecked: boolean){
        await this.basePageCheckboxStatus(this.secondBox, isSecondChecked);
    }
}
