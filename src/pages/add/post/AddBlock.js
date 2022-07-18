import React, { useState } from 'react';
import { Form, Button, Upload } from 'antd';
import { CameraFilled, FontSizeOutlined, YoutubeFilled } from '@ant-design/icons';
import { getDataFromBlob } from '../../../lib/imageCompress';
import { useDebounce } from '../../../utility/Util';
import { uniqBy } from 'lodash/array';

export default function AddBlock({ items, setItems, add, top = false }) {
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
              images.push({ kind: 'image', position: items.length + idx + 1, image64: base64, image: f, content: '' });
              add(
                { kind: 'image', position: top ? 1 : items.length + idx + 1, image64: base64, image: f, content: '' },
                items.length + idx,
              );
            }
            const newList = top ? [...uniqBy(images), ...items] : [...items, ...uniqBy(images)];
            const sortedList = newList.map((x, idx) => ({ ...x, position: idx + 1 }));
            setItems(sortedList);
            if (top) {
              images.forEach((x) => add(x, 0));
            } else {
              images.forEach((x) => add(x));
            }
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
          Add({ kind: 'video', content: '', position: items.length + 1 }, top, add);
        }}
        size="large"
        block
      >
        Видео
      </Button>
      <Button
        icon={<FontSizeOutlined />}
        onClick={() => {
          Add({ kind: 'text', content: '', position: items.length + 1 }, top, add);
        }}
        size="large"
        block
      >
        Текст
      </Button>
    </Button.Group>
  );

  function Add(item, top, add) {
    const newList = top ? [item, ...items] : [...items, item];
    const sortedList = newList.map((x, idx) => ({ ...x, position: idx + 1 }));
    setItems(sortedList);
    add({ ...item, position: top ? 1 : item.position }, top ? 0 : sortedList.length);
    // form.setFieldsValue({ blocks: sortedList });
  }
}
