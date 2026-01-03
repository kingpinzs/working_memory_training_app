# ROADMAP.md - Incremental Improvement Roadmap

**Date:** January 2, 2026
**Principle:** Small, incremental steps - not a rewrite

---

## Overview

This roadmap builds on the existing Working Memory Lab application. Each phase is designed to be:
- Completable in 1-2 days of focused work
- Independently valuable (no phase depends on completing all others)
- Testable with existing Playwright infrastructure

---

## Phase 1: Bug Fixes and Quick Wins ✅ COMPLETE

**Goal:** Address known issues and add high-value, low-effort improvements.
**Estimated Effort:** 4-6 hours
**Status:** ✅ COMPLETE (January 2, 2026)

### Tasks

| Task | Description | Effort | File | Status |
|------|-------------|--------|------|--------|
| 1.1 Replace confirm() | Use inline confirmation for retakeQuiz | 30min | index.html:1136 | ✅ |
| 1.2 Reduce toast spam | Limit Coach Session toasts | 30min | runCoachSession() | ✅ |
| 1.3 Add section comments | Improve code navigation | 30min | index.html | ✅ |
| 1.4 Personal best tracking | Add personalBest flag to score records | 1h | Store class | ✅ |
| 1.5 Show personal bests | Display on task cards in Launchpad | 1h | drawLaunchpad() | ✅ |
| 1.6 Rolling window N-Back | Use last 3 sessions for adaptation | 1h | decideNFromHistory() | ✅ |
| 1.7 Touch target sizes | Ensure 44px minimum on buttons | 1h | CSS | ✅ |

### Acceptance Criteria - All Met ✅
- ✅ No confirm() dialogs in app
- ✅ Personal best shown on all task cards
- ✅ N-Back considers last 3 sessions for starting level
- ✅ All buttons are at least 44px touch target

### Testing
- ✅ All 160 tests passing
- ✅ No regressions detected

---

## Phase 2: Enhance Existing Exercises ✅ COMPLETE

**Goal:** Improve current exercises based on research findings.
**Estimated Effort:** 6-8 hours
**Status:** ✅ COMPLETE (January 2, 2026)

### Tasks

| Task | Description | Effort | File | Status |
|------|-------------|--------|------|--------|
| 2.1 Multiple word lists | Add 3 alternative lists per span level | 1h | spanLists object | ✅ |
| 2.2 Trend arrows | Add up/down/flat arrows on dashboard | 2h | drawDashboard() | ✅ (pre-existing) |
| 2.3 Performance comparison | "5% better than last time" on results | 2h | Task finish screens | ✅ |
| 2.4 Encouragement messages | Persona-based feedback after tasks | 2h | Task finish screens | ✅ |
| 2.5 Level 4 spatial | Add 5-item level to Spatial+Verbal | 1h | runSpatial() | ✅ |

### Acceptance Criteria - All Met ✅
- ✅ WM Span uses different words each session
- ✅ Dashboard shows trend indicators
- ✅ Task completion includes comparison to previous performance
- ✅ Struggler persona sees encouragement, Competitor sees challenges

### Testing
- ✅ All 160 tests passing
- ✅ No regressions detected

---

## Phase 3: Add 1-2 New Exercises ✅ COMPLETE

**Goal:** Add scientifically-backed exercises that complement existing ones.
**Estimated Effort:** 8-10 hours
**Status:** ✅ COMPLETE (January 2, 2026)

### Tasks

| Task | Description | Effort | File | Status |
|------|-------------|--------|------|--------|
| 3.1 Dual N-Back design | Create UI mockup and flow | 1h | Documentation | ✅ |
| 3.2 Dual N-Back core | Implement 2-back with audio+visual | 4h | New function | ✅ |
| 3.3 Dual N-Back scoring | Track pos/audio hits separately | 1h | Store integration | ✅ |
| 3.4 Corsi Block design | Create 9-block layout | 30min | Documentation | ✅ |
| 3.5 Corsi Block core | Implement sequence display and recall | 3h | New function | ✅ |
| 3.6 Domain mapping update | Add new tasks to domain calculations | 30min | calculateDomainScores() | ✅ |

### Acceptance Criteria - All Met ✅
- ✅ Dual N-Back is playable with audio and visual stimuli
- ✅ Corsi Block-Tapping measures visuospatial span
- ✅ Both tasks appear in Launchpad
- ✅ Both tasks contribute to domain scores

### Testing
- ✅ All 160 tests passing
- ✅ No regressions detected

---

## Phase 4: Polish and UX Improvements ✅ COMPLETE

**Goal:** Add polish that makes the app feel professional.
**Estimated Effort:** 6-8 hours
**Status:** ✅ COMPLETE (January 2, 2026)

### Tasks

