---
title: "Admin Management Page"
description: "Add /admin/management route with auth-protected admin panel, sidebar layout, and dashboard"
status: pending
priority: P2
created: 2026-06-06
---

# Admin Management Page

## Overview

Static React portfolio app (Vite + HashRouter + shadcn/ui + Tailwind dark theme). No backend — auth is frontend-only using localStorage with hardcoded admin credentials. The admin panel lives at `/#/admin/management` and is hidden from normal users.

## Phases

| Phase | Name | Status |
|-------|------|--------|
| 1 | [Auth Context & Route Protection](./phase-01-auth-context-route-protection.md) | Pending |
| 2 | [Admin Layout & Sidebar](./phase-02-admin-layout-sidebar.md) | Pending |
| 3 | [Dashboard Page](./phase-03-dashboard-page.md) | Pending |
| 4 | [Admin Login Page](./phase-04-admin-login-page.md) | Pending |

## Key Decisions

- **No backend**: Credentials hardcoded in frontend; session stored in localStorage
- **HashRouter**: Route is `/#/admin/management` (existing app uses HashRouter)
- **shadcn/ui**: All components reuse existing UI library; no new design language
- **Reorder implementation**: Phase 1 → 4 → 2 → 3 (auth first, login page, layout, then dashboard)

## Dependencies

None — no overlapping plans found.
