import React, { useState, useEffect } from 'react';
import {
  Tabs,
  Button,
  Affix,
  message,
  Form,
  Row,
  Col,
  Input,
  Card,
  Skeleton,
  Image,
  Upload,
  Select,
  Checkbox,
  InputNumber,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE, POST, UPDATE, CONVERT_LINK, SOURCES, CATEGORIES, TAGS } from '../post/_gql';
import { LinkOutlined, SaveOutlined } from '@ant-design/icons';
import { getDataFromBlob, imageCompress } from 'lib/imageCompress';
import { DatePicker } from 'antd/es';
import moment from 'moment';
import { imagePath } from 'utility/Util';
import { Helmet } from 'react-helmet';

function AddLink() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dirty, setDirty] = useState(false);
  const { data: categories } = useQuery(CATEGORIES);
  const { data: post, loading } = useQuery(POST, { variables: { id }, skip: !id });
  const { data: sources, loading: source_fetching } = useQuery(SOURCES);
  const [featured, setFeatured] = useState(false);
  const [saveArticle, { loading: saving }] = useMutation(id ? UPDATE : CREATE, { context: { upload: true } });
  const article = post?.article;
  const [data, setData] = useState();
  useEffect(() => {
    setFeatured(article?.featured);
  }, [article]);

  useEffect(() => {
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
              kind: 'linked',
              ...values,
              imageUrl: data?.image,
            },
          },
        })
          .then(() => {
            message.success('Амжилттай хадгаллаа').then(() => {
              setDirty(false);
              navigate(`/`);
            });
          })
          .catch((e) => {
            message.error(JSON.stringify(e.message)).then();
          });
      }}
      layout="vertical"
      onValuesChange={() => setDirty(true)}
      className="caak_article font-merri"
      initialValues={{
        status: 'published',
        featuredDays: 7,
        ...article,
        sourceId: article?.source?.id,
        tags: article?.tags.map((x) => x.slug),
        publishDate: moment(article?.publishDate || undefined),
        featuredFrom: moment(article?.featuredFrom || undefined),
      }}
    >
      <Helmet>
        <title>Мэдээ оруулах/засах | Caak.mn</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Мэдээ оруулах/засах | Caak.mn" />
        <meta name="og:title" content="Мэдээ оруулах/засах | Caak.mn" />
      </Helmet>
      <Row gutter={24} className="mb-[400px]">
        <Col span={16} className="x-[50px]">
          <Tabs defaultActiveKey="linked" />
          <Card bordered={false} className="max-w-[920px] mx-auto">
            <LinkField onSuccess={setData} />
            <div className="flex gap-[20px]">
              <Form.Item
                name="image"
                valuePropName="file"
                getValueFromEvent={(e) => {
                  return e?.fileList[0].originFileObj;
                }}
                rules={[{ required: !data?.image && !article?.imageUrl, message: 'Зураг заавал сонгоно уу' }]}
              >
                <Upload
                  showUploadList={false}
                  maxCount={1}
                  accept="image/*"
                  customRequest={({ file, onSuccess }) => {
                    imageCompress(file).then((result) => {
                      return getDataFromBlob(result).then((base64) => {
                        setData({ ...data, base64: base64 });
                        onSuccess('ok');
                      });
                    });
                  }}
                >
                  {data?.image || article?.imageUrl ? (
                    <Image
                      src={data?.image || data?.base64 || imagePath(article?.imageUrl)}
                      className="object-cover w-[300px] h-[200px]"
                      preview={false}
                    />
                  ) : (
                    <Skeleton.Image style={{ width: 300, height: 200 }} />
                  )}
                </Upload>
              </Form.Item>
              <div className="flex flex-col w-full">
                <Form.Item name="title" label="Гарчиг">
                  <Input />
                </Form.Item>
                <Form.Item name="description">
                  <Input.TextArea rows={5} />
                </Form.Item>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6} className="border-l border-[#efefef] bg-[#ffffff] p-[24px]">
          <Affix offsetTop={12}>
            <div className="h-screen">
              <div className="w-full mb-2 flex justify-between">
                <span>Суваг</span>
                <a
                  href={imagePath('/admin/sources/new')}
                  className="font-merri text-caak-primary  text-[12px] mt-1"
                  target="_blank"
                  rel="noreferrer"
                >
                  Суваг нэмэх
                </a>
              </div>
              <Form.Item name="sourceId" rules={[{ required: true, message: 'Суваг заавал сонгоно уу' }]}>
                <Select
                  size="large"
                  showSearch
                  loading={source_fetching}
                  allowClear
                  filterOption={(input, option) =>
                    option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                    option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  options={sources?.sources?.nodes?.map((x) => ({
                    value: x.id,
                    label: `${x.name} - ${x.domain}`,
                    key: x.id,
                  }))}
                />
              </Form.Item>
              <Form.Item name="categoryIds" className="font-merri" label="Ангилал">
                <Select
                  mode="multiple"
                  placeholder="Categories"
                  size="large"
                  allowClear
                  filterOption={(input, option) =>
                    option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                    option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  options={(categories?.categories?.nodes || []).map((x) => ({
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
                label="Таг"
                rules={[{ required: true, message: 'Таг заавал сонгоно уу' }]}
              >
                <TagsField mode="tags" placeholder="Tags" size="large" />
              </Form.Item>
              <Form.Item name="featured" className="font-merri" valuePropName="checked">
                <Checkbox onChange={(e) => setFeatured(e.target.checked)}>Мэдээг онцлох</Checkbox>
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

              <Button htmlType="submit" type="primary" icon={<SaveOutlined />} size="large" block loading={saving}>
                Хадгалах
              </Button>
            </div>
          </Affix>
        </Col>
      </Row>
    </Form>
  );
}

const LinkField = ({ onSuccess }) => {
  const [convert, { loading: converting }] = useMutation(CONVERT_LINK);
  const form = Form.useFormInstance();

  return (
    <Form.Item name={['data', 'link']} label="Мэдээний линк">
      <Input.Search
        prefix={<LinkOutlined className="text-[20px] mr-[10px]" />}
        size="large"
        placeholder="Мэдээний линк оруулна уу"
        enterButton="Хөрвүүлэх"
        onSearch={(value) => {
          convert({ variables: { link: value } })
            .then((data) => {
              onSuccess(data?.data?.convertLink);
              form.setFieldsValue({ title: data?.data?.convertLink.title });
              form.setFieldsValue({ description: data?.data?.convertLink.description });
            })
            .catch((e) => message.error(JSON.stringify(e)));
        }}
        loading={converting}
      />
    </Form.Item>
  );
};

export default AddLink;

function TagsField({ ...rest }) {
  const [filter, setFilter] = useState(null);
  const { data, loading } = useQuery(TAGS, { variables: { filter } });
  const options = data?.tags?.nodes.map((x) => ({ key: x.slug, value: x.slug, label: x.name })) || [];

  return <Select showSearch onSearch={setFilter} filterOption={false} options={options} loading={loading} {...rest} />;
}
