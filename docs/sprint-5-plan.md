# Sprint 5 Plan
**Project:** Working Memory Lab  
**Sprint:** Sprint 5 - Quality, Validation & User Feedback  
**Date Created:** 2025-11-11  
**Target Completion:** 2025-11-18 (1 week)  
**Status:** PLANNED

## Sprint Goal
Validate and harden Sprint 4's production-ready foundation through automated testing, user feedback mechanisms, and quality improvements. Focus on measuring impact, gathering user insights, and addressing technical debt before building new features.

**Theme:** "Measure, Validate, Improve"

---

## Sprint Priorities

### Why Sprint 5 Focuses on Quality over Features

After Sprint 4's major feature additions (Discovery Quiz, PWA, Polish), Sprint 5 deliberately shifts focus to **validation and infrastructure**:

1. **Test Coverage:** No automated tests means regression risk as we build more features
2. **User Validation:** Persona algorithm is untested with real users
3. **Metrics Blindness:** We don't know if PWA installs are happening, or if personas are accurate
4. **Technical Debt:** Manual cache versioning, no schema migration strategy
5. **User Feedback Gap:** No way for users to report issues or suggest improvements

**Sprint 5 addresses these gaps before Sprint 6 adds new features.**

---

## Epics & Stories

### Epic 12: Automated Testing Infrastructure 🎯 **HIGH PRIORITY**
**Goal:** Prevent regressions and enable confident refactoring with end-to-end test coverage of critical user flows.

**Why This Matters:**
- Current state: 0% test coverage, all testing is manual
- Risk: Any code change could break Discovery Quiz, tasks, or PWA
- Blocker: Can't safely add new features without regression testing

**Success Metrics:**
- ✅ 80%+ coverage of critical paths (Discovery Quiz, 3 core tasks, PWA)
- ✅ Tests run in <2 minutes
- ✅ CI/CD pipeline catches breaking changes

---

#### Story 12.1: Playwright Test Setup ⚙️
**As a developer, I want a Playwright testing framework configured so I can write E2E tests.**

**Tasks:**
- [ ] Install Playwright (`npm init playwright@latest`)
- [ ] Configure `playwright.config.js` for file:// protocol (local HTML)
- [ ] Create `tests/` directory structure
- [ ] Add test scripts to `package.json`
- [ ] Document test running instructions in README

**Acceptance Criteria:**
- Playwright installed and configured
- Sample test runs successfully
- Tests executable via `npm test`

**Estimated Effort:** 1 hour

---

#### Story 12.2: Discovery Quiz E2E Tests 🧪
**As a developer, I want automated tests for the Discovery Quiz flow to prevent onboarding regressions.**

**Test Coverage:**
1. **Welcome Screen Flow**
   - Welcome screen displays correctly
   - "Get Started" button launches baseline assessment
   - "Try Quick Demo" button launches 30s demo
   - Demo completes and transitions to baseline

2. **Baseline Assessment Flow**
   - N-Back assessment (1-back, 10 trials)
   - Span assessment (2 levels)
   - Spatial assessment (1 level)
   - Baseline scores calculated correctly
   - Progress indicator shows current step

3. **Preference Quiz Flow**
   - 5 questions display in order
   - All answer options are clickable
   - "Next" button advances to next question
   - Final question transitions to profile summary

4. **Profile Generation**
   - Profile summary displays baseline scores
   - Persona badge matches expected persona
   - Recommendations list appears
   - "Start Training" button returns to launchpad
   - `wmLabProfile` stored in localStorage

5. **Persona Mapping Logic**
   - Struggler persona: visual + encouraging preferences
   - Scientist persona: data-driven + detailed feedback
   - Competitor persona: performance + long sessions
   - Coach Mode set correctly based on persona

**Acceptance Criteria:**
- All 5 quiz flows pass E2E tests
- Tests run in <30 seconds
- Tests validate localStorage state
- Tests handle async operations correctly

**Estimated Effort:** 4 hours

---

#### Story 12.3: Core Task E2E Tests 🧪
**As a developer, I want automated tests for WM Span, N-Back, and Spatial tasks to ensure assessment accuracy.**

**Test Coverage:**
1. **WM Span (Reverse)**
   - Task starts from launchpad button
   - Words display sequentially with correct timing
   - Input field accepts answer
   - Reverse order validation works correctly
   - Best level score saved to localStorage
   - Toast notification appears on completion

