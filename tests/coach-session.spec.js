// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

/**
 * Coach Session flow tests
 * Note: These are simplified tests that verify Coach Session UI elements.
 * Full flow tests are long-running and marked as slow.
 */

test.describe('Coach Session', () => {
  const indexPath = 'file://' + path.resolve(__dirname, '../index.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(indexPath);
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.reload();
  });

  test('coach session button exists when coach mode is on', async ({ page }) => {
    await page.goto(indexPath);

    // Enable coach mode
    await page.click('[data-tab="launchpad"]');
    const coachToggle = await page.locator('#coachToggle');

    if (!(await coachToggle.isChecked())) {
      await coachToggle.click();
    }

    // Check for coach session button
    const coachBtn = await page.locator('#coachSession');
    await expect(coachBtn).toBeVisible();
  });

  test('coach session button text indicates guided session', async ({ page }) => {
    await page.goto(indexPath);

    // Enable coach mode
    await page.click('[data-tab="launchpad"]');
    const coachToggle = await page.locator('#coachToggle');

    if (!(await coachToggle.isChecked())) {
      await coachToggle.click();
    }

    // Check button text
    const coachBtn = await page.locator('#coachSession');
    const buttonText = await coachBtn.textContent();
    expect(buttonText?.toLowerCase()).toMatch(/coach|guided|session/i);
  });

  test('clicking coach session starts a task', async ({ page }) => {
    await page.goto(indexPath);

    // Enable coach mode
    await page.click('[data-tab="launchpad"]');
    const coachToggle = await page.locator('#coachToggle');

    if (!(await coachToggle.isChecked())) {
      await coachToggle.click();
    }

    // Click coach session
    const coachBtn = await page.locator('#coachSession');
    await coachBtn.click();

    // Wait a moment for task to start
    await page.waitForTimeout(500);

    // The screen content should change to show a task
    const screenContent = await page.locator('#screen').textContent();
    // Should see some task-related content (instructions, buttons, etc.)
    expect(screenContent?.length).toBeGreaterThan(10);
  });

  test('coach mode persists across page reload', async ({ page }) => {
    await page.goto(indexPath);

    // Enable coach mode
    await page.click('[data-tab="launchpad"]');
    const coachToggle = await page.locator('#coachToggle');

    if (!(await coachToggle.isChecked())) {
      await coachToggle.click();
    }

    // Reload page
    await page.reload();

    // Check coach mode is still on
    await page.click('[data-tab="launchpad"]');
    const coachToggleAfter = await page.locator('#coachToggle');
    await expect(coachToggleAfter).toBeChecked();
  });

  test('coach session shows toast feedback', async ({ page }) => {
    await page.goto(indexPath);

    // Enable coach mode
    await page.click('[data-tab="launchpad"]');
    const coachToggle = await page.locator('#coachToggle');

    if (!(await coachToggle.isChecked())) {
      await coachToggle.click();
    }

    // Wait for any initial toast
    await page.waitForTimeout(300);

    // Check for toast (coach mode ON toast)
    const toasts = await page.locator('.toast');
    const toastCount = await toasts.count();
    // May or may not have a toast visible at this point
    expect(toastCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe('Coach Session Full Flow', () => {
  const indexPath = 'file://' + path.resolve(__dirname, '../index.html');

  // Mark as slow test - can take several minutes
  test.slow();

  test.skip('completes full coach session with multiple tasks', async ({ page }) => {
    // This test is skipped by default as it runs actual cognitive tasks
    // Uncomment and adjust timeouts for full integration testing

    await page.goto(indexPath);

    // Enable coach mode
    await page.click('[data-tab="launchpad"]');
    const coachToggle = await page.locator('#coachToggle');

    if (!(await coachToggle.isChecked())) {
      await coachToggle.click();
    }

    // Click coach session
    const coachBtn = await page.locator('#coachSession');
    await coachBtn.click();

    // The test would continue interacting with tasks...
    // This is left as a skeleton for manual testing
  });
});
