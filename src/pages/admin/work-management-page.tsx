import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { fetchProjects, type Project } from "@/data/projectsData";
import { sheetsWrite } from "@/lib/sheets-write-api";
import { WorkTable } from "@/components/admin/work-table";
import { WorkFormDialog } from "@/components/admin/work-form-dialog";

const toRow = (p: Project): string[] => [
  p.id, p.title, p.description, p.fullDescription ?? "",
  p.stack, p.from, p.to,
  p.githubUrl ?? "", p.demoUrl ?? "",
  p.customer ?? "", String(p.teamSize ?? ""),
];

export default function WorkManagementPage() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);

  async function load() {
    setLoading(true);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch {
      toast({ title: "Failed to load projects", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function openAdd() {
    setEditing(null);
    setDialogOpen(true);
  }

  function openEdit(project: Project) {
    setEditing(project);
    setDialogOpen(true);
  }

  async function handleSave(project: Project) {
    try {
      if (editing) {
        await sheetsWrite({ action: "update", sheet: "projects", row: toRow(project), id: project.id });
      } else {
        await sheetsWrite({ action: "insert", sheet: "projects", row: toRow(project) });
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
      await sheetsWrite({ action: "delete", sheet: "projects", id });
      toast({ title: "Deleted successfully" });
      await load();
    } catch (err) {
      toast({ title: "Delete failed", description: String(err), variant: "destructive" });
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Work Management</h2>
        <Button onClick={openAdd}>Add Project</Button>
      </div>

      {loading ? (
        <div className="text-muted-foreground py-8 text-center">Loading…</div>
      ) : (
        <WorkTable projects={projects} onEdit={openEdit} onDelete={handleDelete} />
      )}

      <WorkFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editing={editing}
        onSave={handleSave}
      />
    </div>
  );
}
