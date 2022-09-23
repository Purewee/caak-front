import { Switch, Form, Anchor, Input, Upload, Button, Skeleton, message, Avatar, Tabs } from 'antd';
import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../../App';
import { FIcon } from '../../component/icon';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useAuth } from '../../context/AuthContext';
import { imagePath } from '../../utility/Util';
import { getDataFromBlob, imageCompress } from '../../lib/imageCompress';
import useMediaQuery from '../../component/navigation/useMediaQuery';
import AddCategoriesModal from '../../component/modal/AddCategoriesModal';
import { Link } from 'react-router-dom';

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
            following
          }
          ... on Source {
            id
            name
            slug
            following
          }
          ... on Tag {
            id
            name
            slug
            articlesCount
            following
          }
          ... on User {
            id
            firstName
            avatar
            following
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

const FOLLOW_CATEGORY = gql`
  mutation Follow($id: ID!) {
    toggleFollow(input: { targetType: "category", targetId: $id })
  }
`;

const FOLLOW_USER = gql`
  mutation Follow($id: ID!) {
    toggleFollow(input: { targetType: "user", targetId: $id })
  }
`;

const FOLLOW_TAG = gql`
  mutation Follow($id: ID!) {
    toggleFollow(input: { targetType: "tag", targetId: $id })
  }
`;

export default function Settings() {
  const context = useContext(AppContext);
  const { data, loading, refetch } = useQuery(ME);
  const { isAuth } = useAuth();
  const [avatar, setAvatar] = useState();
  const [openModal, setOpenModal] = useState();
  const [selected, setSelected] = useState('posts');
  const [tabs, setTabs] = useState('category');
  const [update, { loading: saving }] = useMutation(UPDATE, { context: { upload: true } });
  const [follow_category] = useMutation(FOLLOW_CATEGORY);
  const [follow_user] = useMutation(FOLLOW_USER);
  const [follow_tag] = useMutation(FOLLOW_TAG);

  const me = data?.me || {};
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
            <p className="text-[28px] leading-[24px]">Тохиргоо</p>
            <Tabs
              defaultActiveKey={'posts'}
              onChange={(e) => setSelected(e)}
              tabPosition={isMobile ? 'top' : 'left'}
              type="card"
              className="mt-[25px]"
              tabBarStyle={{
                maxHeight: 180,
                width: isMobile ? '100%' : 290,
                boxShadow: '0px 1px 2px #00000010',
                backgroundColor: 'white',
                padding: 10,
                border: '1px solid #EFEEEF',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Tabs.TabPane
                key="posts"
                tab={
                  <div className={`flex flex-row items-center h-[32px] sm:w-[235px]`}>
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
                <p className="text-[22px] font-bold leading-[25px] text-caak-black mt-[20px] sm:mt-0">
                  Ерөнхий мэдээлэл
                </p>
                <Form
                  className="w-full md:w-[790px] mt-[20px]"
                  layout="vertical"
                  autoComplete="off"
                  initialValues={{ firstName: me.firstName, data: me.data }}
                  onFinish={(values) => {
                    update({ variables: values }).then((res) => message.success('Мэдээлэл шинэчилэгдлээ'));
                  }}
                >
                  <div className="border-[#EFEEEF] border rounded-[4px] w-full p-[30px]" id="profile">
                    <div>
                      <Form.Item
                        name="firstName"
                        label={
                          <span className="inline-flex text-caak-black text-[16px] font-medium font-roboto leading-[19px]">
                            Нэр
                            <p className="text-[14px] text-[#909090] font-normal mx-2">/Нийтэд харагдана/</p>
                          </span>
                        }
                      >
                        <Input size="large" />
                      </Form.Item>
                      <p className="text-[16px] font-medium text-caak-black font-roboto leading-[19px]">Аватар</p>
                      <div className="flex flex-row items-center mt-[12px]">
                        {avatar && <Avatar size={60} src={avatar} preview={false} />}
                        <Form.Item
                          name="avatar"
                          valuePropName="file"
                          style={{ marginBottom: 0, marginLeft: 12 }}
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
                            <Button
                              className="border border-[#E8E8E8] w-[142px] h-[34px] rounded-[4px] gap-[8px]"
                              icon={<FIcon className="icon-fi-rs-camera-f" />}
                            >
                              Зураг солих
                            </Button>
                          </Upload>
                        </Form.Item>
                      </div>
                      <Form.Item
                        name={['data', 'bio']}
                        label={<p className="text-[16px] font-medium text-caak-black leading-[19px]">Тухай</p>}
                        className="mt-[24px] mb-0"
                      >
                        <Input.TextArea rows={4} />
                      </Form.Item>
                    </div>
                  </div>
                  <Button className="mt-[20px] h-[34px]" htmlType="submit" type="primary" size="large" loading={saving}>
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
                    <Tabs onChange={(x) => setTabs(x)} tabBarStyle={{ paddingLeft: 30 }}>
                      <Tabs.TabPane key={'category'} tab={<p>Төрөл</p>}>
                        <div className="border-t w-full p-[30px]" id="category">
                          <div className="flex flex-wrap justify-start gap-[12px]">
                            {me.follows
                              .filter((x) => x.target.__typename === 'Category')
                              .map(({ target: x }) => (
                                <div className="flex flex-col" key={x.id}>
                                  <Link
                                    to={`/category/${x.slug}`}
                                    className="w-[172px] h-[100px] relative items-center justify-center rounded-md cursor-pointer overflow-hidden"
                                  >
                                    {x.cover && (
                                      <div
                                        style={{ backgroundImage: `url(${imagePath(x.cover)})` }}
                                        className="w-full h-full bg-center bg-cover bg-no-repeat"
                                      />
                                    )}
                                    <span className="absolute top-0 h-full w-full flex items-center justify-center text-white text-[16px] font-medium bg-black bg-opacity-50 rounded-md">
                                      {x.name}
                                    </span>
                                  </Link>
                                  {x.following ? (
                                    <button
                                      className="w-[172px] h-[34px] mt-[8px] bg-[#EFEEEF] rounded-[4px] text-[#909090] text-[15px] font-medium"
                                      onClick={() => {
                                        if (isAuth) {
                                          follow_category({ variables: { id: x.id } }).then(() => {
                                            refetch().then(console.log);
                                          });
                                        }
                                      }}
                                    >
                                      ДАГАСАН
                                    </button>
                                  ) : (
                                    <Button
                                      type="primary"
                                      className="w-[172px] h-[34px] mt-[8px] bg-caak-primary rounded-[4px] text-white text-[15px] font-bold"
                                      onClick={() => {
                                        if (isAuth) {
                                          follow_category({ variables: { id: x.id } }).then(() => {
                                            refetch().then(console.log);
                                          });
                                        }
                                      }}
                                    >
                                      ДАГАХ
                                    </Button>
                                  )}
                                </div>
                              ))}
                          </div>
                        </div>
                      </Tabs.TabPane>
                      <Tabs.TabPane key={'source'} tab={<p>Суваг</p>}>
                        <div className="border-t w-full p-[30px]" id="source">
                          <div className="flex flex-wrap justify-start gap-[10px]">
                            {me.follows
                              .filter((x) => x.target.__typename === 'Source')
                              .map(({ target: x }) => (
                                <Link
                                  to={`/channel/${x.id}`}
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
                                </Link>
                              ))}
                          </div>
                        </div>
                      </Tabs.TabPane>
                      <Tabs.TabPane key={'tag'} tab={<p>Таг</p>}>
                        <div className="border-t w-full p-[30px]" id="tag">
                          <div className="flex flex-wrap justify-start gap-[10px]">
                            {me.follows
                              .filter((x) => x.target.__typename === 'Tag')
                              .map(({ target: x }) => (
                                <div
                                  className="w-[232px] h-[124px] rounded-[4px] border border-[#EFEEEF] p-[16px]"
                                  key={x.id}
                                >
                                  <div className="flex flex-row">
                                    <span className="h-[46px] w-[46px] rounded-[4px] bg-caak-primary bg-opacity-10 flex items-center justify-center text-[28px] font-medium text-caak-primary">
                                      #
                                    </span>
                                    <div className="ml-[14px] flex flex-col">
                                      <Link to={`/tags/${x.slug}`} className="text-caak-black text-[15px] font-medium">
                                        #{x.name}
                                      </Link>
                                      <span className="text-[#707070] text-[13px] leading-[15px]">
                                        {x.articlesCount} Мэдээтэй
                                      </span>
                                    </div>
                                  </div>
                                  {x.following ? (
                                    <button
                                      className="w-full h-[34px] mt-[12px] bg-[#EFEEEF] rounded-[4px] text-[#909090] text-[15px] font-medium"
                                      onClick={() => {
                                        if (isAuth) {
                                          follow_tag({ variables: { id: x.id } }).then(() => {
                                            refetch().then(console.log);
                                          });
                                        }
                                      }}
                                    >
                                      ДАГАСАН
                                    </button>
                                  ) : (
                                    <Button
                                      type="primary"
                                      loading={follow_saving}
                                      className="w-full h-[34px] mt-[12px] bg-caak-primary rounded-[4px] text-white text-[15px] font-bold"
                                      onClick={() => {
                                        if (isAuth) {
                                          follow_tag({ variables: { id: x.id } }).then(() => {
                                            refetch().then(console.log);
                                          });
                                        }
                                      }}
                                    >
                                      Дагах
                                    </Button>
                                  )}
                                </div>
                              ))}
                          </div>
                        </div>
                      </Tabs.TabPane>
                      <Tabs.TabPane key={'user'} tab={<p>Хэрэглэгчид</p>}>
                        <div className="border-t w-full p-[30px]" id="user">
                          <div className="flex flex-wrap justify-start gap-[16px]">
                            {me.follows
                              .filter((x) => x.target.__typename === 'User')
                              .map(({ target: x }) => (
                                <div className="w-[232px] h-[153px] border border-[#EFEEEF] flex flex-col items-center p-[16px]">
                                  {x.avatar ? (
                                    <Avatar size={48} src={imagePath(x.avatar)} />
                                  ) : (
                                    <Avatar size={48} className="bg-[#257CEE19] text-[#257CEE] text-[32px] font-medium">
                                      {(x?.firstName || x?.name)[0]}
                                    </Avatar>
                                  )}
                                  <Link
                                    to={`/profile/${x.id}`}
                                    className="text-caak-black text-[16px] leading-[19px] mt-[6px]"
                                  >
                                    {x.firstName}
                                  </Link>
                                  {x.following ? (
                                    <button
                                      className="w-full h-[34px] mt-[14px] bg-[#EFEEEF] rounded-[4px] text-[#909090] text-[15px] font-medium"
                                      onClick={() => {
                                        if (isAuth) {
                                          follow_user({ variables: { id: x.id } }).then(() => {
                                            refetch().then(console.log);
                                          });
                                        }
                                      }}
                                    >
                                      ДАГАСАН
                                    </button>
                                  ) : (
                                    <Button
                                      type="primary"
                                      loading={follow_saving}
                                      className="w-full h-[34px] mt-[14px] bg-caak-primary rounded-[4px] text-white text-[15px] font-bold"
                                      onClick={() => {
                                        if (isAuth) {
                                          follow_user({ variables: { id: x.id } }).then(() => {
                                            refetch().then(console.log);
                                          });
                                        }
                                      }}
                                    >
                                      Дагах
                                    </Button>
                                  )}
                                </div>
                              ))}
                          </div>
                        </div>
                      </Tabs.TabPane>
                    </Tabs>
                  </Form>
                  {tabs === 'category' && (
                    <Button
                      type="primary"
                      onClick={() => setOpenModal(true)}
                      className="w-[150px] h-[34px] gap-[10px] mt-[20px]"
                      icon={<span className="icon-fi-rs-plus" />}
                    >
                      Төрөл нэмэх
                    </Button>
                  )}
                  {openModal && <AddCategoriesModal toggle={() => setOpenModal(false)} />}
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
                  className="w-full md:w-[790px]"
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
                  <Button className="mt-[20px] h-[34px]" htmlType="submit" type="primary" size="large" loading={saving}>
                    Хадгалах
                  </Button>
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
