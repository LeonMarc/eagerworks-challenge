import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Page, BrowserContext, Browser } from 'playwright';
import { expect } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage';
import { LoginPage } from '../../pages/LoginPage';
import { generateUser, getGeneratedUser } from '../../utils/dataGenerator';

// Setear timeout global por paso a 60s
setDefaultTimeout(60 * 1000);

let browser: Browser;
let context: BrowserContext;
let page: Page;
let registerPage: RegisterPage;
let loginPage: LoginPage;
let currentUser: { name: string; email: string; password: string };

Given('I am on the registration page', async () => {
  browser = await chromium.launch(); // HEADLESS por default
  context = await browser.newContext();
  page = await context.newPage();
  registerPage = new RegisterPage(page);
  await registerPage.goTo();
});

When('I fill in the registration form with valid data', async () => {
  currentUser = generateUser();
  await registerPage.fillRegistrationForm(currentUser.name, currentUser.email);
  await registerPage.fillFullRegistrationForm(currentUser.password);
});

Then('I should see a confirmation message', async () => {
  await registerPage.expectAccountCreated();
});

Given('I am on the login page', async () => {
  browser = await chromium.launch(); // HEADLESS por default
  context = await browser.newContext();
  page = await context.newPage();
  loginPage = new LoginPage(page);
  await loginPage.goTo();
});

When('I log in with the registered user', async () => {
  const user = getGeneratedUser();
  await loginPage.login(user.email, user.password);
});

Then('I should see my username on the homepage', async () => {
  const user = getGeneratedUser();

  const loggedInElement = await page.waitForSelector('li:has-text("Logged in as")', { timeout: 10000 });
  const text = await loggedInElement.textContent();

  expect(text?.toLowerCase()).toContain(user.name.toLowerCase());
});