2. **N-Back (Emotion)**
   - 1-back and 2-back blocks execute
   - Spacebar response registers correctly
   - Match detection works (true positives)
   - Non-match detection works (false alarms)
   - Score calculation is accurate (hits/misses/FA)
   - Coach Mode adaptive logic triggers correctly

3. **Spatial + Verbal Binding**
   - Triangle positions randomize
   - User clicks register correctly
   - Verbal check (picture initial) validates
   - Position recall validates correctly
   - Coach Mode requires perfection on both
   - Score saved with cleared/total format

**Acceptance Criteria:**
- 3 core tasks have full E2E coverage
- Tests validate score accuracy
- Tests validate Coach Mode adaptations
- Tests handle timing/async correctly

**Estimated Effort:** 5 hours

---

#### Story 12.4: PWA Installation Flow Tests 🧪
**As a developer, I want automated tests for PWA installation to ensure offline functionality.**

**Test Coverage:**
1. **Service Worker Registration**
   - Service worker registers on page load
   - Registration logs to console
   - Offline mode works (cache-first strategy)

2. **Install Prompt Logic**
   - Banner doesn't show for new users (<3 sessions)
   - Banner shows for engaged users (3+ sessions)
   - Dismissed banner tracked in localStorage
   - Banner respects dismissal for 24 hours

3. **Manifest Validation**
   - Manifest link exists in HTML
   - Manifest.json loads successfully
   - Icons paths are correct
   - Theme color applies

**Note:** Full PWA installation testing requires HTTPS server (defer to manual testing)

**Acceptance Criteria:**
- Service worker registration tested
- Install prompt timing logic tested
- Dismissal tracking tested
- Manifest loading tested

**Estimated Effort:** 2 hours

---

#### Story 12.5: CI/CD Pipeline Setup (Optional) ⚙️
**As a developer, I want tests to run automatically on commits to catch regressions early.**

**Tasks:**
- [ ] Create `.github/workflows/test.yml`
- [ ] Configure GitHub Actions to run Playwright tests
- [ ] Add status badge to README
- [ ] Configure to run on PR + main branch commits

**Acceptance Criteria:**
- Tests run on every commit to staging/main
- Failed tests block PR merge
- Status badge shows pass/fail state

**Estimated Effort:** 2 hours

**Decision Point:** Implement if time allows, otherwise defer to Sprint 6

---

### Epic 13: User Feedback & Metrics 📊 **HIGH PRIORITY**
**Goal:** Gather quantitative and qualitative feedback to validate Sprint 4 features and guide future development.

**Why This Matters:**
- We built personalization but don't know if personas are accurate
- We built PWA but don't know if users install it
- We built accessibility but don't know if it's helping
- We have no way for users to report bugs or request features

**Success Metrics:**
- ✅ Feedback mechanism implemented with <5% friction
- ✅ PWA install rate measured (target: 15%+ of engaged users)
- ✅ Persona accuracy validated with 5+ users
- ✅ At least 3 actionable insights gathered

---

#### Story 13.1: In-App Feedback Modal 💬
**As a user, I want to easily provide feedback on my experience so the app can improve.**

**Features:**
- Feedback button in header (emoji icon: 💬 or 📣)
- Modal with simple form:
  - **Type:** Bug Report / Feature Request / General Feedback
  - **Message:** Textarea (max 500 chars)
  - **Optional Email:** For follow-up (not required)
  - **Include Debug Info:** Checkbox (profile persona, browser, localStorage size)
- Submit button copies to clipboard as formatted text
- Confirmation toast with GitHub Issues link

**User Flow:**
1. User clicks "Feedback" button in header
2. Modal opens with form
3. User selects type, enters message
4. User clicks "Submit"
5. Formatted feedback copied to clipboard
6. Toast: "Feedback copied! Please paste in GitHub Issues: [link]"

**Why Clipboard Instead of Direct Submit:**
- No backend required (stays true to client-side architecture)
- User has full control over what's shared
- GitHub Issues provides public tracking + discussion
- Low friction (one paste action)

**Acceptance Criteria:**
- Feedback button accessible from all tabs
- Modal has clean, friendly UI
- Clipboard copy works in all browsers
- Debug info includes: persona, browser, localStorage usage, app version
- Link opens GitHub Issues in new tab

**Estimated Effort:** 3 hours

---

#### Story 13.2: PWA Installation Analytics 📈
**As a developer, I want to track PWA install/dismiss rates to measure adoption.**

