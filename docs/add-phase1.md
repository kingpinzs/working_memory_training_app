# Architecture Design Document: Phase 1
**Project:** Working Memory Lab - "The Stickiness Threshold"
**Version:** 1.0
**Date:** 2025-11-11
**Author:** BMad Master Agent (Architect Persona)

## 1. Introduction

This document outlines the technical architecture for implementing the features defined in the Phase 1 Product Requirements Document (`prd-phase1.md`). The design prioritizes progressive enhancement, modularity, and data model integrity while respecting the existing vanilla JavaScript, framework-less nature of the application.

### Guiding Principles
*   **Minimize Refactoring:** Introduce new functionality with minimal disruption to existing, stable code.
*   **Data Isolation:** Use separate `localStorage` keys for new, high-volume data streams to prevent performance degradation of core analytics.
*   **Modularity:** Encapsulate new features into distinct functions (`draw*`, `run*`, `save*`) to improve readability and maintainability.
*   **Progressive Enhancement:** Build features that work in the current single-file structure but are designed for potential future migration to a more sophisticated architecture (e.g., ES Modules).

---

## 2. Feature #1: Discovery Quiz & Personalized Configuration

This feature addresses `FR-1` through `FR-4` by creating a guided onboarding experience for new users and personalizing the application based on their goals and baseline cognitive profile.

### 2.1. Data Model (`localStorage`)

A new, dedicated `localStorage` key will be created to store user profile data.

*   **Key:** `wmLabProfile`
*   **Value:** A single JSON object.
*   **Structure:**
    ```json
    {
      "username": "Jeremy",
      "primaryGoal": "focus", // 'focus', 'memory', 'problem-solving'
      "cognitiveBaseline": {
        "attention": 78, // Percentile scores
        "verbal": 85,
        "spatial": 65
      },
      "configuration": {
        "recommendedTasks": ["nback", "span"],
        "coachMode": true
      },
      "onboardingComplete": true
    }
    ```
*   **Rationale:** Isolating profile data from performance data (`wmLab`) simplifies data management and prevents the main score object from becoming cluttered with static configuration details.

### 2.2. UI Components & Rendering

*   The quiz will be rendered directly into the main `#screen` element.
*   The UI will consist of a series of simple views (e.g., welcome, goal selection, baseline tasks, results) rendered by a single orchestrator function.

### 2.3. Core Logic & Functions

1.  **`initializeApp()` (New Entry Point):**
    *   **Responsibility:** This function will become the new application entry point, called on `body.onload`. It will check for the existence of `wmLabProfile`.
    *   **Workflow:**
        *   If `wmLabProfile.onboardingComplete` is `true`, it calls the existing `drawLaunchPad()` function.
        *   If not, it calls `runQuiz()` to start the onboarding process.

2.  **`runQuiz()` (New Orchestrator):**
    *   **Responsibility:** An `async` function that manages the multi-step quiz flow.
    *   **Signature:** `async function runQuiz()`
    *   **Workflow:**
        1.  `await` a step to get the user's name.
        2.  `await` a step to get the user's primary goal.
        3.  Run abbreviated versions of key tasks (e.g., one block of N-Back, one set of Digit Span) to establish a baseline.
        4.  Calculate baseline percentile scores.
        5.  Call `applyConfiguration(profile)` to save the final profile object.
        6.  Finally, call `drawLaunchPad()`.

3.  **`applyConfiguration(profile)` (New Utility):**
    *   **Responsibility:** Saves the generated profile to `localStorage` and adjusts application settings.
    *   **Signature:** `function applyConfiguration(profile)`

---

## 3. Feature #2: Enhanced Analytics & Cognitive Domain Dashboard

This feature addresses `FR-5` through `FR-9` by transforming the "Progress" tab from a simple list of scores into a rich, multi-dimensional dashboard.

### 3.1. Data Model (`localStorage`)

*   No new data models are required. This feature will read from the existing `wmLab` store and the new `wmLabProfile` store.

### 3.2. UI Components & Rendering

1.  **Dashboard View:** The existing `drawScores()` function will be heavily refactored to render a dashboard instead of a simple table.
2.  **New UI Elements:**
    *   **Cognitive Domain Scores:** A top-level summary showing percentile scores for Attention, Verbal WM, and Spatial WM, derived from the user's performance history.
    *   **Streak Calendar:** A GitHub-style contribution graph showing daily training activity.
    *   **Domain-Specific Charts:** Clickable elements that allow users to drill down into performance for a specific cognitive domain.

### 3.3. Core Logic & Functions

1.  **`drawScores()` (Refactored):**
    *   **Responsibility:** Renders the main dashboard view.
    *   **Workflow:**
        1.  Fetch all data from `store.get()`.
        2.  Calculate cognitive domain scores using new helper functions (e.g., `calculateAttentionScore(nbackHistory)`).
        3.  Call `updateStreak()` to get streak data.
        4.  Render the main dashboard HTML, including the streak calendar and summary scores.
        5.  Attach event listeners for drill-down charts.

2.  **`drawDomainChart(domain)` (New):**
    *   **Responsibility:** Renders a detailed historical performance chart for a specific domain (e.g., 'Attention').
    *   **Signature:** `function drawDomainChart(domain)`
    *   **Workflow:**
        1.  Filter the `wmLab` data to get only tasks relevant to the specified `domain`.
        2.  Use the existing `plot()` utility to render a time-series chart showing performance on those tasks.

3.  **`updateStreak()` (New):**
    *   **Responsibility:** Calculates the user's current and longest training streaks.
    *   **Signature:** `function updateStreak()`
    *   **Workflow:**
        1.  Get all timestamps from the `wmLab` store.
        2.  Iterate through the unique days to find consecutive training days.
        3.  Returns an object: `{ current: 5, longest: 12, activity: [/*...timestamps...*/] }`.
    *   **Integration:** This function will be called by `drawScores()` and can also be hooked into `store.push()` to provide real-time feedback.

