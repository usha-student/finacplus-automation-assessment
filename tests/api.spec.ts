import { test, expect, request } from '@playwright/test';

test('Reqres API  Create, Get, Update User', async () => {
    const apiContext = await request.newContext();

    // Create user
    const createRes = await apiContext.post('https://reqres.in/api/users', {
        data: { name: 'Usha', job: 'QA' },
        headers: {
            'Content-Type': 'application/json'
        }
    });
    expect(createRes.status()).toBe(201);
    const createData = await createRes.json();
    const userId = createData.id;

    // Get user (mock user id)
    const getRes = await apiContext.get(`https://reqres.in/api/users/2`);
    expect(getRes.status()).toBe(200);

    // Update user
    const updateRes = await apiContext.put(`https://reqres.in/api/users/${userId}`, {
        data: { name: 'Usha Updated', job: 'Lead QA' },
        headers: {
            'Content-Type': 'application/json'
        }
    });
    expect(updateRes.status()).toBe(200);
});
