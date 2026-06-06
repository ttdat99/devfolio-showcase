---
title: "Admin CRUD for Skills and Work"
description: "Add CRUD management pages for skills and work/projects in the existing admin panel, with writes via Google Apps Script proxy"
status: pending
priority: P2
created: 2026-06-06
blockedBy: []
---

# Admin CRUD for Skills and Work

## Overview

Extend the existing admin panel (`/#/admin/management`) with two new CRUD pages:
- **Skills** — manage skill categories and individual skills
- **Work** — manage projects/work entries

Data reads from Google Sheets (existing public API key). Writes go through a Google Apps Script web app that accepts POST requests authenticated by a secret token.

## Phases

| Phase | Name | Status |
|-------|------|--------|
| 1 | [Apps Script Write Proxy](./phase-01-apps-script-write-proxy.md) | Pending |
| 2 | [Skills Management Page](./phase-02-skills-management-page.md) | Pending |
| 3 | [Work Management Page](./phase-03-work-management-page.md) | Pending |
| 4 | [Sidebar Nav and Routes](./phase-04-sidebar-nav-and-routes.md) | Pending |

## Key Decisions

- **Write strategy**: Google Apps Script `doPost` web app with a shared secret token
- **UI pattern**: shadcn/ui `Table` for listing + `Dialog` for add/edit form; `AlertDialog` for delete confirm
- **No new backend**: all React; Apps Script is the only server-side piece
- **Sheet structure**: `commons` sheet rows = `[id, name, parent_id]`; `projects` sheet rows per existing `Project` interface

## Dependencies

- Existing admin layout/auth: `src/components/admin/`, `src/contexts/admin-auth-context.tsx`
- Data interfaces: `src/data/commonsData.ts`, `src/data/projectsData.ts`
