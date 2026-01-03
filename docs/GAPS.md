# GAPS.md - Gaps and Priorities

**Date:** January 2, 2026
**Purpose:** Missing features that would add real value, bugs to fix, polish items

---

## 1. Missing Features (Would Add Real Value)

### HIGH IMPACT

| Feature | Description | Value | Effort |
|---------|-------------|-------|--------|
| Dual N-Back | Audio+visual simultaneous N-back task | High - most researched WM exercise | 4-6h |
| Personal best tracking | Show best scores, celebrate new records | Medium - motivation boost | 1-2h |
| Rolling window adaptation | Use last 3 sessions for difficulty decisions | Medium - reduces volatility | 1h |
| Week-over-week analytics | Compare this week to last week | Medium - progress visibility | 2-3h |

### MEDIUM IMPACT

| Feature | Description | Value | Effort |
|---------|-------------|-------|--------|
| Corsi Block-Tapping | Visuospatial sequence recall task | Medium - complements spatial | 3-4h |
| BrainTok micro-tasks | Quick 30-second swipeable exercises | Medium - engagement | 6-10h |
| Operation Span | Complex span with processing component | Medium - verbal challenge | 4-5h |
| 3-back N-Back level | Advanced level for mastered users | Low - small user segment | 2-3h |

### LOW IMPACT (Nice to Have)

| Feature | Description | Value | Effort |
|---------|-------------|-------|--------|
| Dark/light theme toggle | Alternative color scheme | Low - dark theme works well | 3-4h |
| Export profile to JSON | Backup/restore functionality | Low - edge case | 1-2h |
| Audio mode for N-Back | Spoken letters instead of text | Low - accessibility | 3-4h |
| Reminders/notifications | Push notifications for training | Low - requires backend | High |

---

## 2. Bugs to Fix

### KNOWN ISSUES

| Bug | Location | Severity | Fix Effort | Status |
|-----|----------|----------|------------|--------|
| retakeQuiz uses confirm() | index.html:1136 | Low - works but not elegant | 30min | ✅ FIXED |
| BrainTok placeholder only | drawBrainTok() | Medium - feature incomplete | See BrainTok plan | Pending |
| Coach Session toast spam | runCoachSession() | Low - too many toasts | 30min | ✅ FIXED |

### POTENTIAL ISSUES (Need Verification)

| Issue | Description | Verification Needed |
|-------|-------------|---------------------|
| PWA cache staleness | Users may get old version | Test cache update flow |
| Discovery Quiz skip | Minimal profile may miss fields | Check all consumers |
| Score sidebar overflow | Many scores may break layout | Test with 50+ entries |

---

## 3. Incomplete Features

### BrainTok (Per PRD)

**Current State:** Placeholder with single "Did you know?" card.

**Missing:**
- Swipeable card interface
- 6 micro-tasks (Math Flash, Word Match, Memory Flash, Speed Sort, Pattern Complete, Odd One Out)
- 30-second completion time target
- Engagement tracking

**Priority:** P2 (after core improvements)

### MemoryCoin Economy (Per PRD)

**Current State:** Not implemented.

**Missing:**
- Coin earning mechanism
- Coin display in header
- Spendable rewards/unlocks

**Priority:** P3 (optional, lower value)

### Focus Timer

**Current State:** Implemented and working.

**Status:** Complete - no gaps.

### Lifestyle Logging

**Current State:** Sleep and exercise tracking implemented.

**Missing:**
- Correlation with cognitive scores
- Visual graph showing lifestyle vs performance

**Priority:** P3 (enhancement, not critical)

---

## 4. Technical Debt

| Item | Description | Impact | Fix Effort |
|------|-------------|--------|------------|
| Section comments | Code lacks clear section delimiters | Low - navigation | 30min |
| Helper function grouping | Parsing helpers scattered | Low - organization | 1h |
| Schema versioning | No version in localStorage | Medium - future migrations | 1h |
| Service worker versioning | Manual cache name update | Low - deployment friction | 30min |

---

## 5. Polish Items

### Visual Polish

| Item | Description | Effort |
|------|-------------|--------|
| Task completion animation | Brief celebration on success | 1h |
| Score increment animation | Count-up numbers | 2h |
| Button hover effects | Subtle feedback | 30min |
| Card hover effects | Slight elevation | 30min |

