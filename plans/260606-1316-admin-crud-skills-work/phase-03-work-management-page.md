---
phase: 3
title: "Work Management Page"
status: pending
priority: P2
effort: "3h"
dependencies: [1]
---

# Phase 3: Work Management Page

## Overview

Admin page at `/#/admin/management/work` for viewing, adding, editing, and deleting work/project entries. Data fetched from the `projects` Google Sheet (existing `fetchProjects()`). Writes via `sheetsWrite()` from Phase 1.

## Architecture

Sheet `projects` row format (matches existing `Project` interface):
```
[id, title, description, fullDescription, stack, from, to, githubUrl, demoUrl, customer, teamSize]
```

UI pattern:
- `Table` with columns: **Title**, **Stack**, **Period** (from→to), **Customer**, **Actions**
- "Add Project" button above table
- Row actions: Edit → `Dialog` form, Delete → `AlertDialog` confirm
- Toast feedback on success/error

## Related Code Files

- Create: `src/pages/admin/work-management-page.tsx` — main page
- Create: `src/components/admin/work-table.tsx` — table + row actions
- Create: `src/components/admin/work-form-dialog.tsx` — add/edit dialog
- Modify: `src/data/projectsData.ts` — export `fetchProjects` (already exported; no change needed if already exported)

## Implementation Steps

### 1. Create `src/components/admin/work-form-dialog.tsx`

Form fields (all text inputs unless noted):
| Field | Input | Required |
|-------|-------|----------|
| Title | text | ✓ |
| Description | textarea | ✓ |
| Full Description | textarea | |
| Stack | text (comma-separated) | |
| From | text (e.g. "2023-01") | ✓ |
| To | text (e.g. "Present") | ✓ |
| GitHub URL | text | |
| Demo URL | text | |
| Customer | text | |
| Team Size | number | |

ID: auto `crypto.randomUUID()` on insert; read-only on edit.

Props:
```ts
interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing?: Project | null;
  onSave: (project: Project) => Promise<void>;
}
```

Split long form into two columns (grid-cols-2) to keep dialog compact. Use `ScrollArea` if needed.

### 2. Create `src/components/admin/work-table.tsx`

Columns: **Title** (bold), **Stack** (truncated badge list), **Period**, **Customer**, **Actions**.
- Edit → opens `WorkFormDialog` pre-filled
- Delete → `AlertDialog` → `sheetsWrite({ action:"delete", sheet:"projects", id })`

### 3. Create `src/pages/admin/work-management-page.tsx`

```tsx
// useEffect: call fetchProjects() on mount
// "Add Project" button opens dialog with editing=null
// After write: sheetsWrite() → toast → re-fetch
```

Row mapping to sheet array for insert/update:
```ts
const toRow = (p: Project): string[] => [
  p.id, p.title, p.description, p.fullDescription??'',
  p.stack, p.from, p.to,
  p.githubUrl??'', p.demoUrl??'',
  p.customer??'', String(p.teamSize??''),
];
```

## Success Criteria

- [ ] Table shows all projects with Title, Stack, Period, Customer
- [ ] "Add Project" dialog inserts a new row to `projects` sheet
- [ ] Edit pre-fills all fields and calls `sheetsWrite({ action:"update", ... })`
- [ ] Delete shows confirm then removes row from sheet
- [ ] Toast on success and error
- [ ] No file exceeds 200 lines
