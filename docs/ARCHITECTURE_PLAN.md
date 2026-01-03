# ARCHITECTURE_PLAN.md - Architecture Assessment

**Date:** January 2, 2026
**Principle:** Keep in index.html if it's working fine. Only split out if there's clear benefit.

---

## 1. Current Architecture Analysis

### Structure Overview

**Single File Architecture:** All code resides in `index.html` (~2000+ lines)

**Components (in-file):**
1. **CSS Styles** (lines 1-200)
2. **HTML Structure** (lines 201-350)
3. **Store Classes** (lines 351-450)
4. **Draw Functions** (lines 451-600)
5. **Discovery Quiz** (lines 601-900)
6. **Task Functions** (lines 901-1600)
7. **Analytics Functions** (lines 1601-1900)
8. **Utility Functions** (lines 1901-2000+)

### What Works Well

| Aspect | Assessment |
|--------|------------|
| No build step | Excellent - open HTML directly in browser |
| Single file deployment | Simple hosting, easy to share |
| Vanilla JS | No framework dependencies to maintain |
| localStorage persistence | Reliable, no backend needed |
| Tab navigation pattern | Clean, understandable routing |
| Async/await task pattern | Consistent, maintainable |

### Current Patterns (PRESERVE THESE)

1. **Store Pattern** - Class-based localStorage wrapper with get/set/push methods
2. **Draw Function Pattern** - Functions that render views to the screen element
3. **Async Task Pattern** - Promise-based task runners with await for timing
4. **Tab Routing** - Click handlers on role="tab" elements dispatch to draw functions

---

## 2. Should We Split Into Modules?

### Arguments For Splitting

| Benefit | Relevance |
|---------|-----------|
| Easier navigation | Medium - VSCode folding works well |
| Parallel development | Low - single developer project |
| Testing isolation | Medium - but Playwright works on whole app |
| Code reuse | Low - not building multiple apps |

### Arguments Against Splitting

| Benefit | Relevance |
|---------|-----------|
| No build step required | High - core project value |
| Simple deployment | High - just copy one file |
| Easy to understand | High - single context |
| Works with file:// protocol | High - offline development |

### Recommendation: KEEP SINGLE FILE

The current single-file architecture is appropriate for this project because:
1. It works on file:// protocol (key requirement per CLAUDE.md)
2. No build tooling to maintain
3. Project size is manageable (~2000 lines)
4. Single developer workflow

**Threshold for reconsidering:** If file exceeds 3500-4000 lines, consider splitting CSS into separate file.

---

## 3. Minimal Refactoring Recommendations

### 3.1 Code Organization (No Splitting Required)

Current organization is mostly good. Suggest adding clear section delimiter comments:

```
SECTION 1: STORE & DATA LAYER
SECTION 2: DRAW FUNCTIONS (VIEWS)
SECTION 3: TASKS (EXERCISES)
SECTION 4: ANALYTICS & CALCULATIONS
SECTION 5: UTILITIES
```

**Effort:** 30 minutes
**Impact:** Easier navigation

### 3.2 Helper Function Consolidation

Some helpers are scattered. Group them together:
- Group all parsing helpers (parseSpanFromScore, parseNAcc, parseFilterAcc, parseMultAcc)
- Group all formatting helpers (formatRelativeTime, nv)

**Effort:** 1 hour
**Impact:** Low - organizational

### 3.3 CSS Variables (Already Good)

Current CSS uses variables well with :root declarations for colors and spacing.

**Recommendation:** Keep as-is. Consider extracting to `styles.css` only if CSS exceeds 300 lines.

---

## 4. Data Architecture Assessment

### Current localStorage Keys

| Key | Purpose | Schema |
|-----|---------|--------|
| `wmLab` | Task scores | Object with arrays per task type |
| `wmLabPrefs` | User preferences | Object with coachMode boolean |
| `wmLabProfile` | User profile | Object with persona, baseline, preferences |
| `wmLabPWA` | PWA install state | Object with installed flag and dismissedAt |
| `wmLabLifestyle` | Daily lifestyle log | Object keyed by date |
| `wmLabRealWorldWins` | Real-world wins | Array of note objects |
| `wmLabFocus` | Focus sessions | Array of duration objects |

### Assessment

**Strengths:**
- Clean separation by concern
- Each store handles its own data
- Schema is documented in CLAUDE.md

**Minor Improvements:**
- Consider adding schema version for future migrations
- Add wmLabMeta for app-level metadata (schemaVersion, firstVisit, lastVisit)

---

## 5. PWA Architecture

### Current Implementation (KEEP)

- `manifest.json` - App metadata
- `sw.js` - Service worker with cache-first strategy
- Icons: `icon-192.svg`, `icon-512.svg`

### Assessment

Works well. Cache versioning is manual (wm-lab-v1). Consider date-based versioning for easier updates.

---

## 6. Testing Architecture

### Current

- Playwright tests in `tests/` folder
- Tests run against file:// protocol
- No unit tests (functions tested through E2E)

### Assessment

Appropriate for project size. Continue with Playwright for integration testing.

**Future consideration:** If adding complex algorithms, consider extracting pure functions for unit testing. Currently not needed - E2E tests are sufficient.

---

## 7. Version Control Strategy

### Current

- Main file: `index.html`
- Version iterations: `indexv2.html` through `indexv6.html`
- Per CLAUDE.md: Use index.html for core fixes, vN for experiments

### Assessment

This is unusual but works for the project. Continue the pattern.

**Cleanup recommendation:** Archive old versions if they're no longer needed by moving to `archive/` folder or deleting if fully merged.

---

## 8. If Splitting Became Necessary

This is for reference only. Not currently recommended.

### Option A: CSS Extraction Only
- index.html (All JS + HTML)
- styles.css (All CSS)
- **When:** CSS exceeds 300 lines

### Option B: Minimal Module Split
- index.html (Entry point + HTML)
- app.js (All JS)
- styles.css (All CSS)
- **When:** JS exceeds 3000 lines

### Option C: Full Module Split (ES Modules)
- index.html
- js/ folder with app.js, stores.js, tasks.js, views.js, utils.js
- css/ folder with styles.css
- **When:** Multiple developers OR exceeding 5000 lines
- **Important:** Would require a build step or dropping file:// support. Not recommended.

---

## 9. Summary

### KEEP (Do Not Change)
- Single-file architecture
- Vanilla JS (no frameworks)
- localStorage persistence
- Tab routing pattern
- Async/await task pattern
- Store class pattern

### ENHANCE (Minor Improvements)
- Add section comments for navigation
- Group related helper functions
- Add schema version to metadata

### DON'T DO
- Split into ES modules (breaks file:// support)
- Add build tooling (unnecessary complexity)
- Adopt a framework (overkill for project size)
- Add TypeScript (no clear benefit)

---

## 10. Architecture Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| Sprint 1-4 | Single file architecture | Simplicity, file:// support |
| Sprint 4 | PWA with service worker | Offline support |
| Sprint 4 | Store class pattern | Clean data abstraction |
| Today | Keep single file | Still appropriate for size |
| Today | Don't add build step | File:// protocol requirement |
