import { Locator, Page } from '@playwright/test';

export class CartPage {
    private readonly page: Page;
    private readonly cartItems: Locator;

    constructor(page: Page) {
        this.page = page;
        // Better CSS selector and descriptive name
        this.cartItems = page.locator('//tbody[@id="tbodyid"]/tr/td'); // 2nd column is usually product name
    }

    async checkProductInCart(productName: string): Promise<boolean> {
        const count = await this.cartItems.count();

        for (let i = 0; i < count; i++) {
            const item = this.cartItems.nth(i);
            const text = (await item.textContent())?.trim();
            console.log('Cart item:', text);

            if (text === productName) {
                return true;
            }
        }

        return false;
    }
}
