# CURRENT_STATE.md - Working Memory Lab Analysis

**Analysis Date:** January 2, 2026
**Version Analyzed:** index.html (production)

---

## 1. Complete Inventory of Existing Exercises

### Core Assessments

| Exercise | Type | Description | Data Tracked |
|----------|------|-------------|--------------|
| **WM Span (reverse)** | Verbal Memory | Show words sequentially, recall in reverse order. Levels 1-5 (2-6 words). | `bestLevel`, `scoreStr` (e.g., "Best L3") |
| **Spatial+Verbal Binding** | Executive Function | Memorize triangle positions while judging if picture names start with shown letters. | `level`, `cleared`, `scoreStr` (e.g., "2/3") |
| **Cross-modal Binding** | Visuospatial | Memorize colored shapes, recall colors in order. Levels 1-3 (2-4 items). | `level`, `cleared`, `scoreStr` (e.g., "2/3") |
| **N-Back (emotion)** | Attention/Updating | 1-back or 2-back task with emotion words. Press Space when current matches N-back. | `acc1`, `acc2`, `fa1`, `fa2`, `scoreStr` |

### Cognitive Drills

| Exercise | Type | Description | Data Tracked |
|----------|------|-------------|--------------|
| **Filter the Positive** | Inhibition/Speed | Click only positive words from mixed word bank quickly and accurately. | `acc`, `time`, `scoreStr` (e.g., "14/16 in 18.3s") |
| **Mental Multiplication** | Calculation/WM | Compute multiplication problems mentally. | `acc`, `scoreStr` (e.g., "5/6") |

### Programs

| Program | Description | Sequence |
|---------|-------------|----------|
| **Coach Session** | Adaptive full workout | Filter Positive (warm-up) -> N-Back (adaptive) -> Spatial (binding) -> Mental Mult (finisher) |

---

## 2. How Difficulty Currently Works

### Adaptive Difficulty System (Coach Mode)

When **Coach Mode** is enabled (`coachOn()` returns true):

#### N-Back Adaptation (decideNFromHistory function)
- **Looks at:** Last N-Back session results
- **Rules:**
  - If acc2 >= 70% -> Start at 2-back
  - If acc1 >= 85% -> Start at 2-back
  - Otherwise -> Start at 1-back
- **Auto-promotion:** If 1-back accuracy >=85% AND false alarms <=2 -> automatically run 2-back block after

#### Spatial+Verbal
- Requires **perfect verbal checks AND correct position recall** to advance to next level
- Levels 1-3 (2-4 binding pairs)

#### Other Tasks
- **Filter Positive:** No adaptive difficulty (fixed word set)
- **WM Span:** Fixed progression through levels 1-5, stops on first failure
- **Cross-modal:** Fixed progression levels 1-3, stops on first failure

### Fixed Difficulty Parameters

| Task | Level Structure |
|------|-----------------|
| WM Span | Level 1: 2 words -> Level 5: 6 words |
| Spatial | Level 1: 2 items -> Level 3: 4 items |
| Cross-modal | Level 1: 2 items -> Level 3: 4 items |
| N-Back | 1-back (45-50s) or 2-back (60s) |

---

## 3. What Data is Being Tracked

### localStorage Keys

| Key | Type | Purpose |
|-----|------|---------|
| `wmLab` | Object | Task scores by type |
| `wmLabProfile` | Object | User profile from Discovery Quiz |
| `wmLabPrefs` | Object | User preferences (coachMode) |
| `wmLabFocus` | Array | Focus session history |
| `wmLabLifestyle` | Object | Daily lifestyle logs (keyed by date) |
| `wmLabRealWorld` | Array | Real-world wins log |
| `wmLabPWAAnalytics` | Array | PWA installation/session tracking |
| `wmLabPWA` | Object | PWA install state |

### Score Data Schema

