---
phase: 1
title: "Auth Context & Route Protection"
status: pending
priority: P1
effort: "1h"
dependencies: []
---

# Phase 1: Auth Context & Route Protection

## Overview

Create a frontend-only auth context using localStorage and a `ProtectedAdminRoute` component that redirects unauthenticated users to the admin login page.

## Requirements

- Functional: `useAdminAuth` hook exposes `isAuthenticated`, `login`, `logout`
- Functional: `ProtectedAdminRoute` redirects to `/admin/login` if not authenticated
- Non-functional: Credentials never leave the browser; session survives page refresh via localStorage

## Architecture

```
src/contexts/admin-auth-context.tsx   ← createContext + provider + useAdminAuth hook
src/components/admin/protected-admin-route.tsx  ← wrapper component
```

Auth flow:
1. `login(username, password)` → compare against hardcoded credentials → set `isAuthenticated=true` in context + persist token flag to localStorage
2. On provider mount → read localStorage to restore session
3. `ProtectedAdminRoute` → if not authenticated → `<Navigate to="/admin/login" replace />`

**Credentials** (hardcoded, frontend-only):
- username: `admin`
- password: `12345678`

Store only a boolean flag in localStorage (key: `admin_authenticated`), never the password.

## Related Code Files

- Create: `src/contexts/admin-auth-context.tsx`
- Create: `src/components/admin/protected-admin-route.tsx`
- Modify: `src/App.tsx` — add admin routes inside `ProtectedAdminRoute`

## Implementation Steps

1. Create `src/contexts/admin-auth-context.tsx`:
   - Context with `{ isAuthenticated, login, logout }`
   - `login` validates against hardcoded creds, sets localStorage flag
   - `logout` clears localStorage flag
   - Provider reads localStorage on mount to restore session
   - Export `useAdminAuth` hook

2. Create `src/components/admin/protected-admin-route.tsx`:
   - Calls `useAdminAuth()`
   - If `!isAuthenticated` → `<Navigate to="/admin/login" replace />`
   - Otherwise → `<Outlet />`

3. Modify `src/App.tsx`:
   - Wrap with `AdminAuthProvider`
   - Add routes:
     ```tsx
     <Route path="/admin/login" element={<AdminLoginPage />} />
     <Route element={<ProtectedAdminRoute />}>
       <Route path="/admin/management" element={<AdminLayout />} />
     </Route>
     ```

## Success Criteria

- [ ] Navigating to `/#/admin/management` without login redirects to `/#/admin/login`
- [ ] After login, navigating to `/#/admin/login` redirects to `/#/admin/management`
- [ ] Page refresh preserves auth state
- [ ] `logout()` clears session and redirects to login

## Risk Assessment

- Frontend-only auth is intentional for a static portfolio; no sensitive data is exposed
- If localStorage is cleared externally, user is simply logged out — acceptable
