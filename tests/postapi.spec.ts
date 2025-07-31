import { test, expect } from '@playwright/test';

test('Reqres API Create User', async ({ request }) => {
  const response = await request.post('https://reqres.in/api/users', {
    data: {
      name: 'Usha',
      job: 'QA'
    }
  });

 // expect(response.status()).toBe(201); // 201 Created
  const body = await response.json();
  console.log(body);
});
