import { Switch, Form, Anchor, Input, Upload, Button, Skeleton, Image, message, Avatar, Tabs } from 'antd';
import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../../App';
import { FIcon } from '../../component/icon';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useAuth } from '../../context/AuthContext';
import { imagePath } from '../../utility/Util';
import { getDataFromBlob, imageCompress } from '../../lib/imageCompress';
import { SaveOutlined } from '@ant-design/icons';
import useMediaQuery from '../../component/navigation/useMediaQuery';

const menu = [
  {
    title: 'Профайл',
    icon: 'icon-fi-rs-user-f',
    href: '#profile',
  },
  {
    title: 'Мэдээний төрөл',
    icon: 'icon-fi-rs-filter-f',
    href: '#category',
  },
  {
    title: 'Нууцлал',
    icon: 'icon-fi-rs-shield',
    href: '#security',
  },
];

const ME = gql`
  query Me {
    me {
      id
      mobile
      email
      firstName
      lastName
      avatar
      data
      follows {
        id
        target {
          ... on Category {
            id
            name
            slug
            cover
          }
          ... on Source {
            id
            name
            slug
          }
          ... on Tag {
            id
            name
            slug
          }
          ... on User {
            id
            firstName
          }
        }
      }
    }
  }
`;

const UPDATE = gql`
  mutation UpdateProfile($firstName: String, $password: String, $avatar: Upload, $data: JSON) {
    updateUserProfile(input: { firstName: $firstName, password: $password, avatar: $avatar, data: $data }) {
      id
      firstName
      avatar
      data
    }
  }
`;