### UX Polish

| Item | Description | Effort |
|------|-------------|--------|
| Larger touch targets | 44px minimum | 1h |
| Empty state illustrations | Better visuals for empty sections | 2h |
| Performance comparison | "5% better than last time" | 2h |
| Encouragement messages | Persona-based feedback | 2h |

### Accessibility Polish

| Item | Description | Effort |
|------|-------------|--------|
| Reduced motion support | prefers-reduced-motion query | 30min |
| Enhanced focus rings | More visible focus states | 30min |
| High contrast option | Alternative colors | 3h |

---

## 6. Testing Gaps

### Coverage Status

| Area | E2E Tests | Status |
|------|-----------|--------|
| Smoke tests | smoke.spec.js | Complete |
| Core tasks | core-tasks.spec.js | Complete |
| PWA functionality | pwa.spec.js | Complete |
| PWA analytics | pwa-analytics.spec.js | In progress |
| Persona survey | persona-survey.spec.js | New/untracked |

### Missing Test Coverage

| Area | Priority |
|------|----------|
| Discovery Quiz full flow | P2 |
| Profile retake flow | P3 |
| Coach Session full flow | P2 |
| Dashboard analytics | P3 |
| Edge cases (quota, corruption) | P3 |

---

## 7. Documentation Gaps

### Existing (Good)

- CLAUDE.md - Project overview
- CURRENT_STATE.md - Comprehensive current state
- Sprint retrospectives - Detailed history

### Missing

| Doc | Purpose | Priority |
|-----|---------|----------|
| User guide | How to use the app | P3 |
| API/function docs | Developer reference | P3 |
| Changelog | Version history | P3 |

---

## 8. Priority Ranking (Overall)

### P1: Must Do (High Impact, Reasonable Effort) - COMPLETE
1. ✅ Personal best tracking - COMPLETE
2. ✅ Rolling window for N-Back adaptation - COMPLETE
3. ✅ Larger touch targets (44px minimum) - COMPLETE
4. ✅ Fix retakeQuiz confirm() usage - COMPLETE

### P2: Should Do (Medium Impact)
1. Dual N-Back task
2. Week-over-week analytics
3. Task completion feedback improvements
4. Trend arrows on dashboard
5. Discovery Quiz E2E tests

### P3: Nice to Have (Lower Priority)
1. Corsi Block-Tapping
2. BrainTok micro-tasks (3 initial)
3. Operation Span
4. High contrast mode
5. Lifestyle correlation graphs

### P4: Future Consideration
1. 3-back N-Back
2. MemoryCoin economy
3. Push notifications
4. Audio N-Back mode

---

## 9. Effort Estimates Summary

| Category | Total Effort |
|----------|--------------|
| P1 Items | 4-6 hours |
| P2 Items | 15-20 hours |
| P3 Items | 15-20 hours |
| P4 Items | 20+ hours |

### Recommended Sprints

**Sprint 6 (P1 Focus):** 4-6 hours
- Personal best tracking
- Rolling window adaptation
- Touch target improvements
- Minor bug fixes

**Sprint 7 (P2 Focus):** 10-12 hours
- Dual N-Back implementation
- Week-over-week analytics
- Dashboard improvements

**Sprint 8 (P2/P3):** 10-12 hours
- Corsi Block-Tapping
- BrainTok MVP (2-3 micro-tasks)
- Test coverage expansion

---

## 10. Dependencies

| Feature | Depends On |
|---------|------------|
| Week-over-week analytics | Personal best tracking (for baseline) |
| Dual N-Back | None |
| BrainTok | Swipe gesture handling |
| High contrast mode | CSS variable system (already exists) |
| Lifestyle correlation | Sufficient lifestyle data logged |

---

## 11. Risk Assessment

| Risk | Mitigation |
|------|------------|
| Scope creep on BrainTok | Start with 2-3 micro-tasks, not all 6 |
| Dual N-Back complexity | Use existing N-Back as template |
| PWA cache issues | Test update flow thoroughly |
| Mobile performance | Test on actual devices, not just responsive |
