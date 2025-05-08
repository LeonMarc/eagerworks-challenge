import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';

const tempUserPath = path.join(__dirname, '../data/tempUser.json');

export function generateUser() {
  const user = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 10, memorable: true })
  };

  fs.writeFileSync(tempUserPath, JSON.stringify(user, null, 2));
  return user;
}

export function getGeneratedUser() {
  if (!fs.existsSync(tempUserPath)) {
    throw new Error('No user data found. Did you run the registration test first?');
  }

  const rawData = fs.readFileSync(tempUserPath, 'utf-8');
  return JSON.parse(rawData);
}
