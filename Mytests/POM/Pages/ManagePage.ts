import {Page} from '@playwright/test';
import { LoginPage } from './LoginPage.js';
import { SecurePage } from './SecurePage.js';
import { CheckboxesPage } from './CheckboxesPage.js';

export default class ManagePage{
    constructor (private readonly page:Page){}

    private _loginPage?: LoginPage;
    private _securePage?: SecurePage;
    private _checkboxesPage?:CheckboxesPage;

    //Lazy getter: Creates the page object only on 1st use; then re-uses it
    get loginPage(): LoginPage{
        if(!this._loginPage){
            this._loginPage = new LoginPage(this.page);
        }
        return this._loginPage;
    }

    //Same Lazy getter: but in one line
    get securePage(): SecurePage{
        return this._securePage??= new SecurePage(this.page);
    }

    //Same Lazy getter: but in one line
    get checkboxesPage(): CheckboxesPage{
        return this._checkboxesPage??= new CheckboxesPage(this.page);
    }

}