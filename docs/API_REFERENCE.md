# Working Memory Lab - API Reference

## Core Architecture

The app is a single-page application (SPA) built with vanilla JavaScript. All code resides in `index.html`.

## Data Persistence

### Store Class
```javascript
class Store {
  constructor(key, isArray = false)
  get()           // Returns stored data
  set(data)       // Overwrites entire store
  push(key, obj)  // Appends to array at key (adds timestamp)
}
```

### Storage Keys
| Key | Purpose | Structure |
|-----|---------|-----------|
| `wmLab` | Score history | `{ span: [], nback: [], spatial: [], ... }` |
| `wmLabPrefs` | User preferences | `{ coachMode, highContrast, persona, ... }` |
| `wmLabLifestyle` | Lifestyle logs | `[{ sleep, exercise, date }, ...]` |
| `wmLabRealWorldWins` | Win logs | `[{ description, category, ts }, ...]` |
| `wmLabPWAAnalytics` | PWA events | `[{ event, timestamp, data }, ...]` |
| `wmLabFocus` | Focus sessions | `[{ duration, ts }, ...]` |

## Task Functions

All assessment tasks follow this async pattern:
```javascript
async function runTaskName() {
  return new Promise(async resolve => {
    // 1. Render UI to screen element
    // 2. Set up event handlers
    // 3. Use await wait(ms) for timing
    // 4. Call resolve(result) on completion
  });
}
```

### Core Tasks
| Function | Description | Returns |
|----------|-------------|---------|
| `runSpan()` | WM Span verbal task | Best level reached |
| `runSpatial()` | Spatial+Verbal task | Levels cleared |
| `runCrossModal()` | Cross-modal binding | Levels cleared |
| `runNBack()` | Classic N-Back | Accuracy percentages |
| `runDualNBack()` | Dual N-Back (audio+visual) | Position/audio accuracy |
| `runAudioNBack()` | Audio-only N-Back | Accuracy percentages |
| `runCorsi()` | Corsi block tapping | Span score |
| `runOpSpan()` | Operation span | Letter/math accuracy |
| `runFilterPos()` | Filter positive task | Accuracy and time |
| `runMult()` | Mental math | Correct count |

## Helper Functions

### Performance Tracking
```javascript
isPersonalBest(taskKey, value)        // Check if new PB
getPerformanceComparison(taskKey, value) // "5% better than last time"
getEncouragement(isGood, isPB)        // Persona-based feedback
```

### Parsing Helpers
```javascript
parseSpanFromScore(scoreStr)  // Extract level from "Best L3"
parseNAcc(scoreStr)           // Extract accuracy from N-Back score
parseFilterAcc(scoreStr)      // Parse "7/10" to 70
parseMultAcc(scoreStr)        // Parse multiplication accuracy
```

### Analytics Functions
```javascript
calculateWeeklyStats(storeData)       // This week vs last week
calculateDomainScores(storeData, profile)  // Verbal/Spatial/Attention
calculateLifestyleCorrelations(taskData, lifestyleData)
calculateCorrelation(x, y)            // Pearson correlation
```

### UI Utilities
```javascript
toast(message, type)          // Show notification ('ok', 'warn', 'err')
wait(ms)                      // Promise-based delay
animateNumber(el, start, end, duration, suffix)  // Count-up animation
$(selector)                   // document.querySelector shorthand
```

## Tab System

### Tab Content Renderers
```javascript
drawDashboard()    // Analytics and charts
drawLaunchpad()    // Task buttons
drawBrainTok()     // Micro-task cards
drawFocus()        // Focus timer
drawProfile()      // User profile
```

### Navigation
```javascript
// Tabs use data-tab attribute
<button role="tab" data-tab="dashboard">
// Click handler switches aria-selected and calls draw function
```

## Coach Mode

### Adaptive Logic
```javascript
coachOn()                     // Check if coach mode enabled
decideNFromHistory()          // Determine N-Back starting level
runCoachSession()             // Orchestrate guided session
```

### Coach Mode Rules
- N-Back: Uses last 3 sessions to set starting level
- Spatial+Verbal: Requires perfect verbal AND spatial for advancement
- Filter Positive: Performance gates next session intensity

## Schema Versioning

```javascript
// In wmLab store
{
  "_schemaVersion": 1,
  "span": [...],
  ...
}
```

Migration function runs on app load to upgrade legacy data formats.

## PWA Features

### Service Worker
- Cache-first strategy for static assets
- Version-based cache invalidation
- Offline functionality

### Installation Analytics
```javascript
trackPWAEvent(eventName, data)  // Log PWA-related events
isPWAInstalled()                // Check install state
```

## Testing

Tests use Playwright with file:// protocol:
```javascript
const indexPath = 'file://' + path.resolve(__dirname, '../index.html');
```

### Test Patterns
```javascript
// Clear localStorage before tests
await page.evaluate(() => localStorage.clear());

// Set up test data
await page.evaluate(() => {
  localStorage.setItem('wmLab', JSON.stringify(testData));
});
```

## Exposed Global Functions

For testing purposes, certain functions are exposed:
```javascript
window.toast = toast;
window.coachOn = coachOn;
```