**Metrics to Track:**
1. **Install Prompt Shown:** Count when banner displays
2. **Install Accepted:** Count when user clicks "Install App"
3. **Install Dismissed:** Count when user clicks "×" or "Maybe Later"
4. **Install Outcome:** Browser's `userChoice` result (accepted/dismissed)
5. **Running as PWA:** Count sessions launched as installed app

**Storage:**
- Store in `wmLabPWA` localStorage (already exists)
- Add fields: `promptShownCount`, `installAcceptedCount`, `installDismissedCount`
- Track in array for time-series: `events: [{type, timestamp}]`

**Display:**
- Add "PWA Stats" section to Dashboard tab
- Show: Install rate, dismissal rate, PWA session count
- Chart: Installs over time (if enough data points)

**Acceptance Criteria:**
- All 5 metrics tracked in localStorage
- Metrics survive page reloads
- Dashboard displays PWA stats
- No PII (Personally Identifiable Information) collected

**Estimated Effort:** 2 hours

---

#### Story 13.3: Persona Validation Survey 📋
**As a product manager, I want to validate persona accuracy with real users to improve the algorithm.**

**Implementation:**
- After 3 completed sessions (engaged users), show one-time survey
- Modal with simple question: "Does your profile feel accurate?"
  - **Your Persona:** [Display current persona with description]
  - **Rating:** 5-star scale (⭐⭐⭐⭐⭐)
  - **Comment (optional):** "What would you change?"
- Store response in `wmLabProfile.personaValidation`
- "Remind Me Later" button (re-prompts after 5 more sessions)
- "Don't Ask Again" option

**Survey Display Logic:**
```javascript
function shouldShowPersonaSurvey() {
  const profile = profileStore.get();
  const totalSessions = Object.values(store.get()).flat().length;
  
  // Show if:
  // - Has profile
  // - 3+ sessions completed
  // - Hasn't already responded
  // - Hasn't dismissed recently
  return profile && 
         totalSessions >= 3 && 
         !profile.personaValidation &&
         !wasPersonaSurveyDismissedRecently();
}
```

**Data Collection:**
- Store locally (no server needed)
- Export with CSV for manual analysis
- Aggregate stats shown in Dashboard (if 5+ responses)

**Acceptance Criteria:**
- Survey shows after 3 sessions (one-time)
- Rating + comment stored in profile
- "Remind Later" delays by 5 sessions
- "Don't Ask" permanently disables
- Export includes persona validation data

**Estimated Effort:** 2 hours

---

#### Story 13.4: Usage Analytics Dashboard 📊
**As a user, I want to see my app usage stats to understand my training habits.**

**Metrics to Display:**
1. **Total Sessions:** Count of all task completions
2. **Total Time Trained:** Sum of estimated session durations
3. **Favorite Task:** Most frequently completed task
4. **Current Streak:** Days with at least 1 session
5. **Longest Streak:** Historical max streak
6. **This Week:** Session count for last 7 days
7. **Tasks Completed:** Breakdown by task type (pie chart or bars)

**UI Design:**
- New section in Dashboard tab: "Usage Stats"
- Grid of stat cards (similar to domain scores)
- Simple bar chart for tasks completed
- Streak calendar already exists (enhance with usage overlays)

**Acceptance Criteria:**
- All 7 metrics calculated correctly
- Stats update in real-time after task completion
- Visual charts render correctly
- No performance impact (use cached dashboard data)

**Estimated Effort:** 3 hours

---

### Epic 14: Quality Improvements & UX Polish 🎨 **MEDIUM PRIORITY**
**Goal:** Address Sprint 4 retrospective feedback and technical debt items.

**Why This Matters:**
- Pagination needs "Show All" option for power users
- Icons are functional but not professional
- Cache versioning is manual and error-prone
- Profile schema has no migration strategy

**Success Metrics:**
- ✅ 3+ retrospective items addressed
- ✅ Technical debt reduced by 20%
- ✅ User-reported issues: 0

---

#### Story 14.1: "Show All" Toggle for Scores 🔄
**As a power user, I want to see my complete score history without pagination.**

**Implementation:**
- Add toggle above scoreboard: "Show All" / "Show Recent (10)"
- Default: Show Recent (paginated)
- Toggle state saved in `wmLabPrefs.showAllScores`
- When "Show All" enabled:
  - Render all scores (no pagination)
  - Add "Scroll to Top" button (appears after scrolling down)
  - Performance warning if >100 scores: "Showing all X scores (may be slow)"

