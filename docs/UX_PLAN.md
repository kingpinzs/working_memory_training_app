# UX_PLAN.md - User Experience Improvements

**Date:** January 2, 2026
**Principle:** Specific improvements (not redesign), small tweaks that add polish

---

## 1. Current UX Strengths (KEEP)

### Visual Design
- Dark theme is easy on eyes for focused work
- Consistent color palette with CSS variables
- Clean typography with good hierarchy
- Cards provide visual grouping

### Navigation
- Tab-based navigation is intuitive
- Single-page flow eliminates page loads
- Keyboard shortcuts (1-5, Esc, Shift+?)
- Clear active state on tabs

### Task Experience
- Clear instructions before each task
- Real-time feedback during tasks
- Immediate scoring after completion
- Toast notifications for results

### Onboarding
- Discovery Quiz is well-paced (<5 min)
- Persona assignment feels personalized
- Skip option respects user choice
- Profile summary provides clear value

### Accessibility
- ARIA labels on interactive elements
- Keyboard navigation works throughout
- Focus management on screen changes
- Screen reader announcements

---

## 2. Specific Improvements

### 2.1 Launchpad Enhancements

**Current Issues:**
- Task cards don't show personal bests
- No visual indication of recommended tasks
- Session length not visible

**Improvements:**

| Change | Description | Effort | Status |
|--------|-------------|--------|--------|
| Personal best badges | Show "Best: L4" on task cards | Low | ✅ Phase 1 |
| Recommendation highlight | Subtle border or icon on recommended tasks | Low | ✅ Session 8 |
| Quick start button | One-tap to start Coach Session | Low | ✅ Session 8 |
| Session estimate | Show "~5 min" or "~15 min" on cards | Low | ✅ Session 8 |

### 2.2 Dashboard Improvements

**Current Issues:**
- Streak calendar is small and hard to read
- Domain scores lack trend visualization
- No week-over-week comparison

**Improvements:**

| Change | Description | Effort | Status |
|--------|-------------|--------|--------|
| Larger streak calendar | Increase cell size from 10px to 14px | Low | ✅ Session 8 |
| Trend arrows | Add up/down/flat arrows next to domain scores | Low | ✅ Phase 2 |
| Weekly summary card | "This week: 5 sessions, +3% attention" | Medium | ✅ Phase 4 |
| Touch-friendly calendar | Larger tap targets for mobile | Low | ✅ Session 8 |

### 2.3 Task Feedback Improvements

**Current Issues:**
- Some tasks end abruptly
- No summary of what user learned
- Missing encouragement for struggling users

**Improvements:**

| Change | Description | Effort | Status |
|--------|-------------|--------|--------|
| Task completion animation | Brief celebratory animation on success | Low | ✅ Phase 4 |
| Performance summary | "You scored 80% - 5% better than last time" | Medium | ✅ Phase 2 |
| Encouragement messages | Context-aware tips for improvement | Medium | ✅ Phase 2 |
| Next action suggestion | "Try again" or "Move to next task" buttons | Low | ✅ Session 9 |

### 2.4 Mobile Experience

**Current State:** App works on mobile but isn't optimized.

**Improvements:**

| Change | Description | Effort | Status |
|--------|-------------|--------|--------|
| Larger touch targets | Minimum 44px for buttons/taps | Low | ✅ Phase 1 |
| Swipe navigation | Swipe left/right between tabs | Medium | ❌ Deferred |
| Responsive task layout | Stack elements vertically on small screens | Medium | ❌ Deferred |
| Hide keyboard on task start | Auto-dismiss keyboard in N-Back | Low | ✅ Session 8 |

### 2.5 Keyboard Shortcuts

**Current Shortcuts:**
- 1-5: Switch tabs
- Esc: Return to Launchpad
- Space: N-Back response
- Shift+?: Show help

**Additional Shortcuts:** ✅ ALL IMPLEMENTED

| Shortcut | Action | Effort | Status |
|----------|--------|--------|--------|
| Enter | Submit answer in tasks | Low | ✅ Exists |
| C | Start Coach Session | Low | ✅ Phase 4 |
| R | Restart current task | Low | ✅ Phase 4 |
| P | View profile | Low | ✅ Session 8 |

---

## 3. Accessibility Additions

### 3.1 Already Implemented (KEEP)
- ARIA labels on buttons
- Keyboard navigation
- Focus management
- Screen reader announcements
- Color contrast meets WCAG AA

### 3.2 Recommended Additions

| Improvement | Description | Effort | Status |
|-------------|-------------|--------|--------|
| Reduced motion option | Respect prefers-reduced-motion | Low | ✅ Phase 4 |
| High contrast mode | Alternative color scheme | Medium | ✅ Phase 7 |
| Focus visible enhancement | More visible focus rings | Low | ✅ Exists |
| Skip link | Jump to main content (if needed) | Low | ✅ Session 8 |

### 3.3 Reduced Motion Implementation

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 4. Polish Items

### 4.1 Loading States

**Current:** None (instant localStorage reads)

**Recommendation:** Not needed for current architecture. localStorage is synchronous.

### 4.2 Empty States

**Current:** Some empty states show placeholder text.

**Improvements:**

