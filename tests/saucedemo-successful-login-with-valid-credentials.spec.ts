import { test, expect } from '@playwright/test';

test.describe('SauceDemo core workflows', () => {
  test('Successful login with valid credentials', async ({ page }) => {
    // 1. Open https://www.saucedemo.com/.
    await page.goto('https://www.saucedemo.com/');
    await expect(page.getByText('Swag Labs')).toBeVisible();
    await expect(page.locator('[data-test="username"]')).toBeVisible();
    await expect(page.locator('[data-test="password"]')).toBeVisible();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    // 2. Enter `standard_user` in Username and `secret_sauce` in Password.
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await expect(page.locator('[data-test="username"]')).toHaveValue('standard_user');
    await expect(page.locator('[data-test="password"]')).toHaveValue('secret_sauce');

    // 3. Select Login.
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
  });
});
