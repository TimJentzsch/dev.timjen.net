import { expect, test } from '@playwright/test';

test('home page shows name as h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1')).toHaveText('Tim Jentzsch');
});

test('home page hides the header', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('header')).toHaveCount(0);
});

test('blog page shows the header', async ({ page }) => {
	await page.goto('/blog');
	await expect(page.locator('header')).toBeVisible();
});
