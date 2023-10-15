import { test, expect } from '@playwright/test';

test.describe('User login tyo Demobank', () => {
  //Arange
  const userId = 'testtest';
  const userPassword = 'testtest';
  test.beforeEach(async ({ page }) => {
    const url = 'https://demo-bank.vercel.app/';
    await page.goto(url);
  });

  test('Login with correct credentials', async ({ page }) => {
    //Arrange
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

// import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
