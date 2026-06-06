---
phase: 3
title: "Dashboard Page"
status: pending
priority: P2
effort: "1h"
dependencies: [1, 2]
---

# Phase 3: Dashboard Page

## Overview

Build the default dashboard view with summary stat cards and logged-in admin info, reusing existing shadcn/ui `Card` components.

## Requirements

- Functional: Display 3 stat cards — Total Users, Total Products, Total Orders (placeholder values)
- Functional: Show logged-in admin username in a welcome card
- Non-functional: Uses existing `Card`, `CardHeader`, `CardContent`, `CardTitle` from `@/components/ui/card`

## Architecture

```
src/pages/admin/dashboard-page.tsx
```

Static placeholder numbers (no API calls needed for MVP). Admin username from `useAdminAuth()`.

Card grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`

## Related Code Files

- Create: `src/pages/admin/dashboard-page.tsx`
- Modify: `src/App.tsx` — already wired in Phase 2 as `<Route index element={<DashboardPage />} />`

## Implementation Steps

1. Create `src/pages/admin/dashboard-page.tsx`:
   - Import `Card`, `CardHeader`, `CardContent`, `CardTitle` from `@/components/ui/card`
   - Import `useAdminAuth` for admin username
   - Stat cards array: `[{ title: "Total Users", value: 0 }, { title: "Total Products", value: 0 }, { title: "Total Orders", value: 0 }]`
   - Welcome section at top: `"Welcome back, admin"`
   - Render stat cards in responsive grid

## Success Criteria

- [ ] Dashboard renders as default view at `/#/admin/management`
- [ ] 3 stat cards visible with titles and placeholder values
- [ ] Admin name shown in welcome message
- [ ] Card styles match existing app design system

## Risk Assessment

- Placeholder data is intentional — future phases can wire real data sources
