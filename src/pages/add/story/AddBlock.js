import React, { useState, useEffect } from 'react';
import { Button, Modal, Upload, List, Input, Avatar, Checkbox } from 'antd';
import { CameraFilled, PaperClipOutlined, YoutubeFilled } from '@ant-design/icons';
import { getDataFromBlob } from '../../../lib/imageCompress';
import { uniqBy } from 'lodash/array';
import { ESService } from '../../../lib/esService';
import { imagePath, useDebounce } from '../../../utility/Util';

export default function AddBlock({ items, setItems, add, top = false }) {
  let images = [];
  const [open, setOpen] = useState(false);

  return (
    <>
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
                images.push({
                  kind: 'image',
                  position: items.length + idx + 1,
                  image64: base64,
                  image: f,
                  content: '',
                });
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
            Энгийн стори
          </Button>
        </Upload>
        <Button icon={<PaperClipOutlined />} onClick={() => setOpen(true)} size="large" block>
          Мэдээн стори
        </Button>
        <Button
          icon={<YoutubeFilled />}
          onClick={() => {
            Add({ kind: 'video', content: '', position: items.length + 1 }, top, add);
          }}
          size="large"
          block
        >
          Видео стори
        </Button>
      </Button.Group>
      {open && (
        <PostsModal
          toggle={() => setOpen(false)}
          onComplete={(selected) => {
            let images = [];
            selected.forEach((f, idx) => {
              images.push({
                kind: 'post',
                position: items.length + idx + 1,
                image64: imagePath(f.image),
                content: f.title,
                data: { url: `/post/view/${f.id}`, image: f.image },
              });
            });
            const newList = top ? [...uniqBy(images), ...items] : [...items, ...uniqBy(images)];
            const sortedList = newList.map((x, idx) => ({ ...x, position: idx + 1 }));
            setItems(sortedList);
            if (top) {
              images.forEach((x) => add(x, 0));
            } else {
              images.forEach((x) => add(x));
            }
          }}
        />
      )}
    </>
  );

  function Add(item, top, add) {
    const newList = top ? [item, ...items] : [...items, item];
    const sortedList = newList.map((x, idx) => ({ ...x, position: idx + 1 }));
    setItems(sortedList);
    add({ ...item, position: top ? 1 : item.position }, top ? 0 : sortedList.length);
  }
}

function PostsModal({ toggle, onComplete }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const debouncedFilter = useDebounce(filter, 500);

  const [selected, setSelected] = useState([]);
  const es = new ESService('caak');

  useEffect(() => {
    setLoading(true);
    if (filter.length > 0) {
      es.search(debouncedFilter, 0, 10).then(({ hits, total }) => {
        setPosts(hits);
        setLoading(false);
      });
    } else {
      es.posts([], { publish_date: 'desc' }, 10, 0).then(({ hits, total }) => {
        setPosts(hits);
        setLoading(false);
      });
    }
  }, [debouncedFilter]);

  return (
    <Modal
      title="Мэдээ сонгох"
      visible
      onCancel={toggle}
      width={600}
      onOk={() => {
        onComplete(selected);
        toggle();
      }}
    >
      <Input.Search
        onChange={({ target }) => {
          setFilter(target.value);
        }}
        placeholder="Search"
        loading={loading}
        allowClear
      />
      <List
        bordered
        size="small"
        className="mt-2"
        dataSource={posts}
        renderItem={(item) => (
          <List.Item style={{ padding: 8 }}>
            <List.Item.Meta
              title={<span className="text-[13px] truncate-2">{item.title}</span>}
              avatar={
                <>
                  <Checkbox
                    className="mr-2"
                    onChange={({ target }) => {
                      if (target.checked) {
                        setSelected([...selected, { id: item.id, title: item.title, image: item.image }]);
                      } else {
                        setSelected(selected.filter((x) => x.id !== item.id));
                      }
                    }}
                  />
                  <Avatar shape="square" src={imagePath(item.image)} />
                </>
              }
            />
          </List.Item>
        )}
      />
    </Modal>
  );
}
