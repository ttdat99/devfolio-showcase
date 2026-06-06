import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { fetchRawSkillRows, type SheetRow } from "@/data/commonsData";
import { sheetsWrite } from "@/lib/sheets-write-api";
import { SkillsTable } from "@/components/admin/skills-table";
import { SkillFormDialog } from "@/components/admin/skill-form-dialog";

export default function SkillsManagementPage() {
  const { toast } = useToast();
  const [rows, setRows] = useState<SheetRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<SheetRow | null>(null);
  const [defaultType, setDefaultType] = useState<"category" | "skill">("category");

  const categories = rows.filter((r) => !r.parent_id);

  async function load() {
    setLoading(true);
    try {
      const data = await fetchRawSkillRows();
      setRows(data);
    } catch {
      toast({ title: "Failed to load skills", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function openAdd(type: "category" | "skill") {
    setEditing(null);
    setDefaultType(type);
    setDialogOpen(true);
  }

  function openEdit(row: SheetRow) {
    setEditing(row);
    setDefaultType(row.parent_id ? "skill" : "category");
    setDialogOpen(true);
  }

  async function handleSave(row: SheetRow) {
    const sheetRow = [row.id, row.name, row.parent_id ?? ""];
    try {
      if (editing) {
        await sheetsWrite({ action: "update", sheet: "commons", row: sheetRow, id: row.id });
      } else {
        await sheetsWrite({ action: "insert", sheet: "commons", row: sheetRow });
      }
      toast({ title: editing ? "Updated successfully" : "Added successfully" });
      await load();
    } catch (err) {
      toast({ title: "Save failed", description: String(err), variant: "destructive" });
      throw err;
    }
  }

  async function handleDelete(id: string) {
    try {
      await sheetsWrite({ action: "delete", sheet: "commons", id });
      toast({ title: "Deleted successfully" });
      await load();
    } catch (err) {
      toast({ title: "Delete failed", description: String(err), variant: "destructive" });
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Skills Management</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => openAdd("category")}>Add Category</Button>
          <Button onClick={() => openAdd("skill")}>Add Skill</Button>
        </div>
      </div>

      {loading ? (
        <div className="text-muted-foreground py-8 text-center">Loading…</div>
      ) : (
        <SkillsTable rows={rows} onEdit={openEdit} onDelete={handleDelete} />
      )}

      <SkillFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        categories={categories}
        editing={editing}
        defaultType={defaultType}
        onSave={handleSave}
      />
    </div>
  );
}
