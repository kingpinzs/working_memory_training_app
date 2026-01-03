# ALGORITHM_IMPROVEMENTS.md - Adaptive Difficulty Enhancements

**Date:** January 2, 2026
**Principle:** Enhance what works, only replace if fundamentally broken

---

## 1. Current Algorithm Assessment

### What Exists Today

#### N-Back Adaptation (Coach Mode)
```javascript
// Location: index.html, decideNFromHistory()
function decideNFromHistory(hist) {
  if (!hist) return 1;
  const a2 = Number.isFinite(hist.acc2) ? hist.acc2 : 0;
  const a1 = Number.isFinite(hist.acc1) ? hist.acc1 : parseNAcc(hist.scoreStr);
  if (a2 >= 70) return 2;
  if (a1 >= 85) return 2;
  return 1;
}
```

**What It Does Well:**
- Simple and interpretable
- Uses reasonable thresholds (85% for 1-back mastery, 70% for 2-back competence)
- Prevents frustration by defaulting to easier level
- Considers false alarm count in auto-promotion logic

**Limitations:**
- Only looks at single last session (high variance)
- Binary choice (1 or 2), no 3-back option
- Doesn't track improvement trajectory

#### Other Tasks
No adaptive difficulty currently:
- WM Span: Fixed progression 1->5, stop on failure
- Spatial+Verbal: Fixed 3 levels
- Filter the Positive: Fixed 16 words
- Mental Mult: Fixed 6 problems from 8 options

---

## 2. Recommended Improvements

### 2.1 Rolling Window for N-Back (HIGH PRIORITY)

**Problem:** Single-session decisions are noisy. A bad day can reset progress.

**Solution:** Use rolling window of last 3-5 sessions.

```javascript
function decideNFromHistory(sessions) {
  // Handle empty or no history
  if (!sessions || sessions.length === 0) return 1;

  // Take last 3 sessions (or fewer if not available)
  const recent = sessions.slice(-3);

  // Calculate rolling averages
  let acc2Sum = 0, acc2Count = 0;
  let acc1Sum = 0, acc1Count = 0;

  recent.forEach(s => {
    if (Number.isFinite(s.acc2)) {
      acc2Sum += s.acc2;
      acc2Count++;
    }
    if (Number.isFinite(s.acc1)) {
      acc1Sum += s.acc1;
      acc1Count++;
    }
  });

  const avgAcc2 = acc2Count > 0 ? acc2Sum / acc2Count : 0;
  const avgAcc1 = acc1Count > 0 ? acc1Sum / acc1Count : 0;

  // Decision logic with rolling averages
  if (avgAcc2 >= 75) return 2;  // Consistently good at 2-back
  if (avgAcc1 >= 85) return 2;  // Ready to try 2-back
  return 1;
}
```

**Effort:** Low (1-2 hours)
**Impact:** Medium - Reduces volatility in difficulty assignment

---

### 2.2 Add 3-Back Level (MEDIUM PRIORITY)

**Problem:** No challenge for users who master 2-back.

**Solution:** Add 3-back option for advanced users.

```javascript
function decideNFromHistory(sessions) {
  if (!sessions || sessions.length === 0) return 1;

  const recent = sessions.slice(-3);
  const avgAcc2 = calculateAvg(recent, 'acc2');
  const avgAcc3 = calculateAvg(recent, 'acc3');

  // 3-back if consistently strong at 2-back
  if (avgAcc2 >= 80 && recent.length >= 3) return 3;

  // 2-back if good at 1-back or decent at 2-back
  if (avgAcc2 >= 70) return 2;
  if (calculateAvg(recent, 'acc1') >= 85) return 2;

  return 1;
}
```

**Effort:** Medium (2-3 hours including UI updates)
**Impact:** Low-Medium - Benefits advanced users, small user segment

---

### 2.3 Optimal Challenge Zone Targeting

**Research Finding:** Success probability between 60-80% maximizes learning.

**Current State:**
- N-Back aims for ~85% success before promotion (slightly conservative)
- Other tasks have no adaptive targeting

**Improvement for All Tasks:**

```javascript
// Generic adaptive helper
function shouldIncreaseChallenge(recentScores, threshold = 80) {
  if (recentScores.length < 2) return false;
  const avg = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
  return avg >= threshold;
}

function shouldDecreaseChallenge(recentScores, threshold = 50) {
  if (recentScores.length < 2) return false;
  const avg = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
  return avg < threshold;
}
```

**Effort:** Medium (design per-task metrics)
**Impact:** Medium - Better calibration across all tasks

---

### 2.4 Staircase for WM Span (LOW PRIORITY)

**Current:** 1-up/1-down (advance on success, stop on failure)

**Improvement:** 2-up/1-down staircase

```javascript
async function runSpan(doSave = true) {
  let level = 1;
  let consecutiveSuccess = 0;
  let bestLevel = 0;

  while (level <= 6) {
    const words = spanLists[level];
    const ok = await spanTrial(level, words, doSave);

    if (ok) {
      consecutiveSuccess++;
      if (level > bestLevel) bestLevel = level;

      // 2-up: Need 2 consecutive successes to advance
      if (consecutiveSuccess >= 2) {
        level++;
        consecutiveSuccess = 0;
      }
    } else {
      // 1-down: Single failure drops level or ends
      if (level === 1) break; // Already at minimum
      level--;
      consecutiveSuccess = 0;
    }
  }

  // ... save result
}
```

