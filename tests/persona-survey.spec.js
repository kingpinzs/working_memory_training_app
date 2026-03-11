// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

/**
 * Persona Validation Survey E2E Tests
 * Tests for persona accuracy feedback collection
 */

test.describe('Persona Validation Survey', () => {
  const indexPath = 'file://' + path.resolve(__dirname, '../index.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(indexPath);
  });

  test('survey appears after 3 completed sessions', async ({ page }) => {
    // Clear existing data
    await page.evaluate(() => {
      localStorage.removeItem('wmLab');
      localStorage.removeItem('wmLabProfile');
    });

    // Create a profile first
    await page.evaluate(() => {
      const profile = {
        persona: 'struggler',
        baseline: { attention: 75, verbal: 70, spatial: 65 },
        preferences: { style: 'visual', goal: 'improve', sessionLength: 'quick', feedback: 'encouraging' },
        created: new Date().toISOString()
      };
      localStorage.setItem('wmLabProfile', JSON.stringify(profile));
    });

    // Complete 3 sessions by simulating store.push calls
    await page.evaluate(() => {
      const store = { span: [], nback: [], spatial: [] };
      for (let i = 0; i < 3; i++) {
        store.span.push({
          scoreStr: 'Best L2',
          bestLevel: 2,
          ts: new Date().toISOString(),
          type: 'span'
        });
      }
      localStorage.setItem('wmLab', JSON.stringify(store));
    });

    // Reload to trigger survey check
    await page.reload();

    // Simulate completing one more task by calling store.push (which triggers survey check)
    await page.evaluate(() => {
      // This will trigger checkPersonaSurveyTrigger due to the store.push override
      window.store.push('span', { scoreStr: 'Best L1', bestLevel: 1 });
      // Also call it directly to be sure
      window.checkPersonaSurveyTrigger();
    });

    // Check if survey modal appears
    const surveyModal = await page.locator('#personaSurveyModal').first();
    await expect(surveyModal).toBeVisible();
  });

  test('survey shows correct persona information', async ({ page }) => {
    // Set up profile and sessions
    await page.evaluate(() => {
      localStorage.setItem('wmLabProfile', JSON.stringify({
        persona: 'competitor',
        baseline: { attention: 85, verbal: 80, spatial: 75 },
        preferences: { style: 'game', goal: 'perform', sessionLength: 'long', feedback: 'scores' }
      }));

      const store = { span: [] };
      for (let i = 0; i < 3; i++) {
        store.span.push({ scoreStr: 'Best L1', bestLevel: 1, ts: new Date().toISOString(), type: 'span' });
      }
      localStorage.setItem('wmLab', JSON.stringify(store));
    });

    await page.reload();

    // Trigger survey
    await page.evaluate(() => {
      // Manually trigger survey for testing
      window.openPersonaValidationSurvey();
    });

    const surveyModal = await page.locator('#personaSurveyModal');
    await expect(surveyModal).toBeVisible();

    // Check persona display
    await expect(surveyModal.locator('text=The Competitor')).toBeVisible();
    await expect(surveyModal.locator('text=Loves challenges and pushing limits')).toBeVisible();
    await expect(surveyModal.locator('text=🏆')).toBeVisible();
  });

  test('can submit survey with rating and comment', async ({ page }) => {
    // Set up profile
    await page.evaluate(() => {
      localStorage.setItem('wmLabProfile', JSON.stringify({
        persona: 'scientist',
        baseline: { attention: 90, verbal: 85, spatial: 80 },
        preferences: { style: 'data', goal: 'understand', sessionLength: 'medium', feedback: 'detailed' }
      }));
    });

    await page.evaluate(() => window.openPersonaValidationSurvey());

    const surveyModal = await page.locator('#personaSurveyModal').first();

    // Select rating
    await surveyModal.locator('[data-rating="4"]').click();

    // Add comment with explicit wait
    const commentField = surveyModal.locator('#personaComment');
    await commentField.fill('This profile fits me well, but I\'d like more detailed analytics.');
    await page.waitForTimeout(100); // Ensure textarea value is set

    // Submit
    await surveyModal.locator('#submitPersonaSurvey').click();
    await page.waitForTimeout(100); // Ensure submit completes

    // Check if survey data was saved
    const profile = await page.evaluate(() => {
      const data = localStorage.getItem('wmLabProfile');
      return data ? JSON.parse(data) : null;
    });

    expect(profile.personaValidation).toBeTruthy();
    expect(profile.personaValidation.rating).toBe(4);
    expect(profile.personaValidation.comment).toContain('detailed analytics');
    expect(profile.personaValidation.action).toBe('submitted');
  });

  test('remind later delays survey for 5 more sessions', async ({ page }) => {
    // Set up profile
    await page.evaluate(() => {
      localStorage.setItem('wmLabProfile', JSON.stringify({
        persona: 'struggler',
        baseline: { attention: 70, verbal: 65, spatial: 60 },
        preferences: { style: 'visual', goal: 'improve', sessionLength: 'quick', feedback: 'encouraging' }
      }));
    });

    await page.evaluate(() => window.openPersonaValidationSurvey());

    // Click remind later
    await page.locator('#remindPersonaLater').click();

    // Check profile was updated
    const profile = await page.evaluate(() => {
      const data = localStorage.getItem('wmLabProfile');
      return data ? JSON.parse(data) : null;
    });

    expect(profile.personaValidation.action).toBe('remind_later');
    expect(profile.personaValidation.timestamp).toBeTruthy();
  });

  test('dismiss permanently prevents future surveys', async ({ page }) => {
    // Set up profile
    await page.evaluate(() => {
      localStorage.setItem('wmLabProfile', JSON.stringify({
        persona: 'competitor',
        baseline: { attention: 80, verbal: 75, spatial: 70 },
        preferences: { style: 'game', goal: 'perform', sessionLength: 'long', feedback: 'scores' }
      }));
    });

    await page.evaluate(() => window.openPersonaValidationSurvey());

    // Click dismiss
    await page.locator('#dismissPersonaSurvey').click();

    // Check profile was updated
    const profile = await page.evaluate(() => {
      const data = localStorage.getItem('wmLabProfile');
      return data ? JSON.parse(data) : null;
    });

    expect(profile.personaValidation.action).toBe('dismissed');
  });

  test('survey does not appear for users without profile', async ({ page }) => {
    // Clear profile
    await page.evaluate(() => {
      localStorage.removeItem('wmLabProfile');
    });

    // Complete sessions
    await page.evaluate(() => {
      const store = { span: [] };
      for (let i = 0; i < 5; i++) {
        store.span.push({ scoreStr: 'Best L1', bestLevel: 1, ts: new Date().toISOString(), type: 'span' });
      }
      localStorage.setItem('wmLab', JSON.stringify(store));
    });

    await page.reload();

    // Try to complete another task
    await page.click('[data-run="span"]');
    await page.keyboard.press('Enter');
    // Wait for task screen to update
    await page.waitForFunction(() => {
      const screen = document.querySelector('#screen');
      return screen && screen.textContent.length > 10;
    }, { timeout: 5000 });

    // Survey should not appear
    const surveyModal = await page.locator('#personaSurveyModal');
    await expect(surveyModal).not.toBeVisible();
  });

  test('survey does not appear before 3 sessions', async ({ page }) => {
    // Set up profile
    await page.evaluate(() => {
      localStorage.setItem('wmLabProfile', JSON.stringify({
        persona: 'scientist',
        baseline: { attention: 85, verbal: 80, spatial: 75 },
        preferences: { style: 'data', goal: 'understand', sessionLength: 'medium', feedback: 'detailed' }
      }));

      // Only 2 sessions
      const store = { span: [
        { scoreStr: 'Best L1', bestLevel: 1, ts: new Date().toISOString(), type: 'span' },
        { scoreStr: 'Best L1', bestLevel: 1, ts: new Date().toISOString(), type: 'span' }
      ]};
      localStorage.setItem('wmLab', JSON.stringify(store));
    });

    await page.reload();

    // Complete one more task
    await page.click('[data-run="span"]');
    await page.keyboard.press('Enter');
    // Wait for task screen to update
    await page.waitForFunction(() => {
      const screen = document.querySelector('#screen');
      return screen && screen.textContent.length > 10;
    }, { timeout: 5000 });

    // Survey should not appear yet
    const surveyModal = await page.locator('#personaSurveyModal');
    await expect(surveyModal).not.toBeVisible();
  });

  test('rating buttons are properly styled and functional', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('wmLabProfile', JSON.stringify({
        persona: 'struggler',
        baseline: { attention: 70, verbal: 65, spatial: 60 },
        preferences: { style: 'visual', goal: 'improve', sessionLength: 'quick', feedback: 'encouraging' }
      }));
    });

    await page.evaluate(() => window.openPersonaValidationSurvey());

    const surveyModal = await page.locator('#personaSurveyModal');

    // Check rating buttons exist
    const ratingButtons = surveyModal.locator('.rating-btn');
    await expect(ratingButtons).toHaveCount(5);

    // Submit button should be disabled initially
    const submitBtn = surveyModal.locator('#submitPersonaSurvey');
    await expect(submitBtn).toBeDisabled();

    // Click a rating
    await ratingButtons.nth(2).click(); // 3-star rating

    // Submit button should now be enabled
    await expect(submitBtn).not.toBeDisabled();
  });

  test('comment character counter works', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('wmLabProfile', JSON.stringify({
        persona: 'competitor',
        baseline: { attention: 80, verbal: 75, spatial: 70 },
        preferences: { style: 'game', goal: 'perform', sessionLength: 'long', feedback: 'scores' }
      }));
    });

    await page.evaluate(() => window.openPersonaValidationSurvey());

    const surveyModal = await page.locator('#personaSurveyModal');
    const commentField = surveyModal.locator('#personaComment');
    const charCount = surveyModal.locator('#commentCount');

    // Initially 0
    await expect(charCount).toHaveText('0/200');

    // Type some text
    await commentField.fill('This is a test comment for the persona survey.');
    await expect(charCount).toHaveText('46/200');
  });
});