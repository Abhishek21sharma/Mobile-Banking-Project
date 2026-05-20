# CodeSubmit Challenge: Mobile QA Architecture & Prototype

**Suggested Time:** 90 – 120 Minutes  

## Context

You are defining the automation strategy for a Flutter banking app. The repository contains the source code but no automation. Your goal is to prototype the architecture and prove it works with a single **Vertical Slice** of automation using **a test framework of your choice**.

---

## Task: The "Vertical Slice" (UI Automation + Flutter)

**Goal:** Prove you can architect a maintainable framework, justify your tooling choices, and modify Flutter code for testability.

### 2.1 Framework Skeleton
Set up a clean directory structure that demonstrates how you would organize a large suite for your chosen tool. Minimum expectation:

* `automation/tests/` (or similar folder for your test scripts/flows)
* `automation/config/` (environment/config constants)
* `automation/scripts/` (runner scripts; can be placeholders but should show intent)
* `automation/README.md` (Must include: **Why** you chose this specific framework for a Flutter app, and **How** to run it locally)

### 2.2 App-Side Testability
Modify the Flutter source code to add **stable semantic identifiers** to the elements required for the Smoke Flow.
* **Minimum required identifiers:**
    * PIN input (or PIN keypad container)
    * Login/Submit button
    * Accounts screen root/container
    * At least one account row OR a specific “account name” label OR a balance label

Use either:
* `Key('...')` for widgets
* `Semantics(label: '...')` where appropriate

*Document what you added (briefly) in the PR description or in your `automation/README.md`.*

### 2.3 The "Smoke" Flow
Implement the automated test script in your `automation/tests/` directory.

The flow must have at least 4 steps and include at least 2 assertions. Do not hardcode test data (e.g., PIN) directly in the test commands. Demonstrate how you manage configuration/constants securely using the best practices of your chosen framework (e.g., env variables, a config file, or runner scripts).

---

## Deliverables Checklist

Your submission must include:

- [ ] `automation/` directory (structure + test script + config + README with your tool justification)
- [ ] `lib/` changes (added Flutter Keys/Semantics for stable selectors)

## Evaluation Criteria

* **Clarity of strategy:** Tooling justification (why this framework?), prioritization, and pragmatic scope.
* **Testability approach:** Stable selectors via Flutter code changes (not relying on fragile XPaths or text matchers).
* **Automation structure:** Maintainable folder layout, readable script/flow, configuration handling.
* **Robustness of the smoke flow:** Deterministic assertions, minimal flake risk.
* **CI logic:** Sensible stages and commands, clear intent (if runner scripts are provided).

---

### CodeSubmit
Please organize, design, test, and document your code as if it were going into production - then push your changes to the master branch.

Have fun coding! 🚀

**The Waracle Team**