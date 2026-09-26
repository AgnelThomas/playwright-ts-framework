import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('valid user can log in', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });

  test('wrong password shows error', async ({ page }) => {
    await loginPage.login('standard_user', 'wrong');
    await expect(loginPage.errorMessage).toContainText('do not match');
  });

  test('locked out user sees error', async ({ page }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toContainText('locked out');
  });
});