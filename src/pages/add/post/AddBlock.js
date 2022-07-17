import React, { useState } from 'react';
import { Form, Button, Upload } from 'antd';
import { CameraFilled, FontSizeOutlined, YoutubeFilled } from '@ant-design/icons';
import { getDataFromBlob } from '../../../lib/imageCompress';
import { useDebounce } from '../../../utility/Util';
import { uniqBy } from 'lodash/array';

export default function AddBlock({ items, setItems, top = false }) {
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
            const newList = top ? [...uniqBy(images), ...items] : [...items, ...uniqBy(images)];
            const sortedList = newList.map((x, idx) => ({ ...x, position: idx + 1 }));
            setItems(sortedList);
            form.setFieldsValue({ blocks: sortedList });
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
          Add({ kind: 'video', position: items.length + 1 }, top);
        }}
        size="large"
        block
      >
        Видео
      </Button>
      <Button
        icon={<FontSizeOutlined />}
        onClick={() => {
          Add({ kind: 'text', position: items.length + 1 }, top);
        }}
        size="large"
        block
      >
        Текст
      </Button>
    </Button.Group>
  );

  function Add(item, top) {
    const newList = top ? [item, ...items] : [...items, item];
    const sortedList = newList.map((x, idx) => ({ ...x, position: idx + 1 }));
    setItems(sortedList);
    form.setFieldsValue({ blocks: sortedList });
  }
}
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
