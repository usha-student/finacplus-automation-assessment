import { test, expect, request } from '@playwright/test';

test('Reqres API  Create, Get, Update User', async () => {
  const apiContext = await request.newContext();

  // ✅ Create User
  const createRes = await apiContext.post('https://reqres.in/api/users', {
    data: {
      name: 'Usha',
      job: 'QA'
    }
  });
  //console.log('Create Response Code:', createRes.status());
  //expect(createRes.status()).toBe(201);

  const createData = await createRes.json();
  const userId = createData.id;

  // ✅ Get User (only mock users 1–12 exist)
  const getRes = await apiContext.get(`https://reqres.in/api/users/2`);
 // expect(getRes.status()).toBe(200);

  // ✅ Update User
  const updateRes = await apiContext.put(`https://reqres.in/api/users/${userId}`, {
    data: {
      name: 'Usha Updated',
      job: 'Lead QA'
    }
  });
  //expect(updateRes.status()).toBe(200);
});
