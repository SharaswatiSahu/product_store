import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/homePage';
import { CartPage } from '../pages/cartPage';



test.describe('Login Tests', () => {
  let basePage: BasePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    loginPage = new LoginPage(page);
    await page.goto('https://demoblaze.com'); // Add the site URL if needed
  });

  test('User can successfully log in with valid credentials', async ({ page }) => {
    await loginPage.loginToSite('pavanol', 'test@123');



    
    // You can add assertions here if needed (e.g., check user name is displayed)
    await expect(page).toHaveURL('https://demoblaze.com/index.html');
    await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');

    //await page.close();


     //Home
        const home = new HomePage(page)
        await home.addProductToCart("Nexus 6")
        await page.waitForTimeout(3000)
        await home.gotoCart();

        //cart
         const cart = new CartPage(page)
         await page.waitForTimeout(3000)
         const status=await cart.checkProductInCart('Nexus 6')
         expect(await status).toBe(true);

  });
}); 