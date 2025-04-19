"use client";

import {
  useGetMessagesQuery,
  useDeleteMessageMutation,
} from "@/lib/messagesApi";
import MessageRow from "@/components/messages/MessageRow";
import EditMessageModal from "@/components/messages/EditMessageModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import AddNewMessage from "./AddNewMessage";
import { useState } from "react";
import { notification } from "antd";

export default function MessageTable() {
  const { data: messages, isLoading, isError } = useGetMessagesQuery();
  const [deleteMessage] = useDeleteMessageMutation();

  const [editId, setEditId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");

  const handleEdit = (id: number, content: string) => {
    setEditId(id);
    setEditContent(content);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMessage(id).unwrap();
      notification.success({
        message: "Usunięto wiadomość",
        description: `Wiadomość o ID ${id} została usunięta.`,
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      notification.error({
        message: "Błąd",
        description: "Nie udało się usunąć wiadomości.",
      });
    }
  };

  if (isError) return <p>Wystąpił błąd podczas pobierania wiadomości.</p>;

  return (
    <>
      <AddNewMessage />

      <EditMessageModal
        open={editId !== null}
        onClose={() => setEditId(null)}
        messageId={editId}
        initialContent={editContent}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Wiadomość</TableHead>
            <TableHead>Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell><Skeleton className="h-4 w-10" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
                  <TableCell className="flex gap-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                  </TableCell>
                </TableRow>
              ))
            : messages && messages.length > 0 ? (
                messages.map((msg) => (
                  <MessageRow
                    key={msg.id}
                    id={msg.id}
                    content={msg.content}
                    handleEdit={() => handleEdit(msg.id, msg.content)}
                    handleDelete={handleDelete}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground py-4">
                    Brak wiadomości do wyświetlenia.
                  </TableCell>
                </TableRow>
              )}
        </TableBody>
      </Table>
    </>
  );
}