**Acceptance Criteria:**
- Toggle button accessible and clearly labeled
- State persists across sessions
- "Show All" renders complete history
- Performance acceptable up to 200 scores
- Scroll to top button appears/disappears correctly

**Estimated Effort:** 2 hours

---

#### Story 14.2: Professional App Icon Design 🎨
**As a user, I want the app icon to look professional and recognizable.**

**Options:**
1. **Use icon generation tool** (Favicon Generator, RealFaviconGenerator)
2. **Commission designer** on Fiverr (~$25, 2-day turnaround)
3. **Use stock icon** from IconScout/Flaticon (free for personal use)

**Requirements:**
- Brain/neuron theme (cognitive training)
- Works at 192x192 and 512x512
- Matches app color scheme (dark blue + cyan)
- Recognizable at small sizes (home screen icon)
- Maskable version for Android adaptive icons

**Deliverables:**
- PNG icons: 192x192, 512x512
- Optional: 16x16, 32x32, 180x180 (iOS)
- Replace current SVG icons
- Update manifest.json

**Acceptance Criteria:**
- Icons look professional and on-brand
- Display correctly in PWA install prompt
- Work on iOS and Android home screens
- Maskable version tested on Android

**Estimated Effort:** 3 hours (including tool learning/designer coordination)

**Budget:** $0-25 depending on approach

---

#### Story 14.3: Service Worker Auto-Versioning 🔧
**As a developer, I want cache versioning to update automatically to avoid manual errors.**

**Current Problem:**
```javascript
const CACHE_NAME = 'wm-lab-v1'; // Manual versioning - easy to forget
```

**Solution:**
Generate cache name from content hash or build timestamp

**Implementation:**
```javascript
// In sw.js
const VERSION = '{{BUILD_HASH}}'; // Replaced at build time
const CACHE_NAME = `wm-lab-${VERSION}`;

// OR for no-build approach:
const CACHE_NAME = `wm-lab-${self.registration.scope.split('/').pop()}`;

// OR timestamp-based:
const CACHE_NAME = 'wm-lab-20251111-1430'; // YYYYMMDD-HHMM
```

**Best for No-Build Project:**
Use timestamp in comment + manual update reminder
```javascript
// Update CACHE_VERSION when deploying changes!
// Last updated: 2025-11-11 14:30
const CACHE_VERSION = '20251111-1430';
const CACHE_NAME = `wm-lab-${CACHE_VERSION}`;
```

**Acceptance Criteria:**
- Cache version updates reliably
- Old caches cleaned up correctly
- Documentation explains versioning strategy
- Developer checklist includes cache version update

**Estimated Effort:** 1 hour

---

#### Story 14.4: Profile Schema Versioning 🗄️
**As a developer, I want profile data to migrate automatically when schema changes.**

**Current Problem:**
- `wmLabProfile` has no version field
- Adding new fields breaks old profiles
- No migration strategy for schema changes

**Solution:**
Add version field + migration system

**Implementation:**
```javascript
// Profile schema v2
const PROFILE_VERSION = 2;

function migrateProfile(profile) {
  if (!profile) return null;
  
  // No version = v1
  const version = profile.version || 1;
  
  if (version < 2) {
    // Migrate v1 -> v2: Add new fields
    profile.version = 2;
    profile.settings = profile.settings || {};
    profile.feedback = profile.feedback || null;
  }
  
  // Future migrations here
  // if (version < 3) { ... }
  
  return profile;
}

// Use in Store.get()
Store.prototype.get = function() {
  const data = JSON.parse(localStorage.getItem(this.key) || 'null');
  if (this.key === 'wmLabProfile') {
    return migrateProfile(data);
  }
  return data;
};
```

**Acceptance Criteria:**
- Current profiles gain version: 2
- Migration runs automatically on get()
- Multiple migrations can chain (v1→v2→v3)
- No data loss during migration
- Console logs migration events

**Estimated Effort:** 2 hours

---

#### Story 14.5: Keyboard Shortcut for Feedback (Optional) ⌨️
**As a keyboard user, I want a quick shortcut to open feedback modal.**

**Implementation:**
- Add `Ctrl+/` or `Cmd+/` shortcut (common for help/feedback)
- Display in keyboard shortcuts modal (Shift+?)
- Focus on feedback textarea when opened via keyboard

