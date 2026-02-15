import type {Page, Locator} from '@playwright/test';


export default class Register{

    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly email: Locator;
    private readonly telephone: Locator;
    private readonly password: Locator;
    private readonly confirmPassword: Locator;
    private readonly subscribeNo: Locator;
    private readonly privacyPolicy: Locator;
    private readonly Continue: Locator;

    constructor(public readonly page: Page){
        this.firstName = this.page.getByRole('textbox',{name:'First Name'});
        this.lastName = this.page.getByRole('textbox',{name:'Last Name'});
        this.email = this.page.getByRole('textbox',{name:'E-mail'});
        this.telephone = this.page.getByRole('textbox',{name:'Telephone'});
        this.password = this.page.getByRole('textbox',{name:'Password'}).first();
        this.confirmPassword = this.page.getByRole('textbox',{name:'Password Confirm'});
        this.subscribeNo = this.page.getByRole('radio',{name:'No'});
        this.privacyPolicy = this.page.locator('label[for="input-agree"]');
        this.Continue = this.page.getByRole('button',{name:'Continue'});
    }

    async FillFirstName(fName: string){
        await this.firstName.fill(fName);
    }

    async FillLastName(lName: string){
        await this.lastName.fill(lName);
    }

    async FillEmail(Email: string){
        await this.email.fill(Email);
    }

    async FillTelephone(tphone: string){
        await this.telephone.fill(tphone);
    }

    async FillPassword(pword: string) {
        await this.password.fill(pword);
    }

    async FillConfirmPassword(cpword: string) {
        await this.confirmPassword.fill(cpword);
    }

    async IsNotSubscribed() {
        return await (this.subscribeNo).isChecked();
    }

    async CheckPrivacyPolicy() {
        await this.privacyPolicy.check();
    }

    async ClickContinue() {
        await this.Continue.click();
    }


/*     async Register(fName: string, lName: string, Email: string, tphone: string, pword: string, cpword: string) {
        await this.FillFirstName(fName);
        await this.lastName.fill(lName);
        await this.email.fill(Email);
        await this.telephone.fill(tphone);
        await this.password.fill(pword);
        await this.confirmPassword.fill(cpword);
        return await (this.subscribeNo).isChecked();
        await this.privacyPolicy.check();
        await this.Continue.click();
    } */
}