| Task | Description | Effort | File | Status |
|------|-------------|--------|------|--------|
| 4.1 Task completion animation | Brief success animation | 1h | CSS + task finish | ✅ |
| 4.2 Reduced motion support | prefers-reduced-motion query | 30min | CSS | ✅ |
| 4.3 Empty state improvements | Better messaging for empty sections | 1h | Various draw functions | ✅ |
| 4.4 Weekly summary card | "This week vs last week" on dashboard | 2h | drawDashboard() | ✅ |
| 4.5 Button hover effects | Subtle feedback on hover | 30min | CSS | ✅ |
| 4.6 Keyboard shortcut additions | Add C for Coach, R for retry | 1h | Keyboard handler | ✅ |

### Acceptance Criteria - All Met ✅
- ✅ Success animation plays after task completion
- ✅ Users with reduced motion preference see minimal animation
- ✅ Empty states provide helpful guidance
- ✅ Dashboard shows weekly comparison

### Testing
- ✅ All 160 tests passing
- ✅ No regressions detected

---

## Future Phases (Backlog)

### Phase 5: BrainTok MVP ✅ COMPLETE
**Estimated Effort:** 8-12 hours
**Status:** ✅ COMPLETE (January 2, 2026)
- ✅ Swipeable card container with touch/mouse gestures
- ✅ Math Flash micro-task (verify equations)
- ✅ Memory Flash micro-task (sequence matching)
- ✅ Word Match micro-task (category matching)
- ✅ Progress dots, feedback animations, scoring

### Phase 6: Advanced Features ✅ COMPLETE
**Estimated Effort:** 10-15 hours
**Status:** ✅ COMPLETE (January 2, 2026)
- ✅ Operation Span task (math verification + letter recall)
- ✅ 3-back N-Back level (adaptive promotion from 2-back)
- ✅ Lifestyle correlation graphs (visual bar chart)
- ✅ Export data to JSON (full backup with all stores)

### Phase 7: Extended Polish ✅ COMPLETE
**Estimated Effort:** 8-10 hours
**Status:** ✅ COMPLETE (January 2, 2026)
- ✅ High contrast mode (toggle + CSS)
- ✅ Audio N-Back variant (spoken letters + spacebar response)
- ✅ Response time analytics (RT tracking in N-Back tasks)
- ✅ Full test coverage (166 tests passing)

---

## Timeline Visualization

```
Week 1: Phase 1 (Quick Wins)
        [████████] 4-6 hours

Week 2: Phase 2 (Exercise Enhancements)
        [██████████████] 6-8 hours

Week 3: Phase 3 (New Exercises)
        [████████████████████] 8-10 hours

Week 4: Phase 4 (Polish)
        [██████████████] 6-8 hours

Future: Phase 5-7 (Backlog)
        [To be scheduled based on priorities]
```

---

## Implementation Notes

### For Phase 1
- Start with personalBest tracking - it enables several other improvements
- Touch targets can be done as a CSS-only change
- Rolling window is a simple refactor of existing function

### For Phase 2
- Trend arrows require storing previous domain scores (or calculating on the fly)
- Encouragement messages should be configurable per persona
- Word list expansion is purely additive

### For Phase 3
- Dual N-Back is the priority - highest research support
- Use existing N-Back as template for UI patterns
- Audio can use Web Audio API or simple audio elements
- Corsi layout should be irregular (not grid) per standard test

### For Phase 4
- Animations should be subtle (200-300ms)
- Weekly summary needs date-based grouping of scores
- Focus on consistency with existing design language

---

## Success Metrics

### Phase 1 Success
- Zero confirm() dialogs
- Personal bests visible in UI
- Touch targets meet 44px standard

### Phase 2 Success
- Trend arrows showing correct direction
- Users see performance comparison after each task
- At least 2 different word lists used in testing

### Phase 3 Success
- Dual N-Back playable end-to-end
- Corsi Block measures span correctly
- Domain scores include new tasks

### Phase 4 Success
- Animations feel natural, not distracting
- Weekly summary shows accurate data
- Reduced motion users have good experience

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Phase 3 takes longer than expected | Dual N-Back is higher priority than Corsi |
| Audio doesn't work on all devices | Provide fallback visual-only mode |
| Performance issues with animations | Use CSS transforms, not layout changes |
| Breaking existing functionality | Run full test suite after each phase |

---

## Rollback Plan

Each phase should be committed as a single git commit with a clear message. If issues are discovered:

1. Revert the commit
2. Fix the issue in isolation
3. Re-apply with fix included

No phase should break backward compatibility with existing localStorage data.

---

## Conclusion

This roadmap provides a clear path from the current state to an enhanced Working Memory Lab. By focusing on incremental improvements rather than a rewrite, we:

1. Preserve what's working well
2. Add value with each phase
3. Minimize risk of regression
4. Allow for learning and adjustment between phases

**Total Estimated Effort:** 25-35 hours across all 4 primary phases

**Recommended Approach:** Complete Phase 1 first, then evaluate priorities for Phase 2-4 based on user feedback and available time.
