import { BasePage } from "./BasePage.js";
import { SecurePage } from "./SecurePage.js";

export class LoginPage extends BasePage{

    async goToLoginPage(){
        await this.goToURL('/login');
    }

    async userLogin(username:string, password:string): Promise<any>{
        await this.basePageFill(this.page.getByRole('textbox',{name:'Username'}),username);
        await this.basePageFill(this.page.getByRole('textbox',{name:'Password'}),password);
        await this.basePageClick(this.page.getByRole('button',{name:'Login'})).catch((error)=>{
            console.error(`Error logging in: ${error}`);
            throw error;
        });
        //This is page chaining concept: If login is successful, create an instance of the next page and return the next page
        const securePage = new SecurePage(this.page);
        return securePage;
    }

    async assertFailedAuthentication(){
        const banner = this.page.locator('#flash');
        await this.basePageExpectVisible(banner);
        await this.basePageExpectElementContainsText(banner,'Your username is invalid!');
    }

}