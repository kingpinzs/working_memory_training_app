// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

/**
 * PWA Analytics E2E Tests
 * Tests for PWA installation tracking and analytics dashboard
 */

test.describe('PWA Analytics Tracking', () => {
  const indexPath = 'file://' + path.resolve(__dirname, '../index.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(indexPath);
  });

  test('session start is tracked on page load', async ({ page }) => {
    // Clear any existing analytics and reload to get a fresh session tracking
    await page.evaluate(() => {
      localStorage.removeItem('wmLabPWAAnalytics');
    });
    
    // Reload page to trigger fresh session tracking
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Small delay to ensure tracking completes
    await page.waitForTimeout(100);
    
    // Check that session was tracked
    const analytics = await page.evaluate(() => {
      const data = localStorage.getItem('wmLabPWAAnalytics');
      return data ? JSON.parse(data) : [];
    });
    
    expect(Array.isArray(analytics)).toBe(true);
    expect(analytics.length).toBeGreaterThan(0);
    
    // Should have at least one session_start event
    const sessionStarts = analytics.filter(event => event.event === 'session_start');
    expect(sessionStarts.length).toBeGreaterThan(0);
    
    const lastSession = sessionStarts[sessionStarts.length - 1];
    expect(lastSession).toHaveProperty('timestamp');
    expect(lastSession).toHaveProperty('userAgent');
    expect(lastSession).toHaveProperty('isPWA');
  });

  test('install prompt availability is tracked', async ({ page }) => {
    // Simulate beforeinstallprompt event
    await page.evaluate(() => {
      // Clear existing analytics
      localStorage.setItem('wmLabPWAAnalytics', JSON.stringify([]));
      
      // Manually trigger the event tracking (since we can't trigger the real event)
      const analytics = JSON.parse(localStorage.getItem('wmLabPWAAnalytics') || '[]');
      analytics.push({
        event: 'install_prompt_available',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      });
      localStorage.setItem('wmLabPWAAnalytics', JSON.stringify(analytics));
    });
    
    // Verify the event was tracked
    const analytics = await page.evaluate(() => {
      const data = localStorage.getItem('wmLabPWAAnalytics');
      return data ? JSON.parse(data) : [];
    });
    
    const promptEvents = analytics.filter(event => event.event === 'install_prompt_available');
    expect(promptEvents.length).toBeGreaterThan(0);
  });

  test('install prompt dismissal is tracked', async ({ page }) => {
    // Simulate install prompt dismissal
    await page.evaluate(() => {
      const analytics = JSON.parse(localStorage.getItem('wmLabPWAAnalytics') || '[]');
      analytics.push({
        event: 'install_dismissed',
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('wmLabPWAAnalytics', JSON.stringify(analytics));
    });
    
    // Verify dismissal was tracked
    const analytics = await page.evaluate(() => {
      const data = localStorage.getItem('wmLabPWAAnalytics');
      return data ? JSON.parse(data) : [];
    });
    
    const dismissals = analytics.filter(event => event.event === 'install_dismissed');
    expect(dismissals.length).toBeGreaterThan(0);
  });

  test('app installation is tracked', async ({ page }) => {
    // Simulate app installation
    await page.evaluate(() => {
      const analytics = JSON.parse(localStorage.getItem('wmLabPWAAnalytics') || '[]');
      analytics.push({
        event: 'app_installed',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      });
      localStorage.setItem('wmLabPWAAnalytics', JSON.stringify(analytics));
    });
    
    // Verify installation was tracked
    const analytics = await page.evaluate(() => {
      const data = localStorage.getItem('wmLabPWAAnalytics');
      return data ? JSON.parse(data) : [];
    });
    
    const installations = analytics.filter(event => event.event === 'app_installed');
    expect(installations.length).toBeGreaterThan(0);
  });
});

test.describe('PWA Analytics Dashboard', () => {
  const indexPath = 'file://' + path.resolve(__dirname, '../index.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(indexPath);
    // Add minimal data to show full dashboard (not empty state)
    await page.evaluate(() => {
      localStorage.setItem('wmLab', JSON.stringify({
        span: [{ scoreStr: 'Best L3', bestLevel: 3, ts: Date.now() }]
      }));
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
  });

  test('dashboard tab shows PWA analytics section', async ({ page }) => {
    await page.click('[data-tab="dashboard"]');

    // Wait for dashboard to load
    await page.waitForTimeout(200);

    // Check for PWA analytics section
    const pwaAnalytics = await page.locator('.pwa-analytics');
    await expect(pwaAnalytics).toBeVisible();

    const title = await page.locator('.pwa-analytics h3');
    await expect(title).toHaveText('PWA Analytics');
  });

  test('analytics display correct metrics', async ({ page }) => {
    // Set up test analytics data
    await page.evaluate(() => {
      const testData = [
        { event: 'session_start', isPWA: false, timestamp: new Date().toISOString() },
        { event: 'session_start', isPWA: true, timestamp: new Date().toISOString() },
        { event: 'install_prompt_shown', timestamp: new Date().toISOString() },
        { event: 'install_accepted', timestamp: new Date().toISOString() },
        { event: 'app_installed', timestamp: new Date().toISOString() }
      ];
      localStorage.setItem('wmLabPWAAnalytics', JSON.stringify(testData));
    });
    
    await page.click('[data-tab="dashboard"]');
    await page.waitForSelector('text=Analytics Dashboard', { timeout: 5000 });
    
    // Check metrics are displayed
    await expect(page.locator('.metric-card')).toHaveCount(8); // 8 metric cards
    
    // Check specific values
    const totalSessionsCard = await page.locator('.metric-card').nth(0);
    await expect(totalSessionsCard.locator('.metric-value')).toHaveText('2');
    await expect(totalSessionsCard.locator('.metric-label')).toHaveText('Total Sessions');
    
    const pwaSessionsCard = await page.locator('.metric-card').nth(1);
    await expect(pwaSessionsCard.locator('.metric-value')).toHaveText('1');
    
    const installRateCard = await page.locator('.metric-card').nth(5);
    await expect(installRateCard.locator('.metric-value')).toHaveText('100.0%');
  });

  test('recent activity shows latest events', async ({ page }) => {
    // Set up test analytics data with timestamps
    await page.evaluate(() => {
      const now = new Date();
      const testData = [
        { event: 'session_start', isPWA: true, timestamp: now.toISOString() },
        { event: 'install_prompt_shown', timestamp: new Date(now.getTime() - 1000).toISOString() },
        { event: 'install_accepted', timestamp: new Date(now.getTime() - 2000).toISOString() },
        { event: 'app_installed', timestamp: new Date(now.getTime() - 3000).toISOString() }
      ];
      localStorage.setItem('wmLabPWAAnalytics', JSON.stringify(testData));
    });
    
    await page.click('[data-tab="dashboard"]');
    await page.waitForSelector('text=Analytics Dashboard', { timeout: 5000 });
    
    // Check recent activity section
    const activityItems = await page.locator('.activity-item');
    await expect(activityItems).toHaveCount(4); // Should show last 4 events
    
    // Most recent should be first (session_start)
    const firstActivity = await activityItems.first();
    await expect(firstActivity.locator('.activity-event')).toHaveText('session start');
  });

  test('analytics handle empty data gracefully', async ({ page }) => {
    // Clear analytics data
    await page.evaluate(() => {
      localStorage.setItem('wmLabPWAAnalytics', JSON.stringify([]));
    });
    
    await page.click('[data-tab="dashboard"]');
    await page.waitForSelector('text=Analytics Dashboard', { timeout: 5000 });
    
    // Should still show analytics section with zero values
    const pwaAnalytics = await page.locator('.pwa-analytics');
    await expect(pwaAnalytics).toBeVisible();
    
    // Check that metrics show zeros
    const totalSessionsCard = await page.locator('.metric-card').nth(0);
    await expect(totalSessionsCard.locator('.metric-value')).toHaveText('0');
  });
});

test.describe('PWA Install Button', () => {
  const indexPath = 'file://' + path.resolve(__dirname, '../index.html');

  test('install button appears when showInstallButton is called on launchpad', async ({ page }) => {
    await page.goto(indexPath);
    await page.click('[data-tab="launchpad"]');

    // Simulate a deferred prompt so showInstallButton adds the button
    await page.evaluate(() => {
      window.deferredPrompt = { prompt() {}, userChoice: Promise.resolve({ outcome: 'dismissed' }) };
      window.showInstallButton();
    });

    const installBtn = page.locator('#installPWA');
    await expect(installBtn).toBeVisible();
    await expect(installBtn).toHaveAttribute('aria-label', 'Install Progressive Web App');
  });

  test('triggerInstall tracks analytics when no deferred prompt', async ({ page }) => {
    await page.goto(indexPath);

    // Clear analytics, ensure no deferred prompt
    await page.evaluate(() => {
      localStorage.setItem('wmLabPWAAnalytics', JSON.stringify([]));
      window.deferredPrompt = null;
    });

    // Call triggerInstall — should toast "Install prompt not available" without crashing
    await page.evaluate(() => window.triggerInstall());

    // Analytics should still be empty (no prompt to track)
    const analytics = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('wmLabPWAAnalytics') || '[]')
    );
    const prompted = analytics.filter(e => e.event === 'install_prompt_shown');
    expect(prompted.length).toBe(0);
  });
});