---

## 4. Feature #3: Real-World Transfer Validation

This feature addresses `FR-10` by providing a simple, low-friction way for users to log instances of noticing their working memory improvements in daily life.

### 4.1. Data Model (`localStorage`)

A new, simple, append-only log will be created.

*   **Key:** `wmLabRealWorld`
*   **Value:** An array of log entry objects.
*   **Structure:**
    ```json
    [
      {
        "ts": 1731304800000,
        "type": "realWorldLog",
        "note": "Remembered everyone's name in the meeting without taking notes."
      },
      // ... more entries
    ]
    ```
*   **Rationale:** A separate, simple log is efficient and easy to integrate into the analytics dashboard.

### 4.2. UI Components & Rendering

1.  **"Log a Win" Button:** A prominent button will be added to the main launchpad and the progress dashboard.
2.  **Input Modal:** Clicking the button will open a simple modal (rendered as a div overlay, not a native dialog) with a `textarea` and a "Save" button.

### 4.3. Core Logic & Functions

1.  **`openRealWorldModal()`:**
    *   **Responsibility:** Renders the modal UI for logging a real-world success.
    *   **Signature:** `function openRealWorldModal()`

2.  **`saveRealWorldLog()`:**
    *   **Responsibility:** Handles the save action from the modal.
    *   **Signature:** `function saveRealWorldLog()`
    *   **Workflow:**
        1.  Get the text from the `textarea`.
        2.  If the text is not empty, create the log object: `{ note }`.
        3.  Call `store.push('realWorldLog', logEntry)`.
        4.  Close the modal and show a `toast('Great job! Logged.')`.

### 4.4. Integration with Analytics

*   The refactored `drawScores()` function will fetch these logs and display the most recent ones on the dashboard, providing qualitative reinforcement alongside quantitative data.

---

## 5. Feature #4: Manual Sleep/Exercise Tracking (MVP)

This feature provides the foundational mechanism for users to log key lifestyle variables, enabling future analysis of their impact on cognitive performance as per `FR-10` and `FR-11`.

### 5.1. Data Model (`localStorage`)

To keep the MVP lean, we will introduce a single new data object within the main `wmLab` store.

*   **Key:** `health` (within the `wmLab` object)
*   **Value:** An array of daily health log objects.
*   **Structure:**
    ```javascript
    // store.get().health ->
    [
      {
        "ts": 1731304800000, // Timestamp for the logged day
        "type": "health",     // Auto-added by store.push
        "sleepHours": 7.5,
        "exerciseMins": 30,
        "notes": "Felt a bit groggy, but run was good."
      }
    ]
    ```
*   **Rationale:** A unified `health` object is simpler for the MVP and can be extended later.

### 5.2. UI Components & Rendering

1.  **New Tab:** A new "Log" tab will be added to the main navigation in `index.html`.
2.  **Logging Interface (`#screen`):** A new function, `drawHealthLog()`, will render a simple form with inputs for date, sleep hours, exercise minutes, and notes.

### 5.3. Core Logic & Functions

1.  **`drawHealthLog()`:**
    *   **Responsibility:** Renders the HTML form for data entry and displays any existing log for the selected date.
    *   **Signature:** `function drawHealthLog()`

2.  **`saveHealthLog()`:**
    *   **Responsibility:** Reads form data, validates it, and saves it to the store.
    *   **Signature:** `function saveHealthLog()`
    *   **Workflow:** Get values, validate, construct object, call `store.push('health', healthEntry)`, and show a `toast`.

### 5.4. Integration with Analytics

*   The `drawScores()` function will be modified to fetch `store.get().health` data and overlay it on the main performance chart, allowing visual correlation.

---

## 6. Feature #5: BrainTok Micro-Task Feed (MVP)

This feature introduces a fast-paced, "endless" feed of micro-cognitive tasks, as specified in `FR-12` through `FR-17`, designed for high-engagement, short-burst training.

### 6.1. Data Model (`localStorage`)

A separate, dedicated `localStorage` key will be used to handle the high volume of data.

*   **Key:** `wmLabBrainTok`
*   **Value:** An array of micro-task result objects.
*   **Structure:**
    ```json
    [
      {
        "ts": 1731304800000,
        "taskType": "simple-rt",
        "correct": true,
        "rt": 280
      }
    ]
    ```
*   **Rationale:** This append-optimized structure isolates high-frequency data from the core `wmLab` store, preserving performance.

### 6.2. UI Components & Rendering

1.  **New Tab:** A "BrainTok" tab will be added to the main navigation in `index.html`.
2.  **BrainTok Interface (`#screen`):** The UI will update *in-place* for each task to maximize performance, creating the illusion of a feed without the cost of DOM reflows.

### 6.3. Core Logic & Functions

1.  **`drawBrainTok()`:** Renders the initial "Start" screen.
2.  **`runBrainTokSession()`:** The main `async` loop that orchestrates the session.
    *   **Workflow:** In a loop, it will randomly select a micro-task, `await` its execution, save the result immediately to `wmLabBrainTok`, provide instant UI feedback, and pause briefly before the next task.
3.  **Micro-Task Functions (MVP Set):**
    *   `async function runSimpleReactionTask()` (Tap on change)
    *   `async function runChoiceReactionTask()` (Tap Left/Right for color)
    *   `async function runNumberMatchTask()` (Are numbers same?)

### 6.4. Analytics & Gamification

*   A "BrainTok Score" will be calculated from reaction time, accuracy, and task velocity.
*   This score will be displayed live during the session and summarized in a new "BrainTok Stats" section on the Progress tab.
