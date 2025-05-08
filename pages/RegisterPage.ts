import { Page } from 'playwright';
import { faker } from '@faker-js/faker';

export class RegisterPage {
  constructor(private page: Page) {}

  async goTo() {
    await this.page.goto('https://automationexercise.com');
    await this.page.click('a[href="/login"]');
  }

  async fillRegistrationForm(name: string, email: string) {
    await this.page.fill('input[data-qa="signup-name"]', name);
    await this.page.fill('input[data-qa="signup-email"]', email);
    await this.page.click('button[data-qa="signup-button"]');
  }

  async fillFullRegistrationForm(password: string) {
    await this.page.check('#id_gender1'); // Mr.
    await this.page.fill('#password', password);

    // Fecha de nacimiento aleatoria
    await this.page.selectOption('#days', `${faker.number.int({ min: 1, max: 28 })}`);
    await this.page.selectOption('#months', `${faker.number.int({ min: 1, max: 12 })}`);
    await this.page.selectOption('#years', `${faker.number.int({ min: 1980, max: 2000 })}`);

    // Checkboxes
    await this.page.check('#newsletter');
    await this.page.check('#optin');

    // Dirección
    await this.page.fill('#first_name', faker.person.firstName());
    await this.page.fill('#last_name', faker.person.lastName());
    await this.page.fill('#company', faker.company.name());
    await this.page.fill('#address1', faker.location.streetAddress());
    await this.page.fill('#address2', faker.location.secondaryAddress());

    await this.page.selectOption('#country', 'Canada');

    await this.page.fill('#state', faker.location.state());
    await this.page.fill('#city', faker.location.city());
    await this.page.fill('#zipcode', faker.location.zipCode());
    await this.page.fill('#mobile_number', faker.string.numeric(10));
    await this.page.click('button[data-qa="create-account"]');
  }

  async expectAccountCreated() {
    await this.page.waitForSelector('h2:has-text("Account Created!")', { timeout: 10000 });
  }
}
