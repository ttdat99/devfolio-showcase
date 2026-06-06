---
phase: 2
title: "Skills Management Page"
status: pending
priority: P2
effort: "3h"
dependencies: [1]
---

# Phase 2: Skills Management Page

## Overview

Admin page at `/#/admin/management/skills` for viewing, adding, editing, and deleting skills and skill categories. Data is fetched from the `commons` Google Sheet (existing `fetchSkills()`). Writes go via `sheetsWrite()` from Phase 1.

## Architecture

Sheet `commons` row format: `[id, name, parent_id]`
- Category row: `parent_id` = empty string
- Skill row: `parent_id` = category's `id`

UI pattern:
- `Table` listing all rows (both categories and skills) with columns: ID, Name, Category, Actions
- "Add Category" and "Add Skill" buttons above the table
- Row actions: Edit (pencil icon) → `Dialog` form, Delete (trash icon) → `AlertDialog` confirm
- Toast feedback on success/error

## Related Code Files

- Create: `src/pages/admin/skills-management-page.tsx` — main page
- Create: `src/components/admin/skills-table.tsx` — table + row actions
- Create: `src/components/admin/skill-form-dialog.tsx` — add/edit dialog
- Modify: `src/data/commonsData.ts` — export raw `SheetRow` type + `fetchRawSkillRows()`

## Implementation Steps

### 1. Export raw rows from `src/data/commonsData.ts`

Add and export the `SheetRow` type and a `fetchRawSkillRows()` function that returns the flat list (no grouping) so the admin table can show every row individually.

```ts
export interface SheetRow { id: string; name: string; parent_id: string | null }

export const fetchRawSkillRows = async (): Promise<SheetRow[]> => {
  const res  = await fetch(SHEET_API_URL);
  const data: SheetResponse = await res.json();
  return data.values.slice(1).map(r => ({ id: r[0]||"", name: r[1]||"", parent_id: r[2]||null }));
};
```

### 2. Create `src/components/admin/skill-form-dialog.tsx`

Dialog with:
- **Name** text input (required)
- **Type** select: "Category" | "Skill"
- **Category** select (visible only when Type = "Skill") — populated from category rows
- **ID** auto-generated (`crypto.randomUUID()`) on insert; read-only on edit

Props:
```ts
interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: SheetRow[];   // rows with no parent_id
  editing?: SheetRow | null;
  onSave: (row: SheetRow) => Promise<void>;
}
```

### 3. Create `src/components/admin/skills-table.tsx`

Uses shadcn `Table`. Columns: **ID** (truncated), **Name**, **Category** (resolved name or "—"), **Actions**.
- Edit button → opens `SkillFormDialog` pre-filled
- Delete button → opens `AlertDialog` confirm → calls `sheetsWrite({ action:"delete", sheet:"commons", id })`
- Pass `onEdit` / `onDelete` callbacks up to page

### 4. Create `src/pages/admin/skills-management-page.tsx`

```tsx
// Fetch raw rows on mount with useEffect + useState
// Two buttons: "Add Category", "Add Skill" (pre-select type in dialog)
// After any write: call sheetsWrite(), show toast, re-fetch rows
// File stays under 200 lines — table and dialog are separate components
```

State:
```ts
const [rows, setRows]         = useState<SheetRow[]>([]);
const [loading, setLoading]   = useState(true);
const [dialogOpen, setDialog] = useState(false);
const [editing, setEditing]   = useState<SheetRow | null>(null);
```

## Success Criteria

- [ ] Table shows all skill categories and skills with correct category column
- [ ] "Add Category" inserts a row with empty `parent_id`
- [ ] "Add Skill" inserts a row with the selected category's ID as `parent_id`
- [ ] Edit pre-fills form and calls `sheetsWrite({ action:"update", ... })`
- [ ] Delete shows confirm dialog then calls `sheetsWrite({ action:"delete", ... })`
- [ ] Toast shown on success and error
- [ ] No file exceeds 200 lines
