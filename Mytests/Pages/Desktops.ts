import type {Page, Locator} from '@playwright/test';

export default class Desktop{
    private readonly firstDevice:Locator;
    private readonly addToCart:Locator;
    private readonly viewCart:Locator;
    private readonly Price:Locator;

    constructor (public readonly page: Page){
        this.firstDevice = page.locator('.image>a:nth-of-type(1)').first();
        this.addToCart = page.locator('i[class="fas fa-shopping-cart"]').first();
        this.viewCart = page.locator('a[role="button"]>.cart-icon').first();
        this.Price = page.locator('table.table.mb-0>tbody>tr:last-of-type>td:last-of-type');
    }

    async addFirstDeviceToCart(){
        await this.firstDevice.hover();
        await this.addToCart.click();
        await this.page.waitForTimeout(2000);
        
        // Close notification overlay if present
        const notificationClose = this.page.locator('#notification-box-top button').first();
        if (await notificationClose.isVisible()) {
            await notificationClose.click();
            await this.page.waitForTimeout(500);
        }
        
        await Promise.all([
            await this.viewCart.click(),
            await this.page.waitForLoadState('networkidle')
        ]);
        const price = await this.Price.textContent();
        return price;
    }
}