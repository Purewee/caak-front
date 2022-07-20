import { Switch, Form, Anchor, Input, Upload, Button, Skeleton, Image, message } from 'antd';
import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../../App';
import { FIcon } from '../../component/icon';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useAuth } from '../../context/AuthContext';
import { imagePath } from '../../utility/Util';
import { getDataFromBlob, imageCompress } from '../../lib/imageCompress';
import { SaveOutlined } from '@ant-design/icons';

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
  const [update, { loading: saving }] = useMutation(UPDATE, { context: { upload: true } });

  const me = data?.me || {};

  useEffect(() => {
    context.setStore('default');
    if (me.avatar) setAvatar(imagePath(me.avatar));
  }, [me]);

  if (loading) return <Skeleton />;
  return isAuth ? (
    <div className="flex justify-center w-full pb-[100px] px-[16px] md:px-0">
      <div className="max-w-[1140px] w-full mt-[51px]">
        <div className="flex flex-col md:flex-row gap-[20px] md:gap-[60px]">
          <Anchor offsetTop={40}>
            <p className="text-[28px] font-merri leading-[24px] px-[12px]">Тохиргоо</p>
            <div className="w-full h-[170px] rounded-[4px] mt-[22px]">
              {menu.map((data, idx) => (
                <Anchor.Link href={data.href} title={data.title} className="font-merri" key={idx} />
              ))}
            </div>
          </Anchor>
          <Form
            className="w-full md:w-[790px] font-merri"
            layout="vertical"
            autoComplete="off"
            initialValues={me}
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
                      listType="picture-card"
                      className="w-[164px] h-[164px]"
                      customRequest={({ file, onSuccess }) => {
                        imageCompress(file).then((result) => {
                          return getDataFromBlob(result).then((base64) => {
                            setAvatar(base64);
                            onSuccess('ok');
                          });
                        });
                      }}
                    >
                      {avatar ? (
                        <Image src={avatar} preview={false} className="object-cover" />
                      ) : (
                        <>
                          <FIcon className="icon-fi-rs-camera-f" />
                          <div>Зураг солих</div>
                        </>
                      )}
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
              <div className="mt-[24px] flex flex-wrap justify-between">
                <div className="w-[172px] h-[100px] rounded-[6px] relative cursor-pointer zoom">
                  <img
                    src="https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/f7ovkpuwqmuhwnfpd4ki/post?fimg-ssr-default"
                    className="w-full h-full object-cover rounded-[8px]"
                  />
                  <p className="absolute top-0 h-full w-full flex items-center justify-center text-white text-[15px] font-medium bg-black bg-opacity-50 rounded-[6px]">
                    Post Malone
                  </p>
                </div>
                <div className="w-[172px] h-[100px] rounded-[6px] relative cursor-pointer zoom">
                  <img
                    src="https://cdn.unitycms.io/images/5D0o2tfgaEsA-LuVS2RN7K.png?op=ocroped&val=1200,1200,1000,1000,0,0&sum=rDoHXgs-buo"
                    className="w-full h-full object-cover rounded-[8px]"
                  />
                  <p className="absolute top-0 h-full w-full flex items-center justify-center text-white text-[15px] font-medium bg-black bg-opacity-50 rounded-[6px]">
                    Post Malone
                  </p>
                </div>
                <div className="w-[172px] h-[100px] rounded-[6px] relative cursor-pointer zoom">
                  <img
                    src="https://townsquare.media/site/812/files/2022/06/attachment-post-malone.jpg?w=1200&h=0&zc=1&s=0&a=t&q=89"
                    className="w-full h-full object-cover rounded-[8px]"
                  />
                  <p className="absolute top-0 h-full w-full flex items-center justify-center text-white text-[15px] font-medium bg-black bg-opacity-50 rounded-[6px]">
                    Post Malone
                  </p>
                </div>
                <div className="w-[172px] h-[100px] rounded-[6px] border border-caak-primary bg-[#FFF9F5] flex flex-col items-center justify-center">
                  <FIcon className="icon-fi-rs-plus w-[34px] h-[34px] text-caak-primary rounded-[6px] border-[2px] border-dashed border-[#FF6600]" />
                  <p className="mt-[12px] text-caak-primary text-[15px] font-medium leading-[18px]">Төрөл нэмэх</p>
                </div>
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
              Мэдээлэл шинэчилэх
            </Button>
          </Form>
        </div>
      </div>
    </div>
  ) : null;
}
