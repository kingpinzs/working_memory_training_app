# GAPS.md - Gaps and Priorities

**Date:** January 2, 2026
**Purpose:** Missing features that would add real value, bugs to fix, polish items

---

## 1. Missing Features (Would Add Real Value)

### HIGH IMPACT - ALL COMPLETE ✅

| Feature | Description | Value | Effort | Status |
|---------|-------------|-------|--------|--------|
| Dual N-Back | Audio+visual simultaneous N-back task | High - most researched WM exercise | 4-6h | ✅ Phase 3 |
| Personal best tracking | Show best scores, celebrate new records | Medium - motivation boost | 1-2h | ✅ Phase 1 |
| Rolling window adaptation | Use last 3 sessions for difficulty decisions | Medium - reduces volatility | 1h | ✅ Phase 1 |
| Week-over-week analytics | Compare this week to last week | Medium - progress visibility | 2-3h | ✅ Phase 4 |

### MEDIUM IMPACT - ALL COMPLETE ✅

| Feature | Description | Value | Effort | Status |
|---------|-------------|-------|--------|--------|
| Corsi Block-Tapping | Visuospatial sequence recall task | Medium - complements spatial | 3-4h | ✅ Phase 3 |
| BrainTok micro-tasks | Quick 30-second swipeable exercises | Medium - engagement | 6-10h | ✅ Phase 5 |
| Operation Span | Complex span with processing component | Medium - verbal challenge | 4-5h | ✅ Phase 6 |
| 3-back N-Back level | Advanced level for mastered users | Low - small user segment | 2-3h | ✅ Phase 6 |

### LOW IMPACT - MOSTLY COMPLETE ✅

| Feature | Description | Value | Effort | Status |
|---------|-------------|-------|--------|--------|
| High contrast mode | Alternative color scheme | Low - accessibility | 3-4h | ✅ Phase 7 |
| Export profile to JSON | Backup/restore functionality | Low - edge case | 1-2h | ✅ Phase 6 |
| Audio mode for N-Back | Spoken letters instead of text | Low - accessibility | 3-4h | ✅ Phase 7 |
| Reminders/notifications | Push notifications for training | Low - requires backend | High | ❌ Future |

---

## 2. Bugs to Fix

### KNOWN ISSUES

| Bug | Location | Severity | Fix Effort | Status |
|-----|----------|----------|------------|--------|
| retakeQuiz uses confirm() | index.html:1136 | Low - works but not elegant | 30min | ✅ FIXED |
| BrainTok placeholder only | drawBrainTok() | Medium - feature incomplete | See BrainTok plan | ✅ FIXED (Phase 5) |
| Coach Session toast spam | runCoachSession() | Low - too many toasts | 30min | ✅ FIXED |

### POTENTIAL ISSUES (Verified)

| Issue | Description | Status |
|-------|-------------|--------|
| PWA cache staleness | Users may get old version | ✅ FIXED - Updated to v2 |
| Discovery Quiz skip | Minimal profile may miss fields | ✅ FIXED - Fixed baseline property |
| Score sidebar overflow | Many scores may break layout | ✅ OK - Limited to 5 per category |

---

## 3. Incomplete Features

### BrainTok (Per PRD) ✅ COMPLETE

**Current State:** Fully implemented with swipeable card interface.

**Implemented (Phase 5):**
- ✅ Swipeable card interface with touch/mouse gestures
- ✅ Math Flash micro-task (verify equations)
- ✅ Memory Flash micro-task (sequence matching)
- ✅ Word Match micro-task (category matching)
- ✅ Progress dots, feedback animations, scoring

### MemoryCoin Economy (Per PRD)

**Current State:** Not implemented.

**Status:** Deferred - low priority gamification feature.

### Focus Timer

**Current State:** Implemented and working.

**Status:** Complete - no gaps.

### Lifestyle Logging ✅ COMPLETE

**Current State:** Sleep and exercise tracking implemented.

**Implemented (Phase 6):**
- ✅ Correlation with cognitive scores
- ✅ Visual bar chart showing lifestyle vs performance

---

## 4. Technical Debt

| Item | Description | Impact | Fix Effort | Status |
|------|-------------|--------|------------|--------|
| Section comments | Code lacks clear section delimiters | Low - navigation | 30min | ✅ Phase 1 |
| Helper function grouping | Parsing helpers scattered | Low - organization | 1h | ❌ Deferred |
| Schema versioning | No version in localStorage | Medium - future migrations | 1h | ❌ Deferred |
| Service worker versioning | Manual cache name update | Low - deployment friction | 30min | ✅ Phase 1 |

---

## 5. Polish Items

### Visual Polish

| Item | Description | Effort | Status |
|------|-------------|--------|--------|
| Task completion animation | Brief celebration on success | 1h | ✅ Phase 4 |
| Score increment animation | Count-up numbers | 2h | ❌ Deferred |
| Button hover effects | Subtle feedback | 30min | ✅ Phase 4 |
| Card hover effects | Slight elevation | 30min | ✅ Phase 4 |

### UX Polish

| Item | Description | Effort | Status |
|------|-------------|--------|--------|
| Larger touch targets | 44px minimum | 1h | ✅ Phase 1 |
| Empty state illustrations | Better visuals for empty sections | 2h | ❌ Deferred |
| Performance comparison | "5% better than last time" | 2h | ✅ Phase 2 |
| Encouragement messages | Persona-based feedback | 2h | ✅ Phase 2 |

### Accessibility Polish

| Item | Description | Effort | Status |
|------|-------------|--------|--------|
| Reduced motion support | prefers-reduced-motion query | 30min | ✅ Phase 4 |
| Enhanced focus rings | More visible focus states | 30min | ✅ Exists |
| High contrast option | Alternative colors | 3h | ✅ Phase 7 |

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

### P1: Must Do (High Impact, Reasonable Effort) - ✅ COMPLETE
1. ✅ Personal best tracking - Phase 1
2. ✅ Rolling window for N-Back adaptation - Phase 1
3. ✅ Larger touch targets (44px minimum) - Phase 1
4. ✅ Fix retakeQuiz confirm() usage - Phase 1

### P2: Should Do (Medium Impact) - ✅ COMPLETE
1. ✅ Dual N-Back task - Phase 3
2. ✅ Week-over-week analytics - Phase 4
3. ✅ Task completion feedback improvements - Phase 4
4. ✅ Trend arrows on dashboard - Phase 2
5. Discovery Quiz E2E tests - Pending (low priority)

### P3: Nice to Have (Lower Priority) - ✅ COMPLETE
1. ✅ Corsi Block-Tapping - Phase 3
2. ✅ BrainTok micro-tasks (3 initial) - Phase 5
3. ✅ Operation Span - Phase 6
4. ✅ High contrast mode - Phase 7
5. ✅ Lifestyle correlation graphs - Phase 6

### P4: Future Consideration - MOSTLY COMPLETE
1. ✅ 3-back N-Back - Phase 6
2. ❌ MemoryCoin economy - Deferred (low value)
3. ❌ Push notifications - Requires backend
4. ✅ Audio N-Back mode - Phase 7

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
