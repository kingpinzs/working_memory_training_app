# EXERCISES_PLAN.md - Exercise Enhancements for Working Memory Lab

**Date:** January 2, 2026
**Principle:** Enhance existing exercises first, add new exercises that complement what exists

---

## Part 1: Existing Exercise Improvements

### 1.1 WM Span (Reverse) - KEEP & ENHANCE

**What Works:**
- Clear task structure (show words, recall in reverse)
- Progressive difficulty (2-6 words)
- Clean feedback on correct/incorrect

**Specific Improvements:**

| Improvement | Description | Effort | Status |
|-------------|-------------|--------|--------|
| Multiple word lists per level | Add 3-4 alternative word lists per level for variety | Low | ✅ Phase 2 |
| Personal best tracking | Show "New personal best!" when exceeding previous best level | Low | ✅ Phase 1 |
| Staircase progression | Use 2-up/1-down instead of 1-up/1-down (more forgiving) | Medium | ❌ Deferred |
| Level 6 | Add 7-word level for advanced users | Low | ✅ Session 8 |
| Digit mode | Alternative mode using digits (0-9) instead of words | Medium | ❌ Deferred |

**Integration with Current System:**
- Store `personalBest` in score record
- Show baseline comparison from Discovery Quiz

---

### 1.2 Spatial+Verbal Binding - KEEP & ENHANCE

**What Works:**
- Dual-task design (memorize position + judge letter match)
- Triangle metaphor is intuitive
- Coach Mode requires both to pass

**Specific Improvements:**

| Improvement | Description | Effort | Status |
|-------------|-------------|--------|--------|
| Separate accuracy tracking | Track verbal accuracy and spatial accuracy independently | Low | ✅ Session 8 |
| Level 4 | Add 5-item level for advanced users | Low | ✅ Phase 2 |
| Partial credit mode | Award points for partially correct responses | Medium | ❌ Deferred |
| Faster tempo option | Reduce display time for advanced users (1200ms -> 800ms) | Low | ❌ Deferred |
| Position variety | Use 4 or 6 positions instead of always 3 triangles | Medium | ❌ Deferred |

**Integration with Current System:**
- Add `verbalAcc` and `spatialAcc` to score record
- Coach Mode continues to require both for advancement

---

### 1.3 Cross-modal Binding - KEEP & ENHANCE

**What Works:**
- Color-shape binding task
- Progressive levels
- Visual feedback on recall

**Specific Improvements:**

| Improvement | Description | Effort | Status |
|-------------|-------------|--------|--------|
| Level 4 | Add 5-item level | Low | ✅ Session 8 |
| Audio cue option | Play color name as audio reinforcement | Medium | ❌ Deferred |
| Time pressure mode | Add optional countdown for recall phase | Low | ❌ Deferred |
| Shape variety | Add more shapes (pentagon, star, diamond) | Low | ✅ Session 8 |

---

### 1.4 N-Back (Emotion) - KEEP & ENHANCE

**What Works:**
- Adaptive 1-back/2-back based on history
- Emotion words add engagement
- Coach Mode auto-promotion logic

**Specific Improvements:**

| Improvement | Description | Effort | Status |
|-------------|-------------|--------|--------|
| 3-back level | Add for advanced users (acc2 >= 80% consistently) | Medium | ✅ Phase 6 |
| Rolling window adaptation | Use last 3 sessions instead of just last 1 | Low | ✅ Phase 1 |
| Visual N-back option | Show positions instead of words (grid-based) | High | ❌ Deferred |
| Mixed modality | Alternate between emotion words and positions | High | ❌ Deferred |
| Response time tracking | Track RT for hits, analyze speed-accuracy tradeoff | Medium | ✅ Phase 7 |

**Adaptation Logic Enhancement:**
```javascript
// Current: decideNFromHistory(hist)
// Proposed: decideNFromHistory(last3Sessions)
function decideNFromHistory(sessions) {
  if (!sessions || sessions.length === 0) return 1;

  // Average of last 3 sessions
  const avgAcc2 = sessions.reduce((sum, s) => sum + (s.acc2 || 0), 0) / sessions.length;
  const avgAcc1 = sessions.reduce((sum, s) => sum + (s.acc1 || 0), 0) / sessions.length;

  if (avgAcc2 >= 75) return 2; // Consistently good at 2-back
  if (avgAcc1 >= 85) return 2; // Ready to try 2-back
  return 1;
}
```

