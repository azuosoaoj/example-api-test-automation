import { test, expect } from '@playwright/test';
import allure from 'allure-playwright'; // Import Allure Playwright reporter

test('Validate successful API response', async ({ request }) => {
  allure.feature('API Response Validation');
  allure.story('Validate successful response from /breeds/image/random');
  allure.severity('critical');
  
  const response = await request.get('breeds/image/random');
  expect(response.status()).toBe(200);
  
  const data = await response.json();
  
  expect(data).toHaveProperty('status');
  expect(data.status).toBe('success');
  expect(data).toHaveProperty('message');
});

test('Validate image URL in response', async ({ request }) => {
  allure.feature('Image URL Validation');
  allure.story('Validate the image URL returned for a random breed');
  allure.severity('high');
  
  const response = await request.get('breeds/image/random');
  expect(response.status()).toBe(200);
  
  const data = await response.json();
  const imageUrl = data.message;
  expect(imageUrl).toMatch(/^https:\/\/images\.dog\.ceo\/breeds\/[a-zA-Z\-]+\/[a-zA-Z0-9\-_]+\.jpg$/);
});
