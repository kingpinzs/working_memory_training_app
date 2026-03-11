// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

/**
 * Basic smoke tests to verify app loads and core functionality works
 */

test.describe('App Smoke Tests', () => {
  const indexPath = 'file://' + path.resolve(__dirname, '../index.html');

  test('app loads successfully', async ({ page }) => {
    await page.goto(indexPath);
    
    // Verify header exists
    const header = await page.locator('header h1');
    await expect(header).toContainText('Working Memory Lab');
    
    // Verify main navigation tabs exist
    const tabs = await page.locator('[role="tab"]');
    await expect(tabs).toHaveCount(5);
  });

  test('tab navigation works', async ({ page }) => {
    await page.goto(indexPath);
    
    // Click Dashboard tab
    await page.click('[data-tab="dashboard"]');
    
    // Verify Dashboard tab is selected
    const dashboardTab = await page.locator('[data-tab="dashboard"]');
    await expect(dashboardTab).toHaveAttribute('aria-selected', 'true');
    
    // Click Launchpad tab
    await page.click('[data-tab="launchpad"]');
    
    // Verify Launchpad tab is selected
    const launchpadTab = await page.locator('[data-tab="launchpad"]');
    await expect(launchpadTab).toHaveAttribute('aria-selected', 'true');
  });

  test('localStorage is accessible', async ({ page }) => {
    await page.goto(indexPath);
    
    // Test that we can read/write localStorage
    const canAccessStorage = await page.evaluate(() => {
      try {
        localStorage.setItem('test', 'value');
        const result = localStorage.getItem('test');
        localStorage.removeItem('test');
        return result === 'value';
      } catch {
        return false;
      }
    });
    
    expect(canAccessStorage).toBe(true);
  });

  test('coach mode toggle works', async ({ page }) => {
    await page.goto(indexPath);
    
    // Click Launchpad tab to ensure we're on the right view
    await page.click('[data-tab="launchpad"]');
    
    // Find coach mode toggle
    const coachToggle = await page.locator('#coachToggle');
    
    // Get initial state
    const initialState = await coachToggle.isChecked();
    
    // Toggle it
    await coachToggle.click();
    
    // Verify state changed
    const newState = await coachToggle.isChecked();
    expect(newState).toBe(!initialState);
    
    // Verify it persisted to localStorage
    const storedValue = await page.evaluate(() => {
      const prefs = JSON.parse(localStorage.getItem('wmLabPrefs') || '{}');
      return prefs.coachMode;
    });
    expect(storedValue).toBe(newState);
  });

  test('launchpad displays assessment buttons', async ({ page }) => {
    await page.goto(indexPath);

    // Click Launchpad tab
    await page.click('[data-tab="launchpad"]');

    // Verify assessment buttons exist (updated selectors for new data-run values)
    const wmSpanBtn = await page.locator('button[data-run="span"]');
    await expect(wmSpanBtn).toBeVisible();

    const spatialBtn = await page.locator('button[data-run="spatial"]');
    await expect(spatialBtn).toBeVisible();

    const nbackBtn = await page.locator('button[data-run="nback"]');
    await expect(nbackBtn).toBeVisible();
  });

  test('high contrast toggle works', async ({ page }) => {
    await page.goto(indexPath);

    // Click Launchpad tab to ensure we're on the right view
    await page.click('[data-tab="launchpad"]');

    // Find high contrast toggle
    const contrastToggle = await page.locator('#contrastToggle');
    await expect(contrastToggle).toBeVisible();

    // Get initial state
    const initialState = await contrastToggle.isChecked();
    expect(initialState).toBe(false);

    // Toggle it on
    await contrastToggle.click();

    // Verify state changed
    const newState = await contrastToggle.isChecked();
    expect(newState).toBe(true);

    // Verify body has high-contrast class
    const hasClass = await page.evaluate(() => {
      return document.body.classList.contains('high-contrast');
    });
    expect(hasClass).toBe(true);

    // Verify it persisted to localStorage
    const storedValue = await page.evaluate(() => {
      const prefs = JSON.parse(localStorage.getItem('wmLabPrefs') || '{}');
      return prefs.highContrast;
    });
    expect(storedValue).toBe(true);
  });

  test('new task buttons exist', async ({ page }) => {
    await page.goto(indexPath);

    // Click Launchpad tab
    await page.click('[data-tab="launchpad"]');

    // Verify new task buttons exist
    const dualNbackBtn = await page.locator('button[data-run="dualNback"]');
    await expect(dualNbackBtn).toBeVisible();

    const audioNbackBtn = await page.locator('button[data-run="audioNback"]');
    await expect(audioNbackBtn).toBeVisible();

    const corsiBtn = await page.locator('button[data-run="corsi"]');
    await expect(corsiBtn).toBeVisible();

    const opSpanBtn = await page.locator('button[data-run="opSpan"]');
    await expect(opSpanBtn).toBeVisible();
  });

  test('BrainTok tab exists', async ({ page }) => {
    await page.goto(indexPath);

    // Verify BrainTok tab exists
    const braintokTab = await page.locator('[data-tab="braintok"]');
    await expect(braintokTab).toBeVisible();

    // Click BrainTok tab
    await braintokTab.click();

    // Verify tab is selected
    await expect(braintokTab).toHaveAttribute('aria-selected', 'true');
  });
});
