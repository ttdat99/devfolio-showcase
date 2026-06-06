---
phase: 2
title: "Admin Layout & Sidebar"
status: pending
priority: P1
effort: "1.5h"
dependencies: [1]
---

# Phase 2: Admin Layout & Sidebar

## Overview

Build the `AdminLayout` shell (30/70 split) and `Sidebar` navigation component reusing existing shadcn/ui primitives and the app's dark theme tokens.

## Requirements

- Functional: Sidebar with logo/title, 4 nav items (Dashboard, User Management, Product Management, Settings), active highlight
- Functional: Main content area renders child route content via `<Outlet />`
- Non-functional: Responsive — sidebar collapses on mobile; layout uses existing CSS variables/Tailwind tokens

## Architecture

```
src/
  components/admin/
    admin-layout.tsx       ← outer shell, 30/70 grid
    admin-sidebar.tsx      ← nav items + active state + logout button
  pages/admin/
    admin-management.tsx   ← nested route host (renders Outlet for sub-sections)
```

Layout uses CSS Grid: `grid-cols-[30%_70%]` on desktop, single column on mobile.

Sidebar nav items map to sub-routes under `/admin/management`:
- Dashboard → `/admin/management` (default)
- User Management → `/admin/management/users`
- Product Management → `/admin/management/products`
- Settings → `/admin/management/settings`

Active item detection via `useMatch` / `NavLink` from react-router-dom.

## Related Code Files

- Create: `src/components/admin/admin-layout.tsx`
- Create: `src/components/admin/admin-sidebar.tsx`
- Create: `src/pages/admin/admin-management.tsx`
- Modify: `src/App.tsx` — nest sub-routes under `/admin/management`

## Implementation Steps

1. Create `src/components/admin/admin-sidebar.tsx`:
   - Use `cn()` from `@/lib/utils` for conditional classes
   - Nav items as array, map to `<NavLink>` — apply `bg-accent` / `text-accent-foreground` when active
   - Logout button at bottom calls `useAdminAuth().logout()` then navigates to `/admin/login`
   - Use existing `Separator` component between sections

2. Create `src/components/admin/admin-layout.tsx`:
   - `<div className="min-h-screen bg-background flex">` wrapper
   - `AdminSidebar` fixed width `w-[280px]` (≈30%), hidden on mobile with Sheet/Drawer
   - Main area `flex-1` with `overflow-y-auto`
   - `<Outlet />` inside main area

3. Create `src/pages/admin/admin-management.tsx`:
   - Thin wrapper that just renders `<AdminLayout />`

4. Update `src/App.tsx` nested routes:
   ```tsx
   <Route element={<ProtectedAdminRoute />}>
     <Route path="/admin/management" element={<AdminLayout />}>
       <Route index element={<DashboardPage />} />
       <Route path="users" element={<div>User Management — coming soon</div>} />
       <Route path="products" element={<div>Product Management — coming soon</div>} />
       <Route path="settings" element={<div>Settings — coming soon</div>} />
     </Route>
   </Route>
   ```

## Success Criteria

- [ ] Sidebar renders with all 4 nav items
- [ ] Active nav item is visually highlighted
- [ ] 30/70 layout renders on desktop
- [ ] Logout redirects to `/admin/login`
- [ ] No new color tokens introduced — uses existing theme

## Risk Assessment

- `w-[280px]` is a fixed value; use `lg:w-[280px] w-0` + mobile drawer if needed — keep simple for now