| Screen | Current | Improved | Status |
|--------|---------|----------|--------|
| Scores sidebar (empty) | Nothing | "Complete a task to see scores" | ✅ Session 9 |
| Dashboard (no data) | Shows 0% | "Start training to see progress" | ✅ Exists |
| Real-world wins (empty) | Placeholder text | Better illustration + CTA | ❌ Deferred |

### 4.3 Error States

**Current:** Toast notifications for errors.

**Recommendation:** Keep current approach. Works well.

### 4.4 Micro-interactions

| Interaction | Description | Effort | Status |
|-------------|-------------|--------|--------|
| Button hover effects | Subtle scale/color change | Low | ✅ Phase 4 |
| Card hover effects | Slight elevation change | Low | ✅ Phase 4 |
| Tab transition | Smooth fade between views | Low | ✅ Session 8 |
| Score increment animation | Count-up animation | Medium | ❌ Deferred |

---

## 5. BrainTok UX (Per PRD)

### Design Requirements
- Swipeable card interface (like TikTok)
- One micro-task per card
- Quick completion (30 seconds max)
- Satisfying feedback on swipe

### UX Pattern

```
[Card 1: Math Flash]
   Swipe up = correct
   Swipe down = incorrect
   Swipe left = skip

[Card 2: Memory Flash]
   Same gesture pattern
```

### Implementation Notes
- Use CSS transform for smooth swiping
- Haptic feedback on mobile (if supported)
- Pre-load next card for instant transition
- Show progress dots at bottom

---

## 6. Persona-Specific UX

### Current Implementation
- Struggler: Coach Mode ON by default
- Competitor: Coach Mode OFF by default
- Scientist: Coach Mode ON by default

### Enhanced Personalization

| Persona | UX Enhancement | Effort | Status |
|---------|----------------|--------|--------|
| Struggler | Encouraging messages, celebrate small wins | Low | ✅ Phase 2 |
| Competitor | Show rankings, challenge callouts | Medium | ✅ Phase 2 |
| Scientist | More detailed analytics, raw numbers | Medium | ✅ Phase 6 |

### Example: Struggler Encouragement

After a task:
- "Great effort! You're building your skills."
- "Your attention improved 5% this week."
- "Keep going - consistency is key!"

### Example: Competitor Challenge

On Dashboard:
- "Can you beat your 5-day streak record?"
- "You're 3 points away from your best score!"
- "Challenge: Complete 3 tasks today"

### Example: Scientist Detail

On Dashboard:
- Show raw scores, not just percentages
- Include standard deviation
- Option to view all data points

---

## 7. Priority Matrix

| Improvement | Effort | Impact | Priority | Status |
|-------------|--------|--------|----------|--------|
| Personal best badges | Low | Medium | P1 | ✅ Phase 1 |
| Trend arrows on dashboard | Low | Medium | P1 | ✅ Phase 2 |
| Larger touch targets | Low | Medium | P1 | ✅ Phase 1 |
| Task completion animation | Low | Low | P2 | ✅ Phase 4 |
| Performance comparison | Medium | Medium | P2 | ✅ Phase 2 |
| Weekly summary card | Medium | Medium | P2 | ✅ Phase 4 |
| Swipe navigation | Medium | Low | P3 | ❌ Deferred |
| Persona-specific messages | Medium | Medium | P2 | ✅ Phase 2 |
| High contrast mode | Medium | Low | P3 | ✅ Phase 7 |
| BrainTok swipe UI | High | Medium | P2 | ✅ Phase 5 |

---

## 8. Implementation Sequence

### Quick Wins (1 day)
1. Personal best badges on task cards
2. Trend arrows next to domain scores
3. Larger touch targets (44px minimum)
4. Reduced motion media query

### Polish Pass (1-2 days)
1. Task completion summary screen
2. Performance comparison to last session
3. Encouragement messages based on persona
4. Empty state improvements

### Mobile Optimization (1 day)
1. Responsive task layouts
2. Improved touch targets
3. Swipe navigation between tabs

### BrainTok UI (2-3 days)
1. Swipeable card container
2. Gesture handling
3. Transition animations

---

## 9. Design System Notes

### Colors (Current - KEEP)
```css
--bg: #0b0f14;
--panel: #101720;
--ink: #e8f3ff;
--muted: #7a8fa8;
--brand: #6ad3ff;
--ok: #35bf88;
--warn: #e8b84a;
--err: #d0657a;
```

### Typography (Current - KEEP)
- System font stack
- Monospace for data/scores
- CAPS utility class for labels

### Spacing (Current - KEEP)
- Stack gap: 14px
- Card padding: 16-20px
- Border radius: 8px

### Button Sizes (Proposed Update)
```css
button {
  min-height: 44px;  /* Touch-friendly */
  min-width: 44px;
  padding: 10px 16px;
}
```

---

## 10. Summary

### KEEP
- Dark theme and color palette
- Tab navigation pattern
- Toast notification system
- Keyboard shortcuts
- ARIA accessibility

### ENHANCE
- Add personal best badges
- Show trend arrows
- Increase touch targets
- Add performance comparisons
- Persona-specific messaging

### ADD
- Reduced motion support
- Task completion animations
- Weekly summary card
- BrainTok swipe UI (when implementing)

### DON'T DO
- Full redesign (not needed)
- Change navigation pattern
- Add complex animations
- Implement skeleton loaders (localStorage is fast)
