import React, { useState } from 'react';
import { Form, Modal, Input, Button, message, Avatar, Upload, Skeleton } from 'antd';
import { CameraOutlined, CheckOutlined } from '@ant-design/icons';
import { gql, useMutation, useQuery } from '@apollo/client';
import { getDataFromBlob, imageCompress } from '../../lib/imageCompress';
import { imagePath } from '../../utility/Util';

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($name: String, $avatar: Upload) {
    updateUserProfile(input: { firstName: $name, avatar: $avatar }) {
      id
      firstName
      avatar
    }
  }
`;

function ProfileModal({ login }) {
  const [open, setOpen] = useState(true);
  const [updateProfile, { loading }] = useMutation(UPDATE_PROFILE, { context: { upload: true } });
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  return (
    <>
      <Modal
        visible={open}
        footer={false}
        title={false}
        width={400}
        heigh={500}
        bodyStyle={{ padding: 0 }}
        closable={false}
      >
        <div className="font-roboto">
          <div className="p-[20px] flex flex-col items-center justify-between gap-4">
            <Form
              autoComplete="off"
              onFinish={(values) => {
                updateProfile({ variables: values }).then(() => {
                  setOpen(false);
                });
              }}
              className="flex flex-col gap-[20px] items-center"
            >
              <div className="relative w-[112px]">
                {avatar.length > 0 ? (
                  <Avatar
                    size={112}
                    style={{ fontSize: 40 }}
                    shape="circle"
                    className="mt-[40px] bg-[#257CEE1A] text-[#257CEE]"
                    src={avatar}
                  />
                ) : (
                  <Avatar
                    size={112}
                    style={{ fontSize: 40 }}
                    shape="circle"
                    className="mt-[40px] bg-[#257CEE1A] text-[#257CEE] font-bold"
                  >
                    {(name[0] || 'C').toUpperCase()}
                  </Avatar>
                )}
                <Form.Item
                  name="avatar"
                  className="absolute bottom-[-24px] right-0"
                  valuePropName="file"
                  getValueFromEvent={(e) => {
                    return e?.fileList[0].originFileObj;
                  }}
                  shouldUpdate
                >
                  <Upload
                    showUploadList={false}
                    accept="image/*"
                    maxCount={1}
                    customRequest={({ file, onSuccess }) => {
                      imageCompress(file).then((result) => {
                        return getDataFromBlob(result).then((base64) => {
                          setAvatar(base64);
                          onSuccess('ok');
                        });
                      });
                    }}
                  >
                    <Button type="primary" shape="circle" icon={<CameraOutlined />} />
                  </Upload>
                </Form.Item>
              </div>
              <p className="text-[14px] text-center">{login}</p>
              <h3 className="font-condensed text-[32px] font-bold">Таныг хэн гэж дуудах вэ?</h3>
              <Form.Item name="name" rules={[{ required: true, message: 'Заавал оруулна уу!' }]} className="w-full">
                <Input
                  size="large"
                  placeholder="Нэрээ оруулна уу."
                  className="w-full"
                  onChange={({ target }) => setName(target.value)}
                />
              </Form.Item>
              <Button htmlType="submit" type="primary" size="large" block loading={loading}>
                Үргэлжлүүлэх
              </Button>
            </Form>
          </div>
        </div>
      </Modal>
      {!open && <CategoriesModal />}
    </>
  );
}

const CATEGORIES = gql`
  query GetCategories {
    categories {
      edges {
        node {
          id
          slug
          name
          fullName
          cover
          position
        }
      }
    }
  }
`;

const BATCH_FOLLOW = gql`
  mutation FollowCategories($ids: [ID!]!, $targetType: String!) {
    updateFollows(input: { targetType: $targetType, ids: $ids })
  }
`;

function CategoriesModal() {
  const [open, setOpen] = useState(true);
  const { data, loading } = useQuery(CATEGORIES);
  const [follow, { loading: following }] = useMutation(BATCH_FOLLOW);
  const [ids, setIds] = useState([]);
  const categories = data?.categories?.edges?.map((x) => x.node) || [];
  return (
    <Modal visible={open} closable={false} header={false} footer={false} width={850}>
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <div className="w-full text-center mb-[12px]">
            <h3 className="font-condensed text-[38px] font-bold text-[#111111]">Таны дуртай мэдээний төрлүүд</h3>
            <p className="font-roboto text-[#555555] text-[15px]">
              Таны дуртай төрлөөр мэдээг шүүцгээе. Хамгийн багадаа 3 төрөл сонгоно уу.
            </p>
          </div>
          <div className="px-[20px] h-[60vh] flex items-center justify-center gap-[8px] flex-wrap overflow-auto">
            {categories.map((x) => {
              const selected = ids.includes(x.id);
              return (
                <div
                  className={`w-[170px] h-[100px] relative items-center justify-center rounded-md cursor-pointer border-caak-primary ${
                    selected && 'border-2'
                  }`}
                  key={x.id}
                  onClick={() => {
                    if (selected) {
                      setIds(ids.filter((id) => id !== x.id));
                    } else {
                      setIds([...ids, x.id]);
                    }
                  }}
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
              );
            })}
          </div>
          <div className="w-full flex justify-center mt-[24px]">
            <Button
              size="large"
              icon={<CheckOutlined />}
              disabled={ids.length < 3}
              onClick={() => {
                follow({ variables: { targetType: 'category', ids } }).then(() => {
                  message.success('Амжилттай хадгаллаа.');
                  setOpen(false);
                });
              }}
              loading={following}
            >
              Дуусгах ({ids.length})
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
}

export default ProfileModal;