---

### 1.5 Filter the Positive - KEEP & ENHANCE

**What Works:**
- Simple, engaging task
- Time + accuracy tracking
- Good warm-up exercise

**Specific Improvements:**

| Improvement | Description | Effort | Status |
|-------------|-------------|--------|--------|
| Larger word pool | Expand from 16 to 24-30 words | Low | ✅ Session 8 |
| Difficulty levels | Easy (12 words), Medium (18), Hard (24) | Medium | ❌ Deferred |
| Category variants | Filter the Calm (relaxation words) or Filter the Strong (strength words) | Medium | ❌ Deferred |
| Countdown mode | 30-second limit, score by words found | Medium | ❌ Deferred |
| Streak tracking | Track consecutive perfect sessions | Low | ✅ Session 8 |

---

### 1.6 Mental Multiplication - KEEP & ENHANCE

**What Works:**
- Mental math challenge
- Clear feedback
- Rolling sum concept

**Specific Improvements:**

| Improvement | Description | Effort | Status |
|-------------|-------------|--------|--------|
| Difficulty tiers | Easy (single digit), Medium (2x1 digit), Hard (2x2 digit) | Medium | ❌ Deferred |
| Time limit option | Optional countdown per problem | Low | ❌ Deferred |
| Personal best | Track best accuracy streak | Low | ✅ Exists |
| More problems | Increase from 6 to 10 for deeper practice | Low | ✅ Session 8 |
| Operation variety | Add division or addition modes | Medium | ❌ Deferred |

---

## Part 2: New Exercises to Add

### 2.1 Dual N-Back (Priority 1)

**Why It Adds Value:**
- Most researched WM training task
- Distinct from single N-back (simultaneous audio+visual)
- Strong scientific backing for transfer effects

**Design:**
- Visual: Position in 3x3 grid (8 positions, center excluded)
- Audio: Spoken letters (A, B, C, D, E, F, G, H)
- Two response buttons: "Position Match" and "Letter Match"
- Can have position match, letter match, both, or neither

**Difficulty Levels:**
- Level 1: 1-back (easier entry point)
- Level 2: 2-back (standard)
- Level 3: 3-back (advanced)

**Scoring:**
- Hits (correctly identified matches)
- Misses (failed to identify matches)
- False Alarms (incorrect presses)
- Calculate A' or d' for sensitivity

**Integration:**
- Add to Assessments section
- Track separately as `dualNback` in store
- Include in domain scoring (Attention)

**Estimated Effort:** 4-6 hours

---

### 2.2 Corsi Block-Tapping (Priority 2)

**Why It Adds Value:**
- Measures visuospatial short-term memory
- Different from Spatial+Verbal (no verbal interference)
- Well-validated clinical measure
- Complements existing spatial task

**Design:**
- 9 blocks arranged in irregular pattern (not grid)
- Blocks highlight in sequence
- User taps blocks in same order
- Progressive sequence length

**Difficulty Levels:**
- Level 1: 2 blocks
- Level 2: 3 blocks
- Level 3: 4 blocks
- Level 4: 5 blocks
- Level 5: 6 blocks
- Level 6: 7 blocks (Corsi Span typical max)

**Scoring:**
- Corsi Span: Maximum sequence length achieved
- Total correct trials

**Integration:**
- Add to Assessments section
- Track as `corsi` in store
- Include in domain scoring (Spatial)

**Estimated Effort:** 3-4 hours

---

### 2.3 Operation Span (Priority 3)

**Why It Adds Value:**
- Complex span task (processing + storage)
- More demanding than simple span
- Research shows better WM prediction than simple span

**Design:**
- Alternate between math verification and letter memorization
- Math: Simple equation (e.g., "Is 3 + 4 = 8?")
- Letter: Single letter to remember (e.g., "F")
- After set, recall letters in order

**Difficulty Levels:**
- Level 1: 2 math-letter pairs
- Level 2: 3 pairs
- Level 3: 4 pairs
- Level 4: 5 pairs
- Level 5: 6 pairs

