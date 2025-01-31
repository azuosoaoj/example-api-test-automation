import { test, expect } from "@playwright/test";
import { getRandomBreed } from '../helpers/getRandomBreed';
import allure from 'allure-playwright'; // Import Allure Playwright reporter

const breed = getRandomBreed();

console.log('The tests will validate the breed: ' + breed);

test(`Validate API response structure for breed images`, async ({ request }) => {
  allure.feature('Breed Images API Validation');
  allure.story('Validate API response structure for breed images');
  allure.severity('critical');

  const response = await request.get(`breed/${breed}/images`);
  expect(response.status()).toBe(200);
  const data = await response.json();

  expect(data).toHaveProperty('message');
  expect(data).toHaveProperty('status');
  expect(data.status).toBe('success');
  expect(Array.isArray(data.message)).toBe(true);
});

test(`Validate at least one image is returned for breed`, async ({ request }) => {
  allure.feature('Breed Images API Validation');
  allure.story('Validate at least one image is returned for breed');
  allure.severity('high');

  const response = await request.get(`breed/${breed}/images`);
  expect(response.status()).toBe(200);

  const data = await response.json();

  expect(data.message.length).toBeGreaterThan(0);
});

test(`Validate all returned URLs are valid image links for breed`, async ({ request }) => {
  allure.feature('Breed Images API Validation');
  allure.story('Validate all returned URLs are valid image links for breed');
  allure.severity('high');

  const response = await request.get(`breed/${breed}/images`);
  expect(response.status()).toBe(200);

  const data = await response.json();

  data.message.forEach(url => {
    expect(url).toMatch(new RegExp(`^https://images\\.dog\\.ceo/breeds/${breed}.*\\.(jpg|jpeg|png)$`));
  });
});

test(`Validate return with invalid breed`, async ({ request }) => {
  allure.feature('Breed Images API Validation');
  allure.story('Validate response for an invalid breed');
  allure.severity('normal');

  const response = await request.get(`breed/invalid_breed/images`);
  expect(response.status()).toBe(404);

  const data = await response.json();
  expect(data.message).toEqual('Breed not found (master breed does not exist)');
  expect(data.status).toEqual('error');
  expect(data.code).toEqual(404);
});
