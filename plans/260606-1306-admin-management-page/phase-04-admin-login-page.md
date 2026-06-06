---
phase: 4
title: "Admin Login Page"
status: pending
priority: P1
effort: "1h"
dependencies: [1]
---

# Phase 4: Admin Login Page

## Overview

Build the admin login form at `/admin/login` using shadcn/ui `Input`, `Button`, and `Card` components. Successful login navigates to `/admin/management`; already-authenticated users are redirected away.

## Requirements

- Functional: Username + password form, submit calls `useAdminAuth().login()`
- Functional: Show error message on invalid credentials
- Functional: Already-authenticated users visiting `/admin/login` are redirected to `/admin/management`
- Non-functional: Matches existing app dark theme; centered card layout

## Architecture

```
src/pages/admin/admin-login-page.tsx
```

Form state managed with `useState` (no react-hook-form needed for a 2-field form). On submit: call `login()`, if returns false show error toast or inline error.

## Related Code Files

- Create: `src/pages/admin/admin-login-page.tsx`
- Modify: `src/App.tsx` — already wired as `<Route path="/admin/login" element={<AdminLoginPage />} />`

## Implementation Steps

1. Create `src/pages/admin/admin-login-page.tsx`:
   - On mount: if `isAuthenticated` → `<Navigate to="/admin/management" replace />`
   - Local state: `username`, `password`, `error`
   - Submit handler: call `login(username, password)` → on success navigate to `/admin/management`; on failure set `error` state
   - Layout: `min-h-screen bg-background flex items-center justify-center`
   - Card: title "Admin Management", subtitle "Sign in to continue"
   - Input fields with labels using `Label` + `Input` from shadcn/ui
   - Submit `Button` full width
   - Error shown as `<p className="text-destructive text-sm">` below form

2. `login()` in auth context returns `boolean` — `true` on success, `false` on bad credentials

## Success Criteria

- [ ] Login form renders at `/#/admin/login`
- [ ] Valid credentials (`admin` / `12345678`) navigate to `/#/admin/management`
- [ ] Invalid credentials show inline error message
- [ ] Authenticated users visiting `/admin/login` are redirected to `/admin/management`
- [ ] Form matches existing dark theme

## Risk Assessment

- Plain credentials comparison is acceptable for a static portfolio demo with no sensitive data
