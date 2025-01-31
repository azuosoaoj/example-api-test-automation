import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 10_000,
  reporter: [
    ['allure-playwright'],
  ],
  use: {
    baseURL: 'https://dog.ceo/api/'
  }
});