The wmLab store contains arrays for each task type:
- span: scoreStr, bestLevel, ts, type
- nback: scoreStr, acc1, acc2, fa1, fa2, ts, type
- spatial: scoreStr, level, cleared, ts, type
- crossmodal: scoreStr, level, cleared, ts, type
- filterPos: scoreStr, acc, time, ts, type
- mult: scoreStr, acc, ts, type

### Profile Data Schema

Profile contains:
- created: ISO timestamp
- persona: "struggler" or "competitor" or "scientist"
- baseline: attention (0-100), verbal (0-100), spatial (0-100)
- preferences: style ("visual" or "both"), sessionLength ("quick" or "deep")
- recommendations: array ordered by weakness (e.g., ["nback", "span", "spatial"])
- onboardingComplete: boolean
- personaValidation: rating, comment, action, timestamp

---

## 4. Current UI/UX Flow

### Navigation Tabs
1. **Launchpad** (default for competitors) - Task launch buttons, Coach Mode toggle, scoreboard
2. **Dashboard** (default for strugglers/scientists) - Analytics, streaks, domain scores, correlations
3. **Focus** - Pomodoro-style focus timer with session history
4. **Lifestyle** - Sleep/exercise logging by day
5. **BrainTok** - Placeholder for micro-task feed (not implemented)

### User Onboarding Flow (Discovery Quiz)
1. **Welcome Screen** - App intro with optional 30-second demo
2. **Baseline Assessment** (~3 min):
   - Test 1: Attention (1-back, 20 trials)
   - Test 2: Verbal Memory (Span level 3, 3 trials)
   - Test 3: Spatial Memory (Spatial level 1, 2 trials)
3. **Preference Quiz** - Goal, training style, session length
4. **Profile Summary** - Persona assignment, baseline scores, recommendations

### Task Execution Pattern
1. Task UI renders to #screen element
2. Instructions shown
3. Stimuli presented with timing delays via wait(ms)
4. User input captured (keyboard/clicks)
5. Feedback displayed
6. Score saved via store.push()
7. Toast notification shown
8. Return to launchpad

---

## 5. What's Working Well (KEEP THESE)

### Architecture Strengths
- **Zero dependencies** - Vanilla JS, no build step, works offline
- **localStorage persistence** - Automatic save, export to CSV
- **Async task pattern** - Clean Promise-based flow for all tasks
- **PWA support** - Service worker, installable, offline-capable

### Feature Strengths
- **Discovery Quiz** - Good onboarding, establishes baseline
- **Coach Mode** - Adaptive N-Back progression is solid
- **Dashboard analytics** - Domain scores, streak calendar, lifestyle correlations
- **Real-world wins logging** - Unique transfer validation feature
- **PWA analytics** - Installation funnel tracking

### UX Strengths
- **Dark theme** - Eye-friendly for extended use
- **Responsive layout** - Grid adapts to screen size
- **Toast notifications** - Non-intrusive feedback
- **Keyboard shortcuts** - Space for N-Back, Enter for submit
- **Accessibility** - ARIA labels, role attributes, semantic HTML

---

## 6. What's Partially Working (ENHANCE THESE)

### Discovery Quiz
- **Issue:** Baseline tests are brief and may not give accurate picture
- **Enhancement:** Add more trials, perhaps use adaptive staircase method

### Coach Session
- **Issue:** Fixed sequence, no personalization based on profile
- **Enhancement:** Order tasks by weakness, adjust intensity based on recent performance

### N-Back Adaptive Logic
- **Issue:** Only looks at last session, no smoothing or trend analysis
- **Enhancement:** Rolling window of last 3-5 sessions, percentile-based promotion

### BrainTok
- **Issue:** Only a placeholder with text
- **Enhancement:** Implement actual micro-task feed as designed in PRD

### Lifestyle Correlation
- **Issue:** ✅ FIXED - Now tracks stress with 1-5 scale input
- **Enhancement:** ✅ Stress input added to lifestyle logging (Session 9)

### Streak System
- **Issue:** ✅ FIXED - Now requires 50% average performance for streak days
- **Enhancement:** ✅ Quality-based streak implemented (Session 9)

