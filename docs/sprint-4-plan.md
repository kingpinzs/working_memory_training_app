# Sprint 4 Planning Document
**Project:** Working Memory Lab  
**Sprint:** Sprint 4 - Discovery Quiz & PWA Foundation  
**Date Created:** 2025-11-11  
**Target Completion:** TBD  
**Status:** 📋 PLANNING

---

## Sprint Goal

Complete the core Phase 1 PRD features by implementing the **Discovery Quiz & Personalization Engine** and establishing **Progressive Web App (PWA) capabilities**. Enable users to establish their cognitive baseline, receive personalized training recommendations, and access the app offline with app-like installation experience.

---

## Sprint Context

### What We've Built (Sprints 1-3)
✅ Core cognitive assessments (N-Back, Span, Spatial, etc.)  
✅ Enhanced analytics dashboard with domain scores  
✅ Streak calendar and consistency tracking  
✅ Real-world validation ("Log a Win" feature)  
✅ Lifestyle-performance correlation analysis  
✅ Focus timer with session tracking  
✅ Manual lifestyle logging (sleep/exercise)  
✅ BrainTok educational content placeholder  
✅ Coach Mode with adaptive difficulty  

### What's Missing (From PRD Phase 1)
❌ **Discovery Quiz** - Personalized onboarding and baseline assessment (FR-1, FR-2, FR-3)  
❌ **User Profile System** - Storing quiz results and preferences  
❌ **Personalized UI** - Adapting interface based on user persona  
❌ **PWA Capabilities** - Service worker, manifest, offline support  
❌ **Push Notifications** - Training reminders and streak alerts  
❌ **Enhanced Gamification** - Mind Arcade expansion (optional for Sprint 4)

### Implementation Status
**Note:** `indexv5.html` and `indexv6.html` contain partial implementations of Mind Arcade (gamified exercises). These can be referenced for Sprint 4+ but are not in the current production `index.html`.

---

## Sprint 4 Epics

### Epic 9: Discovery Quiz & Personalization Engine 🎯
**Priority:** CRITICAL  
**Functional Requirements:** FR-1, FR-2, FR-3 from PRD  
**Effort Estimate:** Large (50% of sprint)

**Goal:** Implement intelligent onboarding that establishes baseline cognitive profile, identifies user persona, and personalizes the app experience from first interaction.

#### User Stories

**Story 9.1: Welcome Screen & Quick Demo**
- **As a** new user
- **I want to** see a welcoming introduction and try a sample task
- **So that** I understand what the app does before committing to the full quiz

**Acceptance Criteria:**
- [ ] Detect first-time user (no `wmLabProfile` in localStorage)
- [ ] Display welcome screen with app introduction
- [ ] Offer optional 30-second demo task (simplified 1-back)
- [ ] "Get Started" button launches Discovery Quiz
- [ ] "Skip to App" option available (creates minimal profile)

**Technical Tasks:**
- [ ] Create `isFirstTimeUser()` detection function
- [ ] Create `drawWelcome()` function for welcome screen
- [ ] Implement `runQuickDemo()` - 5-trial simplified N-Back
- [ ] Add welcome flow to app initialization
- [ ] Design welcome screen UI (motivational, clear value prop)

---

**Story 9.2: Baseline Cognitive Assessment**
- **As a** new user
- **I want to** complete rapid cognitive tests
- **So that** the app knows my starting performance level

**Acceptance Criteria:**
- [ ] **Verbal Span**: 3-trial rapid span test (digits only)
- [ ] **Spatial Span**: 3-trial rapid grid test (3x3 grid)
- [ ] **Attention**: 1-back test (20 trials, simplified)
- [ ] Total assessment time: Under 3 minutes
- [ ] Results stored in baseline format for future comparison
- [ ] Progress indicator shows quiz completion (e.g., "Step 1 of 4")

