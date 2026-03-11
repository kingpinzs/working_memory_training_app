# Sprint 3 Planning Document
**Project:** Working Memory Lab  
**Sprint:** Sprint 3 - Enhanced Analytics & Real-World Validation  
**Date Created:** 2025-11-11  
**Target Completion:** TBD  
**Status:** 📋 PLANNING

---

## Sprint Goal

Transform the analytics experience from basic score tracking to a comprehensive cognitive performance dashboard with real-world impact validation. Enable users to see their improvement across cognitive domains, maintain training consistency through streak tracking, and connect lab performance to real-world benefits.

---

## Sprint Context

### What We've Built (Sprint 1 & 2)
✅ Discovery Quiz with baseline assessment  
✅ Personalized user profiles  
✅ Focus timer with session tracking  
✅ Lifestyle logging (sleep/exercise)  
✅ BrainTok placeholder (MVP structure)  

### What's Missing
❌ Visual representation of cognitive domain performance  
❌ Streak/consistency tracking  
❌ Real-world transfer validation  
❌ Correlation between lifestyle and performance  
❌ Drill-down analytics for specific domains  

---

## Sprint 3 Epics

### Epic 6: Enhanced Analytics Dashboard 📊
**Priority:** HIGH  
**Functional Requirements:** FR-5 to FR-9 from PRD  
**Effort Estimate:** Large (60% of sprint)

**Goal:** Replace the simple score list with a multi-dimensional dashboard showing cognitive domain performance, training streaks, and drill-down capabilities.

#### User Stories

**Story 6.1: Cognitive Domain Score Cards**
- **As a** user
- **I want to** see my performance broken down by cognitive domain (Attention, Verbal WM, Spatial WM)
- **So that** I can identify my strengths and areas for improvement

**Acceptance Criteria:**
- [ ] Dashboard displays 3 domain score cards (Attention, Verbal WM, Spatial WM)
- [ ] Each card shows current percentile score (0-100)
- [ ] Scores are calculated from recent performance (last 10 sessions)
- [ ] Visual indicator shows if score improved/declined since baseline
- [ ] Clicking a domain card opens drill-down view

**Technical Tasks:**
- [ ] Create `calculateDomainScores()` function
  - Map tasks to domains: N-Back→Attention, Span→Verbal, Spatial→Spatial
  - Calculate percentile from normalized performance metrics
  - Compare to baseline from `wmLabProfile`
- [ ] Refactor `drawScores()` → `drawDashboard()`
- [ ] Design domain score card UI (CSS)
- [ ] Implement domain card rendering

---

**Story 6.2: Training Streak Calendar**
- **As a** user
- **I want to** see a visual calendar of my training activity
- **So that** I can maintain consistency and build a habit

**Acceptance Criteria:**
- [ ] Dashboard displays GitHub-style contribution calendar
- [ ] Each day shows activity intensity (0 = none, 1-3+ = sessions)
- [ ] Shows last 12 weeks of activity
- [ ] Displays current streak and longest streak stats
- [ ] Hover shows date and session count

**Technical Tasks:**
- [ ] Create `updateStreak()` function
  - Parse all timestamps from `wmLab`
  - Identify unique training days
  - Calculate current streak (consecutive days)
  - Calculate longest streak
  - Return activity array with dates and counts
- [ ] Create `renderStreakCalendar()` function
  - Generate 12-week grid (84 days)
  - Map activity data to grid cells
  - Apply color intensity based on session count
- [ ] Add calendar CSS (grid layout, color scales)
- [ ] Integrate into dashboard

---

**Story 6.3: Domain Drill-Down Charts**
- **As a** user
- **I want to** click a domain card to see detailed historical performance
- **So that** I can track improvement trends over time

**Acceptance Criteria:**
- [ ] Clicking domain card switches to drill-down view
- [ ] Drill-down shows time-series chart of domain performance
- [ ] Chart displays last 30 days of data points
- [ ] Each data point shows specific task results
- [ ] "Back to Dashboard" button returns to main view

**Technical Tasks:**
- [ ] Create `drawDomainChart(domain)` function
  - Filter `wmLab` by domain-relevant tasks
  - Extract time-series data (date, score)
  - Reuse existing `drawMiniChart()` utility
  - Add interactive tooltips
- [ ] Add domain filtering logic
- [ ] Implement view navigation (dashboard ↔ drill-down)

---

### Epic 7: Real-World Transfer Validation 🌍
**Priority:** HIGH  
**Functional Requirements:** FR-10 from PRD  
**Effort Estimate:** Medium (25% of sprint)

**Goal:** Enable users to log instances where they notice working memory improvements in daily life, creating a qualitative feedback loop that reinforces training motivation.

#### User Stories

**Story 7.1: "Log a Win" Feature**
- **As a** user
- **I want to** quickly log when I notice my working memory helping me in real life
- **So that** I can connect lab training to real-world benefits

