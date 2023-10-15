import { test, expect } from '@playwright/test';
import { loginData } from './test-data/login.data';

test.describe('Payment tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    await page.goto('/');
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    await page.getByRole('link', { name: 'płatności' }).click();
  });
  test('simple test', async ({ page }) => {
    // Arrange
    const amountTotransfer = '100';
    const accountTo = '12 3456 6789 0987 6743 2355';
    const transferReceiver = 'tester testowy';
    const expectedMessage = `Przelew wykonany! ${amountTotransfer},00PLN dla tester testowy`;
    // Act
    await page.getByTestId('transfer_receiver').fill(transferReceiver);
    await page.getByTestId('form_account_to').fill(accountTo);
    await page.getByTestId('form_amount').fill(amountTotransfer);
    await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    await page.getByTestId('close-button').click();

    // Act

    await expect(page.getByTestId('message-text')).toHaveText(expectedMessage);
  });
});
