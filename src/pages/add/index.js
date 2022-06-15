import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CATEGORIES, POST, CREATE, UPDATE, TAGS } from './_gql';
import { sortBy } from 'lodash';
import { Affix, Button, Card, Checkbox, Col, Form, Image, Input, Row, Select, Skeleton, Upload, message } from 'antd';
import {
  CameraFilled,
  DeleteOutlined,
  FontSizeOutlined,
  SaveOutlined,
  SearchOutlined,
  UploadOutlined,
  YoutubeFilled,
} from '@ant-design/icons';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { imagePath } from '../../utility/Util';
import { useParams } from 'react-router-dom';
import { getDataFromBlob, imageCompress } from '../../lib/imageCompress';

const fallback =
  'data:image/png;base64,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';
const ckConfig = {
  placeholder: 'Тайлбар',
  rows: 2,
};

function AddPost() {
  const { id } = useParams();
  const { data } = useQuery(CATEGORIES);
  const { data: post, loading } = useQuery(POST, { variables: { id }, skip: !id });
  const [blocks, setBlocks] = useState([]);
  const categories = data?.categories?.nodes || [];
  const article = post?.article;
  const [saveArticle, { loading: saving }] = useMutation(id ? UPDATE : CREATE, { context: { upload: true } });
  useEffect(() => {
    setBlocks(sortBy(article?.blocks, 'position') || []);
  }, [post]);

  if (loading) {
    return <Skeleton />;
  }
  return (
    <Form
      onFinish={(values) => {
        console.log({ values });
        saveArticle({ variables: { id: id, ...values } }).then(message.success('Saved'));
      }}
      className="caak_article"
      initialValues={article}
    >
      <Row gutter={12}>
        <Col span={16} className="w-full mx-[50px]">
          <Card bordered={false} className="max-w-[920px] mx-auto">
            <Form.Item name="title" className="font-merri">
              <Input placeholder="Гарчиг" maxLength={200} showCount />
            </Form.Item>
            <Form.Item name="description" className="font-merri mb-[40px]">
              <Input.TextArea placeholder="Мэдээний тайлбар" rows={4} maxLength={500} showCount />
            </Form.Item>
            <div className="flex flex-wrap">
              {blocks.map((block) => {
                return (
                  <span>
                    {block.kind === 'image' && (
                      <Image
                        height={90}
                        src={imagePath(block.imageUrl || fallback)}
                        rootClassName="mx-[6px]"
                        fallback={fallback}
                      />
                    )}
                    {block.kind === 'text' && (
                      <span
                        style={{ height: 90, width: 90 }}
                        className="flex items-center justify-center bg-[#EFEFEF] mx-[4px]"
                      >
                        <FontSizeOutlined style={{ fontSize: '50px' }} />
                      </span>
                    )}
                    {block.kind === 'video' && (
                      <span
                        style={{ height: 90, width: 90 }}
                        className="flex items-center justify-center bg-[#EFEFEF] mx-[4px]"
                      >
                        <YoutubeFilled style={{ fontSize: '50px' }} />
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
            <div className="w-full flex justify-evenly my-[40px]">
              <Button
                icon={<CameraFilled />}
                className="w-[200px]"
                onClick={() => {
                  setBlocks([...blocks, { kind: 'image', position: blocks.length + 1 }]);
                }}
              >
                Зураг
              </Button>
              <Button
                icon={<YoutubeFilled />}
                className="w-[200px]"
                onClick={() => {
                  setBlocks([...blocks, { kind: 'video', position: blocks.length + 1 }]);
                }}
              >
                Видео
              </Button>
              <Button
                icon={<FontSizeOutlined />}
                className="w-[200px]"
                onClick={() => {
                  setBlocks([...blocks, { kind: 'text', position: blocks.length + 1 }]);
                }}
              >
                Текст
              </Button>
            </div>
            <h3 className="font-merri text-[18px]">
              Мэдээний агуулга (<span>{blocks.length}</span>)
            </h3>
            {blocks.map((block, idx) => {
              return (
                <div className="caak_block" key={idx}>
                  <Form.Item name={['blocks', idx, 'id']} hidden>
                    <Input />
                  </Form.Item>
                  <Form.Item name={['blocks', idx, 'position']} hidden>
                    <Input />
                  </Form.Item>
                  <Form.Item name={['blocks', idx, 'kind']} hidden>
                    <Input />
                  </Form.Item>
                  {block?.kind === 'image' && <ImageBlock block={block} idx={idx} />}
                  {block?.kind === 'text' && <TextBlock block={block} idx={idx} />}
                  {block?.kind === 'video' && <VideoBlock block={block} idx={idx} />}
                </div>
              );
            })}
          </Card>
        </Col>
        <Col span={6} style={{ borderLeft: '1px solid #efefef', padding: 24 }}>
          <Affix offsetTop={24}>
            <h3 className="font-merri">Мэдээний төрөл</h3>
            <hr className="mb-[24px] mt-[8px]" />
            <Form.Item name="categoryIds" className="font-merri">
              <Select
                mode="multiple"
                placeholder="Categories"
                options={categories.map((x) => ({ value: x.id, label: x.name, key: x.id }))}
              />
            </Form.Item>
            <Form.Item name="tags" className="font-merri">
              <TagsField mode="tags" placeholder="Tags" />
            </Form.Item>
            <Form.Item name="acceptComment" className="font-merri mb-[0px]">
              <Checkbox checked>Сэтгэгдэл зөвшөөрөх</Checkbox>
            </Form.Item>
            <Form.Item name="featured" className="font-merri">
              <Checkbox>Мэдээг онцлох</Checkbox>
            </Form.Item>
            <hr className="my-[20px]" />
            <div className="flex justify-between">
              <Button title="Save" size="large" icon={<SearchOutlined />} loading={saving}>
                Preview
              </Button>
              <Button
                title="Save"
                size="large"
                icon={<SaveOutlined />}
                htmlType="submit"
                loading={saving}
                type="primary"
                ghost
              >
                Save
              </Button>
            </div>
          </Affix>
        </Col>
      </Row>
    </Form>
  );
}

function ImageBlock({ block, idx }) {
  const [image, setImage] = useState({ src: imagePath(block.imageUrl) || fallback, file: null });
  return (
    <Card
      className="my-[24px] bg-[#EFEFEF] font-merri"
      key={block}
      actions={[]}
      extra={[
        <Button.Group>
          <Button
            icon={<DeleteOutlined />}
            style={{ borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }}
            key="delete"
            size="small"
          />
          <Button icon={<CameraFilled />} key="type" size="small" />
          <Button
            icon={block.position}
            style={{ borderTopRightRadius: 16, borderBottomRightRadius: 16 }}
            key="position"
            size="small"
          />
        </Button.Group>,
      ]}
    >
      <Row gutter={12}>
        <Col span={8}>
          <Image src={image.src} fallback={fallback} className="w-full" />
          <Form.Item
            name={['blocks', idx, 'image']}
            getValueFromEvent={(e) => {
              return e?.fileList[0].originFileObj;
            }}
          >
            <Upload
              maxCount={1}
              showUploadList={false}
              customRequest={({ file, onSuccess }) => {
                imageCompress(file, { maxWidth: 1024, maxHeight: 1024 }).then((result) => {
                  getDataFromBlob(result).then((base64) => {
                    setImage({ src: base64, file: result });
                    onSuccess('ok');
                  });
                });
              }}
            >
              <Button size="small" icon={<UploadOutlined />}>
                Change
              </Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item name={['blocks', idx, 'title']}>
            <Input placeholder="Гарчиг" maxLength={200} showCount />
          </Form.Item>
          <Form.Item
            name={['blocks', idx, 'content']}
            style={{ background: '#fff', border: '1px solid #ccc' }}
            valuePropName="data"
            getValueFromEvent={(event, editor) => {
              return editor.getData();
            }}
          >
            <CKEditor editor={InlineEditor} config={ckConfig} />
          </Form.Item>
          <Form.Item name={['blocks', idx, 'data']}>
            <Input placeholder="Богино тайлбар" maxLength={200} showCount />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
}

export function TextBlock({ block, idx }) {
  const TextTypes = [
    { value: 'default', label: 'Энгийн' },
    { value: 'quote', label: 'Ишлэл' },
    { value: 'big_quote', label: 'Том ишлэл' },
  ];
  return (
    <Card
      className="my-[24px] bg-[#EFEFEF] font-merri"
      key={block}
      actions={[]}
      extra={[
        <Button.Group>
          <Button
            icon={<DeleteOutlined />}
            style={{ borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }}
            key="delete"
            size="small"
          />
          <Button icon={<FontSizeOutlined />} key="type" size="small" />
          <Button
            icon={block.position}
            style={{ borderTopRightRadius: 16, borderBottomRightRadius: 16 }}
            key="position"
            size="small"
          />
        </Button.Group>,
      ]}
    >
      <Form.Item
        name={['blocks', idx, 'content']}
        style={{ background: '#fff', border: '1px solid #ccc' }}
        valuePropName="data"
        getValueFromEvent={(event, editor) => {
          return editor.getData();
        }}
      >
        <CKEditor editor={InlineEditor} config={ckConfig} />
      </Form.Item>
      <Form.Item name={['blocks', idx, 'data', 'type']}>
        <Select options={TextTypes} placeholder="Текстийн төрөл" />
      </Form.Item>
    </Card>
  );
}

function VideoBlock({ block, idx }) {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    if (!url) return;
    const parsed = parseVideoURL(url);
    if (parsed.provider === 'youtube') {
      fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${parsed.id}&key=AIzaSyCdT6cNcu3-5fOz8QunPi786ToSbbyXrbo&fields=items(snippet(title))&part=snippet`,
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.items[0].snippet.title);
        });
    }
  }, [url]);
  return (
    <Card
      className="my-[24px] bg-[#EFEFEF] font-merri"
      key={block}
      actions={[]}
      extra={[
        <Button.Group>
          <Button
            icon={<DeleteOutlined />}
            style={{ borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }}
            key="delete"
            size="small"
          />
          <Button icon={<YoutubeFilled />} key="type" size="small" />
          <Button
            icon={block.position}
            style={{ borderTopRightRadius: 16, borderBottomRightRadius: 16 }}
            key="position"
            size="small"
          />
        </Button.Group>,
      ]}
    >
      <Form.Item name={['blocks', idx, 'data', 'url']}>
        <Input onChange={(e) => setUrl(e.target.value)} placeholder="Video Link" />
      </Form.Item>
      <Form.Item name={['blocks', idx, 'title']}>
        <Input />
      </Form.Item>
    </Card>
  );
}

function TagsField({ ...rest }) {
  const [filter, setFilter] = useState(null);
  const { data, loading } = useQuery(TAGS, { variables: { filter } });
  const options = data?.tags?.nodes.map((x) => ({ key: x.slug, value: x.slug, label: x.name })) || [];

  return <Select showSearch onSearch={setFilter} filterOption={false} options={options} loading={loading} {...rest} />;
}
function parseVideoURL(url) {
  const match = url.match(
    /(https:|https:|)\/\/(player.|www.)?(vimeo|youtu(be|be\.googleapis))(\.be|\.com)\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/,
  );
  return (
    match &&
    match[7] && {
      provider: match[3],
      id: match[7],
    }
  );
}
export default AddPost;
