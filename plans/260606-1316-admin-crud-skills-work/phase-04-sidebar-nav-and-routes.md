---
phase: 4
title: "Sidebar Nav and Routes"
status: pending
priority: P2
effort: "30m"
dependencies: [2, 3]
---

# Phase 4: Sidebar Nav and Routes

## Overview

Wire the two new pages into the existing admin router and sidebar. Minimal changes to two files only.

## Related Code Files

- Modify: `src/components/admin/admin-sidebar.tsx` — add "Skills" and "Work" nav items
- Modify: `src/App.tsx` — add two new `<Route>` entries inside the admin layout

## Implementation Steps

### 1. Update `src/components/admin/admin-sidebar.tsx`

Add to `NAV_ITEMS` array (after Dashboard, before existing placeholder items):

```ts
import { Briefcase, Code2, LayoutDashboard, LogOut, Settings } from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard",  to: "/admin/management",        icon: LayoutDashboard, end: true  },
  { label: "Skills",     to: "/admin/management/skills", icon: Code2,           end: false },
  { label: "Work",       to: "/admin/management/work",   icon: Briefcase,       end: false },
  { label: "Settings",   to: "/admin/management/settings", icon: Settings,      end: false },
];
```

Remove the now-unused `Users`, `Package`, `ShoppingCart` imports and nav items (they were placeholder stubs).

### 2. Update `src/App.tsx`

Replace the placeholder `users` and `products` routes with the real pages:

```tsx
import SkillsManagementPage from "./pages/admin/skills-management-page";
import WorkManagementPage   from "./pages/admin/work-management-page";

// Inside <Route path="/admin/management" element={<AdminLayout />}>:
<Route path="skills"   element={<SkillsManagementPage />} />
<Route path="work"     element={<WorkManagementPage />} />
<Route path="settings" element={<div className="text-muted-foreground">Settings — coming soon</div>} />
// Remove: users, products placeholder routes
```

## Success Criteria

- [ ] Sidebar shows "Skills" and "Work" links with correct icons; active state highlights correctly
- [ ] Navigating to `/#/admin/management/skills` renders `SkillsManagementPage`
- [ ] Navigating to `/#/admin/management/work` renders `WorkManagementPage`
- [ ] Old placeholder routes (users, products) removed
- [ ] No TypeScript compile errors