---

## 7. What's Broken or Missing (FIX/ADD THESE)

### Bugs/Issues
- **BrainTok tab:** ✅ FIXED - Full BrainTok with 3 micro-tasks (Phase 5)
- **Duplicate event listeners:** ✅ FIXED - Consolidated PWA handlers (Session 9)
- **Profile validation survey:** ✅ WORKING - Triggers after 3 sessions if persona assigned

### Missing Features (from PRD)
- **BrainTok micro-tasks:** ✅ IMPLEMENTED - Math Flash, Word Match, Memory Flash (Phase 5)
- **MemoryCoin economy:** ❌ DEFERRED - Task rewards, daily goals counter
- **Detailed transfer correlation:** ✅ IMPLEMENTED - Lifestyle correlation graphs (Phase 6)

### Missing Exercises (potential additions)
- **Dual N-Back:** ✅ IMPLEMENTED - Visual + audio modality (Phase 3)
- **Corsi Block Tapping:** ✅ IMPLEMENTED - Spatial sequence recall (Phase 3)
- **Running Span:** ❌ DEFERRED - Variable set sizes
- **Operation Span:** ✅ IMPLEMENTED - Math verification + letter recall (Phase 6)

### Missing Analytics
- **Week-over-week comparison:** ✅ IMPLEMENTED (Phase 4)
- **Personal best tracking per task:** ✅ IMPLEMENTED (Phase 1)
- **Export profile data:** ✅ IMPLEMENTED (Phase 6)

---

## 8. Existing Architecture Decisions to Preserve

### Single-File Architecture
All code lives in index.html - CSS, JS, HTML together. This is intentional:
- Zero build step
- Easy to open locally (file://)
- Simple deployment
- No module system complexity

### Store Pattern
The Store class handles all localStorage:
- Automatic JSON serialization
- Quota exceeded handling
- Corruption recovery
- Typed arrays vs objects

### Async Task Pattern
All tasks use async functions that return Promises. They render to screen, set up event handlers, use wait() for timing, and resolve(result) on completion.

### Coach Mode as Feature Flag
coachOn() function checks prefs.coachMode - this is the primary toggle for adaptive behavior.

### Version File Strategy
- index.html = production
- indexvN.html = experimental versions
- New features in indexvN, then backport to index.html if proven

---

## 9. Key Metrics (Current State)

From PRD-Phase1 targets:
- Week 1 Retention: Target 60% (not measured)
- 30-Day Retention: Target +25% (not measured)
- DAU increase: Target +50% (not measured)
- Onboarding completion: Target 85% (not measured)
- 7-Day streak rate: Target 20% (not measured)

### What IS Tracked
- Total sessions by task type
- Current/longest streak
- PWA install funnel (prompts shown, accepted, dismissed, installed)
- PWA vs browser session ratio

---

## 10. Test Coverage

### Existing Test Files
- smoke.spec.js - App load, tab navigation, localStorage, coach toggle, buttons
- core-tasks.spec.js - WM Span, N-Back, Spatial task starting/input
- pwa.spec.js - PWA functionality
- pwa-analytics.spec.js - Installation analytics tracking
- discovery-quiz.spec.js - Onboarding flow
- persona-survey.spec.js - Persona validation survey

### Test Framework
- Playwright with file:// protocol
- Chromium and Firefox browsers
- HTML reporter

---

## Summary

The Working Memory Lab is a **mature, functional application** with solid architecture. The core cognitive tasks are well-implemented with appropriate scientific grounding. The main gaps are:

1. **BrainTok micro-task feed** - Not implemented
2. **Gamification layer** - MemoryCoins not implemented
3. **More sophisticated adaptation** - N-Back works, others are fixed difficulty
4. **Missing exercises** - Limited variety, no dual modality tasks
5. **Analytics gaps** - No week-over-week, no personal bests

**Recommendation:** Focus on completing BrainTok (high impact), enhancing existing task adaptation, and adding 1-2 complementary exercises before considering architectural changes.
