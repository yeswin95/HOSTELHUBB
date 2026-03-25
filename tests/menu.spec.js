import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Clear localStorage to ensure initial data is loaded
  await page.goto('http://localhost:8000/login.html');
  await page.evaluate(() => localStorage.clear());
});

test('Student menu displays all 7 days with correct data', async ({ page }) => {
  await page.goto('http://localhost:8000/login.html');
  
  // Login as student
  await page.fill('#email', 'arjun@example.com');
  await page.fill('#password', 'password');
  await page.selectOption('#role', 'student');
  await page.click('button[type="submit"]');
  
  // Wait for redirect to dashboard and then go to menu
  await page.waitForURL('**/student-dashboard.html');
  await page.goto('http://localhost:8000/student-menu.html');
  
  // Check for 7 menu cards
  const menuCards = page.locator('.menu-card');
  await expect(menuCards).toHaveCount(7);
  
  // Verify specific items from screenshot
  const mondayCard = page.locator('.menu-card', { hasText: 'Monday' });
  await expect(mondayCard.locator('.menu-food').first()).toHaveText('Bread, Jam');
  
  const tuesdayCard = page.locator('.menu-card', { hasText: 'Tuesday' });
  await expect(tuesdayCard.locator('.menu-food').last()).toHaveText('Soup');
});

test('Admin menu list shows all 7 days', async ({ page }) => {
  await page.goto('http://localhost:8000/login.html');
  
  // Login as admin
  await page.fill('#email', 'admin@hostelhub.com');
  await page.fill('#password', 'password');
  await page.selectOption('#role', 'admin');
  await page.click('button[type="submit"]');
  
  await page.waitForURL('**/admin-dashboard.html');
  await page.goto('http://localhost:8000/admin-menu.html');
  
  // Check table rows (excluding header)
  const menuRows = page.locator('#admin-menu-list tr');
  await expect(menuRows).toHaveCount(7);
  
  // Verify Monday and Tuesday entries in admin table
  await expect(menuRows.first().locator('td').nth(1)).toHaveText('Bread, Jam');
  await expect(menuRows.nth(1).locator('td').nth(1)).toHaveText('Eggs, Fruit');
});
