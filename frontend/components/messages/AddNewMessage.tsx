"use client";

import { useState } from 'react';
import { Button } from 'antd';
import AddMessageModal from './AddMessageModal';

const AddNewMessage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Dodaj nową wiadomość
        </Button>
      </div>

      <AddMessageModal
        open={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
};

export default AddNewMessage;
