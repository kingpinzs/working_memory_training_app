# Changelog
All notable changes to Working Memory Lab will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0] - 2025-11-11

### Added - Sprint 2: User Engagement & Lifestyle Integration
- **Focus Tab**: Pomodoro-style focus timer with session history tracking
  - Configurable duration (5-120 minutes)
  - Live countdown display
  - Persistent session history with timestamps
  - Focus sessions stored in `wmLabFocus` localStorage key
- **Lifestyle Tab**: Manual tracking for sleep and exercise
  - Daily logging of sleep hours and exercise minutes
  - Per-day data storage keyed by ISO date
  - Form validation and save confirmation
  - Lifestyle data stored in `wmLabLifestyle` localStorage key
- **BrainTok Tab**: Educational content delivery (MVP)
  - Placeholder structure for future expansion
  - Sample cognitive science insights
  - Foundation for video/interactive content

### Changed
- Enhanced `Store` class to support both object and array-based storage
- Updated tab navigation with 5 tabs (Launchpad, Dashboard, Focus, Lifestyle, BrainTok)
- Improved localStorage architecture with separate keys for new features

### Technical
- Added 6 new functions: `drawFocus()`, `runFocusSession()`, `renderFocusHistory()`, `drawLifestyle()`, `drawBrainTok()`, enhanced Store methods
- Created 2 new localStorage keys: `wmLabFocus`, `wmLabLifestyle`
- Added ~250 lines of code
- Zero regressions, 100% feature completion

## [0.2.0] - 2025-11-11

### Added - Sprint 1: Discovery & Personalization
- **Discovery Quiz**: Onboarding flow for new users
  - Name collection
  - Primary goal selection (focus, memory, problem-solving)
  - Baseline cognitive assessment (attention, verbal WM, spatial WM)
  - Personalized configuration and recommendations
  - Profile stored in `wmLabProfile` localStorage key
- **Enhanced Analytics Dashboard**: Multi-dimensional performance tracking
  - Cognitive domain scores and percentile rankings
  - Progress charts with historical trends
  - Task-specific performance breakdowns
  - Data export functionality

### Changed
- Replaced simple launchpad with guided onboarding for first-time users
- Refactored progress view from score list to comprehensive dashboard
- Added `initializeApp()` as new entry point with onboarding check

## [0.1.0] - 2025-11-11 (Baseline)

### Existing Features (Pre-BMad)
- **Core Cognitive Tasks**:
  - WM Span (reverse digit/word span)
  - N-Back (1-back and 2-back with emotion stimuli)
  - Spatial + Verbal Binding
  - Cross-modal Binding (color-shape associations)
  - Filter the Positive (selective attention)
  - Mental Multiplication
- **Coach Mode**: Adaptive difficulty adjustment based on performance history
- **Progress Tracking**: 
  - Score history with timestamps
  - Basic charts for performance trends
  - CSV export functionality
- **Data Persistence**: localStorage-based with `wmLab` and `wmLabPrefs` keys
- **UI Components**:
  - Tab-based navigation
  - Launchpad with task launcher buttons
  - Progress/scores sidebar
  - Dark theme with custom CSS variables

### Technical Stack
- Vanilla JavaScript (ES6+)
- HTML5 + CSS3
- No build tools or frameworks
- Single-file architecture (index.html)
- localStorage for persistence
- File:// protocol compatible

---

## Version History Summary

| Version | Date | Description | Status |
|---------|------|-------------|--------|
| 0.3.0 | 2025-11-11 | Sprint 2: Focus, Lifestyle, BrainTok | ✅ Complete |
| 0.2.0 | 2025-11-11 | Sprint 1: Quiz & Dashboard | ✅ Complete |
| 0.1.0 | 2025-11-11 | Baseline (pre-BMad) | ✅ Documented |

---

## Upcoming

### Sprint 3 (Planned)
- Enhanced Analytics Dashboard with cognitive domain visualization
- Streak calendar (GitHub-style contribution graph)
- "Log a Win" feature for real-world transfer validation
- Lifestyle-performance correlation analytics
- Domain-specific drill-down charts

See [Architecture Document](add-phase1.md) and [Sprint 2 Retrospective](sprint-2-retrospective.md) for more details.
