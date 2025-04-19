import { Modal, Button, Form, Input, notification } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { useAddMessageMutation } from "@/lib/messagesApi";

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddMessageModal = ({ open, onClose }: Props) => {
  const [newMessageContent, setNewMessageContent] = useState('');
  const [addMessage, { isLoading }] = useAddMessageMutation();
  const [form] = Form.useForm();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleAddMessage = async () => {
    try {
      await form.validateFields();
      await addMessage({ content: newMessageContent }).unwrap();

      notification.success({
        message: 'Sukces',
        description: 'Wiadomość została dodana!',
      });

      setNewMessageContent('');
      form.resetFields();
      onClose();
    } catch {
      notification.error({
        message: 'Błąd',
        description: 'Nie udało się dodać wiadomości.',
      });
    }
  };

  return (
    <Modal
      title="Dodaj nową wiadomość"
      open={open}
      onCancel={onClose}
      forceRender
      footer={[
        <Button key="cancel" onClick={onClose}>Anuluj</Button>,
        <Button key="submit" type="primary" loading={isLoading} onClick={handleAddMessage}>
          Dodaj
        </Button>,
      ]}
    >
      <Form form={form}>
        <Form.Item
          label="Treść wiadomości"
          name="message"
          rules={[{ required: true, message: 'Wiadomość nie może być pusta.' }]}
        >
          <Input.TextArea
            ref={inputRef}
            rows={4}
            value={newMessageContent}
            onChange={(e) => setNewMessageContent(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddMessageModal;