**Scoring:**
- Math accuracy (should be high, ensures processing)
- Letter recall accuracy
- Combined score

**Integration:**
- Add to Drills or Assessments section
- Track as `opSpan` in store
- Include in domain scoring (Verbal)

**Estimated Effort:** 4-5 hours

---

## Part 3: BrainTok Micro-Tasks (Per PRD)

The PRD specifies 6 micro-tasks for BrainTok. Here's how they map to existing exercises:

| Micro-Task | Relationship to Existing | Implementation Notes |
|------------|-------------------------|---------------------|
| Math Flash | Variant of Mental Mult | Faster, 1 problem at a time, swipe interface |
| Word Match | New | Match word to category (positive/negative/neutral) |
| Memory Flash | Variant of WM Span | Show 3-4 items, quick recall |
| Speed Sort | New | Drag items into correct categories quickly |
| Pattern Complete | New | Visual pattern completion (next in sequence) |
| Odd One Out | New | Find the item that doesn't belong |

**Recommended Approach:**
1. Implement BrainTok container with swipe navigation
2. Start with 2-3 micro-tasks (Math Flash, Memory Flash, Word Match)
3. Add remaining tasks incrementally

**Estimated Effort:** 6-10 hours for initial 3 micro-tasks

---

## Part 4: Exercise Priority Matrix

| Exercise | Type | Effort | Impact | Priority | Status |
|----------|------|--------|--------|----------|--------|
| N-Back rolling window | Enhancement | Low | Medium | P1 | ✅ Phase 1 |
| WM Span multiple lists | Enhancement | Low | Low | P2 | ✅ Phase 2 |
| Personal best tracking | Enhancement | Low | Medium | P1 | ✅ Phase 1 |
| Dual N-Back | New | High | High | P1 | ✅ Phase 3 |
| Corsi Block-Tapping | New | Medium | Medium | P2 | ✅ Phase 3 |
| Operation Span | New | Medium | Medium | P3 | ✅ Phase 6 |
| BrainTok Math Flash | New (micro) | Low | Medium | P2 | ✅ Phase 5 |
| BrainTok Memory Flash | New (micro) | Low | Medium | P2 | ✅ Phase 5 |
| Filter difficulty levels | Enhancement | Medium | Low | P3 | ❌ Deferred |
| 3-back N-back | Enhancement | Medium | Low | P3 | ✅ Phase 6 |

---

## Part 5: Implementation Sequence

### Phase 1: Quick Wins (1-2 days)
1. Add personal best tracking to all tasks
2. Implement rolling window for N-Back adaptation
3. Add more word lists to WM Span

### Phase 2: New Core Exercise (2-3 days)
1. Implement Dual N-Back
2. Add to Dashboard domain scoring
3. Include in Coach Session rotation

### Phase 3: Complementary Exercise (1-2 days)
1. Implement Corsi Block-Tapping
2. Add to Spatial domain scoring

### Phase 4: BrainTok MVP (2-3 days)
1. Build BrainTok container (swipe UI)
2. Implement Math Flash + Memory Flash
3. Track as separate category in store

---

## Part 6: Data Schema Updates

### New Score Records

```javascript
// Dual N-Back
{
  type: 'dualNback',
  n: 2,
  posHits: 8, posMiss: 2, posFA: 1,
  audioHits: 7, audioMiss: 3, audioFA: 2,
  scoreStr: '2-back: Pos 80%/Audio 70%',
  ts: '...'
}

// Corsi Block
{
  type: 'corsi',
  span: 5,
  trialsCorrect: 4,
  trialsTotal: 5,
  scoreStr: 'Span 5 (4/5)',
  ts: '...'
}

// Operation Span
{
  type: 'opSpan',
  mathAcc: 95,
  letterAcc: 80,
  level: 4,
  scoreStr: 'L4: Math 95%/Letters 80%',
  ts: '...'
}
```

### Domain Mapping Updates

```javascript
const domainMap = {
  attention: ['nback', 'dualNback', 'filterPos'],  // Add dualNback
  verbal: ['span', 'opSpan', 'mult'],              // Add opSpan
  spatial: ['spatial', 'crossmodal', 'corsi']      // Add corsi
};
```
