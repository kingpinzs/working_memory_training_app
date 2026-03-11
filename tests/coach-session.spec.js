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

    // Toggling coach mode should show a toast (toast uses role="status")
    const toast = page.locator('[role="status"]').first();
    await expect(toast).toBeVisible({ timeout: 2000 });
  });
});

test.describe('Coach Session Full Flow', () => {
  const indexPath = 'file://' + path.resolve(__dirname, '../index.html');

  test('coach session selects tasks and starts first task', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });

    await page.goto(indexPath);

    // Set up profile and enable coach mode so coach session can run
    await page.evaluate(() => {
      localStorage.setItem('wmLabProfile', JSON.stringify({
        onboardingComplete: true,
        persona: 'competitor',
        baseline: { verbal: 50, spatial: 50, attention: 50 },
        preferences: { style: 'mixed', sessionLength: 'quick' },
        recommendations: ['nback', 'span'],
        created: new Date().toISOString()
      }));
      localStorage.setItem('wmLabPrefs', JSON.stringify({ coachMode: true }));
    });
    await page.reload();

    await page.click('[data-tab="launchpad"]');

    // Verify selectSessionTasks returns tasks
    const tasks = await page.evaluate(() => {
      const storeData = window.store.get();
      const profile = JSON.parse(localStorage.getItem('wmLabProfile') || 'null');
      return window.selectSessionTasks(storeData, profile);
    });
    expect(tasks.length).toBeGreaterThanOrEqual(2);
    expect(tasks[0]).toBe('filterPos'); // Always starts with warm-up

    // Verify coach mode is actually on
    const isCoachOn = await page.evaluate(() => coachOn());
    expect(isCoachOn).toBe(true);

    // Click coach session button and verify the screen changes to a task
    const coachBtn = await page.locator('#coachSession');
    await coachBtn.click();
    await page.waitForFunction(() => {
      const screen = document.querySelector('#screen');
      return screen && !screen.textContent.includes('Welcome');
    }, { timeout: 5000 });

    // Debug: log any errors
    if (errors.length > 0) console.log('Page errors:', errors);

    // Screen should now show a task (not the launchpad)
    const screenContent = await page.locator('#screen').textContent();
    expect(screenContent).not.toContain('Welcome to Working Memory Lab');
    expect(screenContent.length).toBeGreaterThan(10);
  });
});
