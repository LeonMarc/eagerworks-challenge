import { test, expect, request } from '@playwright/test';

const BASE_URL = 'https://reqres.in';

test('GET /api/users/2 should return a valid user', async ({ request }) => {
  const start = Date.now();
  const response = await request.get(`${BASE_URL}/api/users/2`);
  const duration = Date.now() - start;

  expect(response.status()).toBe(200);
  expect(duration).toBeLessThan(3000);
  expect(response.headers()['content-type']).toContain('application/json');

  const body = await response.json();
  expect(body.data).toMatchObject({
    id: 2,
    email: expect.stringContaining('@'),
    first_name: expect.any(String),
    last_name: expect.any(String),
    avatar: expect.stringContaining('https')
  });
});

test('GET /api/unknown/2 should return a color resource', async ({ request }) => {
  const start = Date.now();
  const response = await request.get(`${BASE_URL}/api/unknown/2`);
  const duration = Date.now() - start;

  expect(response.status()).toBe(200);
  expect(duration).toBeLessThan(3000);
  expect(response.headers()['content-type']).toContain('application/json');

  const body = await response.json();
  expect(body.data).toMatchObject({
    id: 2,
    name: expect.any(String),
    year: expect.any(Number),
    color: expect.stringMatching(/^#/),
    pantone_value: expect.stringMatching(/^\d{2}-\d{4}$/)
  });
});
