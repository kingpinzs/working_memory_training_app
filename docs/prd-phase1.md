# Product Requirements Document: Working Memory Lab (Phase 1)

**Version:** 1.0  
**Date:** November 11, 2025  
**Status:** Draft  
**Author:** BMad PM Agent

---

## 1.0 Overview

### 1.1 Introduction
The Working Memory Lab is a client-side web application for cognitive training. This document outlines the requirements for **Phase 1** of its evolution, which focuses on transforming the current proof-of-concept into a personalized, engaging, and scientifically-grounded training tool. The core theme of Phase 1 is **"Personalization, Proof, and Engagement."**

### 1.2 Goals
The primary goal of Phase 1 is to address the key reasons for user churn in cognitive training apps: lack of perceived progress, boredom, and a disconnect from real-world benefits.

**Business Goals:**
- Increase user retention and daily active use.
- Validate the core product hypotheses before investing in more complex features (Phase 2).
- Establish the app as a credible, science-backed tool in a market of questionable claims.

**User Goals:**
- To understand their own cognitive profile.
- To see clear, undeniable proof of their improvement over time.
- To build a consistent training habit.
- To connect in-app training to real-world memory improvements.

### 1.3 Scope
This PRD covers the five research-validated, high-priority features identified for Phase 1.

**In Scope:**
1.  Discovery Quiz & Personalization Engine
2.  Enhanced Analytics & Streak System
3.  Real-World Transfer Validation
4.  Manual Sleep/Exercise Tracking (MVP)
5.  BrainTok Micro-Task Feed (MVP)

**Out of Scope (for Phase 1):**
- Full RPG Story System (Phase 2)
- Smartwatch API Integration (Phase 2)
- Full Social Platform (Guilds, Friends) (Phase 2)
- MemoryCoin Economy (Simulated coins are in, but not a full economy) (Phase 3)
- AI-driven Pattern Discovery (Phase 3)

---

## 2.0 Target Audience

We are designing for three primary user personas:

| Persona | Description | Primary Motivation | Core Need |
| :--- | :--- | :--- | :--- |
| **The Struggler** | Feels their working memory is a significant life challenge. | To "fix" their memory and see proof it's working. | A clear, guided path with strong progress visualization. |
| **The Competitor** | Enjoys challenges and measuring themselves against others. | The thrill of competition and achieving high scores. | Leaderboards, achievements, and score-based challenges. |
| **The Scientist** | Analytical user interested in self-quantification and cognitive science. | To understand how their brain works and access raw data. | Detailed analytics, control over variables, and transparency. |

The **Discovery Quiz** is designed to identify a user's persona and tailor the app experience accordingly.

---

## 3.0 Feature Requirements

### Feature #1: Discovery Quiz & Personalization Engine
*Addresses: User Onboarding, Personalization, Retention*

#### 3.1.1 Introduction & Problem
A one-size-fits-all approach causes user churn. The app must adapt to each individual's goals, preferences, and cognitive baseline from the first interaction to prevent overwhelm and disengagement.

#### 3.1.2 Goals & Objectives
- Increase Week 1 Retention to 60%.
- Achieve an 85% completion rate for the Discovery Quiz.

#### 3.1.3 Functional Requirements & User Stories
-   **FR-1: Welcome & Interactive Demo:**
    -   As a new user, I want to see a welcoming screen and try a quick sample task before committing to the full quiz.
    -   *Acceptance Criteria:* A welcome screen with a "Get Started" button, leading to an optional 30-second micro-task demo.
-   **FR-2: The Discovery Quiz:**
    -   As a new user, I want to complete a short (under 5 min) quiz to get a personalized training plan.
    -   *Acceptance Criteria:*
        -   **2.1: Baseline Profile:** Rapid assessment of Verbal Span, Spatial Span, and 1-Back performance.
        -   **2.2: Preference Discovery:** Questions on preferred training style (Visual/Auditory, Progress/Competition, Quick/Deep, Game/Clinical).
        -   **2.3: Goal Setting:** A single question to map the user to a primary persona (Struggler, Competitor, Scientist).
        -   **2.4: Context Capture (Optional):** Questions about smartwatch ownership and age range, with a clear "Skip" option.