**Acceptance Criteria:**
- [ ] "Log a Win" button visible on Dashboard and Launchpad
- [ ] Clicking button opens modal overlay
- [ ] Modal has textarea for free-text entry (max 280 chars)
- [ ] "Save" button adds entry with timestamp
- [ ] Modal closes and shows success toast
- [ ] Entry persists in localStorage

**Technical Tasks:**
- [ ] Create `realWorldStore` using Store class (array-based)
- [ ] Create `openRealWorldModal()` function
  - Render modal overlay with textarea
  - Add Save and Cancel handlers
  - Handle keyboard shortcuts (Esc to close, Enter to save)
- [ ] Create `saveRealWorldLog()` function
  - Validate text is not empty
  - Save to `wmLabRealWorld` localStorage key
  - Show success toast
  - Close modal
- [ ] Add modal CSS (overlay, centered box, animations)
- [ ] Add "Log a Win" buttons to views

---

**Story 7.2: Display Recent Wins on Dashboard**
- **As a** user
- **I want to** see my recent real-world wins displayed on the dashboard
- **So that** I stay motivated by seeing concrete benefits

**Acceptance Criteria:**
- [ ] Dashboard shows "Recent Wins" section
- [ ] Displays last 5 logged wins with timestamps
- [ ] Shows total win count
- [ ] If no wins logged, shows encouraging prompt
- [ ] Entries display relative time (e.g., "2 days ago")

**Technical Tasks:**
- [ ] Integrate real-world logs into `drawDashboard()`
- [ ] Create `renderRecentWins()` helper function
- [ ] Add relative time formatting utility
- [ ] Design wins display UI (card or list)

---

### Epic 8: Lifestyle-Performance Correlation 📈
**Priority:** MEDIUM  
**Functional Requirements:** FR-10, FR-11 from PRD  
**Effort Estimate:** Small (15% of sprint)

**Goal:** Provide initial insights connecting lifestyle habits (sleep/exercise) to cognitive performance.

#### User Stories

**Story 8.1: Lifestyle Data Visualization on Dashboard**
- **As a** user
- **I want to** see my sleep and exercise trends alongside performance metrics
- **So that** I can understand how lifestyle impacts my cognition

**Acceptance Criteria:**
- [ ] Dashboard shows lifestyle summary (last 7 days)
- [ ] Displays average sleep hours and exercise minutes
- [ ] Shows simple overlay on performance chart (optional toggle)
- [ ] Color-codes days with good/poor lifestyle habits

**Technical Tasks:**
- [ ] Create `getLifestyleSummary()` function
  - Aggregate last 7 days from `lifestyleStore`
  - Calculate averages for sleep and exercise
  - Identify high/low days
- [ ] Add lifestyle summary cards to dashboard
- [ ] Create optional chart overlay toggle
- [ ] Add visual correlation indicators

---

**Story 8.2: Lifestyle Insights (Basic)**
- **As a** user
- **I want to** receive simple insights about lifestyle-performance patterns
- **So that** I can optimize my habits for better cognitive performance

**Acceptance Criteria:**
- [ ] Dashboard shows insight box if patterns detected
- [ ] Examples: "Performance is 15% better after 7+ hours sleep"
- [ ] Updates weekly as more data is collected
- [ ] Only shows insights with statistical confidence

**Technical Tasks:**
- [ ] Create `calculateLifestyleInsights()` function
  - Correlate sleep with N-Back accuracy
  - Correlate exercise with task completion rate
  - Use basic statistical thresholds
  - Generate human-readable insight strings
- [ ] Add insights display component
- [ ] Implement minimum data threshold (e.g., 14 days)

---

## Technical Architecture

### New Components

```
Enhanced Dashboard Architecture:
├── drawDashboard()           # Main orchestrator (replaces drawScores)
│   ├── renderDomainCards()   # 3 cognitive domain cards
│   ├── renderStreakCalendar() # Activity heatmap
│   ├── renderRecentWins()    # Real-world validation log
│   └── renderLifestyleSummary() # Sleep/exercise trends
│
├── drawDomainChart(domain)   # Drill-down view
│   └── Uses existing drawMiniChart()
│
├── Modal System
│   ├── openRealWorldModal()
│   └── closeModal()
│
└── Analytics Utilities
    ├── calculateDomainScores()
    ├── updateStreak()
    ├── getLifestyleSummary()
    └── calculateLifestyleInsights()
```

### Data Models

**New localStorage Keys:**
```javascript
// Real-world wins log
wmLabRealWorld: [
  {
    ts: "2025-11-11T20:00:00.000Z",
    note: "Remembered everyone's name at meeting"
  }
]

// No new keys needed for analytics - reads from existing:
// - wmLab (task performance)
// - wmLabProfile (baseline scores)
// - wmLabFocus (focus sessions)
// - wmLabLifestyle (sleep/exercise)
```

