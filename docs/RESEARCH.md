# RESEARCH.md - Targeted Research for Working Memory Lab Improvements

**Date:** January 2, 2026
**Focus:** Improvements to existing exercises, missing exercises worth adding, enhancements to current difficulty system

---

## 1. Validation of Current Approach

### N-Back Task (Already Implemented)

The N-back task is a well-established working memory measure introduced by Wayne Kirchner in 1958. Research shows:

- **Cognitive Components:** The task engages three core cognitive operations - updating, maintenance, and attentional control - relying on overlapping fronto-striatal and fronto-parietal networks ([Frontiers in Human Neuroscience, 2025](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2025.1721330/full))
- **Transfer Effects:** A 2014 meta-analysis showed N-back training has small but significant effects on fluid intelligence (3-4 IQ points equivalent)
- **Current Implementation Validation:** The existing 1-back/2-back progression with emotion words is scientifically sound

### Current Adaptive Logic (Coach Mode)

The existing `decideNFromHistory()` function uses reasonable thresholds:
- 2-back if previous acc2 >= 70% or acc1 >= 85%
- Auto-promotion from 1-back if acc >= 85% and FA <= 2

**Research Support:** This aligns with optimal challenge calibration where success probabilities between 60-80% provide productive cognitive challenge without frustration ([PMC, 2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC10013456/))

---

## 2. Transfer Effects: What Works

### Near Transfer (Strong Evidence)

