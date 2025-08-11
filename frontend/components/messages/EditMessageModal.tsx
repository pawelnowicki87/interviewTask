"use client";

import { Modal, Button, Form, Input, notification } from "antd";
import { useState, useEffect, useRef } from "react";
import { useUpdateMessageMutation } from "@/lib/messagesApi";

type Props = {
  open: boolean;
  onClose: () => void;
  messageId: number | null;
  initialContent: string;
};

const EditMessageModal = ({ open, onClose, messageId, initialContent }: Props) => {
  const [updateMessage, { isLoading }] = useUpdateMessageMutation();
  const [content, setContent] = useState(initialContent);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleUpdate = async () => {
    if (!messageId) return;

    if (!content.trim()) {
      notification.error({
        message: "Błąd",
        description: "Treść wiadomości nie może być pusta.",
      });
      return;
    }

    try {
      await updateMessage({ id: messageId, content: content }).unwrap();
      notification.success({ message: "Zaktualizowano wiadomość" });
      onClose();
    } catch (error) {
      console.error("Błąd aktualizacji wiadomości:", error);
      notification.error({
        message: "Błąd",
        description: "Nie udało się zapisać zmian.",
      });
    }
  };

  return (
    <Modal
      title="Edytuj wiadomość"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Anuluj
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleUpdate}
          loading={isLoading}
        >
          Zapisz
        </Button>,
      ]}
    >
      <Form>
        <Form.Item
          label="Treść wiadomości"
          required
          validateStatus={!content.trim() ? "error" : ""}
          help={!content.trim() ? "Treść nie może być pusta." : ""}
        >
          <Input.TextArea
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditMessageModal;