### Existing Data Enhancements

**Domain Mapping:**
```javascript
const domainMap = {
  attention: ['nback', 'filterPos'],
  verbal: ['span', 'mult'],
  spatial: ['spatial', 'crossmodal']
};
```

---

## Success Metrics

### Quantitative
- [ ] Dashboard loads in <500ms
- [ ] All 3 domain scores calculate correctly
- [ ] Streak calendar displays 12 weeks of history
- [ ] Real-world logs save and display in <100ms
- [ ] Lifestyle correlations show with 14+ days data

### Qualitative
- [ ] Dashboard feels more informative than old score list
- [ ] Streak calendar motivates daily training
- [ ] Real-world wins reinforce training value
- [ ] Insights provide actionable lifestyle guidance

---

## Dependencies & Risks

### Dependencies
- ✅ Existing `wmLab` store with task performance data
- ✅ Existing `wmLabProfile` with baseline scores
- ✅ Existing `lifestyleStore` (added in Sprint 2)
- ✅ Existing `drawMiniChart()` utility for visualizations

### Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Performance degradation with large datasets | High | Medium | Limit chart data to last 30 days, lazy load drill-downs |
| Streak calculation complexity | Medium | Low | Use simple day-based iteration, cache results |
| Statistical insights misleading with small data | High | High | Require minimum 14-day threshold, show confidence level |
| Modal z-index conflicts | Low | Low | Use explicit high z-index (999), test thoroughly |

---

## Testing Strategy

### Unit Testing
- [ ] Domain score calculation logic
- [ ] Streak calculation edge cases (gaps, timezones)
- [ ] Lifestyle correlation math
- [ ] Data filtering and aggregation

### Integration Testing
- [ ] Dashboard renders with real data
- [ ] Domain drill-down navigation
- [ ] Modal open/close interactions
- [ ] localStorage read/write operations

### User Acceptance Testing
- [ ] Complete user flow: view dashboard → drill into domain → log a win
- [ ] Verify insights are actionable and accurate
- [ ] Test with various data scenarios (empty, sparse, rich)
- [ ] Mobile responsiveness check

---

## Definition of Done

- [ ] All acceptance criteria met for each story
- [ ] No console errors in browser
- [ ] All new functions have inline documentation
- [ ] Manual testing completed (checklist)
- [ ] Data persists correctly across page reloads
- [ ] Dashboard is responsive (mobile/tablet/desktop)
- [ ] Sprint 3 retrospective document created
- [ ] CHANGELOG.md updated
- [ ] Code committed to staging branch

---

## Sprint Timeline (Proposed)

**Phase 1: Analytics Core (Stories 6.1, 6.2)**
- Refactor drawScores → drawDashboard
- Implement domain score calculation
- Build streak calendar
- **Checkpoint:** Dashboard v1 functional

**Phase 2: Real-World Validation (Story 7.1, 7.2)**
- Create modal system
- Implement "Log a Win" feature
- Integrate wins into dashboard
- **Checkpoint:** Real-world logging works end-to-end

**Phase 3: Lifestyle Correlation (Story 8.1, 8.2)**
- Add lifestyle summary to dashboard
- Implement insight generation
- Polish and optimize
- **Checkpoint:** All epics complete

**Phase 4: Testing & Documentation**
- Comprehensive testing
- Bug fixes
- Sprint retrospective
- CHANGELOG update

---

## Open Questions

1. **Chart Library:** Continue with custom `drawMiniChart()` or introduce lightweight library (Chart.js)?
   - **Recommendation:** Stick with custom for consistency and zero dependencies
   
2. **Insight Complexity:** How sophisticated should lifestyle insights be?
   - **Recommendation:** Keep it simple for MVP (basic correlation), expand in Sprint 4

3. **Domain Score Algorithm:** Use percentile, z-score, or custom scale?
   - **Recommendation:** Percentile (0-100) for user-friendliness

4. **Streak Definition:** Require minimum task count per day, or any activity counts?
   - **Recommendation:** Any logged task counts as activity to encourage consistency

---

## Resources

- **Architecture Doc:** `docs/add-phase1.md` (Section 3)
- **PRD:** `docs/prd-phase1.md` (FR-5 to FR-11)
- **Sprint 2 Retrospective:** `docs/sprint-2-retrospective.md`
- **Existing Code:** `index.html` (current implementation)

---

## Next Steps

1. **Review & Approve:** Discuss this plan and get stakeholder buy-in
2. **Prioritize:** Confirm story priorities and adjust if needed
3. **Estimate:** Refine effort estimates for each story
4. **Start:** Begin Phase 1 (Analytics Core)

**Ready to begin Sprint 3?** 🚀
