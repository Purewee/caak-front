import React, { useState } from 'react';
import { Form, Modal, Input, Button, message } from 'antd';
import { gql, useMutation } from '@apollo/client';
import { CheckOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const CHECK = gql`
  mutation CheckUser($login: String!) {
    checkLogin(input: { login: $login })
  }
`;

const REGISTER = gql`
  mutation RegisterUser($login: String!, $password: String!) {
    registerUser(input: { login: $login, password: $password }) {
      id
      mobile
      email
    }
  }
`;

function RegisterStep({ setStep }) {
  const navigate = useNavigate();
  const [check, { loading: checking }] = useMutation(CHECK);
  const [register, { loading }] = useMutation(REGISTER);
  return (
    <Modal
      visible
      footer={false}
      title={false}
      width={400}
      bodyStyle={{ padding: 0 }}
      onCancel={() => setStep('closed')}
    >
      <div className="font-roboto border-b">
        <div className="p-[40px]">
          <p className="my-[12px] text-[28px] font-condensed text-[#111111] text-center font-bold">Бүртгүүлэх</p>
          <Form
            autoComplete="off"
            onFinish={(values) => {
              register({ variables: values })
                .then(() => {
                  message.success('Бүртгэл амжилттай');
                  setStep('login');
                })
                .catch((e) => message.error(JSON.stringify(e.message)));
            }}
            layout="vertical"
          >
            <Form.Item name="login" rules={[{ required: true, message: 'Заавал оруулна уу!' }]}>
              <Input size="large" placeholder="Утасны дугаар / Имэйл" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Заавал оруулна уу!' },
                { min: 4, message: 'Хэт богинохон байна!' },
              ]}
            >
              <Input.Password size="large" placeholder="Нууц үг" />
            </Form.Item>
            <Form.Item
              name="passwordConfirmation"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Нууц үгээ дахин оруулна уу!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Нууц үг таарахгүй байна!'));
                  },
                }),
              ]}
            >
              <Input.Password size="large" placeholder="Нууц үг давтах" />
            </Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              block
              icon={<CheckOutlined />}
              loading={loading}
              disabled={checking}
            >
              Бүртгүүлэх
            </Button>
          </Form>
        </div>
      </div>
      <div className="p-[24px]">
        <div className="flex items-center justify-center text-[#555555] text-[14px]">
          <span>Бүртгэлтэй хэрэглэгч бол </span>
          <Button type="link" onClick={() => setStep('login')}>
            Нэвтрэх
          </Button>
        </div>
        <p className="mt-[40px] flex items-center flex-wrap text-[13px] text-[#909090] justify-center">
          Та энэ алхамыг үргэлжлүүлснээр, сайтын
          <Button
            onClick={() => {
              navigate('/help', { state: 4 });
            }}
            type="link"
            className="text-[#111111] text-[13px]"
            size="small"
          >
            Үйлчилгээний нөхцөл
          </Button>
          болон
          <Button
            onClick={() => {
              navigate('/help', { state: 3 });
            }}
            className="text-[#111111] text-[13px]"
            type="link"
            size="small"
          >
            Нууцлалын бодлогыг
          </Button>
          зөвшөөрсөнд тооцно.
        </p>
      </div>
    </Modal>
  );
}

export default RegisterStep;
