import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
    private page: Page;
    private loginLink: Locator;
    private usernameInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.loginLink = page.locator('#login2');
        this.usernameInput = page.locator('#loginusername');
        this.passwordInput = page.locator('#loginpassword');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
    }


    async Checkvalidation(){
        await this.loginLink.click();
        await this.loginButton.click();
        //await expect(this.userError).toBeVisible();
        
    }
    

    async loginToSite(username: string, password: string): Promise<void> {
        await this.loginLink.click();
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForTimeout(30000);

        // Wait for navigation or URL change instead of fixed timeout
      await this.page.waitForURL('https://demoblaze.com/index.html');

     
        await expect(this.page).toHaveURL('https://demoblaze.com/index.html');
    }
}


