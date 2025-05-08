import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goTo() {
    await this.page.goto('https://automationexercise.com');
    await this.page.click('a[href="/login"]');
  }

  async login(email: string, password: string) {
    await this.page.fill('input[data-qa="login-email"]', email);
    await this.page.fill('input[data-qa="login-password"]', password);
    await this.page.click('button[data-qa="login-button"]');
  }
}
