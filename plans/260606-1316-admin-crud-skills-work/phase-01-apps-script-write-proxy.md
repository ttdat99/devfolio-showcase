---
phase: 1
title: "Apps Script Write Proxy"
status: pending
priority: P1
effort: "1h"
dependencies: []
---

# Phase 1: Apps Script Write Proxy

## Overview

Create a Google Apps Script web app that exposes a `doPost` endpoint. The admin React app calls this endpoint to insert, update, or delete rows in the Google Sheet. Authentication uses a shared secret token stored in the Script's Properties.

## Architecture

```
Admin UI  →  POST /exec?token=SECRET  →  Apps Script doPost()  →  SpreadsheetApp  →  Google Sheet
```

Request body (JSON):
```ts
{ action: "insert" | "update" | "delete", sheet: "commons" | "projects", row: string[], id?: string }
```

Response:
```ts
{ success: boolean, error?: string }
```

## Related Code Files

- Create: `src/lib/sheets-write-api.ts` — typed wrapper that calls the Apps Script URL
- Create: `.env.local` entry: `VITE_SHEETS_WRITE_URL` and `VITE_SHEETS_WRITE_TOKEN`

## Implementation Steps

### 1. Create the Apps Script

1. Open the Google Sheet → **Extensions → Apps Script**
2. Replace `Code.gs` content with:

```javascript
const SECRET = PropertiesService.getScriptProperties().getProperty("WRITE_TOKEN");
const SS_ID  = "15E7USHGwcvn9Kin2ZxLU57rqnk0V1X88vaVkWTRBrdg";

function doPost(e) {
  try {
    const token = e.parameter.token;
    if (token !== SECRET) return json({ success: false, error: "Unauthorized" });

    const body   = JSON.parse(e.postData.contents);
    const { action, sheet, row, id } = body;
    const ss     = SpreadsheetApp.openById(SS_ID);
    const ws     = ss.getSheetByName(sheet);
    if (!ws) return json({ success: false, error: "Sheet not found: " + sheet });

    if (action === "insert") {
      ws.appendRow(row);
    } else if (action === "update") {
      const rowIdx = findRowById(ws, id);
      if (!rowIdx) return json({ success: false, error: "Row not found" });
      row.forEach((val, col) => ws.getRange(rowIdx, col + 1).setValue(val));
    } else if (action === "delete") {
      const rowIdx = findRowById(ws, id);
      if (!rowIdx) return json({ success: false, error: "Row not found" });
      ws.deleteRow(rowIdx);
    } else {
      return json({ success: false, error: "Unknown action" });
    }

    return json({ success: true });
  } catch (err) {
    return json({ success: false, error: err.message });
  }
}

function findRowById(ws, id) {
  const data = ws.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(id)) return i + 1;
  }
  return null;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. **Script Properties**: Go to **Project Settings → Script Properties** → add `WRITE_TOKEN` = a random secret string (e.g. 32-char UUID)
4. **Deploy**: Click **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Copy the deployment URL

### 2. Create `src/lib/sheets-write-api.ts`

```ts
const URL   = import.meta.env.VITE_SHEETS_WRITE_URL as string;
const TOKEN = import.meta.env.VITE_SHEETS_WRITE_TOKEN as string;

type Sheet  = "commons" | "projects";
type Action = "insert" | "update" | "delete";

interface WritePayload {
  action: Action;
  sheet: Sheet;
  row?: string[];
  id?: string;
}

export async function sheetsWrite(payload: WritePayload): Promise<void> {
  const res = await fetch(`${URL}?token=${TOKEN}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error ?? "Write failed");
}
```

### 3. Add env vars to `.env.local`

```
VITE_SHEETS_WRITE_URL=https://script.google.com/macros/s/XXXX/exec
VITE_SHEETS_WRITE_TOKEN=your-secret-token
```

> `.env.local` is already in `.gitignore` — never commit the token.

## Success Criteria

- [ ] Apps Script deployed and returns `{ success: true }` for a test POST
- [ ] `src/lib/sheets-write-api.ts` created with typed `sheetsWrite()` helper
- [ ] `.env.local` documented (not committed)
