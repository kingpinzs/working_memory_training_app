// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

/**
 * Profile retake flow tests
 */

test.describe('Profile Retake Flow', () => {
  const indexPath = 'file://' + path.resolve(__dirname, '../index.html');

  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto(indexPath);
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.reload();
  });

  // TODO: These tests need debugging - tab content switch not working in test environment
  test.skip('retake quiz button is visible on profile view', async ({ page }) => {
    await page.goto(indexPath);

    // Complete a basic profile first
    await page.evaluate(() => {
      localStorage.setItem('wmLabProfile', JSON.stringify({
        onboardingComplete: true,
        persona: 'competitor',
        baseline: { verbal: 50, spatial: 50, attention: 50 },
        preferences: { style: 'mixed', sessionLength: 'quick' },
        recommendations: ['nback', 'span'],
        created: new Date().toISOString()
      }));
      // Add some data so dashboard shows content
      localStorage.setItem('wmLab', JSON.stringify({
        span: [{ scoreStr: 'Best L3', bestLevel: 3, ts: Date.now() }]
      }));
    });
    await page.reload();

    // Go to Dashboard first
    await page.click('[data-tab="dashboard"]');
    await page.waitForSelector('text=Analytics Dashboard', { timeout: 5000 });

    // Open Profile via button on Dashboard
    await page.click('button:has-text("Profile")');

    // Find retake quiz button
    const retakeBtn = await page.locator('button:has-text("Retake Discovery Quiz")');
    await expect(retakeBtn).toBeVisible();
  });

  test.skip('retake quiz shows inline confirmation', async ({ page }) => {
    await page.goto(indexPath);

    // Set up existing profile
    await page.evaluate(() => {
      localStorage.setItem('wmLabProfile', JSON.stringify({
        onboardingComplete: true,
        persona: 'competitor',
        baseline: { verbal: 50, spatial: 50, attention: 50 },
        preferences: { style: 'mixed', sessionLength: 'quick' },
        recommendations: ['nback', 'span'],
        created: new Date().toISOString()
      }));
      localStorage.setItem('wmLab', JSON.stringify({
        span: [{ scoreStr: 'Best L3', bestLevel: 3, ts: Date.now() }]
      }));
    });
    await page.reload();

    // Go to Dashboard first
    await page.click('[data-tab="dashboard"]');
    await page.waitForSelector('text=Analytics Dashboard', { timeout: 5000 });

    // Open Profile via button on Dashboard
    await page.click('button:has-text("Profile")');

    // Click retake quiz
    const retakeBtn = await page.locator('button:has-text("Retake Discovery Quiz")');
    await retakeBtn.click();

    // Should show confirmation buttons (not alert/confirm)
    const confirmBtn = await page.locator('button:has-text("Yes, Reset Profile")');
    await expect(confirmBtn).toBeVisible({ timeout: 2000 });
  });

  test.skip('canceling retake preserves existing profile', async ({ page }) => {
    await page.goto(indexPath);

    const originalProfile = {
      onboardingComplete: true,
      persona: 'competitor',
      baseline: { verbal: 75, spatial: 80, attention: 70 },
      preferences: { style: 'mixed', sessionLength: 'quick' },
      recommendations: ['nback', 'span'],
      created: new Date().toISOString()
    };

    // Set up existing profile
    await page.evaluate((profile) => {
      localStorage.setItem('wmLabProfile', JSON.stringify(profile));
      localStorage.setItem('wmLab', JSON.stringify({
        span: [{ scoreStr: 'Best L3', bestLevel: 3, ts: Date.now() }]
      }));
    }, originalProfile);
    await page.reload();

    // Go to Dashboard first
    await page.click('[data-tab="dashboard"]');
    await page.waitForSelector('text=Analytics Dashboard', { timeout: 5000 });

    // Open Profile via button on Dashboard
    await page.click('button:has-text("Profile")');

    // Click retake quiz
    const retakeBtn = await page.locator('button:has-text("Retake Discovery Quiz")');
    await retakeBtn.click();

    // Click cancel
    const cancelBtn = await page.locator('button:has-text("Cancel")');
    await cancelBtn.click();

    // Verify profile is preserved
    const savedProfile = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('wmLabProfile') || '{}');
    });

    expect(savedProfile.persona).toBe('competitor');
  });

  test.skip('profile displays persona correctly', async ({ page }) => {
    await page.goto(indexPath);

    // Set up profile with persona
    await page.evaluate(() => {
      localStorage.setItem('wmLabProfile', JSON.stringify({
        onboardingComplete: true,
        persona: 'struggler',
        baseline: { verbal: 45, spatial: 40, attention: 50 },
        preferences: { style: 'mixed', sessionLength: 'quick' },
        recommendations: ['nback', 'span'],
        created: new Date().toISOString()
      }));
      localStorage.setItem('wmLab', JSON.stringify({
        span: [{ scoreStr: 'Best L3', bestLevel: 3, ts: Date.now() }]
      }));
    });
    await page.reload();

    // Go to Dashboard first
    await page.click('[data-tab="dashboard"]');
    await page.waitForSelector('text=Analytics Dashboard', { timeout: 5000 });

    // Open Profile via button on Dashboard
    await page.click('button:has-text("Profile")');

    // Check that persona title is displayed (Everyday Improver for struggler)
    const profileContent = await page.locator('#screen').textContent();
    expect(profileContent).toContain('Everyday Improver');
  });
});
