import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test('Book Store', async ({ page }) => {
    test.setTimeout(60000);

    // 1. Navigate to demoqa homepage
    await page.goto('https://demoqa.com', { waitUntil: 'domcontentloaded' });

    // 2. Scroll down to bottom so Book Store Application becomes visible
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000); 

    // 3. Use a more reliable selector if the role is not working
    const bookStoreSelector = 'div.card-body h5:has-text("Book Store Application")';
    const bookStoreCard = page.locator(bookStoreSelector);

    await expect(bookStoreCard).toBeVisible();
    await bookStoreCard.click();

    // 4. Wait for Book Store page to load
    await expect(page).toHaveURL(/.*books/);



    // Scroll down a bit (e.g., 300 pixels)
    await page.evaluate(() => window.scrollBy(0, 300));
    await page.waitForTimeout(1000);

    // Use specific locator to avoid multiple matches
    const Loginbutton = page.getByRole('button', { name: 'Login' });
    await expect(Loginbutton).toBeVisible();
    await Loginbutton.click();

    await expect(page).toHaveURL(/.*login/);
    await page.waitForTimeout(1000);

    await page.getByPlaceholder('UserName').fill('Usha@13');
    await page.getByPlaceholder('Password').fill('Usha@2001');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('#userName-value')).toHaveText('Usha@13');
    await expect(page.locator('button#submit')).toHaveText('Log out');

    await page.click('text=Book Store');
    await page.fill('#searchBox', 'Learning JavaScript Design Patterns');

    const row = page.locator('.rt-tbody .rt-tr-group').nth(0);
    const title = await row.locator('div').nth(1).textContent();
    const author = await row.locator('div').nth(2).textContent();
    const publisher = await row.locator('div').nth(3).textContent();

    fs.writeFileSync('book-info.txt', `Title: ${title?.trim()}\nAuthor: ${author?.trim()}\nPublisher: ${publisher?.trim()}`);

    await page.click('#submit');
});
