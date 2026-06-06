import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Project } from "@/data/projectsData";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing?: Project | null;
  onSave: (project: Project) => Promise<void>;
}

const EMPTY: Omit<Project, "id"> = {
  title: "", description: "", fullDescription: "", stack: "",
  from: "", to: "", githubUrl: "", demoUrl: "", customer: "", teamSize: undefined,
};

export function WorkFormDialog({ open, onOpenChange, editing, onSave }: Props) {
  const [form, setForm] = useState<Omit<Project, "id">>(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(editing ? { ...editing } : EMPTY);
    }
  }, [open, editing]);

  function set(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    if (!form.title.trim() || !form.description.trim() || !form.from.trim() || !form.to.trim()) return;
    setSaving(true);
    try {
      const project: Project = {
        id: editing?.id ?? crypto.randomUUID(),
        ...form,
        teamSize: form.teamSize ? Number(form.teamSize) : undefined,
      };
      await onSave(project);
      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  }

  const required = !form.title.trim() || !form.description.trim() || !form.from.trim() || !form.to.trim();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{editing ? "Edit" : "Add"} Project</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="col-span-2 space-y-1">
              <Label>Title *</Label>
              <Input value={form.title} onChange={(e) => set("title", e.target.value)} />
            </div>
            <div className="col-span-2 space-y-1">
              <Label>Description *</Label>
              <Textarea rows={2} value={form.description} onChange={(e) => set("description", e.target.value)} />
            </div>
            <div className="col-span-2 space-y-1">
              <Label>Full Description</Label>
              <Textarea rows={3} value={form.fullDescription ?? ""} onChange={(e) => set("fullDescription", e.target.value)} />
            </div>
            <div className="col-span-2 space-y-1">
              <Label>Stack (comma-separated)</Label>
              <Input value={form.stack} onChange={(e) => set("stack", e.target.value)} placeholder="Java, Spring Boot, Docker" />
            </div>
            <div className="space-y-1">
              <Label>From * (e.g. 2024-01)</Label>
              <Input value={form.from} onChange={(e) => set("from", e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>To * (e.g. Present)</Label>
              <Input value={form.to} onChange={(e) => set("to", e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>GitHub URL</Label>
              <Input value={form.githubUrl ?? ""} onChange={(e) => set("githubUrl", e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Demo URL</Label>
              <Input value={form.demoUrl ?? ""} onChange={(e) => set("demoUrl", e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Customer</Label>
              <Input value={form.customer ?? ""} onChange={(e) => set("customer", e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Team Size</Label>
              <Input type="number" min={1} value={form.teamSize ?? ""} onChange={(e) => set("teamSize", e.target.value)} />
            </div>
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving || required}>
            {saving ? "Saving…" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
