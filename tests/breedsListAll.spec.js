import { test, expect } from "@playwright/test";
import allure from 'allure-playwright';  // Import Allure Playwright reporter

test('Validate API response structure', async ({ request }) => {
  allure.feature('API Response Structure');
  allure.story('Validate structure of response from /breeds/list/all');
  allure.severity('critical');
  
  const response = await request.get('https://dog.ceo/api/breeds/list/all');
  expect(response.status()).toBe(200);

  const data = await response.json();
  
  expect(data).toHaveProperty('message');
  expect(data).toHaveProperty('status');
  expect(data.status).toBe('success');
  expect(typeof data.message).toBe('object');
});

test('Validate retriever contains golden', async ({ request }) => {
  allure.feature('Breed Validation');
  allure.story('Check if retriever contains golden breed');
  allure.severity('high');

  const response = await request.get('https://dog.ceo/api/breeds/list/all');
  expect(response.status()).toBe(200);

  const data = await response.json();
  
  expect(data.message).toHaveProperty('retriever');
  expect(data.message.retriever).toContain('golden');
});

test('Validate breeds list is not empty', async ({ request }) => {
  allure.feature('Breed Validation');
  allure.story('Ensure breeds list is not empty');
  allure.severity('normal');

  const response = await request.get('https://dog.ceo/api/breeds/list/all');
  expect(response.status()).toBe(200);

  const data = await response.json();
  
  expect(Object.keys(data.message).length).toBeGreaterThan(0);
});
