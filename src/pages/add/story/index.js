/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CATEGORIES, CREATE, POST, TAGS, UPDATE, UPLOAD } from '../post/_gql';
import { sortBy } from 'lodash';
import moment from 'moment';
import {
  Affix,
  Button,
  Card,
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
  DatePicker,
  Checkbox,
  InputNumber,
} from 'antd';
import { DeleteOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import InlineEditor from 'ckeditor5-custom-build';
import ReactPlayer from 'react-player';

import { imagePath, useDebounce } from 'utility/Util';
import { useNavigate, useParams } from 'react-router-dom';
import { getDataFromBlob, imageCompress } from 'lib/imageCompress';
import AddBlock from './AddBlock';
import SortableContainer from './SortableContainer';
import { AppContext } from 'App';
import { Helmet } from 'react-helmet';
import AddTabs from '../tabs';

const fallback =
  'data:image/png;base64,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';
const ckConfig = {
  placeholder: 'Тайлбар',
  rows: 2,
  toolbar: [
    'bold',
    'italic',
    'link',
    '|',
    'alignment:left',
    'alignment:center',
    'alignment:right',
    'alignment:justify',
    '|',
    'blockQuote',
    'bulletedList',
    'numberedList',
    'outdent',
    'indent',
    '|',
    'undo',
    'redo',
  ],
};

function AddStory() {
  const context = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [featured, setFeatured] = useState(false);
  const [dirty, setDirty] = useState(false);
  const { data } = useQuery(CATEGORIES);
  const { data: post, loading } = useQuery(POST, { variables: { id }, skip: !id });
  const categories = data?.categories?.nodes || [];
  const article = post?.article;
  const [blocks, setBlocks] = useState([]);
  const [saveArticle, { loading: saving }] = useMutation(id ? UPDATE : CREATE, { context: { upload: true } });

  useEffect(() => {
    setFeatured(article?.featured);
    setBlocks(sortBy(article?.blocks, 'position') || []);
  }, [article]);

  useEffect(() => {
    context.setStore('default');
    window.addEventListener('beforeunload', (e) => {
      if (dirty) {
        e.returnValue = 'Уучлаарай, та энэ цонхыг хаахад итгэлтэй байна уу?';
      } else {
        e = null;
      }
    });
  });

  if (loading) {
    return <Skeleton />;
  }
  return (
    <Form
      onFinish={(values) => {
        saveArticle({
          variables: {
            input: {
              id: id,
              kind: 'story',
              ...values,
              blocks: values.blocks.map((x, idx) => ({
                id: x.id,
                kind: x.kind,
                position: idx + 1,
                title: x.title,
                image: x.image,
                content: x.content,
                videoFile: x.videoFile,
                data: x.data,
              })),
            },
          },
        })
          .then((res) => {
            message.success('Амжилттай хадгаллаа').then(() => {
              setDirty(false);
              navigate(`/story/${res?.data?.article.id}`);
            });
          })
          .catch((e) => {
            message.error(JSON.stringify(e.message)).then();
          });
      }}
      layout="vertical"
      className="caak_article"
      onValuesChange={() => setDirty(true)}
      initialValues={{
        status: 'published',
        featuredDays: 7,
        ...article,
        tags: article?.tags.map((x) => x.slug),
        blocks: sortBy(article?.blocks, 'position'),
        publishDate: moment(article?.publishDate || undefined),
        featuredFrom: moment(article?.featuredFrom || undefined),
      }}
    >
      <Helmet>
        <title>Стори мэдээ оруулах/засах | Caak.mn</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Стори мэдээ оруулах/засах | Caak.mn" />
        <meta name="og:title" content="Стори мэдээ оруулах/засах | Caak.mn" />
      </Helmet>
      <Row gutter={12} className="mb-[400px]">
        <Col span={16} className="w-full mx-[50px]">
          <AddTabs defaultActiveKey="story" />
          <Card bordered={false} className="max-w-[920px] mx-auto">
            <Form.Item name="title" className="font-merri">
              <Input placeholder="Гарчиг" maxLength={200} showCount size="large" />
            </Form.Item>
            <div className="flex flex-wrap">
              <SortableContainer items={blocks} setItems={setBlocks} />
            </div>
            <Form.List name="blocks">
              {(fields, { add, remove }, { errors }) => (
                <>
                  <AddBlock items={blocks} setItems={setBlocks} top={true} add={add} />
                  <h3 className="font-merri text-[18px]">
                    Cтори агуулга (<span>{blocks.length}</span>)
                  </h3>
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
                        {block?.kind === 'image' && (
                          <ImageBlock block={block} idx={idx} setBlocks={setBlocks} onRemove={() => remove(idx)} />
                        )}
                        {block?.kind === 'video' && (
                          <VideoBlock block={block} idx={idx} setBlocks={setBlocks} onRemove={() => remove(idx)} />
                        )}
                        {block?.kind === 'post' && (
                          <PostBlock block={block} idx={idx} setBlocks={setBlocks} onRemove={() => remove(idx)} />
                        )}
                      </div>
                    );
                  })}
                  <AddBlock items={blocks} setItems={setBlocks} add={add} />
                </>
              )}
            </Form.List>
          </Card>
        </Col>
        <Col span={6} className="border-l border-[#efefef] bg-[#ffffff] p-[12px]">
          <Affix offsetTop={12}>
            <div className="h-screen">
              <h3 className="font-merri font-bold text-[16px]">Стори төрөл</h3>
              <hr className="mb-[24px] mt-[8px]" />
              <Form.Item name="categoryIds" className="font-merri">
                <Select
                  mode="multiple"
                  placeholder="Categories"
                  size="large"
                  allowClear
                  filterOption={(input, option) =>
                    option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                    option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  options={categories.map((x) => ({
                    value: x.id,
                    label: x.fullName,
                    key: x.id,
                    disabled: x.status !== 'active',
                  }))}
                />
              </Form.Item>
              <Form.Item
                name="tags"
                className="font-merri"
                rules={[{ required: true, message: 'Таг заавал сонгоно уу' }]}
              >
                <TagsField mode="tags" placeholder="Tags" />
              </Form.Item>
              <Form.Item name="featured" className="font-merri" valuePropName="checked">
                <Checkbox onChange={(e) => setFeatured(e.target.checked)}>Сториг онцлох</Checkbox>
              </Form.Item>
              {featured && (
                <div className="flex justify-between">
                  <Form.Item name="featuredFrom" className="font-merri text-[12px]" label="Онцлох огноо">
                    <DatePicker showTime format="YYYY-MM-DD HH:mm" />
                  </Form.Item>
                  <Form.Item name="featuredDays" className="font-merri text-[12px]" label="Онцлох өдөр">
                    <InputNumber />
                  </Form.Item>
                </div>
              )}
              <Form.Item name="publishDate" className="font-merri w-full" label="Нийтлэх огноо">
                <DatePicker showTime format="YYYY-MM-DD HH:mm" />
              </Form.Item>
              <Form.Item name="status" className="font-merri">
                <Select
                  size="large"
                  options={[
                    { label: 'Нийтлэх', value: 'published' },
                    { label: 'Ноорог', value: 'draft' },
                  ]}
                />
              </Form.Item>
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

function ImageBlock({ block, idx, setBlocks, onRemove }) {
  const [image64, setImage64] = useState();
  useEffect(() => {
    if (block.image64) setImage64(block.image64);
  }, [block]);
  useEffect(() => {
    if (image64 === null || image64 === block.image64) return;
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
      extra={[<RemoveBlock key="remove" position={block.position} setBlocks={setBlocks} onRemove={onRemove} />]}
    >
      <Row gutter={14}>
        <Col span={8}>
          <Form.Item
            name={[idx, 'image']}
            valuePropName="file"
            getValueFromEvent={(e) => {
              return e?.fileList[0].originFileObj;
            }}
          >
            <Upload
              maxCount={1}
              showUploadList={false}
              valuePropName="fileList"
              customRequest={({ file, onSuccess }) => {
                imageCompress(file, { maxWidth: 1500, quality: 0.8 }).then((result) => {
                  getDataFromBlob(result).then((base64) => {
                    setImage64(base64);
                    onSuccess('ok');
                  });
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
        <Col span={16}>
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
          <Form.Item name={[idx, 'data', 'url']}>
            <Input placeholder="Үсрэх линк" />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
}
function PostBlock({ block, idx, setBlocks, onRemove }) {
  const [image64, setImage64] = useState();
  useEffect(() => {
    if (block.image64) setImage64(block.image64);
  }, [block]);

  useEffect(() => {
    if (image64 === null || image64 === block.image64) return;
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
      extra={[<RemoveBlock key="remove" position={block.position} setBlocks={setBlocks} onRemove={onRemove} />]}
    >
      <Row gutter={14}>
        <Col span={8}>
          <Form.Item
            name={[idx, 'data', 'image']}
            valuePropName="file"
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
        <Col span={16}>
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
          <Form.Item name={[idx, 'data', 'url']}>
            <Input placeholder="Үсрэх линк" />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
}

function VideoBlock({ block, idx, setBlocks, onRemove }) {
  const [upload, { loading }] = useMutation(UPLOAD, { context: { upload: true } });
  const [url, setUrl] = useState();
  useEffect(() => {
    setUrl(block?.videoUrl);
  }, [block]);

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
      extra={[<RemoveBlock key="remove" position={block.position} setBlocks={setBlocks} onRemove={onRemove} />]}
    >
      <Row gutter={12}>
        <Col span={8} className="flex flex-col items-center">
          {url && <ReactPlayer className="react-player" url={imagePath(url)} controls width="100%" height="80%" />}
          <Form.Item
            name={[idx, 'videoFile']}
            valuePropName="file"
            getValueFromEvent={(e) => {
              return e?.fileList[0].originFileObj;
            }}
          >
            <Upload
              accept="video/*"
              showUploadList={false}
              maxCount={1}
              customRequest={({ file }) => {
                upload({ variables: { blob: file } }).then((res) => {
                  const { signed_id, filename } = res?.data?.directUpload;
                  setUrl(`rails/active_storage/blobs/${signed_id}/${filename}`);
                });
              }}
            >
              <Button size="small" className="my-2" loading={loading}>
                Видео оруулах
              </Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col span={16}>
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

          <Form.Item name={[idx, 'data', 'url']}>
            <Input placeholder="Үсрэх линк" />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
}

function RemoveBlock({ position, setBlocks, onRemove }) {
  return (
    <Popconfirm
      title="Үнэхээр устгах уу?"
      onConfirm={() => {
        setBlocks((blocks) => {
          const index = blocks.findIndex((x) => x.position === position);
          const newList = blocks.filter((x, idx) => idx !== index).map((x, idx) => ({ ...x, position: idx + 1 }));
          onRemove();
          return newList;
        });
      }}
    >
      <Button icon={<DeleteOutlined />} key="delete" type="link" className="bg-[#F53757] text-white" />
    </Popconfirm>
  );
}

function TagsField({ ...rest }) {
  const [filter, setFilter] = useState(null);
  const debouncedFilter = useDebounce(filter, 500);
  const { data, loading } = useQuery(TAGS, { variables: { filter: debouncedFilter } });
  const options =
    data?.tags?.nodes.map((x) => ({ key: x.slug, value: x.slug, label: `${x.name} (${x.articlesCount})` })) || [];

  return (
    <Select
      showSearch
      onSearch={setFilter}
      filterOption={false}
      options={options}
      loading={loading}
      {...rest}
      size="large"
    />
  );
}

export default AddStory;
