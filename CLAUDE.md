# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Development Commands

Run these commands from the repository root:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

Before considering a change complete, run the relevant validation commands rather than assuming the change works.

## Engineering Conventions

### 1. Keep Firebase access centralized

Keep Firestore and authentication operations inside the existing Zustand stores instead of adding Firebase calls directly to page or UI components.

**Reason:** This keeps Firebase-specific logic centralized and prevents components from becoming tightly coupled to the database/authentication layer.

### 2. Use the existing authentication state

Use `useAuthStore` for authentication state and user information instead of creating another authentication context or store.

**Reason:** Authentication readiness is coordinated through the existing `isAuthReady` flow, which prevents the application from rendering before Firebase has restored the user's session.

### 3. Keep trip data logic in `useTripStore`

Use `useTripStore` for trip CRUD operations and trip-related Firestore access rather than implementing separate trip queries inside components.

**Reason:** Trip data access should remain centralized so different pages do not implement inconsistent Firestore behavior.

### 4. Prefer existing UI patterns

Reuse existing Ant Design components and established component patterns before creating custom UI primitives.

**Reason:** The application uses Ant Design as its primary UI system, so reusing it keeps interactions, forms, validation, and visual behavior consistent.

### 5. Preserve the existing routing structure

When adding or changing pages, follow the existing route and protection patterns. Use the existing lazy-loading and `ProtectedRoute` mechanisms where appropriate.

**Reason:** The application relies on route-level code splitting and centralized authentication protection, so bypassing these patterns can introduce inconsistent navigation or unnecessary bundle loading.

### 6. Keep Explore demo data separate from user data

Treat the dummy trips used by the Explore experience as demonstration data, not as the source of truth for user-created trips.

**Reason:** User-created trips are persisted in Firestore, while the Explore data exists to provide public/example content.

## Negative Space

### Do not copy `src/firebase.js` as a feature template

`src/firebase.js` is the Firebase initialization boundary. Do not put feature-level Firestore queries, authentication flows, or page-specific logic there.

Feature-level Firebase operations belong in the appropriate existing store.

### Do not copy Explore dummy data into production features

The dummy trip data used for exploration/demo purposes is not a replacement for persisted user data. Do not use it as the model for implementing real trip CRUD.

## Working Principles

- Prefer extending an existing pattern over introducing a new abstraction when the existing pattern already solves the problem.
- Before adding a new store, shared component, utility, or dependency, check whether an existing project pattern can be reused.
- Keep changes focused on the requested task and avoid unrelated refactoring unless it is necessary for correctness.
- Do not change authentication, routing, or Firebase initialization behavior without considering the existing application-wide flow.

## Verification

The commands in this file must be verified against the current repository before being relied upon. If a command fails because the repository has changed, update this file rather than assuming the old command is still correct.
