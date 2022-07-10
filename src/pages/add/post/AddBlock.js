import React, { useState } from 'react';
import { Form, Button, Upload } from 'antd';
import { CameraFilled, FontSizeOutlined, YoutubeFilled } from '@ant-design/icons';
import { getDataFromBlob } from '../../../lib/imageCompress';
import { useDebounce } from '../../../utility/Util';
import { uniqBy } from 'lodash/array';

export default function AddBlock({ items, setItems }) {
  const form = Form.useFormInstance();
  let images = [];
  return (
    <Button.Group className="w-full my-[40px]">
      <Upload
        multiple
        accept="image/*"
        className="w-full"
        showUploadList={false}
        beforeUpload={async (file, fileList) => {
          if (file === fileList[0]) {
            for (const f of fileList) {
              const idx = fileList.indexOf(f);
              const base64 = await getDataFromBlob(f);
              images.push({ kind: 'image', position: items.length + idx + 1, image64: base64, image: f });
            }
            console.log({ images });
            const newList = [...items, ...uniqBy(images)];
            setItems(newList);
            form.setFieldsValue({ blocks: newList });
          }
          return false;
        }}
      >
        <Button icon={<CameraFilled />} size="large" className="w-full" block>
          Зураг
        </Button>
      </Upload>
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
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
