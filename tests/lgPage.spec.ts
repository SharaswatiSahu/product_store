import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/homePage';

test.describe('Login Tests', () => {
  let basePage: BasePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    loginPage = new LoginPage(page);
    await page.goto('https://demoblaze.com');
  });

  test('User can successfully log in with valid credentials', async ({ page }) => {
    await loginPage.loginToSite('pavanol', 'test@123');

    // Assert successful login
    await expect(page).toHaveURL('https://demoblaze.com/index.html');
    await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');
  });

  test('Login should fail with invalid credentials', async ({ page }) => {
    // Listen for the alert
    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Wrong password.');
      await dialog.dismiss();
    });

    await loginPage.loginToSite('invalidUser', 'wrongPass');

    // Ensure login was not successful
    await expect(page.locator('#nameofuser')).toHaveCount(0);
    await expect(page).toHaveURL('https://demoblaze.com/index.html');// Page does not change




    //Home
    const home = new HomePage(page)
    await home.addProductToCart("Nexus 6")
    await page.waitForTimeout(3000)
    await home.gotoCart();

  });




  //cart
  //const cart = new CartPage(page)


});