Research consistently shows working memory training produces:
- **Medium transfer effects** to untrained versions of trained tasks
- **Maintenance of gains** - 6-month follow-up shows retained improvements ([BMC Geriatrics, 2025](https://bmcgeriatr.biomedcentral.com/articles/10.1186/s12877-025-06507-2))

### Far Transfer (Limited Evidence)

- Transfer to fluid intelligence is "more task-specific than previously suggested" ([Nature, 2021](https://www.nature.com/articles/s41598-021-82663-w))
- Near transfer to untrained N-back tasks mediates transfer to Matrix Reasoning ([PMC, 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC12305750/))

### Realistic Expectations

Based on research, Working Memory Lab should:
1. Focus messaging on **working memory improvement** rather than general intelligence
2. Emphasize **near transfer** to similar tasks
3. Use **Real-World Wins** feature to capture subjective improvements (already implemented)

---

## 3. Exercises Worth Adding

### Priority 1: Dual N-Back

**Scientific Backing:** Most widely studied WM training exercise, popularized by Dr. Susanne Jaeggi. Jaeggi et al. (2008) demonstrated 40% improvements in fluid intelligence in PNAS.

**Why Add:**
- Simultaneously recruits auditory and visual attention, maintenance, and updating
- Distinct from single N-back (already have)
- Strong research foundation

**Implementation Notes:**
- Visual: Position in 3x3 grid
- Audio: Letter sounds
- Press when position matches AND letter matches N-back

### Priority 2: Corsi Block-Tapping Task

**Scientific Backing:** Measures visuospatial short-term memory capacity. Used in ADHD research alongside N-back ([MDPI Brain Sciences, 2025](https://www.mdpi.com/2076-3425/15/9/998))

**Why Add:**
- Complements existing Spatial+Verbal (different mechanism - sequence recall vs binding)
- Well-validated clinical measure
- Simple to implement

**Implementation Notes:**
- 9-block grid (3x3)
- Blocks highlight in sequence
- User reproduces sequence in order
- Progressive difficulty (longer sequences)

### Priority 3: Operation Span

**Scientific Backing:** Complex span tasks like Operation Span are considered better measures of working memory than simple span tasks because they include a processing component.

**Why Add:**
- Adds processing element to existing WM Span
- More challenging, different cognitive demand
- Popular in research settings

**Implementation Notes:**
- Alternate between math verification and letter memorization
- Example: "Is 3+4=8? (No)" then "Remember: K"
- Recall letters in order at end

### Not Recommended (Already Have Similar)

- **Running Span** - Similar to existing WM Span (reverse), marginal benefit
- **Simple Span Forward** - Less demanding than existing reverse span

---

## 4. Adaptive Difficulty Research

### Staircase Methods

The three-down/one-up staircase procedure converges to 79.4% correct responses, providing moderate difficulty ([PMC, 2019](https://pmc.ncbi.nlm.nih.gov/articles/PMC6645707/))

**Current Implementation:** The existing N-back uses a simpler threshold-based approach. This is adequate but could be enhanced.

### Recommended Improvements

1. **Rolling Window Analysis**
   - Instead of looking at just last session, use last 3-5 sessions
   - Reduces noise from single bad/good days

2. **Optimal Challenge Zone**
   - Target 60-80% success rate
   - Below 60%: repeated failures erode motivation
   - Above 80%: insufficient cognitive challenge

3. **Unlocked Staircase per Task**
   - Allow independent difficulty modulation per task type
   - Users may develop skills faster on certain tasks

### Reinforcement Learning Approaches

Advanced research uses RL to automatically adapt difficulty ([ACM TIIS, 2021](https://dl.acm.org/doi/10.1145/3476777)). This is **overkill** for current scope but worth noting for future consideration.

---

## 5. Training Protocol Recommendations

### Session Length

Research protocols typically use:
- 15-20 minutes per session
- Daily training for best results
- 18-20 sessions minimum for measurable improvement

**Current Status:** App supports both "quick" (5-10 min) and "deep" (15-30 min) preferences. This is appropriate.

### Session Frequency

- Daily training produces best results
- Streak system (already implemented) encourages consistency
- Missing occasional days is acceptable

### Duration for Results

- 4+ weeks of consistent training for noticeable improvement
- Some research shows effects after 20 sessions

---

## 6. Individual Variability

Research shows substantial individual variability in training outcomes, influenced by:
- Age
- Baseline cognitive ability
- Motivation

**Implication:** The Discovery Quiz + persona system helps address this by personalizing recommendations and difficulty starting points.

---

## 7. Specific Improvements to Existing Exercises

### WM Span (Reverse)

**Current:** Fixed word lists per level, advance on success, stop on failure

**Improvements:**
- Add more word lists per level (randomization)
- Consider 2-up/1-down staircase instead of 1-up/1-down
- Track best level as personal record

### N-Back (Emotion)

**Current:** 1-back or 2-back, adaptive start based on last session

**Improvements:**
- Add 3-back for advanced users
- Use rolling 3-session window for adaptation decisions
- Add dual-modality option (audio + visual)

### Spatial+Verbal Binding

**Current:** Fixed 3 levels, requires perfect verbal AND spatial

**Improvements:**
- Consider separating scoring (verbal accuracy vs spatial accuracy)
- Add level 4 (5 items) for advanced users
- Implement partial credit scoring

### Filter the Positive

**Current:** Fixed 16-word pool, no adaptive difficulty

**Improvements:**
- Adaptive word count based on performance
- Time pressure variant (countdown instead of measuring time)
- Larger word pool with category balancing

### Mental Multiplication

**Current:** Fixed 6 problems, random selection from 8 options

**Improvements:**
- Adaptive difficulty based on problem complexity
- Progressive digit count (2x1 -> 2x2 -> 3x2)
- Time-limited mode option

---

## 8. Citations Summary

| Topic | Source |
|-------|--------|
| N-back cognitive operations | [Frontiers Human Neuroscience 2025](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2025.1721330/full) |
| ADHD + Dual N-Back | [MDPI Brain Sciences 2025](https://www.mdpi.com/2076-3425/15/9/998) |
| Older adults training | [BMC Geriatrics 2025](https://bmcgeriatr.biomedcentral.com/articles/10.1186/s12877-025-06507-2) |
| Transfer mediation | [PMC 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC12305750/) |
| Dual N-back vs Method of Loci | [Nature Scientific Reports 2021](https://www.nature.com/articles/s41598-021-82663-w) |
| Adaptive training algorithms | [Frontiers VR 2024](https://www.frontiersin.org/journals/virtual-reality/articles/10.3389/frvir.2024.1322656/full) |
| Staircase methods | [PMC 2019](https://pmc.ncbi.nlm.nih.gov/articles/PMC6645707/) |
| Real-time adaptation | [PMC 2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC10013456/) |
| RL for cognitive training | [ACM TIIS 2021](https://dl.acm.org/doi/10.1145/3476777) |
| Adaptive algorithm for MCI | [PMC 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11698878/) |

---

## 9. Key Takeaways for Development

1. **Current approach is scientifically sound** - N-back, span tasks, and binding tasks are well-validated
2. **Add Dual N-Back and Corsi Block** - Two most impactful additions with strong research support
3. **Enhance adaptive algorithm** - Use rolling window, target 60-80% success zone
4. **Manage expectations** - Near transfer is reliable, far transfer is limited
5. **Consistency matters** - Streak system is valuable, encourage daily use
6. **Individual differences are real** - Personalization via Discovery Quiz is appropriate
