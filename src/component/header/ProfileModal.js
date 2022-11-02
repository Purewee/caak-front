import React, { useState } from 'react';
import { Form, Modal, Input, Button, Avatar, Upload } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import { gql, useMutation } from '@apollo/client';
import { getDataFromBlob, imageCompress } from '../../lib/imageCompress';

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
  const [updateProfile, { loading }] = useMutation(UPDATE_PROFILE, { context: { upload: true } });
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  return (
    <>
      <Modal
        visible={true}
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
                updateProfile({ variables: values }).then();
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
    </>
  );
}

export default ProfileModal;