**Effort:** Medium (3-4 hours)
**Impact:** Low - More forgiving progression

---

### 2.5 Response Time Analysis (FUTURE)

**Concept:** Track reaction time in addition to accuracy.

```javascript
// In N-Back stimulus presentation
const stimulusStart = performance.now();
document.onkeydown = (e) => {
  if (e.code === 'Space' && canPress) {
    const rt = performance.now() - stimulusStart;
    rtData.push(rt);
    // ... existing hit/FA logic
  }
};
```

**Use Cases:**
- Identify speed-accuracy tradeoff
- Detect when user is "gaming" (random fast pressing)
- Personalize stimulus timing based on typical RT

**Effort:** High (4-6 hours + analysis)
**Impact:** Medium - More nuanced performance understanding

---

## 3. Additional Metrics to Track

### Per-Session Metrics

| Metric | Current | Proposed | Status |
|--------|---------|----------|--------|
| Accuracy | Yes | Yes | ✅ Exists |
| False Alarms | Yes (N-Back only) | Yes (all tasks) | ✅ Phase 7 |
| Response Time | No | Add for N-Back | ✅ Phase 7 |
| Time to Complete | Yes (Filter) | Add for all | ❌ Deferred |
| Personal Best | No | Add for all | ✅ Phase 1 |

### Cross-Session Metrics

| Metric | Current | Proposed | Status |
|--------|---------|----------|--------|
| Domain Scores | Yes | Keep | ✅ Exists |
| Streak | Yes | Keep | ✅ Exists |
| Improvement Trend | Yes (baseline vs current) | Add week-over-week | ✅ Phase 4 |
| Session Count | Indirect | Add explicit tracking | ✅ Exists |

### Proposed Schema Additions

```javascript
// Add to store record
{
  // Existing fields...
  responseTime: 450,        // Average RT in ms (where applicable)
  personalBest: true,       // Boolean flag if this beats previous best
  sessionNumber: 42,        // Cumulative session count
}

// Add to profile
{
  // Existing fields...
  totalSessions: 42,
  lastSessionDate: '2026-01-02',
  streakRecord: 14,         // Longest streak ever
}
```

---

## 4. Coach Session Improvements

### Current Flow
```
Filter Positive -> N-Back -> Spatial+Verbal -> Mental Mult
```

### Proposed Improvements

1. **Warm-up Selection Based on Recent Performance**
   - If attention scores are low, emphasize N-Back
   - If spatial scores are low, add Corsi Block

2. **Session Duration Matching**
   - Respect user's `preferences.sessionLength`
   - Quick: 3 tasks
   - Deep: 5 tasks including new exercises

3. **Progress-Based Task Selection**
   ```javascript
   function selectSessionTasks(profile, scores) {
     const tasks = [];
     const domains = calculateDomainScores(scores, profile);

     // Always include warm-up
     tasks.push('filterPos');

     // Add tasks for weakest domains
     const weakest = Object.entries(domains)
       .sort((a, b) => a[1].current - b[1].current)
       .slice(0, 2)
       .map(([domain]) => domain);

     weakest.forEach(domain => {
       if (domain === 'attention') tasks.push('nback');
       if (domain === 'verbal') tasks.push('span');
       if (domain === 'spatial') tasks.push('spatial');
     });

     // Add challenge task if performing well
     if (domains.attention.current >= 70) {
       tasks.push('dualNback'); // When implemented
     }

     return tasks;
   }
   ```

---

## 5. NOT Recommended (Overkill)

### Reinforcement Learning
- Research exists for RL-based difficulty adaptation
- Too complex for current scope
- Current threshold-based approach is adequate

### Machine Learning for Personalization
- Could predict optimal difficulty
- Requires backend infrastructure
- Not necessary for MVP

### Real-time Psychometric Modeling
- Could estimate true ability via IRT
- Academic complexity not justified
- Simple rolling averages are sufficient

---

## 6. Implementation Priority

| Improvement | Effort | Impact | Priority | Status |
|-------------|--------|--------|----------|--------|
| Rolling window for N-Back | Low | Medium | P1 | ✅ Phase 1 |
| Personal best tracking | Low | Medium | P1 | ✅ Phase 1 |
| Add 3-back level | Medium | Low | P3 | ✅ Phase 6 |
| 2-up/1-down staircase | Medium | Low | P3 | ❌ Deferred |
| Response time tracking | High | Medium | P4 | ✅ Phase 7 |
| Dynamic Coach Session | Medium | Medium | P2 | ✅ Session 8 |
| Week-over-week trends | Low | Low | P3 | ✅ Phase 4 |

---

## 7. Summary

**Keep:**
- Threshold-based decision logic
- Coach Mode toggle
- Per-task scoring
- Domain aggregation

**Enhance:**
- Use rolling window (3 sessions) instead of single session
- Add personal best flags
- Track session counts

**Add Later:**
- 3-back level
- Response time analysis
- Dynamic Coach Session task selection

**Don't Do:**
- ML/RL approaches (overkill)
- Complex psychometric models (not needed)