-   **FR-3: Profile Generation & Personalization:**
    -   As a developer, I need the quiz results stored in a `wmLabProfile` object in localStorage.
    -   As a user, I want the app's UI and starting configuration to reflect my quiz answers (e.g., a "Struggler" sees the Progress tab first, a "Competitor" sees the Arcade).

---

### Feature #2: Enhanced Analytics & Streak System
*Addresses: User Motivation, Habit Formation, Perceived Value*

#### 3.2.1 Introduction & Problem
The current "Progress" tab is a data dump, not a motivational tool. Users cannot see their improvement clearly, making it hard to stay engaged.

#### 3.2.2 Goals & Objectives
- Triple user interaction with the Progress tab.
- Increase 30-day retention by 25%.
- Achieve a 20% rate of users establishing a 7-day streak.

#### 3.2.3 Functional Requirements & User Stories
-   **FR-4: Multi-Dimensional Progress Dashboard:**
    -   As a user, I want my progress broken down by skill to see my strengths and weaknesses.
    -   *Acceptance Criteria:* The Progress tab will feature three separate charts: **Verbal Memory** (Span tasks), **Spatial Memory** (Spatial tasks), and **Executive Control** (N-Back tasks).
-   **FR-5: Baseline Comparison Overlay:**
    -   As a user, I want to see how much I've improved since I started.
    -   *Acceptance Criteria:* Each chart will display a dotted line showing the baseline score from the Discovery Quiz. A summary widget will show key improvements (e.g., "Verbal Span: +2 digits").
-   **FR-6: Streak & Habit-Formation System:**
    -   As a user, I want to be rewarded for my consistency.
    -   *Acceptance Criteria:* A streak counter (e.g., "🔥 7") is displayed prominently. It increments for consecutive days of training and resets to zero if a day is missed.
-   **FR-7: Manual Life Factor Logging (MVP):**
    -   As a user, I want to track how my sleep and exercise affect my performance.
    -   *Acceptance Criteria:* A "Daily Log" section allows manual entry for "Hours Slept" and "Exercise Minutes". This data is stored in localStorage.

---

### Feature #3: Real-World Transfer Validation
*Addresses: User Trust, Perceived Value, Scientific Skepticism*

#### 3.3.1 Introduction & Problem
Users abandon brain training if they don't see its effects in their daily lives. The app needs to bridge the gap between in-app performance and real-world benefits.

#### 3.3.2 Goals & Objectives
- Capture at least one self-reported "real-world win" from 50% of active users.
- Increase user trust score for "helps me in daily life" to 3.5/5.

#### 3.3.3 Functional Requirements & User Stories
-   **FR-8: Real-World Check-in System:**
    -   As a user, I want a simple way to log when my memory works well in real life.
    -   *Acceptance Criteria:* A low-friction "Log a Win" button opens a modal where users can select from a list of common memory successes (e.g., "Remembered a phone number," "Remembered a name").
-   **FR-9: Data Storage for Transfer:**
    -   As a developer, I need to store these check-ins in a `realWorldCheckins` array in localStorage.
-   **FR-10: Transfer Correlation Dashboard:**
    -   As a user, I want to see if my training is related to my real-world successes.
    -   *Acceptance Criteria:* A new "Real-World Impact" section on the Progress tab visually overlays in-app scores (e.g., Verbal Span) with icons representing logged real-world wins on a timeline.

---

### Feature #4: Manual Sleep/Exercise Tracking (MVP)
*Addresses: Holistic Training, User Insight, Feature Validation*

#### 3.4.1 Introduction & Problem
Cognitive performance is heavily influenced by lifestyle. Ignoring sleep and exercise provides an incomplete and noisy picture of a user's progress. This feature provides a manual-entry MVP for life-factor tracking.

