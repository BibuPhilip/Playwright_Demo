import type {Page, Locator} from '@playwright/test';

export default class DashboardAndHome{
    private readonly Home: Locator;
    private readonly Desktops: Locator;

    constructor (public readonly page: Page){
        this.Home = this.page.locator('.navbar-nav.horizontal>li:nth-of-type(1)>a');
        this.Desktops = this.page.locator('.content>div:nth-of-type(3)>div>div:nth-of-type(2)>div>div:nth-of-type(1)>div:nth-of-type(1)>a');
    }

    async clickOnHome(){
        await this.page.waitForLoadState('networkidle');
        await this.Home.click();
    }

    async clickOnDesktops(){
        await this.page.waitForLoadState('networkidle');
        await this.Desktops.click();
    }

    async Logout(){
        // Close notification overlay if present
        const notificationClose = this.page.locator('#notification-box-top button').first();
        if (await notificationClose.isVisible()) {
            await notificationClose.click();
            await this.page.waitForTimeout(500);
        }
        
        // Close cart drawer by pressing Escape
        const cartDrawer = this.page.locator('#cart-total-drawer');
        if (await cartDrawer.isVisible()) {
            await this.page.keyboard.press('Escape');
            await this.page.waitForTimeout(500);
        }
        
        // Navigate directly to the logout URL
        await this.page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/logout');
    }
}
