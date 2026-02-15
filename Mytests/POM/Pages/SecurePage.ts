import { BasePage } from "./BasePage.js";

export class SecurePage extends BasePage{

    async assertSuccess(){
        const banner = this.page.locator('#flash');
        this.basePageExpectVisible(banner);
        this.basePageExpectElementContainsText(banner,'You logged into a secure area!');
    }

    async Logout(){
        this.page.getByRole('link',{name:'Logout'}).click();
        this.page.waitForURL('/login');
    }
}