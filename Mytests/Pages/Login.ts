import {Page, Locator} from '@playwright/test';

export default class Login{
    private readonly Email: Locator;
    private readonly Password: Locator;
    private readonly Login: Locator;

    constructor (public readonly page:Page){
        this.Email = this.page.getByRole("textbox",{name: 'E-Mail Address'});
        this.Password = this.page.getByRole("textbox",{name: 'Password'});
        this.Login = this.page.getByRole("button",{name: 'Login'});
    }

    async fillEmailAddress(email:string){
        await this.Email.fill(email);
    }

    async fillPassword(password: string){
        await this.Password.fill(password);
    }

    async clickLogin(){
        await this.page.waitForLoadState('networkidle');
        await this.Login.click();
    }

    async LoginMe(email:string, password:string){
        await this.fillEmailAddress(email);
        await this.fillPassword(password);
        await this.clickLogin();
    }

}