**Technical Tasks:**
- [ ] Create `runDiscoveryQuiz()` orchestrator function
- [ ] Implement `runBaselineSpan()` - rapid 3-trial version
- [ ] Implement `runBaselineSpatial()` - rapid 3-trial version
- [ ] Implement `runBaseline1Back()` - 20-trial simplified version
- [ ] Create `calculateBaselineScores()` function
  - Normalize scores to percentiles (0-100)
  - Determine cognitive domain strengths
- [ ] Add quiz progress UI component
- [ ] Store baseline in `wmLabProfile.baseline`

---

**Story 9.3: Preference Discovery & Persona Mapping**
- **As a** new user
- **I want to** answer questions about my preferences and goals
- **So that** the app can tailor its interface and recommendations to me

**Acceptance Criteria:**
- [ ] **Training Style** question: Visual vs Auditory preference
- [ ] **Motivation** question: Progress vs Competition focus
- [ ] **Session Length** question: Quick (5-10min) vs Deep (15-30min)
- [ ] **Interface** question: Game-like vs Clinical presentation
- [ ] **Primary Goal** question maps to persona:
  - "Improve my memory" → Struggler
  - "Beat my best scores" → Competitor
  - "Understand my cognition" → Scientist
- [ ] Optional context questions: Age range, smartwatch ownership
- [ ] All questions have clear "Skip" option
- [ ] Quiz feels conversational, not like a survey

**Technical Tasks:**
- [ ] Create `runPreferenceQuiz()` function
- [ ] Design multi-choice quiz UI (radio buttons or cards)
- [ ] Implement `mapToPersona(goalAnswer)` function
- [ ] Create `buildUserProfile(baseline, preferences)` function
- [ ] Store preferences in `wmLabProfile.preferences`
- [ ] Add "Skip" logic for optional questions

---

**Story 9.4: Profile Generation & Personalized Experience**
- **As a** new user
- **I want to** see my personalized profile and recommendations
- **So that** I know the app "gets me" and I'm ready to start

**Acceptance Criteria:**
- [ ] Generate `wmLabProfile` object with complete data structure
- [ ] Display profile summary screen:
  - Persona badge ("The Struggler", "The Competitor", "The Scientist")
  - Baseline scores for 3 cognitive domains
  - Personalized recommendations (which tasks to start with)
  - Motivational message tailored to persona
- [ ] **Personalization applied:**
  - Struggler → Default tab: Progress (to see improvement)
  - Competitor → Default tab: Launchpad (to chase scores)
  - Scientist → Default tab: Progress (for detailed analytics)
- [ ] "Start Training" button launches first recommended task
- [ ] Profile accessible later via Settings/Profile tab

**Technical Tasks:**
- [ ] Create `generateUserProfile()` function
- [ ] Create `wmLabProfile` localStorage schema:
  ```javascript
  {
    created: "ISO timestamp",
    persona: "struggler|competitor|scientist",
    baseline: { attention: 65, verbal: 72, spatial: 58 },
    preferences: { style, motivation, sessionLength, interface },
    context: { ageRange, hasSmartwatch },
    recommendations: ["nback", "span", "spatial"]
  }
  ```
- [ ] Create `drawProfileSummary()` function
- [ ] Implement `applyPersonalization()` function
  - Set default tab based on persona
  - Adjust UI language (encouraging vs challenging)
  - Customize Coach Mode recommendations
- [ ] Add "View Profile" tab or settings section

---

**Story 9.5: Returning User Experience**
- **As a** returning user
- **I want to** skip the quiz and see my existing profile
- **So that** I can jump straight into training

**Acceptance Criteria:**
- [ ] App detects existing `wmLabProfile` on load
- [ ] Skip welcome/quiz flow entirely
- [ ] Apply saved personalization preferences
- [ ] Display personalized dashboard based on persona
- [ ] Option to "Retake Discovery Quiz" in settings (resets profile)

