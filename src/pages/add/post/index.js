import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CATEGORIES, CREATE, POST, TAGS, UPDATE } from './_gql';
import { sortBy } from 'lodash';
import {
  Affix,
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Image,
  Input,
  message,
  Popconfirm,
  Row,
  Select,
  Skeleton,
  Upload,
} from 'antd';
import { DeleteOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { imagePath } from '../../../utility/Util';
import { useNavigate, useParams } from 'react-router-dom';
import { getDataFromBlob } from '../../../lib/imageCompress';
import AddBlock from './AddBlock';
import SortableContainer from './SortableContainer';
import { DatePicker } from 'antd/es';

const fallback =
  'data:image/png;base64,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';
const ckConfig = {
  placeholder: 'Тайлбар',
  rows: 2,
};

function AddPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, refetch } = useQuery(CATEGORIES);
  const { data: post, loading } = useQuery(POST, { variables: { id }, skip: !id });
  const categories = data?.categories?.nodes || [];
  const article = post?.article;
  const [blocks, setBlocks] = useState([]);
  const [featured, setFeatured] = useState(article?.data?.featured || false);
  const [saveArticle, { loading: saving }] = useMutation(id ? UPDATE : CREATE, { context: { upload: true } });

  useEffect(() => {
    setBlocks(sortBy(article?.blocks, 'position') || []);
  }, [article]);

  if (loading) {
    return <Skeleton />;
  }
  return (
    <Form
      onFinish={(values) => {
        saveArticle({
          variables: {
            id: id,
            featuredFrom: values.featuredDates?.[0],
            featuredTo: values.featuredDates?.[1],
            ...values,
            blocks: values.blocks.map((x) => ({
              id: x.id,
              kind: x.kind,
              position: x.position,
              title: x.title,
              image: x.image,
              content: x.content,
              data: x.data,
            })),
          },
        })
          .then((res) => {
            message.success('Амжилттай хадгаллаа');
            if (id) {
              refetch().then();
            } else {
              navigate(`/edit/${res?.data?.article.id}`);
            }
          })
          .catch((e) => {
            message.error(JSON.stringify(e.message));
          });
      }}
      layout="vertical"
      className="caak_article"
      initialValues={{
        ...article,
        tags: article?.tags.map((x) => x.slug),
        blocks: sortBy(article?.blocks, 'position'),
        featuredDates: [article?.featuredFrom, article?.featuredTo],
      }}
    >
      <Row gutter={12} className="mb-[400px]">
        <Col span={16} className="w-full mx-[50px]">
          <Card bordered={false} className="max-w-[920px] mx-auto">
            <Form.Item name="title" className="font-merri">
              <Input placeholder="Гарчиг" maxLength={200} showCount />
            </Form.Item>
            <Form.Item
              name="description"
              style={{ background: '#fff', border: '1px solid #ccc' }}
              valuePropName="data"
              className="font-merri"
              getValueFromEvent={(event, editor) => {
                return editor.getData();
              }}
            >
              <CKEditor editor={InlineEditor} config={ckConfig} />
            </Form.Item>

            <div className="flex flex-wrap">
              <SortableContainer items={blocks} setItems={setBlocks} />
            </div>
            <AddBlock items={blocks} setItems={setBlocks} />
            <h3 className="font-merri text-[18px]">
              Мэдээний агуулга (<span>{blocks.length}</span>)
            </h3>
            <Form.List name="blocks">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, idx) => {
                    const block = blocks[idx];
                    return (
                      <div className="caak_block" key={idx}>
                        <Form.Item name={[idx, 'id']} hidden>
                          <Input />
                        </Form.Item>
                        <Form.Item name={[idx, 'position']} hidden>
                          <Input />
                        </Form.Item>
                        <Form.Item name={[idx, 'kind']} hidden>
                          <Input />
                        </Form.Item>
                        {block?.kind === 'image' && <ImageBlock block={block} idx={idx} setBlocks={setBlocks} />}
                        {block?.kind === 'text' && <TextBlock block={block} idx={idx} setBlocks={setBlocks} />}
                        {block?.kind === 'video' && <VideoBlock block={block} idx={idx} setBlocks={setBlocks} />}
                      </div>
                    );
                  })}
                </>
              )}
            </Form.List>
          </Card>
        </Col>
        <Col span={6} className="border-l border-[#efefef] bg-[#ffffff]" style={{ padding: 12 }}>
          <Affix offsetTop={12}>
            <div className="h-screen">
              <h3 className="font-merri font-bold text-[16px]">Мэдээний төрөл</h3>
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
              <Form.Item name="acceptComment" className="font-merri mb-[0px]" valuePropName="checked">
                <Checkbox checked>Сэтгэгдэл зөвшөөрөх</Checkbox>
              </Form.Item>
              <Form.Item name="featured" className="font-merri" valuePropName="checked">
                <Checkbox onChange={(e) => setFeatured(e.target.checked)}>Мэдээг онцлох</Checkbox>
              </Form.Item>
              {featured && (
                <div className="flex justify-between">
                  <Form.Item name="featuredDates" className="font-merri text-[12px]" label="Онцлох огноо">
                    <DatePicker.RangePicker showTime format="YYYY-MM-DD HH:mm" />
                  </Form.Item>
                </div>
              )}
              <hr className="my-[20px]" />
              <Button.Group className="w-full">
                <Button title="Save" size="large" icon={<SearchOutlined />} loading={saving} shape="round" block>
                  Preview
                </Button>
                <Button
                  title="Save"
                  size="large"
                  icon={<SaveOutlined />}
                  htmlType="submit"
                  loading={saving}
                  type="primary"
                  shape="round"
                  block
                >
                  Save
                </Button>
              </Button.Group>
            </div>
          </Affix>
        </Col>
      </Row>
    </Form>
  );
}

