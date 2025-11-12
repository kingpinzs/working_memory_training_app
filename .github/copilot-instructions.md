# Working Memory Training App - AI Agent Instructions

## Project Overview
A client-side web application for cognitive training and assessment of working memory. Built as a single-page app (SPA) with vanilla JavaScript, no build tools or frameworks. All data persists in browser localStorage—no backend required.

## Architecture & File Structure

### Version Files Pattern
- **`index.html`**: Current production version (simple lab interface)
- **`indexv2.html` → `indexv6.html`**: Feature iterations and experiments
  - `indexv6.html`: Adds "Mind Arcade" gamified experiences
  - `indexv5.html`: Game-focused variant with Lab/Arcade dual view
  - Earlier versions: Progressive feature additions (mental rotation, emotion N-Back, etc.)
- **Version selection rule**: Use `index.html` for core fixes. New features typically go in latest `indexvN.html`, then may be backported to `index.html` if proven

### Core Components (all in-file, no modules)
1. **Tab navigation** (`[role="tab"]` elements) → routes to `draw*()` view functions
2. **Assessment tasks** → async `run*()` functions (e.g., `runSpan()`, `runNBack()`, `runSpatial()`)
3. **Store** → localStorage wrapper with `get()`, `set()`, `push()` methods
4. **Prefs** → separate localStorage for user preferences (Coach Mode toggle)
5. **Screen rendering** → dynamic `innerHTML` injection into `#screen` element

## Data Persistence Pattern

### Store Structure (key: `wmLab`)
```javascript
{
  "span": [{scoreStr, bestLevel, ts, type}, ...],
  "nback": [{scoreStr, acc1, acc2, fa1, fa2, ts, type}, ...],
  "spatial": [{scoreStr, level, cleared, ts, type}, ...],
  "filterPos": [{scoreStr, acc, time, ts, type}, ...],
  "mult": [{scoreStr, acc, ts, type}, ...]
}
```
- Each task type = array of result objects
- `store.push(key, entry)` auto-adds `ts` (timestamp) and `type` fields
- CSV export flattens all entries with standardized columns

### Prefs Structure (key: `wmLabPrefs`)
```javascript
{ "coachMode": true|false }
```

## Critical Conventions

### 1. Async Task Pattern
All assessments follow this structure:
```javascript
async function runTaskName() {
  // Setup & UI
  return new Promise(async resolve => {
    screen.innerHTML = `<markup>`;
    // Event handlers
    // await wait() for timing
    // resolve(result) on completion
  });
}
```
- Use `wait(ms)` utility (Promise-based) for all timing delays
- Always clean up event listeners before resolving

### 2. Coach Mode Adaptive Logic
When `coachMode` is ON (`coachOn()` returns true):
- **N-Back**: Uses `decideNFromHistory()` to start at 1-back or 2-back based on last performance
  - If 1-back accuracy ≥85% AND false alarms ≤2 → auto-promotes to 2-back block
- **Spatial+Verbal**: Requires perfect verbal checks AND correct position recall to advance
- **Filter Positive**: Performance gates next session intensity (≥90% acc in ≤25s)

### 3. Score String Format
Each task has a human-readable `scoreStr`:
- **Span**: `"Best L3"` (level reached)
- **N-Back**: `"1-back H/M/FA 12/2/1 · 2-back 15/3/2"` (hits/misses/false alarms)
- **Spatial**: `"2/3"` (cleared/total)
- **Filter Positive**: `"14/16 in 18.3s"` (correct/total in time)
- **Mental Mult**: `"5/6"` (correct/total)

### 4. UI Rendering Flow
- Tab clicks → `draw*()` functions update `#screen` innerHTML
- Button `data-run` attributes → launch task runners
- All dynamic content uses template literals injected via `innerHTML`
- CSS custom properties (`:root` vars) for theming—no CSS classes for colors

## Common Development Workflows

### Adding a New Assessment
1. Add button with `data-run="taskKey"` in Launchpad
2. Create `async function runTaskKey()` following async task pattern
3. Add score parsing function `parseTaskKeyAcc(scoreStr)` for Progress chart
4. Update `keyMeta` object in `renderScores()` with display name
5. Call `store.push('taskKey', {scoreStr, ...metrics})` on completion

### Modifying Coach Session
See `runCoachSession()` in `index.html` line ~670:
- Sequence: Filter-Positive (warm-up) → N-Back (adaptive) → Spatial (binding) → Mental Mult (finisher)
- Gate logic is inline—modify thresholds (e.g., `acc1>=85`) to adjust difficulty progression
- History lookup: `store.get().taskKey.slice(-1)[0]` gets last run

### Debugging localStorage
- Open DevTools → Application → Local Storage → `file://`
- Keys: `wmLab` (scores), `wmLabPrefs` (settings)
- Use "Reset scores" button or `localStorage.removeItem('wmLab')` in console

## Testing Without a Server
Just open `.html` files directly in browser (file:// protocol). No build step needed.
- Keyboard shortcuts: `Enter` (submit), `Space` (N-Back response), `Esc` (pause—not impl. everywhere)
- LocalStorage persists across page reloads but is origin-specific (file:// quirks vary by browser)

## Cognitive Science Context
Tasks are based on validated working memory research:
- **WM Span**: Reverse digit/word span (classic Baddeley phonological loop)
- **N-Back**: Continuous performance test (Jaeggi et al. dual n-back)
- **Spatial+Verbal Binding**: Tests central executive coordination (Baddeley & Hitch model)
- **Cross-modal Binding**: Color-shape associations (episodic buffer)
- Performance metrics (hits, misses, false alarms) map to signal detection theory

## Anti-Patterns to Avoid
- ❌ Don't add external dependencies (jQuery, React, etc.)—keep it vanilla JS
- ❌ Don't break localStorage schema—maintain backward compatibility for existing users
- ❌ Don't use `alert()` or `confirm()`—use inline feedback or `toast()` helper
- ❌ Don't use `setInterval` without cleanup—clear timers in Promise resolution
- ❌ Avoid async/await at top-level (not in all browsers)—wrap in IIFE if needed

## BMAD Agent Integration
The `.bmad/` and `.github/chatmodes/` folders contain BMAD (Behavior-driven Method for AI Development) agent configurations. These are separate from this codebase's development workflow and can be ignored unless modifying agent behavior.
