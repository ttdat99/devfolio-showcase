const URL_BASE = import.meta.env.VITE_SHEETS_WRITE_URL as string;
const TOKEN = import.meta.env.VITE_SHEETS_WRITE_TOKEN as string;

type Sheet = "commons" | "projects";
type Action = "insert" | "update" | "delete";

interface WritePayload {
  action: Action;
  sheet: Sheet;
  row?: string[];
  id?: string;
}

export async function sheetsWrite(payload: WritePayload): Promise<void> {
  // Use URLSearchParams so browser sends as application/x-www-form-urlencoded
  // (simple request — no CORS preflight) and Apps Script reads via e.parameter.data
  const params = new URLSearchParams({
    token: TOKEN,
    data: JSON.stringify(payload),
  });
  const res = await fetch(URL_BASE, {
    method: "POST",
    body: params,
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error ?? "Write failed");
}
