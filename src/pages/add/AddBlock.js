import React from 'react';
import { Form, Button } from 'antd';
import { CameraFilled, FontSizeOutlined, YoutubeFilled } from '@ant-design/icons';

export default function AddBlock({ items, setItems }) {
  const form = Form.useFormInstance();
  return (
    <Button.Group className="w-full my-[40px]">
      <Button
        icon={<CameraFilled />}
        size="large"
        block
        onClick={() => {
          Add({ kind: 'image', position: items.length + 1 });
        }}
      >
        Зураг
      </Button>
      <Button
        icon={<YoutubeFilled />}
        onClick={() => {
          Add({ kind: 'video', position: items.length + 1 });
        }}
        size="large"
        block
      >
        Видео
      </Button>
      <Button
        icon={<FontSizeOutlined />}
        onClick={() => {
          Add({ kind: 'text', position: items.length + 1 });
        }}
        size="large"
        block
      >
        Текст
      </Button>
    </Button.Group>
  );

  function Add(item) {
    const newList = [...items, item];
    setItems(newList);
    form.setFieldsValue({ blocks: newList });
  }
}
