import { Pencil, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import type { SheetRow } from "@/data/commonsData";

interface Props {
  rows: SheetRow[];
  onEdit: (row: SheetRow) => void;
  onDelete: (id: string) => Promise<void>;
}

export function SkillsTable({ rows, onEdit, onDelete }: Props) {
  const categoryMap = new Map(rows.filter((r) => !r.parent_id).map((r) => [r.id, r.name]));

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[180px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-mono text-xs text-muted-foreground truncate max-w-[180px]">{row.id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.parent_id ? (categoryMap.get(row.parent_id) ?? "—") : <span className="text-muted-foreground italic">category</span>}</TableCell>
            <TableCell>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => onEdit(row)}>
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete "{row.name}"?</AlertDialogTitle>
                      <AlertDialogDescription>This will permanently remove the row from the sheet.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDelete(row.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
        {rows.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className="text-center text-muted-foreground py-8">No rows found.</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
