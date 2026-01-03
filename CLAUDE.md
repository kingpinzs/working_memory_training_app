# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A client-side web application for cognitive training and assessment of working memory. Built as a single-page app (SPA) with vanilla JavaScript, no build tools or frameworks. All data persists in browser localStorage.

## Commands

### Testing
```bash
npm test                    # Run all Playwright tests
npm run test:headed         # Run tests with browser visible
npm run test:ui             # Interactive Playwright UI mode
npm run test:report         # View HTML test report
npx playwright test <file>  # Run specific test file
```

### Development
No build step required. Open `.html` files directly in browser (file:// protocol).

## Architecture

### Version Files Pattern
- **`index.html`**: Current production version
- **`indexv2.html` → `indexv6.html`**: Feature iterations and experiments
- **Version selection rule**: Use `index.html` for core fixes. New features go in latest `indexvN.html`, then may be backported if proven

### Core Components (all in-file, no modules)
1. **Tab navigation** (`[role="tab"]` elements) → routes to `draw*()` view functions
2. **Assessment tasks** → async `run*()` functions (e.g., `runSpan()`, `runNBack()`, `runSpatial()`)
3. **Store** → localStorage wrapper with `get()`, `set()`, `push()` methods (key: `wmLab`)
4. **Prefs** → separate localStorage for user preferences (key: `wmLabPrefs`)
5. **Screen rendering** → dynamic content injection into `#screen` element

### Data Persistence
```javascript
// Store structure (key: wmLab)
{
  "span": [{scoreStr, bestLevel, ts, type}, ...],
  "nback": [{scoreStr, acc1, acc2, fa1, fa2, ts, type}, ...],
  "spatial": [{scoreStr, level, cleared, ts, type}, ...],
  "filterPos": [{scoreStr, acc, time, ts, type}, ...],
  "mult": [{scoreStr, acc, ts, type}, ...]
}

// Prefs structure (key: wmLabPrefs)
{ "coachMode": true|false }
```

### Async Task Pattern
All assessments follow this structure:
```javascript
async function runTaskName() {
  return new Promise(async resolve => {
    // Render UI to screen element
    // Set up event handlers
    // Use await wait(ms) for timing delays
    // Call resolve(result) on completion
  });
}
```

### Coach Mode Adaptive Logic
When `coachMode` is ON (`coachOn()` returns true):
- **N-Back**: Uses `decideNFromHistory()` to start at 1-back or 2-back based on last performance
- **Spatial+Verbal**: Requires perfect verbal checks AND correct position recall to advance
- **Filter Positive**: Performance gates next session intensity (>=90% acc in <=25s)

## Testing

Tests use Playwright against file:// protocol. Test files are in `tests/`:
- `smoke.spec.js` - App load and basic navigation
- `core-tasks.spec.js` - WM Span, N-Back, Spatial+Verbal tasks
- `pwa.spec.js` - PWA functionality
- `pwa-analytics.spec.js` - Installation analytics tracking

## Anti-Patterns to Avoid

- Don't add external dependencies (jQuery, React, etc.)
- Don't break localStorage schema (maintain backward compatibility)
- Don't use `alert()` or `confirm()` (use inline feedback or `toast()`)
- Don't use `setInterval` without cleanup (clear timers in Promise resolution)
- Avoid async/await at top-level (wrap in IIFE if needed)

## BMAD Integration

The `.bmad/` folder contains BMAD (Behavior-driven Method for AI Development) agent configurations. These are separate from development workflow and can be ignored unless modifying agent behavior.