export default function Settings() {
  const context = useContext(AppContext);
  const { data, loading } = useQuery(ME);
  const { isAuth } = useAuth();
  const [avatar, setAvatar] = useState();
  const [selected, setSelected] = useState('posts');
  const [update, { loading: saving }] = useMutation(UPDATE, { context: { upload: true } });

  const me = data?.me || {};
  console.log(me);
  const isMobile = useMediaQuery('screen and (max-width: 767px)');

  useEffect(() => {
    context.setStore('default');
    if (me.avatar) setAvatar(imagePath(me.avatar));
  }, [me]);

  if (loading) return <Skeleton />;
  return isAuth ? (
    <div className="flex justify-center w-full pb-[100px] px-[16px] md:px-0">
      <div className="max-w-[1140px] w-full mt-[51px]">
        <div className="flex flex-col md:flex-row gap-[20px] md:gap-[60px]">
          <div>
            <p className="text-[28px] font-merri leading-[24px] px-[12px]">Тохиргоо</p>
            <Tabs
              defaultActiveKey={'posts'}
              onChange={(e) => setSelected(e)}
              tabPosition={isMobile ? 'top' : 'left'}
              type="card"
              className="mt-[25px]"
              tabBarStyle={{
                maxHeight: 180,
                width: 290,
                boxShadow: '0px 1px 2px #00000010',
                backgroundColor: 'white',
                padding: 10,
                border: '1px solid #EFEEEF',
              }}
            >
              <Tabs.TabPane
                key="posts"
                tab={
                  <div className={`flex flex-row items-center h-[32px] w-[235px]`}>
                    <span
                      className={`icon-fi-rs-user-f text-[22px] mr-[10px] ${
                        selected === 'posts' ? 'text-caak-primary' : 'text-[#909090]'
                      }`}
                    />
                    <p
                      className={`text-[16px] font-bold ${
                        selected === 'posts' ? 'text-caak-primary' : 'text-caak-black'
                      }`}
                    >
                      Ерөнхий мэдээлэл
                    </p>
                  </div>
                }
              >
                <Form
                  className="w-full md:w-[790px] font-merri"
                  layout="vertical"
                  autoComplete="off"
                  initialValues={{ firstName: me.firstName, data: me.data }}
                  onFinish={(values) => {
                    update({ variables: values }).then((res) => message.success('Мэдээлэл шинэчилэгдлээ'));
                  }}
                >
                  <div className="border-[#EFEEEF] border rounded-[4px] w-full p-[30px]" id="profile">
                    <p className="text-[22px] font-bold leading-[25px] w-full border-b border-[#D4D8D8] pb-[14px]">
                      Профайл
                    </p>
                    <div className="mt-[24px]">
                      <Form.Item
                        name="firstName"
                        label={
                          <>
                            Нэр
                            <p className="text-[14px] text-[#909090] font-normal mx-2">/Нийтэд харагдана/</p>
                          </>
                        }
                      >
                        <Input size="large" />
                      </Form.Item>
                      <div className="flex items-end mt-[12px]">
                        <Form.Item
                          name="avatar"
                          valuePropName="file"
                          getValueFromEvent={(e) => {
                            return e?.fileList[0].originFileObj;
                          }}
                        >
                          <Upload
                            showUploadList={false}
                            maxCount={1}
                            accept="image/*"
                            className=""
                            customRequest={({ file, onSuccess }) => {
                              imageCompress(file).then((result) => {
                                return getDataFromBlob(result).then((base64) => {
                                  setAvatar(base64);
                                  onSuccess('ok');
                                });
                              });
                            }}
                          >
                            <div className="relative">
                              {avatar && <Avatar size={120} src={avatar} preview={false} />}
                              <Button
                                type="primary"
                                shape="circle"
                                icon={<FIcon className="icon-fi-rs-camera-f" />}
                                className="absolute right-0 bottom-0"
                              />
                            </div>
                          </Upload>
                        </Form.Item>
                      </div>
                      <Form.Item name={['data', 'bio']} label="Тухай">
                        <Input.TextArea rows={4} />
                      </Form.Item>
                    </div>
                  </div>
                  <Button htmlType="submit" icon={<SaveOutlined />} type="primary" size="large" loading={saving}>
                    Хадгалах
                  </Button>
                </Form>
              </Tabs.TabPane>
              <Tabs.TabPane
                key="saved"
                tab={
                  <div className="flex flex-row items-center h-[32px]">
                    <span
                      className={`icon-fi-rs-filter-f text-[19px] mr-[10px] ${
                        selected === 'saved' ? 'text-caak-primary' : 'text-[#909090]'
                      }`}
                    />
                    <p
                      className={`text-[16px] font-bold ${
                        selected === 'saved' ? 'text-caak-primary' : 'text-caak-black'
                      }`}
                    >
                      Миний дагасан
                    </p>
                  </div>
                }
              >
                <div>
                  <p className="text-caak-black font-medium text-[22px] mb-[20px]">Миний дагасан</p>
                  <Form
                    className="w-full md:w-[790px] border border-[#EFEEEF]"
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{ firstName: me.firstName, data: me.data }}
                    onFinish={(values) => {
                      update({ variables: values }).then((res) => message.success('Мэдээлэл шинэчилэгдлээ'));
                    }}
                  >
                    <Tabs tabBarStyle={{ paddingLeft: 30 }}>
                      <Tabs.TabPane key={'category'} tab={<p>Төрөл</p>}>
                        <div className="border-[#EFEEEF] border rounded-[4px] w-full p-[30px]" id="category">
                          <div className="flex flex-wrap justify-start gap-[12px]">
                            {me.follows
                              .filter((x) => x.target.__typename === 'Category')
                              .map(({ target: x }) => (
                                <div
                                  className="w-[172px] h-[100px] relative items-center justify-center rounded-md cursor-pointer overflow-hidden"
                                  key={x.id}
                                >
                                  {x.cover && (
                                    <div
                                      style={{ backgroundImage: `url(${imagePath(x.cover)})` }}
                                      className="w-full h-full bg-center bg-cover bg-no-repeat"
                                    />
                                  )}
                                  {console.log(x)}
                                  <span className="absolute top-0 h-full w-full flex items-center justify-center text-white text-[16px] font-medium bg-black bg-opacity-50 rounded-md">
                                    {x.name}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      </Tabs.TabPane>
                      <Tabs.TabPane key={'source'} tab={<p>Суваг</p>}>
                        <div className="border-[#EFEEEF] border rounded-[4px] w-full p-[30px]" id="source">
                          <div className="flex flex-wrap justify-start gap-[10px]">
                            {me.follows
                              .filter((x) => x.target.__typename === 'Source')
                              .map(({ target: x }) => (
                                <div
                                  className="w-[170px] h-[100px] relative items-center justify-center rounded-md cursor-pointer overflow-hidden"
                                  key={x.id}
                                >
                                  {x.cover && (
                                    <div
                                      style={{ backgroundImage: `url(${imagePath(x.cover)})` }}
                                      className="w-full h-full bg-center bg-cover bg-no-repeat"
                                    />
                                  )}
                                  <span className="absolute top-0 h-full w-full flex items-center justify-center text-white text-[15px] font-medium bg-black bg-opacity-50 rounded-md">
                                    {x.name}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      </Tabs.TabPane>
                      <Tabs.TabPane key={'tag'} tab={<p>Таг</p>}>
                        <div className="border-[#EFEEEF] border rounded-[4px] w-full p-[30px]" id="tag">
                          <div className="flex flex-wrap justify-start gap-[10px]">
                            {me.follows
                              .filter((x) => x.target.__typename === 'Tag')
                              .map(({ target: x }) => (
                                <div
                                  className="w-[170px] h-[100px] relative items-center justify-center rounded-md cursor-pointer overflow-hidden"
                                  key={x.id}
                                >
                                  {x.cover && (
                                    <div
                                      style={{ backgroundImage: `url(${imagePath(x.cover)})` }}
                                      className="w-full h-full bg-center bg-cover bg-no-repeat"
                                    />
                                  )}
                                  <span className="absolute top-0 h-full w-full flex items-center justify-center text-white text-[15px] font-medium bg-black bg-opacity-50 rounded-md">
                                    {x.name}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      </Tabs.TabPane>
                      <Tabs.TabPane key={'user'} tab={<p>Хэрэглэгчид</p>}>
                        <div className="border-[#EFEEEF] border rounded-[4px] w-full p-[30px]" id="user">
                          <div className="flex flex-wrap justify-start gap-[10px]">
                            {me.follows
                              .filter((x) => x.target.__typename === 'User')
                              .map(({ target: x }) => (
                                <div
                                  className="w-[170px] h-[100px] relative items-center justify-center rounded-md cursor-pointer overflow-hidden"
                                  key={x.id}
                                >
                                  {x.cover && (
                                    <div
                                      style={{ backgroundImage: `url(${imagePath(x.cover)})` }}
                                      className="w-full h-full bg-center bg-cover bg-no-repeat"
                                    />
                                  )}
                                  <span className="absolute top-0 h-full w-full flex items-center justify-center text-white text-[15px] font-medium bg-black bg-opacity-50 rounded-md">
                                    {x.firstName}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      </Tabs.TabPane>
                    </Tabs>
                  </Form>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane
                key="history"
                tab={
                  <div className="flex flex-row items-center h-[32px]">
                    <span
                      className={`icon-fi-rs-shield text-[20px] mr-[10px] ${
                        selected === 'history' ? 'text-caak-primary' : 'text-[#909090]'
                      }`}
                    />
                    <p
                      className={`text-[16px] font-bold h-[32px] ${
                        selected === 'history' ? 'text-caak-primary' : 'text-caak-black'
                      }`}
                    >
                      Нууцлал
                    </p>
                  </div>
                }
              >
                <Form
                  className="w-full md:w-[790px] font-merri"
                  layout="vertical"
                  autoComplete="off"
                  initialValues={{ firstName: me.firstName, data: me.data }}
                  onFinish={(values) => {
                    update({ variables: values }).then((res) => message.success('Мэдээлэл шинэчилэгдлээ'));
                  }}
                >
                  <div className="border-[#EFEEEF] border rounded-[4px] w-full p-[30px]" id="security">
                    <p className="text-[22px] font-bold leading-[25px] w-full border-b border-[#D4D8D8] pb-[14px]">
                      Нууцлал
                    </p>
                    <Form.Item name="password" label="Нууц үг солих" className="mt-[20px]">
                      <Input.Password size="large" />
                    </Form.Item>
                    <Form.Item name="hideProfile" label="Профайл нуух" valuePropName="checked">
                      <Switch className="mt-[12px] w-[40px] h-[22px] bg-[#E4E4E5]" />
                    </Form.Item>
                    <Form.Item name="hideSaved" label="Хадгалсан мэдээнүүд нуух" valuePropName="checked">
                      <Switch className="mt-[12px] w-[40px] h-[22px] bg-[#E4E4E5]" />
                    </Form.Item>
                  </div>
                </Form>
              </Tabs.TabPane>
            </Tabs>
          </div>
          {/* <Form
            className="w-full md:w-[790px] font-merri"
            layout="vertical"
            autoComplete="off"
            initialValues={{ firstName: me.firstName, data: me.data }}
            onFinish={(values) => {
              update({ variables: values }).then((res) => message.success('Мэдээлэл шинэчилэгдлээ'));
            }}
          >
            <div className="border-[#EFEEEF] border rounded-[4px] w-full p-[30px]" id="profile">
              <p className="text-[22px] font-bold leading-[25px] w-full border-b border-[#D4D8D8] pb-[14px]">Профайл</p>
              <div className="mt-[24px]">
                <Form.Item
                  name="firstName"
                  label={
                    <>
                      Нэр
                      <p className="text-[14px] text-[#909090] font-normal mx-2">/Нийтэд харагдана/</p>
                    </>
                  }
                >
                  <Input size="large" />
                </Form.Item>
                <div className="flex items-end mt-[12px]">
                  <Form.Item
                    name="avatar"
                    valuePropName="file"
                    getValueFromEvent={(e) => {
                      return e?.fileList[0].originFileObj;
                    }}
                  >
                    <Upload
                      showUploadList={false}
                      maxCount={1}
                      accept="image/*"
                      className=""
                      customRequest={({ file, onSuccess }) => {
                        imageCompress(file).then((result) => {
                          return getDataFromBlob(result).then((base64) => {
                            setAvatar(base64);
                            onSuccess('ok');
                          });
                        });
                      }}
                    >
                      <div className="relative">
                        {avatar && <Avatar size={120} src={avatar} preview={false} />}
                        <Button
                          type="primary"
                          shape="circle"
                          icon={<FIcon className="icon-fi-rs-camera-f" />}
                          className="absolute right-0 bottom-0"
                        />
                      </div>
                    </Upload>
                  </Form.Item>
                </div>
                <Form.Item name={['data', 'bio']} label="Тухай">
                  <Input.TextArea rows={4} />
                </Form.Item>
              </div>
            </div>
            <div className="border-[#EFEEEF] border rounded-[4px] w-full p-[30px] my-[50px]" id="category">
              <p className="text-[22px] font-bold leading-[25px] w-full border-b border-[#D4D8D8] pb-[14px]">
                Мэдээний төрөл
              </p>
              <div className="mt-[24px] flex flex-wrap justify-start gap-[10px]">
                {me.follows
                  .filter((x) => x.target.__typename === 'Category')
                  .map(({ target: x }) => (
                    <div
                      className="w-[170px] h-[100px] relative items-center justify-center rounded-md cursor-pointer overflow-hidden"
                      key={x.id}
                    >
                      {x.cover && (
                        <div
                          style={{ backgroundImage: `url(${imagePath(x.cover)})` }}
                          className="w-full h-full bg-center bg-cover bg-no-repeat"
                        />
                      )}
                      <span className="absolute top-0 h-full w-full flex items-center justify-center text-white text-[15px] font-medium bg-black bg-opacity-50 rounded-md">
                        {x.name}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
            <div className="border-[#EFEEEF] border rounded-[4px] w-full p-[30px] my-[50px]" id="security">
              <p className="text-[22px] font-bold leading-[25px] w-full border-b border-[#D4D8D8] pb-[14px]">Нууцлал</p>
              <Form.Item name="password" label="Нууц үг солих" className="mt-[20px]">
                <Input.Password size="large" />
              </Form.Item>
              <Form.Item name="hideProfile" label="Профайл нуух" valuePropName="checked">
                <Switch className="mt-[12px] w-[40px] h-[22px] bg-[#E4E4E5]" />
              </Form.Item>
              <Form.Item name="hideSaved" label="Хадгалсан мэдээнүүд нуух" valuePropName="checked">
                <Switch className="mt-[12px] w-[40px] h-[22px] bg-[#E4E4E5]" />
              </Form.Item>
            </div>
            <Button htmlType="submit" icon={<SaveOutlined />} type="primary" size="large" loading={saving}>
              Хадгалах
            </Button>
          </Form> */}
        </div>
      </div>
    </div>
  ) : null;
}
