import React, { useState } from 'react';
import { Form, Modal, Input, Button, Avatar, Upload } from 'antd';
import { gql, useMutation } from '@apollo/client';
import { getDataFromBlob, imageCompress } from '../../lib/imageCompress';
import Bubble from '../../assets/images/bubble.svg';

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
        open={true}
        footer={false}
        title={false}
        width={440}
        heigh={506}
        bodyStyle={{ padding: 0 }}
        closable={false}
      >
        <div className="p-[40px] flex flex-col items-center">
          <Form
            autoComplete="off"
            onFinish={(values) => {
              updateProfile({ variables: values }).then();
            }}
            className="flex flex-col gap-[20px] items-center"
          >
            <div className="relative flex flex-col items-center">
              <img className="w-[197px] h-[144px]" src={Bubble} />
              <div className="absolute top-[9px] w-[112px]">
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
                    <Button
                      className="w-[32px] h-[32px] bg-white"
                      type="primary"
                      shape="circle"
                      icon={<span className="icon-fi-rs-camera text-black text-[18px]" />}
                    />
                  </Upload>
                </Form.Item>
              </div>
            </div>
            <p className="text-[14px] leading-[19px] text-center mt-[43px]">{login}</p>
            <h3 className="font-condensed text-[32px] leading-[38px] font-bold mt-[20px]">Таныг хэн гэж дуудах вэ?</h3>
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Заавал оруулна уу!' }]}
              className="w-full mt-[20px]"
            >
              <Input
                size="large"
                placeholder="Нэрээ оруулна уу."
                className="w-full h-[64px]"
                onChange={({ target }) => setName(target.value)}
              />
            </Form.Item>
            <Button
              className="mt-[40px] h-[44px]"
              htmlType="submit"
              type="primary"
              size="large"
              block
              loading={loading}
            >
              Үргэлжлүүлэх
            </Button>
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default ProfileModal;