function ImageBlock({ block, idx, setBlocks }) {
  const [image64, setImage64] = useState(block.image64);
  useEffect(() => {
    if (image64 === null) return;
    setBlocks((blocks) => {
      const index = blocks.findIndex((x) => x.position === block.position);
      return blocks.map((x, idx) => (idx === index ? { ...block, image64: image64 } : x));
    });
  }, [image64]);

  return (
    <Card
      className="my-[24px] bg-[#EFEFEF] font-merri shadow-md"
      key={idx}
      bordered={false}
      title={
        <>
          <Button key="position" type="link" className="bg-[#ff2689] text-white">
            {block.position}
          </Button>
        </>
      }
      extra={[<RemoveBlock key="remove" position={block.position} setBlocks={setBlocks} />]}
    >
      <Row gutter={14}>
        <Col span={6}>
          <Form.Item
            name={[idx, 'image']}
            getValueFromEvent={(e) => {
              return e?.fileList[0].originFileObj;
            }}
          >
            <Upload
              maxCount={1}
              showUploadList={false}
              valuePropName="fileList"
              customRequest={({ file, onSuccess }) => {
                getDataFromBlob(file).then((base64) => {
                  setImage64(base64);
                  onSuccess('ok');
                });
              }}
            >
              <Image
                src={image64 || imagePath(block?.imageUrl) || fallback}
                className="w-full object-cover rounded"
                preview={false}
              />
            </Upload>
          </Form.Item>
        </Col>
        <Col span={18}>
          <Form.Item name={[idx, 'title']}>
            <Input placeholder="Гарчиг" maxLength={200} showCount />
          </Form.Item>
          <Form.Item
            name={[idx, 'content']}
            className="bg-white border-1 border-[#cccccc]"
            valuePropName="data"
            getValueFromEvent={(event, editor) => {
              return editor.getData();
            }}
          >
            <CKEditor editor={InlineEditor} config={ckConfig} />
          </Form.Item>
          <Form.Item name={[idx, 'data', 'comment']}>
            <Input placeholder="Богино тайлбар" maxLength={200} showCount />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
}

export function TextBlock({ block, idx, setBlocks }) {
  return (
    <Card
      className="my-[24px] bg-[#EFEFEF] font-merri shadow-md"
      key={idx}
      bordered={false}
      title={
        <>
          <Button key="position" type="link" className="bg-[#ff2689] text-white">
            {block.position}
          </Button>
        </>
      }
      extra={[<RemoveBlock key="remove" position={block.position} setBlocks={setBlocks} />]}
    >
      <Form.Item
        name={[idx, 'content']}
        className="bg-white border-1 border-[#cccccc]"
        valuePropName="data"
        getValueFromEvent={(event, editor) => {
          return editor.getData();
        }}
      >
        <CKEditor editor={InlineEditor} config={ckConfig} />
      </Form.Item>
    </Card>
  );
}

function VideoBlock({ block, idx, setBlocks }) {
  const [url, setUrl] = useState(block?.data?.url);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    setBlocks((blocks) => {
      const index = blocks.findIndex((x) => x.position === block.position);
      return blocks.map((x, idx) => (idx === index ? { ...block, imageUrl: image } : x));
    });
  }, [image, title]);

  useEffect(() => {
    if (!url) return;
    const parsed = parseVideoURL(url);
    if (parsed?.provider === 'youtube') {
      fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${parsed.id}&key=AIzaSyCdT6cNcu3-5fOz8QunPi786ToSbbyXrbo&fields=items(snippet(title))&part=snippet`,
      )
        .then((response) => response.json())
        .then((data) => {
          setTitle(data.items[0].snippet.title);
          setImage(`https://img.youtube.com/vi/${parsed.id}/hqdefault.jpg`);
        });
    }
  }, [url]);
  return (
    <Card
      className="my-[24px] bg-[#EFEFEF] font-merri shadow-md"
      key={idx}
      bordered={false}
      title={
        <>
          <Button key="position" type="link" className="bg-[#ff2689] text-white">
            {block.position}
          </Button>
        </>
      }
      extra={[<RemoveBlock key="remove" position={block.position} setBlocks={setBlocks} />]}
    >
      <Row gutter={12}>
        <Col span={6}>
          <Image src={image || fallback} className="w-full object-cover rounded" preview={false} />
        </Col>
        <Col span={18}>
          <Form.Item name={[idx, 'data', 'url']} help={<small className="text-[10px]">{title}</small>}>
            <Input onChange={(e) => setUrl(e.target.value)} placeholder="Video Link" />
          </Form.Item>
          <Form.Item
            name={[idx, 'content']}
            className="bg-white border-1 border-[#cccccc] mt-[20px]"
            valuePropName="data"
            getValueFromEvent={(event, editor) => {
              return editor.getData();
            }}
          >
            <CKEditor editor={InlineEditor} config={ckConfig} />
          </Form.Item>
        </Col>
      </Row>
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

function RemoveBlock({ position, setBlocks }) {
  return (
    <Popconfirm
      title="Үнэхээр устгах уу?"
      onConfirm={() => {
        setBlocks((blocks) => {
          const index = blocks.findIndex((x) => x.position === position);
          return blocks.filter((x, idx) => idx !== index);
        });
      }}
    >
      <Button icon={<DeleteOutlined />} key="delete" type="link" className="bg-[#F53757] text-white" />
    </Popconfirm>
  );
}

export default AddPost;