**Acceptance Criteria:**
- Shortcut works on Mac (Cmd) and Windows (Ctrl)
- Listed in keyboard shortcuts help
- Focus management works correctly

**Estimated Effort:** 30 minutes

---

### Epic 15: Documentation & Developer Experience 📚 **LOW PRIORITY**
**Goal:** Make the project easier for new developers to understand and contribute to.

**Why This Matters:**
- No README with setup instructions
- No contribution guidelines
- Test documentation missing
- Architecture not documented

**Success Metrics:**
- ✅ README created with setup + testing instructions
- ✅ Architecture diagram added
- ✅ Contributing guide created

---

#### Story 15.1: Project README 📄
**As a new developer, I want a README that explains how to set up and run the project.**

**Sections:**
1. **Project Overview:** What is Working Memory Lab?
2. **Features:** List of core capabilities
3. **Tech Stack:** Vanilla JS, localStorage, PWA, no build tools
4. **Getting Started:**
   - Clone repo
   - Open `index.html` in browser (file:// protocol works)
   - Optional: Run local server for PWA testing
5. **Testing:**
   - Install Playwright: `npm install`
   - Run tests: `npm test`
6. **Project Structure:** Explain version files pattern
7. **Data Storage:** localStorage keys and schema
8. **Contributing:** Link to CONTRIBUTING.md
9. **License:** MIT or other

**Acceptance Criteria:**
- README.md created in root
- All sections complete
- Code examples for common tasks
- Screenshots of app interface

**Estimated Effort:** 2 hours

---

#### Story 15.2: Architecture Diagram 🏗️
**As a developer, I want a visual diagram showing how the app components interact.**

**Diagram Elements:**
- HTML structure (header, main, aside)
- Tab navigation system
- Task execution flow (async functions)
- Data persistence (Store, localStorage)
- PWA components (manifest, service worker)
- Discovery Quiz flow

**Format:** Mermaid diagram in markdown (renders on GitHub)

**Acceptance Criteria:**
- Diagram shows major components
- Data flow indicated with arrows
- User interaction paths visible
- Embedded in docs/ folder

**Estimated Effort:** 2 hours

---

#### Story 15.3: Contributing Guide 🤝
**As a contributor, I want guidelines on how to add features and submit PRs.**

**Sections:**
1. **Code Style:** Vanilla JS conventions, naming patterns
2. **Adding a Task:** Step-by-step guide
3. **Testing:** How to write Playwright tests
4. **Commit Messages:** Follow conventional commits
5. **PR Process:** Staging → main workflow
6. **localStorage Schema:** How to add new keys safely

**Acceptance Criteria:**
- CONTRIBUTING.md created
- Linked from README
- Examples provided for common contributions

**Estimated Effort:** 1 hour

---

## Sprint 5 Summary

### Scope Overview
**Total Stories:** 15 stories across 4 epics  
**Estimated Effort:** ~40 hours (1 week full-time or 2 weeks part-time)

### Epic Breakdown
| Epic | Stories | Priority | Effort |
|------|---------|----------|--------|
| Epic 12: Automated Testing | 5 stories | HIGH | ~14 hours |
| Epic 13: User Feedback & Metrics | 4 stories | HIGH | ~10 hours |
| Epic 14: Quality Improvements | 5 stories | MEDIUM | ~11 hours |
| Epic 15: Documentation | 3 stories | LOW | ~5 hours |

### Prioritization Strategy

**Week 1 Focus (High Priority):**
1. ✅ Story 12.1-12.4: Automated tests (critical for confidence)
2. ✅ Story 13.1-13.2: Feedback modal + PWA analytics (user insights)
3. ✅ Story 14.1: "Show All" toggle (quick win, user-requested)

**If Time Allows (Medium Priority):**
4. ⏳ Story 13.3-13.4: Persona survey + usage analytics
5. ⏳ Story 14.2-14.4: Icon design, cache versioning, schema migration

**Defer if Needed (Low Priority):**
6. ⏸️ Story 12.5: CI/CD pipeline (defer to Sprint 6)
7. ⏸️ Story 15.1-15.3: Documentation (defer to Sprint 6)

### Success Criteria
Sprint 5 is successful if:
- ✅ **80%+ test coverage** on critical paths (Discovery Quiz + 3 tasks)
- ✅ **Feedback mechanism** live and accessible
- ✅ **PWA install metrics** being tracked
- ✅ **3+ retrospective items** addressed
- ✅ **0 regressions** from Sprint 4

### Definition of Done
A story is "done" when:
- [ ] Code implemented and committed
- [ ] Tests written and passing (where applicable)
- [ ] Manual testing completed
- [ ] No errors in browser console
- [ ] Documentation updated (if needed)
- [ ] Reviewed for accessibility
- [ ] Works offline (if PWA-related)

---

## Technical Approach

### Testing Strategy

**Playwright Configuration:**
```javascript
// playwright.config.js
module.exports = {
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'file://' + __dirname,
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } }
  ]
};
```

**Example Test:**
```javascript
// tests/discovery-quiz.spec.js
const { test, expect } = require('@playwright/test');

test('Discovery Quiz completes successfully', async ({ page }) => {
  await page.goto('file://' + __dirname + '/../index.html');
  
  // Click Launchpad tab
  await page.click('[data-tab="launchpad"]');
  
  // Check if profile exists, if so retake quiz
  const profile = await page.evaluate(() => {
    return localStorage.getItem('wmLabProfile');
  });
  
  if (profile) {
    await page.click('text=Retake Quiz');
  } else {
    // First time user - click Get Started
    await page.click('text=Get Started');
  }
  
  // Complete baseline assessment
  // ... test implementation
  
  // Verify profile created
  const newProfile = await page.evaluate(() => {
    return JSON.parse(localStorage.getItem('wmLabProfile'));
  });
  
  expect(newProfile).toBeTruthy();
  expect(newProfile.persona).toBeTruthy();
  expect(newProfile.baseline).toBeTruthy();
});
```

### Feedback Modal Design

**UI Mockup:**
```
┌─────────────────────────────────────┐
│  💬 Share Your Feedback            │
├─────────────────────────────────────┤
│                                     │
│  What type of feedback?             │
│  ○ Bug Report                       │
│  ○ Feature Request                  │
│  ○ General Feedback                 │
│                                     │
│  Tell us more:                      │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │                             │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│  (Max 500 characters)               │
│                                     │
│  📧 Email (optional):               │
│  [                            ]     │
│                                     │
│  ☑ Include debug info               │
│                                     │
│  [Cancel]  [Copy & Submit]          │
└─────────────────────────────────────┘
```

**Formatted Output:**
```
## Feedback Type: Feature Request

**Message:**
It would be great to have a dark mode toggle. The app is beautiful but a bit bright for night training sessions.

**Email:** user@example.com (optional)

**Debug Info:**
- Persona: Scientist
- Browser: Chrome 119
- localStorage: 45KB / 5MB
- App Version: Sprint 4
- Profile Created: 2025-11-10
- Total Sessions: 12
```

### PWA Analytics Schema

```javascript
// wmLabPWA localStorage structure
{
  installed: false,
  dismissed: false,
  lastDismissed: "2025-11-11T14:30:00Z",
  
  // New analytics fields
  metrics: {
    promptShownCount: 3,
    installAcceptedCount: 0,
    installDismissedCount: 2,
    pwaSessionCount: 0
  },
  
  events: [
    { type: 'prompt_shown', ts: '2025-11-10T10:00:00Z' },
    { type: 'install_dismissed', ts: '2025-11-10T10:00:30Z' },
    { type: 'prompt_shown', ts: '2025-11-11T09:00:00Z' },
    { type: 'install_accepted', ts: '2025-11-11T09:01:00Z' }
  ]
}
```

---

## Risk Assessment

### High Risk Items
1. **Playwright Setup Complexity**
   - Risk: File:// protocol testing may have limitations
   - Mitigation: Test with local server fallback, document workarounds
   - Contingency: Use Selenium if Playwright doesn't work

2. **Test Flakiness**
   - Risk: Timing-dependent tests may fail intermittently
   - Mitigation: Use Playwright's auto-waiting, add explicit waits where needed
   - Contingency: Increase timeouts, add retry logic

### Medium Risk Items
3. **Icon Design Budget**
   - Risk: Professional design may exceed budget
   - Mitigation: Try free tools first, only hire if needed
   - Contingency: Use enhanced SVG emoji (better than current)

4. **User Feedback Volume**
   - Risk: May get too much or too little feedback
   - Mitigation: Set expectations ("We read every submission")
   - Contingency: Adjust feedback button visibility based on volume

### Low Risk Items
5. **Cache Versioning Migration**
   - Risk: Old caches may not clear correctly
   - Mitigation: Test with multiple cache versions
   - Contingency: Add manual "Clear Cache" button in settings

---

## Dependencies & Blockers

### External Dependencies
- **Playwright:** npm package (free, open source)
- **GitHub Issues:** For feedback tracking (already have repo)
- **Icon Designer (optional):** Fiverr or similar (~$25, 2-day wait)

### Internal Dependencies
- Sprint 4 code must be stable (all commits clean)
- No major architectural changes during Sprint 5
- User testing requires real users (may need to recruit testers)

### Potential Blockers
- **Testing:** File:// protocol limitations with Playwright
  - Mitigation: Set up local HTTP server for testing
- **User Recruitment:** May not have 5 users for persona validation
  - Mitigation: Start with 1-2 users, expand later
- **Time Constraints:** 40 hours may be ambitious for 1 week
  - Mitigation: Prioritize High items, defer Low items

---

## Validation & Acceptance

### Sprint 5 is Complete When:
- [ ] 80%+ test coverage on critical paths
- [ ] All tests pass in Chrome and Firefox
- [ ] Feedback modal implemented and tested
- [ ] PWA install metrics tracked
- [ ] Persona validation survey ready
- [ ] "Show All" scores toggle working
- [ ] 0 regressions from Sprint 4 features
- [ ] All High Priority stories complete
- [ ] Sprint 5 retrospective created

### Quality Gates
- **Code Quality:** No console errors, no lint errors
- **Performance:** No slowdown vs Sprint 4 baseline
- **Accessibility:** Maintain WCAG AA compliance
- **Browser Support:** Chrome, Firefox, Safari (latest versions)
- **Offline:** All functionality works without network

---

## Post-Sprint Activities

### Sprint 5 Retrospective Topics
1. Test coverage: Did we hit 80%? What gaps remain?
2. User feedback: What insights did we gather?
3. Persona validation: Are personas accurate?
4. PWA metrics: What's the install rate?
5. Process: Did testing infrastructure slow us down or speed us up?

### Sprint 6 Planning Inputs
- User feedback themes (top 3 feature requests)
- Test coverage gaps (which flows need tests?)
- Persona accuracy (do we need to revise algorithm?)
- PWA adoption (should we prioritize mobile UX?)
- Technical debt remaining (what's still blocking us?)

---

## Appendix: Quick Reference

### Key Files to Modify
- `index.html`: Feedback modal, PWA analytics, "Show All" toggle
- `sw.js`: Cache versioning update
- `manifest.json`: Icon paths (if redesigning icons)
- `tests/`: All new test files
- `package.json`: Playwright dependencies + test scripts
- `README.md`: Project documentation

### localStorage Keys Used
- `wmLabProfile`: User profile (add `personaValidation`, `version`)
- `wmLabPrefs`: User preferences (add `showAllScores`)
- `wmLabPWA`: PWA state (add `metrics`, `events`)
- `wmLab`: Score data (no changes planned)

### New Functions to Add
- `showFeedbackModal()`: Display feedback form
- `trackPWAEvent(type)`: Log PWA analytics events
- `showPersonaSurvey()`: Persona validation modal
- `migrateProfile(profile)`: Schema migration
- `renderUsageStats()`: Dashboard analytics

### Test Files to Create
- `tests/discovery-quiz.spec.js`: Onboarding flow tests
- `tests/wm-span.spec.js`: WM Span task tests
- `tests/n-back.spec.js`: N-Back task tests
- `tests/spatial.spec.js`: Spatial binding tests
- `tests/pwa.spec.js`: PWA functionality tests

---

## Conclusion

Sprint 5 shifts focus from **building features** to **validating and hardening** what we built in Sprint 4. By investing in automated testing, user feedback mechanisms, and quality improvements, we create a solid foundation for future feature development.

**The payoff:**
- Confidence to refactor and add features without breaking existing functionality
- Direct user insights to guide Sprint 6+ priorities
- Reduced technical debt and maintenance burden
- Improved developer experience for contributors

**After Sprint 5, we'll know:**
- ✅ If personas are accurate (user validation)
- ✅ If users are installing the PWA (metrics)
- ✅ What features users want most (feedback)
- ✅ That our tests catch regressions (coverage)

**Sprint 5 Status:** 📋 **PLANNED** - Ready to begin!