#### 3.4.2 Goals & Objectives
- Achieve a 40% adoption rate for the manual logging feature.
- Validate the demand for full smartwatch integration in Phase 2.

#### 3.4.3 Functional Requirements & User Stories
-   **FR-11: Manual Log Entry UI:**
    -   As a user, I want a fast way to log my sleep and exercise for any given day.
    -   *Acceptance Criteria:* A "Daily Log" UI with a date picker and numeric inputs for "Hours Slept" and "Exercise Minutes".
-   **FR-12: Data Storage:**
    -   As a developer, I need to store this data in `sleepLog` and `exerciseLog` arrays in localStorage.
-   **FR-13: Basic Correlation Visualization:**
    -   As a user, I want to see how sleep or exercise might be affecting my scores.
    -   *Acceptance Criteria:* A dual-axis chart on the Progress tab overlays a cognitive score (e.g., Executive Control) with a lifestyle factor (e.g., Hours Slept), allowing for visual correlation.

---

### Feature #5: BrainTok Micro-Task Feed (MVP)
*Addresses: User Engagement, Boredom, Habit Formation*

#### 3.5.1 Introduction & Problem
The high friction of starting a 20-minute training session leads to missed days. A low-commitment, high-variety alternative is needed to capture "micro-moments" of downtime.

#### 3.5.2 Goals & Objectives
- Increase average weekly session frequency.
- Increase Daily Active Users (DAU) by 50%.
- Have BrainTok account for 30% of all tasks completed in the app.

#### 3.5.3 Functional Requirements & User Stories
-   **FR-14: "Infinite Scroll" Feed UI:**
    -   As a user, I want to swipe through quick challenges like a social media feed.
    -   *Acceptance Criteria:* A new "BrainTok" tab with a full-screen, vertical-scrolling interface.
-   **FR-15: Initial Micro-Task Set (MVP):**
    -   As a user, I want a variety of challenges.
    -   *Acceptance Criteria:* Launch with 6 micro-task types (Math Flash, Word Match, Memory Flash, Speed Sort, Pattern Complete, Odd One Out), each completable in <30 seconds.
-   **FR-16: Duration Tracking & Basic Adaptation:**
    -   As a user, I want the app to notice if I'm struggling without penalizing me.
    -   *Acceptance Criteria:* Task completion time is logged. If average time for a task type exceeds 30s, its difficulty is slightly reduced.
-   **FR-17: Gamification Layer (MVP):**
    -   As a user, I want to feel rewarded for playing.
    -   *Acceptance Criteria:* Award "MemoryCoins" for each completed task. Display a simple daily goal counter (e.g., "5/20 tasks"). Provide immediate positive feedback.

---

## 4.0 Success Metrics

The success of Phase 1 will be measured by the following key performance indicators (KPIs):

| Metric | Target | Feature |
| :--- | :--- | :--- |
| **Week 1 Retention** | Increase to 60% | Discovery Quiz |
| **30-Day Retention** | Increase by 25% | Analytics & Streak |
| **Daily Active Users (DAU)** | Increase by 50% | BrainTok |
| **Onboarding Completion Rate** | 85% | Discovery Quiz |
| **7-Day Streak Rate** | 20% of new users | Streak System |
| **User Trust Score** | 3.5/5 | Real-World Transfer |
| **BrainTok Adoption** | 30% of all tasks | BrainTok |

---

## 5.0 Future Considerations (Post-Phase 1)

The successful implementation of Phase 1 will provide the foundation for these Phase 2 and 3 features:
-   **Full RPG Story System:** Expanding the gamification into a full narrative.
-   **Smartwatch API Integration:** Automating the sleep/exercise logging.
-   **Full Social Platform:** Guilds, friends, and live competitions.
-   **MemoryCoin Economy:** Introducing staking, trading, and a real marketplace.
-   **AI Pattern Discovery:** Moving from visual correlation to machine learning-driven insights.
