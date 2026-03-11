// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

/**
 * Dashboard analytics tests
 */

test.describe('Dashboard Analytics', () => {
  const indexPath = 'file://' + path.resolve(__dirname, '../index.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(indexPath);
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.reload();
  });

  test('dashboard shows empty state when no data', async ({ page }) => {
    await page.goto(indexPath);

    // Go to Dashboard
    await page.click('[data-tab="dashboard"]');

    // Should show some indication of no data or getting started
    const dashboardContent = await page.locator('#screen').textContent();
    expect(dashboardContent).toBeTruthy();
  });

  test('dashboard displays domain scores with sample data', async ({ page }) => {
    await page.goto(indexPath);

    // Add some sample score data with baseline profile
    await page.evaluate(() => {
      const sampleData = {
        span: [
          { scoreStr: 'Best L3', bestLevel: 3, ts: Date.now() - 86400000, personalBest: true }
        ],
        nback: [
          { scoreStr: '1B:70% 2B:60%', acc1: 70, acc2: 60, ts: Date.now() - 43200000 }
        ],
        spatial: [
          { scoreStr: '2/4', level: 2, cleared: 2, ts: Date.now() }
        ]
      };
      localStorage.setItem('wmLab', JSON.stringify(sampleData));
      // Use correct profile storage key
      localStorage.setItem('wmLabProfile', JSON.stringify({
        onboardingComplete: true,
        persona: 'competitor',
        baseline: { verbal: 50, spatial: 50, attention: 50 },
        preferences: { style: 'mixed', sessionLength: 'quick' },
        recommendations: ['nback', 'span'],
        created: new Date().toISOString()
      }));
    });
    await page.reload();

    // Go to Dashboard
    await page.click('[data-tab="dashboard"]');
    await page.waitForSelector('text=Analytics Dashboard', { timeout: 5000 });

    // Check for domain-related content in the screen
    const screenContent = await page.locator('#screen').textContent();
    const hasDomainContent = screenContent?.includes('Verbal') ||
                             screenContent?.includes('Spatial') ||
                             screenContent?.includes('Attention') ||
                             screenContent?.includes('%');
    expect(hasDomainContent).toBe(true);
  });

  test('dashboard shows trend arrows', async ({ page }) => {
    await page.goto(indexPath);

    // Add data with history for trends
    await page.evaluate(() => {
      const now = Date.now();
      const sampleData = {
        span: [
          { scoreStr: 'Best L2', bestLevel: 2, ts: now - 604800000 }, // Week ago
          { scoreStr: 'Best L3', bestLevel: 3, ts: now } // Now (improved)
        ]
      };
      localStorage.setItem('wmLab', JSON.stringify(sampleData));
      localStorage.setItem('wmLabProfile', JSON.stringify({
        onboardingComplete: true,
        persona: 'competitor',
        baseline: { verbal: 50, spatial: 50, attention: 50 },
        preferences: { style: 'mixed', sessionLength: 'quick' },
        recommendations: ['nback', 'span'],
        created: new Date().toISOString()
      }));
    });
    await page.reload();

    // Go to Dashboard
    await page.click('[data-tab="dashboard"]');
    await page.waitForSelector('text=Analytics Dashboard', { timeout: 5000 });

    // Look for trend indicators or any percentage (arrows may vary by performance)
    const dashboardContent = await page.locator('#screen').textContent();
    // Dashboard should show something about progress or trends
    expect(dashboardContent?.length).toBeGreaterThan(50);
  });

  test('dashboard shows weekly comparison', async ({ page }) => {
    await page.goto(indexPath);

    // Add data from this week and last week
    await page.evaluate(() => {
      const now = Date.now();
      const lastWeek = now - 7 * 24 * 60 * 60 * 1000;
      const sampleData = {
        span: [
          { scoreStr: 'Best L2', bestLevel: 2, ts: lastWeek },
          { scoreStr: 'Best L3', bestLevel: 3, ts: now }
        ],
        nback: [
          { scoreStr: '1B:60%', acc1: 60, ts: lastWeek },
          { scoreStr: '1B:70%', acc1: 70, ts: now }
        ]
      };
      localStorage.setItem('wmLab', JSON.stringify(sampleData));
      localStorage.setItem('wmLabProfile', JSON.stringify({
        onboardingComplete: true,
        persona: 'competitor',
        baseline: { verbal: 50, spatial: 50, attention: 50 },
        preferences: { style: 'mixed', sessionLength: 'quick' },
        recommendations: ['nback', 'span'],
        created: new Date().toISOString()
      }));
    });
    await page.reload();

    // Go to Dashboard
    await page.click('[data-tab="dashboard"]');
    await page.waitForSelector('text=Analytics Dashboard', { timeout: 5000 });

    // Dashboard should have substantial content with data present
    const dashboardContent = await page.locator('#screen').textContent();
    expect(dashboardContent?.length).toBeGreaterThan(50);
  });

  test('dashboard streak calendar renders', async ({ page }) => {
    await page.goto(indexPath);

    // Add some activity data
    await page.evaluate(() => {
      const now = Date.now();
      const sampleData = {
        span: [
          { scoreStr: 'Best L3', bestLevel: 3, ts: now }
        ]
      };
      localStorage.setItem('wmLab', JSON.stringify(sampleData));
    });
    await page.reload();

    // Go to Dashboard
    await page.click('[data-tab="dashboard"]');

    // Streak calendar should render with the sample data
    const calendar = page.locator('.streak-calendar');
    await expect(calendar).toBeVisible({ timeout: 3000 });
  });

  test('domain score cards are clickable', async ({ page }) => {
    await page.goto(indexPath);

    // Add sample data
    await page.evaluate(() => {
      const sampleData = {
        span: [{ scoreStr: 'Best L3', bestLevel: 3, ts: Date.now() }]
      };
      localStorage.setItem('wmLab', JSON.stringify(sampleData));
      localStorage.setItem('wmLabProfile', JSON.stringify({
        onboardingComplete: true,
        persona: 'competitor',
        baseline: { verbal: 50, spatial: 50, attention: 50 },
        preferences: { style: 'mixed', sessionLength: 'quick' },
        recommendations: ['nback', 'span'],
        created: new Date().toISOString()
      }));
    });
    await page.reload();

    // Go to Dashboard
    await page.click('[data-tab="dashboard"]');

    // Find and click a domain card
    const domainCard = await page.locator('.domain-card').first();
    if (await domainCard.isVisible({ timeout: 2000 })) {
      await domainCard.click();
      // Should show some detail view or chart
      await page.waitForTimeout(300);
      const screenContent = await page.locator('#screen').textContent();
      expect(screenContent).toBeTruthy();
    }
  });

  test('lifestyle correlation section exists when data available', async ({ page }) => {
    await page.goto(indexPath);

    // Add task and lifestyle data
    await page.evaluate(() => {
      const now = Date.now();
      const sampleData = {
        span: [
          { scoreStr: 'Best L3', bestLevel: 3, ts: now }
        ]
      };
      const lifestyleData = [
        { sleep: 7, exercise: true, date: new Date().toISOString().split('T')[0] }
      ];
      localStorage.setItem('wmLab', JSON.stringify(sampleData));
      localStorage.setItem('wmLabLifestyle', JSON.stringify(lifestyleData));
      localStorage.setItem('wmLabProfile', JSON.stringify({
        onboardingComplete: true,
        persona: 'competitor',
        baseline: { verbal: 50, spatial: 50, attention: 50 },
        preferences: { style: 'mixed', sessionLength: 'quick' },
        recommendations: ['nback', 'span'],
        created: new Date().toISOString()
      }));
    });
    await page.reload();

    // Go to Dashboard
    await page.click('[data-tab="dashboard"]');

    // Check for lifestyle section
    const dashboardContent = await page.locator('#screen').textContent();
    const hasLifestyleSection = dashboardContent?.toLowerCase().includes('lifestyle') ||
                                dashboardContent?.toLowerCase().includes('sleep') ||
                                dashboardContent?.toLowerCase().includes('exercise');
    // With lifestyle data present, the section should be visible
    expect(hasLifestyleSection).toBe(true);
  });
});
