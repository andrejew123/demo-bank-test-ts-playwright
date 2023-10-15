import { test, expect } from '@playwright/test';

test.describe('User login tyo Demobank', () => {
test('Login with correct credentials', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  // await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('testLOll');
  await page.getByTestId('password-input').fill('testuiii');
  await page.getByTestId('login-button').click();
  await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');
});



test('Login with incorrect username', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').fill('testL');
  await page.getByTestId('password-input').fill('testuiii');
  await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków');
});

test('Login with incorrect password', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').fill('testLol1');
  await page.getByTestId('password-input').fill('testu');
  await page.getByTestId('password-input').blur();
  await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');
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
