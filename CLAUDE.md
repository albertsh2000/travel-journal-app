# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Development Commands

Run from the repository root:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

Before considering a change complete, run the relevant validation command(s). Do not assume a command works without verifying it.

## Engineering Conventions

### 1. Keep authentication centralized

Use the existing authentication store and route protection mechanisms for authentication state and access control. Do not introduce a second authentication source of truth.

**Reason:** Authentication state is restored asynchronously, so centralizing it prevents inconsistent auth state and protected-route behavior.

### 2. Keep Firebase access behind the existing data layer

Firestore operations belong in the existing Zustand stores. Components should call store methods rather than accessing Firebase directly.

**Reason:** The stores provide a consistent boundary between UI code and persistence logic, making data behavior easier to maintain and change.

### 3. Preserve ownership enforcement

User-owned trip data must remain associated with the authenticated user's Firebase `uid`. Queries should scope user data to that owner, while Firestore Security Rules remain the actual security boundary.

Client-side ownership checks may provide defense-in-depth, but must never replace Firestore Security Rules.

**Reason:** Filtering data in the UI is not a security mechanism; authorization must be enforced by the database.

### 4. Reuse existing UI and application patterns

Prefer the project's existing UI components, forms, routing patterns, stores, and helpers before introducing new abstractions or dependencies.

For user-facing text, follow the existing internationalization pattern rather than adding hard-coded strings where translations are expected.

**Reason:** Reusing established patterns keeps behavior and UX consistent and avoids unnecessary abstractions.

### 5. Keep changes focused

Implement the requested behavior with the smallest reasonable change. Avoid unrelated refactoring, dependency changes, or architectural rewrites unless they are necessary for correctness.

**Reason:** Smaller changes are easier to review, validate, and troubleshoot.

## Negative Space

### Do not use `src/firebase.js` as a feature template

`src/firebase.js` is the Firebase initialization boundary. Do not add feature-specific Firestore queries, mutations, or application logic there.

**Reason:** Firebase initialization and application data access have different responsibilities.

### Do not add Firebase calls to components

Components must not directly perform Firestore operations. Extend the appropriate existing store instead.

**Reason:** Direct database access from components bypasses the application's established data-access boundary.

### Do not treat demo data as user data

Demo/dummy trips must remain separate from persisted user-owned trips. Do not use demo data as a fallback or substitute for Firestore data.

**Reason:** Demo content and authenticated user data have different ownership and persistence semantics.

### Do not create a new store automatically

Before creating a new Zustand store, check whether the existing stores can reasonably own the required state or behavior.

**Reason:** Unnecessary stores fragment application state and make data flow harder to understand.

## Verification

Do not claim a change is complete based only on static inspection. Run the relevant available validation commands and verify the affected behavior.

If a documented command no longer works, investigate the repository and update this file rather than inventing a workaround.
