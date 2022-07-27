import React, { useState, useEffect, useContext } from 'react';
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
} from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE, POST, UPDATE, CONVERT_LINK, SOURCES, CATEGORIES, TAGS } from '../post/_gql';
import { LinkOutlined, PlaySquareOutlined, SaveOutlined } from '@ant-design/icons';
import { getDataFromBlob, imageCompress } from '../../../lib/imageCompress';
import { DatePicker } from 'antd/es';
import moment from 'moment';
import { imagePath } from '../../../utility/Util';

function AddLink() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: categories, refetch } = useQuery(CATEGORIES);
  const { data: post, loading } = useQuery(POST, { variables: { id }, skip: !id });
  const { data: sources, loading: source_fetching } = useQuery(SOURCES);
  const [featured, setFeatured] = useState(false);
  const [saveArticle, { loading: saving }] = useMutation(id ? UPDATE : CREATE, { context: { upload: true } });
  const article = post?.article;
  const [data, setData] = useState();
  useEffect(() => {
    setFeatured(article?.featured);
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
            kind: 'linked',
            ...values,
            imageUrl: data?.image,
          },
        })
          .then((res) => {
            message.success('Амжилттай хадгаллаа');
            if (id) {
              refetch();
            } else {
              navigate(`/edit/linked/${res?.data?.article.id}`);
            }
          })
          .catch((e) => {
            message.error(JSON.stringify(e.message));
          });
      }}
      layout="vertical"
      className="caak_article font-merri"
      initialValues={{
        ...article,
        sourceId: article?.source?.id,
        tags: article?.tags.map((x) => x.slug),
        featuredDates: [moment(article?.featuredFrom), moment(article?.featuredTo)],
      }}
    >
      <Row gutter={24} className="mb-[400px]">
        <Col span={16} className="x-[50px]">
          <Tabs className="max-w-[880px] mx-auto mt-[20px] border-b" defaultActiveKey="linked" size="large">
            <Tabs.TabPane
              tab={
                <Link to="/add/post" className="flex items-center">
                  <SaveOutlined />
                  <span className="uppercase font-merri font-bold">Үндсэн мэдээ</span>
                </Link>
              }
              key="post"
            />
            <Tabs.TabPane
              tab={
                <Link to="/add/story" className="flex items-center">
                  <PlaySquareOutlined />
                  <span className="uppercase font-merri font-bold">Стори мэдээ</span>
                </Link>
              }
              key="story"
            />
            <Tabs.TabPane
              tab={
                <Link to="/add/linked" className="flex items-center">
                  <LinkOutlined />
                  <span className="uppercase font-merri font-bold">Линктэй мэдээ</span>
                </Link>
              }
              key="linked"
            />
          </Tabs>
          <Card bordered={false} className="max-w-[920px] mx-auto">
            <LinkField onSuccess={setData} />
            {!data && !id ? (
              <Skeleton
                active
                avatar={{ shape: 'square', size: 200 }}
                title={{ width: '80%' }}
                paragraph={{ rows: 4, width: '100%' }}
              />
            ) : (
              <>
                <div className="flex gap-[20px]">
                  <Form.Item
                    name="image"
                    valuePropName="file"
                    getValueFromEvent={(e) => {
                      return e?.fileList[0].originFileObj;
                    }}
                  >
                    <Upload
                      showUploadList={false}
                      maxCount={1}
                      accept="image/*"
                      customRequest={({ file, onSuccess }) => {
                        imageCompress(file).then((result) => {
                          return getDataFromBlob(result).then((base64) => {
                            setData({ ...data, image: base64 });
                            onSuccess('ok');
                          });
                        });
                      }}
                    >
                      <Image
                        src={data?.image || imagePath(article?.imageUrl)}
                        className="object-cover w-[300px] h-[200px]"
                        preview={false}
                      />
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
              </>
            )}
          </Card>
        </Col>
        <Col span={6} className="border-l border-[#efefef] bg-[#ffffff] p-[24px]">
          <Affix offsetTop={12}>
            <div className="h-screen">
              <Form.Item name="sourceId" label="Эх үүсвэр">
                <Select size="large" loading={source_fetching} allowClear>
                  {sources?.sources?.nodes?.map((x) => (
                    <Select.Option value={x.id}>{`${x.name} - ${x.domain}`}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="categoryIds" className="font-merri" label="Ангилал">
                <Select
                  mode="multiple"
                  placeholder="Categories"
                  size="large"
                  options={(categories?.categories?.nodes || []).map((x) => ({
                    value: x.id,
                    label: x.name,
                    key: x.id,
                  }))}
                />
              </Form.Item>
              <Form.Item name="tags" className="font-merri" label="Таг">
                <TagsField mode="tags" placeholder="Tags" size="large" />
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
          convert({ variables: { link: value } }).then((data) => {
            onSuccess(data?.data?.convertLink);
            form.setFieldsValue({ title: data?.data?.convertLink.title });
            form.setFieldsValue({ description: data?.data?.convertLink.description });
          });
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
