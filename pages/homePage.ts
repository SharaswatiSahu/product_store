import { Locator, Page } from '@playwright/test';

export class HomePage {
    private  page: Page;
    private  productList: Locator;
    private  addToCartBtn: Locator;
    private  cartBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productList = page.locator('//*[@id="tbodyid"]/div/div/div/h4/a'); 
        this.addToCartBtn = page.locator('//a[normalize-space()="Add to cart]'); 
        this.cartBtn = page.locator('#cartur');
    }

    async addProductToCart(productName: string): Promise<void> {
        const count = await this.productList.count();
        for (let i = 0; i < count; i++) {
            const product = this.productList.nth(i);
            const name = (await product.textContent())?.trim();
            if (name === productName) {
                await product.click();

                // Listen to alert before clicking 'Add to cart'
                this.page.once('dialog', async dialog => {
                    if (dialog.message().includes('added')) {
                        await dialog.accept();
                    }
                });

                await this.addToCartBtn.click();
                await this.page.waitForTimeout(500); // Optional: wait for alert to show
                await this.page.goBack(); // Optional: return to product list
                break;
            }
        }
    }

    async gotoCart(): Promise<void> {
        await this.cartBtn.click();
    }
}
