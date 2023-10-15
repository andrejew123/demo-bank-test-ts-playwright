import { test, expect } from '@playwright/test';
import exp from 'constants';

test.describe('', () => {
  test.only('quick paymnt data with correct data', async ({ page }) => {
    // Arrange
    const transferAmount = '150';
    const transferReceiver = '2';
    const transferTitle = 'zwrot srodkow';
    const url = 'https://demo-bank.vercel.app/';
    const userId = 'testtest';
    const userPassword = 'testtest';
    const expectedUserName = 'Jan Demobankowy';

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

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
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('testerLO');
    await page.getByTestId('password-input').fill('password');
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_topup_receiver').selectOption('503 xxx xxx');
    await page.locator('#widget_1_topup_amount').fill('50');
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(
      'Doładowanie wykonane! 50,00PLN na numer 503 xxx xxx',
    );
  });
});
