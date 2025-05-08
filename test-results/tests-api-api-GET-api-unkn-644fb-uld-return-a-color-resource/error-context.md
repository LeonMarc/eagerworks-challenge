# Test info

- Name: GET /api/unknown/2 should return a color resource
- Location: F:\Proyectos\eagerworks-challenge\tests\api\api.test.ts:24:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 401
    at F:\Proyectos\eagerworks-challenge\tests\api\api.test.ts:29:29
```

# Test source

```ts
   1 | import { test, expect, request } from '@playwright/test';
   2 |
   3 | const BASE_URL = 'https://reqres.in';
   4 |
   5 | test('GET /api/users/2 should return a valid user', async ({ request }) => {
   6 |   const start = Date.now();
   7 |   const response = await request.get(`${BASE_URL}/api/users/2`);
   8 |   const duration = Date.now() - start;
   9 |
  10 |   expect(response.status()).toBe(200);
  11 |   expect(duration).toBeLessThan(3000);
  12 |   expect(response.headers()['content-type']).toContain('application/json');
  13 |
  14 |   const body = await response.json();
  15 |   expect(body.data).toMatchObject({
  16 |     id: 2,
  17 |     email: expect.stringContaining('@'),
  18 |     first_name: expect.any(String),
  19 |     last_name: expect.any(String),
  20 |     avatar: expect.stringContaining('https')
  21 |   });
  22 | });
  23 |
  24 | test('GET /api/unknown/2 should return a color resource', async ({ request }) => {
  25 |   const start = Date.now();
  26 |   const response = await request.get(`${BASE_URL}/api/unknown/2`);
  27 |   const duration = Date.now() - start;
  28 |
> 29 |   expect(response.status()).toBe(200);
     |                             ^ Error: expect(received).toBe(expected) // Object.is equality
  30 |   expect(duration).toBeLessThan(3000);
  31 |   expect(response.headers()['content-type']).toContain('application/json');
  32 |
  33 |   const body = await response.json();
  34 |   expect(body.data).toMatchObject({
  35 |     id: 2,
  36 |     name: expect.any(String),
  37 |     year: expect.any(Number),
  38 |     color: expect.stringMatching(/^#/),
  39 |     pantone_value: expect.stringMatching(/^\d{2}-\d{4}$/)
  40 |   });
  41 | });
  42 |
```