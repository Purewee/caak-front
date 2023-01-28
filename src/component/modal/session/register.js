import React from 'react';
import { Form, Modal, Input, Button, message } from 'antd';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

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
  const [register, { loading }] = useMutation(REGISTER);
  return (
    <Modal
      visible
      footer={false}
      title={false}
      width={380}
      closeIcon={<span className="icon-fi-rs-close text-[#909090] text-[24px]" />}
      bodyStyle={{ padding: 0 }}
      onCancel={() => setStep('closed')}
    >
      <div className="font-roboto border-b">
        <div className="p-[40px]">
          <p className="my-[25px] text-[32px] font-condensed leading-[38px] text-[#111111] text-center font-bold">
            Бүртгүүлэх
          </p>
          <Form
            autoComplete="off"
            onFinish={(values) => {
              register({ variables: values })
                .then(() => {
                  message.success('Бүртгэл амжилттай').then(() => setStep('login'));
                })
                .catch((e) => message.error(JSON.stringify(e.message)));
            }}
            layout="vertical"
          >
            <Form.Item className="mb-[12px]" name="login" rules={[{ required: true, message: 'Заавал оруулна уу!' }]}>
              <Input className="h-[44px] rounded-[4px]" size="large" placeholder="Утасны дугаар / Имэйл" />
            </Form.Item>
            <Form.Item
              name="password"
              className="mb-[12px]"
              rules={[
                { required: true, message: 'Заавал оруулна уу!' },
                { min: 4, message: 'Хэт богинохон байна!' },
              ]}
            >
              <Input.Password className="h-[44px] rounded-[4px]" size="large" placeholder="Нууц үг" />
            </Form.Item>
            <Form.Item
              className="mb-[22px]"
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
              <Input.Password className="h-[44px] rounded-[4px]" size="large" placeholder="Нууц үг давтах" />
            </Form.Item>
            <Button
              htmlType="submit"
              className="h-[44px] font-medium"
              type="primary"
              size="large"
              block
              loading={loading}
            >
              Бүртгүүлэх
            </Button>
          </Form>
        </div>
      </div>
      <div className="p-[24px]">
        <div className="flex items-center justify-center text-[#555555] h-[18px]">
          <p className="text-[15px] leading-[18px]">Бүртгэлтэй хэрэглэгч бол </p>
          <Button
            className="p-0 text-[15px] leading-[18px] h-[18px] font-bold"
            type="link"
            onClick={() => setStep('login')}
          >
            &nbsp;Нэвтрэх
          </Button>
        </div>
        <p className="mt-[24px] flex items-center leading-[17px] flex-wrap text-[14px] text-[#909090]">
          Та энэ алхамын үргэлжлүүлснээр, сайтын
          <Button
            onClick={() => {
              navigate('/help', { state: 4 });
            }}
            type="link"
            className="text-[#111111] text-[14px]"
            size="small"
          >
            Үйлчилгээний нөхцөл&nbsp;
          </Button>
          болон
          <Button
            onClick={() => {
              navigate('/help', { state: 3 });
            }}
            className="text-[#111111] text-[14px]"
            type="link"
          >
            &nbsp;Нууцлалын бодлогыг&nbsp;
          </Button>
          зөвшөөрсөнд тооцно.
        </p>
      </div>
    </Modal>
  );
}

export default RegisterStep;
