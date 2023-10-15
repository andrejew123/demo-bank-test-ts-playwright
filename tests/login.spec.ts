import { test, expect } from '@playwright/test';

test.describe('User login tyo Demobank', () => {
  //Arange
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  });

  test('Login with correct credentials', async ({ page }) => {
    //Arrange
    const userId = 'testtest';
    const userPassword = 'testtest';
    const expectedUserName = 'Jan Demobankowy';

    //Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('Login with incorrect username', async ({ page }) => {
    // Arrange
    const wrongUserName = 'testL';
    const userPassword = 'testtest';
    const wrongUsernameErrorMessage = 'identyfikator ma min. 8 znaków';

    // Act
    await page.getByTestId('login-input').fill(wrongUserName);
    await page.getByTestId('password-input').fill(userPassword);

    // Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      wrongUsernameErrorMessage,
    );
  });

  test('Login with incorrect password', async ({ page }) => {
    // Arragne
    const userId = 'testtest';
    const wrongUserPassword = 'testu';
    const wrongPasswordErrorMessage = 'hasło ma min. 8 znaków';

    // Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(wrongUserPassword);
    await page.getByTestId('password-input').blur();
    // Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      wrongPasswordErrorMessage,
    );
  });
});
