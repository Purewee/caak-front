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
import AddSourceModal from '../../component/modal/AddSourceModal';
import AddTagsModal from '../../component/modal/AddTagsModal';

const colors = [
  'rgb(170, 109, 228, 0.06)',
  'rgb(255, 102, 0, 0.06)',
  'rgb(59, 68, 145, 0.06)',
  'rgb(37, 124, 238, 0.06)',
  'rgb(55, 175, 55, 0.06)',
];

const colors1 = ['#AA6DE4', '#FF6600', '#3B4491', '#257CEE', '#37AF37'];

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
            articlesCount
            followersCount
            icon
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

const FOLLOW_SOURCE = gql`
  mutation Follow($id: ID!) {
    toggleFollow(input: { targetType: "source", targetId: $id })
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
  const { isAuth, openModal } = useAuth();
  const [avatar, setAvatar] = useState();
  const [isOpenModal, setOpenModal] = useState(false);
  const [openSource, setOpenSource] = useState();
  const [openTags, setOpenTags] = useState();
  const [selected, setSelected] = useState('posts');
  const [tabs, setTabs] = useState('category');
  const [update, { loading: saving }] = useMutation(UPDATE, { context: { upload: true } });
  const [follow_category] = useMutation(FOLLOW_CATEGORY);
  const [follow_source] = useMutation(FOLLOW_SOURCE);
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
            <p className="text-[28px] leading-[24px] condMedium">Тохиргоо</p>
            <Tabs
              defaultActiveKey={'posts'}
              onChange={(e) => setSelected(e)}
              tabPosition={!isMobile && 'left'}
              type="card"
              className="mt-[25px]"
              tabBarStyle={{
                maxHeight: 176,
                width: isMobile ? '100%' : 290,
                boxShadow: '0px 1px 2px #00000010',
                backgroundColor: 'white',
                padding: 10,
                border: '1px solid #EFEEEF',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
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
                      className={`text-[16px] ${
                        selected === 'posts' ? 'text-caak-primary font-medium' : 'text-caak-black'
                      }`}
                    >
                      Ерөнхий мэдээлэл
                    </p>
                  </div>
                }
              >
                <p className="text-[22px] font-medium leading-[25px] text-caak-black mt-[20px] sm:mt-0">
                  Ерөнхий мэдээлэл
                </p>
                <Form
                  className="w-full flex flex-col items-end md:w-[790px] mt-[20px]"
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
                          style={{ marginBottom: 0, marginLeft: avatar ? 12 : 0 }}
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
                  <Button
                    className="mt-[20px] h-[34px] w-[100px]"
                    htmlType="submit"
                    type="primary"
                    size="large"
                    loading={saving}
                  >
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
                      className={`text-[16px] ${
                        selected === 'saved' ? 'text-caak-primary font-medium' : 'text-caak-black'
                      }`}
                    >
                      Миний дагасан
                    </p>
                  </div>
                }
              >
                <div className="flex flex-col items-end">
                  <p className="text-caak-black font-medium text-[22px] leading-[24px] mb-[20px] w-full">
                    Миний дагасан
                  </p>
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
                      <Tabs.TabPane
                        key={'category'}
                        tab={
                          <p
                            className={`text-[16px] leading-[19px] ${
                              tabs === 'category' ? 'text-caak-black' : 'text-caak-darkGray'
                            }`}
                          >
                            Төрөл
                          </p>
                        }
                      >
                        {me.follows?.filter((x) => x.target.__typename === 'Category').length > 0 ? (
                          <div className="border-t w-full p-[10px] sm:p-[30px]" id="category">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-start gap-[8px] sm:gap-[12px]">
                              {me.follows
                                ?.filter((x) => x.target.__typename === 'Category')
                                .map(({ target: x }) => (
                                  <div className="flex flex-col" key={x.id}>
                                    <Link
                                      to={`/category/${x.slug}`}
                                      className="w-full h-[100px] relative items-center justify-center rounded-md cursor-pointer overflow-hidden"
                                    >
                                      {x.cover && (
                                        <div
                                          style={{ backgroundImage: `url("${imagePath(x.cover)}")` }}
                                          className="w-full h-full bg-center bg-cover bg-no-repeat"
                                        />
                                      )}
                                      <span className="absolute top-0 h-full w-full flex items-center justify-center text-white text-[16px] font-medium bg-black bg-opacity-50 rounded-md">
                                        {x.name}
                                      </span>
                                    </Link>
                                    {x.following ? (
                                      <button
                                        className="w-full h-[34px] mt-[8px] bg-[#EFEEEF] rounded-[4px] text-[#909090] text-[15px] font-medium"
                                        onClick={() => {
                                          if (isAuth) {
                                            follow_category({ variables: { id: x.id } }).then(() => {
                                              refetch().then(console.log);
                                            });
                                          }
                                        }}
                                      >
                                        Дагасан
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
                                        Дагах
                                      </Button>
                                    )}
                                  </div>
                                ))}
                            </div>
                          </div>
                        ) : (
                          <div className="w-full border-t">
                            <p className="text-[20px] font-medium text-center py-[20px]">Дагасан төрөл байхгүй байна</p>
                          </div>
                        )}
                      </Tabs.TabPane>
                      <Tabs.TabPane
                        key={'source'}
                        tab={
                          <p
                            className={`text-[16px] leading-[19px] ${
                              tabs === 'source' ? 'text-caak-black' : 'text-caak-darkGray'
                            }`}
                          >
                            Суваг
                          </p>
                        }
                      >
                        {me.follows?.filter((x) => x.target.__typename === 'Source').length > 0 ? (
                          <div className="border-t w-full p-[10px] sm:p-[30px]" id="source">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-start gap-[10px]">
                              {me.follows
                                ?.filter((x) => x.target.__typename === 'Source')
                                .map(({ target: x }) => (
                                  <div
                                    key={x.id}
                                    className="h-[224px] bg-[#F5F5F5] rounded-[4px] flex flex-col items-center px-[20px] justify-between py-[20px]"
                                  >
                                    <div className="flex flex-col items-center">
                                      <Link to={`/channel/${x.id}`}>
                                        <Avatar className="h-[64px] w-[64px]" src={imagePath(x.icon)} />
                                      </Link>
                                      <Link
                                        className="text-black font-medium text-[17px] leading-[23px] mt-[8px]"
                                        to={`/channel/${x.id}`}
                                      >
                                        {x.name}
                                      </Link>
                                      <div className="flex flex-row mt-[15px]">
                                        <p className="text-[#555555] text-[15px] leading-[20px]">
                                          <span className="text-caak-black font-medium">{x.articlesCount || 0}</span>
                                          &nbsp;Пост
                                        </p>
                                        <p className="text-[#555555] text-[15px] leading-[20px] ml-[10px]">
                                          <span className="text-caak-black font-medium">{x.followersCount || 0}</span>
                                          &nbsp;Дагагчид
                                        </p>
                                      </div>
                                    </div>
                                    {x.following ? (
                                      <button
                                        className="w-[90px] h-[34px] bg-[#FFFFFF] rounded-[4px] text-[#909090] text-[15px] font-bold"
                                        onClick={() => {
                                          if (isAuth) {
                                            follow_source({ variables: { id: x.id } }).then(() => {
                                              refetch().then(console.log);
                                            });
                                          } else {
                                            openModal('login');
                                          }
                                        }}
                                      >
                                        Дагасан
                                      </button>
                                    ) : (
                                      <Button
                                        type="primary"
                                        className="w-[90px] h-[34px] bg-caak-primary rounded-[4px] text-white text-[15px] font-bold"
                                        onClick={() => {
                                          if (isAuth) {
                                            follow_source({ variables: { id: x.id } }).then(() => {
                                              refetch().then(console.log);
                                            });
                                          } else {
                                            openModal('login');
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
                        ) : (
                          <div className="w-full border-t">
                            <p className="text-[20px] font-medium text-center py-[20px]">Дагасан суваг байхгүй байна</p>
                          </div>
                        )}
                      </Tabs.TabPane>
                      <Tabs.TabPane
                        key={'tag'}
                        tab={
                          <p
                            className={`text-[16px] leading-[19px] ${
                              tabs === 'tag' ? 'text-caak-black' : 'text-caak-darkGray'
                            }`}
                          >
                            Таг
                          </p>
                        }
                      >
                        {me.follows?.filter((x) => x.target.__typename === 'Tag').length > 0 ? (
                          <div className="border-t w-full p-[10px] sm:p-[30px]" id="tag">
                            <div className="flex flex-wrap justify-center sm:justify-start gap-[10px]">
                              {me.follows
                                ?.filter((x) => x.target.__typename === 'Tag')
                                .map(({ target: x }) => {
                                  const random = Math.floor(Math.random() * 5);
                                  const color = colors[random];
                                  const color1 = colors1[random];
                                  return (
                                    <div
                                      className="w-[232px] h-[124px] rounded-[4px] border border-[#EFEEEF] p-[16px]"
                                      key={x.id}
                                    >
                                      <div className="flex flex-row">
                                        <span
                                          style={{ color: color1, backgroundColor: color }}
                                          className="h-[46px] w-[46px] rounded-[4px] flex items-center justify-center text-[28px] font-medium"
                                        >
                                          #
                                        </span>
                                        <div className="ml-[14px] flex flex-col">
                                          <Link
                                            to={`/tags/${x.slug}`}
                                            className="text-caak-black text-[15px] font-medium"
                                          >
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
                                          Дагасан
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
                                  );
                                })}
                            </div>
                          </div>
                        ) : (
                          <div className="w-full border-t">
                            <p className="text-[20px] font-medium text-center py-[20px]">Дагасан таг байхгүй байна</p>
                          </div>
                        )}
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
                  {tabs === 'source' && (
                    <Button
                      type="primary"
                      onClick={() => setOpenSource(true)}
                      className="w-[150px] h-[34px] gap-[10px] mt-[20px]"
                      icon={<span className="icon-fi-rs-plus" />}
                    >
                      Суваг нэмэх
                    </Button>
                  )}
                  {/* {tabs === 'tag' && (
                    <Button
                      type="primary"
                      onClick={() => setOpenTags(true)}
                      className="w-[150px] h-[34px] gap-[10px] mt-[20px]"
                      icon={<span className="icon-fi-rs-plus" />}
                    >
                      Таг нэмэх
                    </Button>
                  )} */}
                  {isOpenModal && <AddCategoriesModal toggle={() => setOpenModal(false)} />}
                  {openSource && <AddSourceModal toggle={() => setOpenSource(false)} />}
                  {openTags && <AddTagsModal toggle={() => setOpenTags(false)} />}
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
                      className={`text-[16px] ${
                        selected === 'history' ? 'text-caak-primary font-medium' : 'text-caak-black'
                      }`}
                    >
                      Нууцлал
                    </p>
                  </div>
                }
              >
                <Form
                  className="w-full flex flex-col items-end md:w-[790px]"
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
                    <Form.Item
                      name="password"
                      label={<p className="text-[16px] font-medium leading-[19px]">Нууц үг солих</p>}
                      className="mt-[20px]"
                    >
                      <Input size="large" />
                    </Form.Item>
                    <Form.Item
                      style={{ marginBottom: 0 }}
                      name="hideProfile"
                      label={<p className="text-[16px] font-medium leading-[19px]">Профайл нуух</p>}
                      valuePropName="checked"
                    >
                      <Switch className="mt-[4px] w-[40px] h-[22px] bg-[#E4E4E5]" />
                    </Form.Item>
                    <Form.Item
                      style={{ marginBottom: 0, marginTop: 24 }}
                      name="hideSaved"
                      label={<p className="text-[16px] font-medium leading-[19px]">Хадгалсан мэдээнүүд нуух</p>}
                      valuePropName="checked"
                    >
                      <Switch className="mt-[4px] w-[40px] h-[22px] bg-[#E4E4E5]" />
                    </Form.Item>
                  </div>
                  <Button
                    className="mt-[20px] h-[34px] w-[100px]"
                    htmlType="submit"
                    type="primary"
                    size="large"
                    loading={saving}
                  >
                    Хадгалах
                  </Button>
                </Form>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