**Technical Tasks:**
- [ ] Add profile detection to app initialization
- [ ] Create `loadUserProfile()` function
- [ ] Create `resetProfile()` function for retaking quiz
- [ ] Add "Retake Quiz" button to settings/profile view

---

### Epic 10: Progressive Web App (PWA) Foundation 📱
**Priority:** HIGH  
**Functional Requirements:** NFR-1 (Offline Support), NFR-2 (Performance) from PRD  
**Effort Estimate:** Medium (35% of sprint)

**Goal:** Transform the web app into an installable PWA with offline capabilities, enabling app-like user experience and persistent access without internet.

#### User Stories

**Story 10.1: Web App Manifest**
- **As a** user
- **I want to** install the app to my home screen
- **So that** it feels like a native app with its own icon and window

**Acceptance Criteria:**
- [ ] Create `manifest.json` with complete metadata
- [ ] App name: "Working Memory Lab"
- [ ] Short name: "WM Lab"
- [ ] App icons: 192x192 and 512x512 PNG
- [ ] Display mode: "standalone" (no browser UI)
- [ ] Theme color matches app design (dark blue: #0f1522)
- [ ] Background color for splash screen
- [ ] Start URL: "/" or "/index.html"
- [ ] Orientation: "portrait" (primary)
- [ ] Install prompt appears on supported browsers

**Technical Tasks:**
- [ ] Create `/manifest.json` file
- [ ] Design app icons (192x192, 512x512)
  - Brain or neuron icon
  - Dark background to match app theme
  - Export as PNG
- [ ] Add manifest link to `index.html` `<head>`
- [ ] Add theme-color meta tag
- [ ] Test install on Chrome/Edge (desktop and mobile)
- [ ] Verify icons display correctly on home screen

---

**Story 10.2: Service Worker & Offline Support**
- **As a** user
- **I want to** use the app offline
- **So that** I can train anywhere, even without internet

**Acceptance Criteria:**
- [ ] Service worker caches all app assets on first visit
- [ ] App loads and functions fully offline
- [ ] localStorage data persists offline
- [ ] Training tasks work without network
- [ ] Service worker updates automatically on app update
- [ ] Cache strategy: Cache-first for static assets
- [ ] Offline status indicator (optional)

**Technical Tasks:**
- [ ] Create `/sw.js` (service worker file)
- [ ] Implement install event - cache static assets:
  - `index.html`
  - CSS (inline, but cache anyway for future versions)
  - JS (inline, but cache anyway for future versions)
  - Icons (192x192, 512x512)
  - Manifest
- [ ] Implement fetch event - serve from cache, fallback to network
- [ ] Implement activate event - clean up old caches
- [ ] Register service worker in `index.html`:
  ```javascript
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
  ```
- [ ] Add cache versioning for updates
- [ ] Test offline functionality:
  - Disconnect network
  - Verify app loads
  - Verify tasks run
  - Verify data saves to localStorage

---

**Story 10.3: Install Prompt & Onboarding**
- **As a** user
- **I want to** be prompted to install the app
- **So that** I can easily add it to my device

**Acceptance Criteria:**
- [ ] Defer default browser install prompt
- [ ] Show custom install banner at appropriate time:
  - After completing Discovery Quiz, OR
  - After first successful training session, OR
  - On 2nd+ visit if not installed
- [ ] Install banner is dismissible
- [ ] Banner shows once per session (don't spam)
- [ ] "Install App" button triggers install prompt
- [ ] Track install status in localStorage

**Technical Tasks:**
- [ ] Capture `beforeinstallprompt` event
- [ ] Create custom install UI component (banner or modal)
- [ ] Implement install prompt logic:
  ```javascript
  let installPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    installPrompt = e;
    // Show custom install UI
  });
  ```
- [ ] Add "Install" button click handler
- [ ] Track install status:
  - `appinstalled` event listener
  - Store in localStorage: `wmLabPWA.installed = true`
- [ ] Hide install UI if already installed
- [ ] Design install banner UI (non-intrusive, value-focused)

---

**Story 10.4: Push Notifications (Optional - MVP)**
- **As a** user
- **I want to** receive reminders to train
- **So that** I maintain my streak and build consistency

**Acceptance Criteria:**
- [ ] Request notification permission after 3+ successful sessions
- [ ] User can enable/disable notifications in settings
- [ ] Daily reminder notification at preferred time (default: 8pm)
- [ ] Streak alert: "Don't break your 7-day streak! Train today"
- [ ] Notifications work when app is closed (PWA only)
- [ ] Graceful degradation if notifications not supported

**Technical Tasks:**
- [ ] Request notification permission:
  ```javascript
  if ('Notification' in window) {
    Notification.requestPermission();
  }
  ```
- [ ] Create notification scheduling logic
  - Use `setInterval` or `setTimeout` for in-app reminders
  - Service worker background sync for true push (future)
- [ ] Store notification preferences:
  ```javascript
  wmLabPrefs.notifications = {
    enabled: true,
    time: "20:00",
    streakAlerts: true
  }
  ```
- [ ] Create notification UI in settings
- [ ] Implement daily reminder:
  - Check last training date
  - If not trained today and time >= preferredTime → send notification
- [ ] Design notification messages:
  - "Time to train! Keep your streak alive 🔥"
  - "Your brain is waiting! Quick 5-min session?"
  - "Don't break that 12-day streak!"

**Note:** True push notifications require HTTPS and service worker push API. For MVP, implement in-app reminders when app is open. Full push in future sprint.

---

### Epic 11: Polish & Optimization 🎨
**Priority:** MEDIUM  
**Effort Estimate:** Small (15% of sprint)

**Goal:** Enhance user experience with performance optimizations, UI refinements, and accessibility improvements.

#### User Stories

**Story 11.1: Performance Optimization**
- **As a** user with extensive data
- **I want to** experience fast load times
- **So that** the app feels responsive even with months of history

**Acceptance Criteria:**
- [ ] Dashboard renders in <500ms with 100+ data points
- [ ] Lazy load drill-down charts (only render on click)
- [ ] Limit chart data to last 30 days by default
- [ ] Add "View More" option to load older data
- [ ] localStorage read/write operations are batched
- [ ] No layout shift during load (reserve space for charts)

**Technical Tasks:**
- [ ] Implement data pagination for charts
- [ ] Add lazy loading for expensive visualizations
- [ ] Cache calculated domain scores (invalidate daily)
- [ ] Profile performance with Chrome DevTools
- [ ] Optimize streak calendar rendering (use DocumentFragment)

---

**Story 11.2: Accessibility Enhancements**
- **As a** user with accessibility needs
- **I want to** use keyboard navigation and screen readers
- **So that** the app is inclusive and usable for everyone

**Acceptance Criteria:**
- [ ] All interactive elements keyboard accessible
- [ ] Tab order is logical and predictable
- [ ] ARIA labels on all buttons and inputs
- [ ] Screen reader announces quiz progress
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG AA standards (4.5:1)
- [ ] Modal dialogs trap focus (can't tab outside)

**Technical Tasks:**
- [ ] Add ARIA labels to unlabeled buttons
- [ ] Implement focus trapping in modals
- [ ] Add `role` and `aria-*` attributes to quiz components
- [ ] Test with screen reader (NVDA or JAWS)
- [ ] Test keyboard-only navigation
- [ ] Verify color contrast with accessibility tools

---

**Story 11.3: Error Handling & Edge Cases**
- **As a** developer
- **I want to** handle errors gracefully
- **So that** users never see broken experiences

**Acceptance Criteria:**
- [ ] localStorage quota exceeded → show warning and export prompt
- [ ] Corrupted localStorage data → reset gracefully with user consent
- [ ] Missing profile data → trigger Discovery Quiz
- [ ] Browser doesn't support PWA → app still works, no errors
- [ ] Service worker fails → app falls back to online mode
- [ ] Notification permission denied → hide notification settings

**Technical Tasks:**
- [ ] Add try/catch blocks to all localStorage operations
- [ ] Implement `validateLocalStorageData()` on app load
- [ ] Create error recovery flow for corrupted data
- [ ] Add feature detection for PWA APIs:
  ```javascript
  const isPWASupported = 'serviceWorker' in navigator && 'PushManager' in window;
  ```
- [ ] Add graceful degradation messaging
- [ ] Implement localStorage quota check

---

## Technical Architecture

### New Components

```
Discovery Quiz Flow:
├── isFirstTimeUser()           # Detect new vs returning
├── drawWelcome()               # Welcome screen
├── runQuickDemo()              # Optional 30s demo
├── runDiscoveryQuiz()          # Main orchestrator
│   ├── runBaselineSpan()       # 3-trial rapid span
│   ├── runBaselineSpatial()    # 3-trial rapid grid
│   ├── runBaseline1Back()      # 20-trial simplified
│   ├── runPreferenceQuiz()     # Preferences & persona
│   └── generateUserProfile()   # Create wmLabProfile
├── drawProfileSummary()        # Show results
└── applyPersonalization()      # Customize UI

PWA Infrastructure:
├── manifest.json               # App metadata & icons
├── sw.js                       # Service worker
│   ├── install event          # Cache assets
│   ├── fetch event            # Serve from cache
│   └── activate event         # Clean old caches
└── Notification System
    ├── requestPermission()    # Ask for notifications
    ├── scheduleReminder()     # Daily training reminder
    └── checkStreak()          # Streak alert logic
```

### Data Models

**New localStorage Keys:**
```javascript
// User profile (created by Discovery Quiz)
wmLabProfile: {
  created: "2025-11-11T20:00:00.000Z",
  persona: "struggler|competitor|scientist",
  baseline: {
    attention: 65,    // Percentile score 0-100
    verbal: 72,
    spatial: 58
  },
  preferences: {
    style: "visual|auditory",
    motivation: "progress|competition",
    sessionLength: "quick|deep",
    interface: "game|clinical"
  },
  context: {
    ageRange: "18-24|25-34|35-44|45-54|55+|skip",
    hasSmartwatch: true|false|null
  },
  recommendations: ["nback", "span", "spatial"]  // Ordered by weakness
}

// PWA status (install tracking)
wmLabPWA: {
  installed: true|false,
  installPromptShown: "2025-11-11T20:00:00.000Z",
  installPromptDismissed: 0  // Count of dismissals
}

// Notification preferences (extends existing wmLabPrefs)
wmLabPrefs: {
  coachMode: true|false,
  notifications: {
    enabled: true|false,
    time: "20:00",           // Preferred reminder time
    streakAlerts: true|false
  }
}
```

---

## Success Metrics

### Quantitative
- [ ] Discovery Quiz completion rate: ≥85%
- [ ] Quiz completion time: ≤5 minutes average
- [ ] Profile generation success rate: 100%
- [ ] PWA install rate: ≥20% of users after 3+ sessions
- [ ] Offline functionality: 100% feature parity
- [ ] Dashboard load time: <500ms with 100 data points
- [ ] Notification opt-in rate: ≥40%

### Qualitative
- [ ] New users understand app value within 2 minutes
- [ ] Personalization feels accurate and helpful
- [ ] Install prompt feels natural, not pushy
- [ ] Offline experience is seamless (user barely notices)
- [ ] Notifications are motivating, not annoying

---

## Dependencies & Risks

### Dependencies
- ✅ Existing cognitive task implementations (span, nback, spatial)
- ✅ localStorage infrastructure
- ✅ Dashboard and analytics system (Sprint 3)
- ⚠️ HTTPS required for PWA features (testing on localhost OK, production needs HTTPS)
- ⚠️ App icons need to be designed/created

### Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Quiz feels too long/boring | High | Medium | Make it fun, visual progress, quick demo option |
| Personalization feels creepy/wrong | Medium | Low | Transparent explanations, retake option, minimal data collection |
| PWA install not working | High | Low | Graceful degradation, app works without install |
| Notification permission denied | Medium | High | Don't request until user engaged (3+ sessions) |
| localStorage quota exceeded | Medium | Low | Implement quota check, prompt export before limit |
| Service worker caching issues | Medium | Medium | Cache versioning, clear instructions for updates |
| Icons look unprofessional | Low | Medium | Use simple, high-contrast design; test on multiple devices |

---

## Testing Strategy

### Unit Testing
- [ ] Profile generation logic
- [ ] Persona mapping from quiz answers
- [ ] Baseline score calculation
- [ ] Service worker cache/fetch logic
- [ ] Notification scheduling logic

### Integration Testing
- [ ] Complete Discovery Quiz flow (new user)
- [ ] Returning user detection and profile load
- [ ] PWA install flow (Chrome, Edge, Safari)
- [ ] Offline mode (disconnect network, verify full functionality)
- [ ] Notification permission and scheduling

### User Acceptance Testing
- [ ] **Scenario 1:** New user → Welcome → Quick demo → Full quiz → Profile → First task
- [ ] **Scenario 2:** Returning user → App loads with personalization → Continue training
- [ ] **Scenario 3:** Install PWA → Use offline → Data syncs on reconnect
- [ ] **Scenario 4:** Enable notifications → Receive daily reminder
- [ ] **Scenario 5:** Retake quiz → Profile updates → New personalization

### Cross-Browser Testing
- [ ] Chrome (desktop & mobile)
- [ ] Edge
- [ ] Safari (iOS & macOS)
- [ ] Firefox
- [ ] Verify PWA support varies (graceful degradation)

---

## Definition of Done

- [ ] All acceptance criteria met for each story
- [ ] No console errors in browser
- [ ] Discovery Quiz is engaging and completes in <5 min
- [ ] User profile generates correctly and personalizes UI
- [ ] PWA manifest and service worker functional
- [ ] App installs on home screen (Chrome/Edge)
- [ ] App works 100% offline
- [ ] Notification system functional (in-app reminders minimum)
- [ ] Manual testing completed (all scenarios)
- [ ] Cross-browser testing passed
- [ ] Performance benchmarks met (<500ms dashboard load)
- [ ] Accessibility audit passed (keyboard nav, ARIA labels)
- [ ] Sprint 4 retrospective document created
- [ ] CHANGELOG.md updated
- [ ] Code committed to staging branch
- [ ] Ready for production deployment (merge to main)

---

## Sprint Timeline (Proposed)

**Phase 1: Discovery Quiz Core (Stories 9.1-9.3)**
- Welcome screen and quick demo
- Baseline cognitive assessment
- Preference quiz and persona mapping
- **Checkpoint:** Quiz flow complete, basic profile generation working

**Phase 2: Personalization & Profile (Stories 9.4-9.5)**
- Profile generation and storage
- Personalized UI and recommendations
- Returning user experience
- **Checkpoint:** Personalization applied, users see tailored experience

**Phase 3: PWA Foundation (Stories 10.1-10.3)**
- Create manifest and icons
- Implement service worker
- Add install prompt
- **Checkpoint:** App installs and works offline

**Phase 4: Notifications & Polish (Stories 10.4, 11.1-11.3)**
- Notification system (in-app reminders)
- Performance optimization
- Accessibility enhancements
- Error handling
- **Checkpoint:** All epics complete, polished experience

**Phase 5: Testing & Documentation**
- Comprehensive testing (unit, integration, UAT)
- Cross-browser testing
- Bug fixes
- Sprint retrospective
- CHANGELOG update

---

## Open Questions

1. **Quiz Aesthetic:** Should Discovery Quiz feel clinical/scientific or fun/gamified?
   - **Recommendation:** Hybrid - scientifically credible but visually engaging

2. **Icon Design:** DIY or hire designer for app icons?
   - **Recommendation:** DIY with simple brain/neuron icon, iterate later if needed

3. **Notification Timing:** When to request notification permission?
   - **Recommendation:** After 3rd successful session, during high engagement moment

4. **Profile Visibility:** Dedicated Profile tab or buried in Settings?
   - **Recommendation:** Prominent "Profile" button in header, shows summary

5. **Retake Quiz:** Should retaking quiz reset all data or preserve it?
   - **Recommendation:** Preserve task history, only update baseline and preferences

6. **Offline Indicator:** Show "Offline Mode" badge or keep it invisible?
   - **Recommendation:** Small, non-intrusive indicator in footer when offline

---

## Resources

- **PRD:** `docs/prd-phase1.md` (Features FR-1 to FR-3, NFR-1)
- **Architecture Doc:** `docs/add-phase1.md`
- **Sprint 3 Retrospective:** `docs/sprint-3-retrospective.md`
- **Existing Code:** `index.html` (current production version)
- **Mind Arcade Reference:** `index5.html`, `indexv6.html` (for future gamification)
- **PWA Guide:** [web.dev/progressive-web-apps](https://web.dev/progressive-web-apps/)
- **Service Worker Docs:** [MDN Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

---

## Deployment Considerations

### Pre-Production Checklist
- [ ] HTTPS required for PWA features
  - localhost: works without HTTPS (testing)
  - GitHub Pages: provides HTTPS automatically
  - Custom domain: requires SSL certificate
- [ ] Icons optimized and compressed
- [ ] Service worker cache version updated
- [ ] Manifest URLs are absolute (not relative)
- [ ] Test install on real devices (not just desktop)

### Post-Deployment Monitoring
- [ ] Track Discovery Quiz completion rate
- [ ] Monitor PWA install conversions
- [ ] Measure offline usage patterns
- [ ] Collect feedback on personalization accuracy
- [ ] Validate notification opt-in rate

---

## Future Considerations (Post-Sprint 4)

### Sprint 5 Candidates
1. **Mind Arcade Full Implementation** (FR-14 to FR-17)
   - Port gamified tasks from `indexv5.html` and `indexv6.html`
   - Infinite scroll feed UI
   - MemoryCoin economy
   - Daily challenges

2. **Advanced PWA Features**
   - Background sync for data backup
   - True push notifications (server-side)
   - Periodic background sync for streak checks
   - Share API integration

3. **Social Features** (Phase 2 PRD)
   - Leaderboards (anonymous or friends)
   - Share wins to social media
   - Community challenges

4. **Smartwatch Integration** (Phase 2 PRD)
   - Automatic sleep/exercise tracking
   - Heart rate variability correlation
   - API integration (Apple Health, Google Fit)

---

## Next Steps

1. **Review & Approve:** Discuss this plan and confirm priorities
2. **Design Icons:** Create 192x192 and 512x512 app icons
3. **Create Test Plan:** Detailed test scenarios for each story
4. **Begin Phase 1:** Start with Welcome screen and Discovery Quiz core

**Ready to begin Sprint 4?** 🚀

---

## Notes

- Discovery Quiz is **highest priority** - it's the first impression for new users
- PWA capabilities are **table stakes** for modern web apps, high ROI
- Mind Arcade (Epic 12 from PRD) is deferred to Sprint 5 - focus on personalization first
- Keep sprint scope manageable - don't try to implement every PRD feature at once
- Accessibility is not optional - build it in from the start

**Success for Sprint 4** = New users complete quiz, get personalized recommendations, install PWA, and feel motivated to continue training.
