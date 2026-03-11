# Changelog

All notable changes to Working Memory Lab are documented in this file.

## [Unreleased]

### Added
- Score increment animations (count-up effect) on task completion screens
- Empty state illustrations with CSS-based SVG graphics
- Parsing helpers section comment for code organization
- Profile retake flow E2E tests
- Coach session E2E tests
- Dashboard analytics E2E tests
- Edge case tests (data corruption, quota limits)
- User guide documentation
- API reference documentation

## [Session 9] - 2026-01-02

### Added
- Schema versioning for future data migrations (`_schemaVersion: 1`)
- Filter size setting for varied word counts (Easy/Medium/Hard)

### Changed
- Improved code organization with section comments

## [Phase 7] - 2026-01-02

### Added
- High contrast mode toggle with accessibility-focused color scheme
- Audio N-Back variant with spoken letters
- Response time analytics for N-Back tasks
- Full test coverage (166 tests)

## [Phase 6] - 2026-01-02

### Added
- Operation Span task (math verification + letter recall)
- 3-back N-Back level for advanced users
- Lifestyle correlation graphs (sleep/exercise vs performance)
- Export data to JSON functionality
- Difficulty tiers for Mental Math (Easy/Medium/Hard)
- Category variants for Filter task (Positive/Calm/Strong)
- Addition mode for Mental Math
- Countdown mode for Filter the Positive
- Audio cues option for Cross-modal Binding

## [Phase 5] - 2026-01-02

### Added
- BrainTok micro-tasks with swipeable card interface
- Math Flash micro-task
- Memory Flash micro-task
- Word Match micro-task
- Progress dots and feedback animations

## [Phase 4] - 2026-01-02

### Added
- Task completion animation (success celebration)
- Reduced motion support (prefers-reduced-motion)
- Weekly summary card on dashboard
- Button hover effects
- Keyboard shortcuts (C for Coach, R for retry)

### Improved
- Empty state messaging
- Dashboard weekly comparison

## [Phase 3] - 2026-01-02

### Added
- Dual N-Back task (audio + visual)
- Corsi Block-Tapping task
- Updated domain score calculations for new tasks

## [Phase 2] - 2026-01-02

### Added
- Multiple word lists for WM Span variety
- Performance comparison on results ("5% better than last time")
- Encouragement messages based on persona
- Level 4 for Spatial+Verbal (5 items)

### Improved
- Trend arrows on dashboard

## [Phase 1] - 2026-01-02

### Added
- Personal best tracking with trophy indicator
- Rolling window N-Back adaptation (last 3 sessions)
- Larger touch targets (44px minimum)
- Section comments for code navigation

### Fixed
- Replaced confirm() dialog with inline confirmation
- Reduced toast spam in Coach Session

## [Sprint 5] - Previous

### Added
- PWA installation analytics
- Discovery quiz and personalization
- Persona-based recommendations
- Focus timer with Pomodoro technique
- Real-world wins logging
- Streak calendar visualization

## [Sprint 4] - Previous

### Added
- Discovery quiz flow
- Baseline assessment
- Persona survey (Competitor, Explorer, Struggler)
- Coach mode toggle
- Adaptive difficulty

## [Initial Release]

### Added
- WM Span verbal task
- Spatial+Verbal task
- N-Back classic task
- Filter Positive task
- Mental Math task
- Dashboard with domain scores
- Score sidebar
- localStorage persistence
- PWA support with offline capability
- Mobile-responsive design
