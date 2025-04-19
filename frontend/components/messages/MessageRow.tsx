"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

type MessageRowProps = {
  id: number;
  content: string;
  handleEdit: () => void;
  handleDelete: (id: number) => Promise<void>;
};

export default function MessageRow({
  id,
  content,
  handleEdit,
  handleDelete,
}: MessageRowProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = async () => {
    setIsDeleting(true);
    try {
      await handleDelete(id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <TableRow className={isDeleting ? "opacity-60 transition-opacity" : ""}>
      <TableCell>{id}</TableCell>
      <TableCell>{content}</TableCell>
      <TableCell className="flex gap-2">
        <Button variant="outline" onClick={handleEdit} disabled={isDeleting}>
          Edytuj
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={isDeleting}>
              Usuń
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Czy na pewno chcesz usunąć?</AlertDialogTitle>
              <AlertDialogDescription>
                Tej operacji nie można cofnąć. Wiadomość zostanie trwale usunięta.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>Anuluj</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={isDeleting}>
                {isDeleting ? (
                  <Loader2 className="animate-spin w-4 h-4 mr-2" />
                ) : null}
                Usuń
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
}
