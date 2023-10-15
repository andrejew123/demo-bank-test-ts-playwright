import { test, expect } from '@playwright/test';
import exp from 'constants';

test.describe('', () => {
  test.beforeEach (async ({page}) => {
    const userId = 'testtest';
    const userPassword = 'testtest';
    await page.goto('/')
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
 });

  test('quick paymnt data with correct data', async ({ page }) => {
    // Arrange
    const transferAmount = '150';
    const transferReceiver = '2';
    const transferTitle = 'zwrot srodkow';

    // Act
    await page
      .locator('#widget_1_transfer_receiver')
      .selectOption(transferReceiver);
    await page.locator('#widget_1_transfer_amount').click();
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();

    // Assert
    await expect(page.locator('#show_messages')).toHaveText(
      `Przelew wykonany! Chuck Demobankowy - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test('successful mobile top-up', async ({ page }) => {
    // Arrange
    const topUpReceiver = '503 xxx xxx';
    const topUpAmount = '50';
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

    // Act
    await page.locator('#widget_1_topup_receiver').selectOption(topUpReceiver);
    await page.locator('#widget_1_topup_amount').fill(topUpAmount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    // Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });
});
