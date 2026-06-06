import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SheetRow } from "@/data/commonsData";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: SheetRow[];
  editing?: SheetRow | null;
  defaultType?: "category" | "skill";
  onSave: (row: SheetRow) => Promise<void>;
}

export function SkillFormDialog({ open, onOpenChange, categories, editing, defaultType = "category", onSave }: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState<"category" | "skill">(defaultType);
  const [parentId, setParentId] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      if (editing) {
        setName(editing.name);
        setType(editing.parent_id ? "skill" : "category");
        setParentId(editing.parent_id ?? "");
      } else {
        setName("");
        setType(defaultType);
        setParentId("");
      }
    }
  }, [open, editing, defaultType]);

  async function handleSave() {
    if (!name.trim()) return;
    setSaving(true);
    try {
      const row: SheetRow = {
        id: editing?.id ?? crypto.randomUUID(),
        name: name.trim(),
        parent_id: type === "skill" ? parentId || null : null,
      };
      await onSave(row);
      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editing ? "Edit" : "Add"} {type === "category" ? "Category" : "Skill"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <Label>Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as "category" | "skill")} disabled={!!editing}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="skill">Skill</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label>Name *</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
          </div>
          {type === "skill" && (
            <div className="space-y-1">
              <Label>Category *</Label>
              <Select value={parentId} onValueChange={setParentId}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving || !name.trim() || (type === "skill" && !parentId)}>
            {saving ? "Saving…" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
