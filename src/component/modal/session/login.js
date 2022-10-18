import React, { useState } from 'react';
import { Form, Modal, Input, Button, message, Divider } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { loginWithPassword } from '../../../utility/WithApolloProvider';
import { useAuth } from '../../../context/AuthContext';
import LoginWithFB from './facebook';
import Google from '../../../assets/images/fi-rs-google.svg';

function LoginStep({ setStep }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
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
          <p className="my-[12px] text-[28px] font-condensed text-[#111111] text-center font-bold">Нэвтрэх</p>
          <LoginWithFB />
          <Button
            block
            className="h-[44px] font-medium text-caak-black"
            icon={<img src={Google} className="w-[26px] absolute left-[18px] top-[9px]" />}
            size="large"
          >
            Google
          </Button>
          <Divider>
            <span className="text-[#909090] font-normal text-[14px]">Эсвэл</span>
          </Divider>
          <Form
            autoComplete="off"
            onFinish={async ({ login: username, password }) => {
              try {
                setLoading(true);
                const token = await loginWithPassword(username, password);
                if (!token) return console.error('Login failed: Server Error');
                await login();
                setLoading(false);
                message.success('Амжилттай нэвтэрлээ');
                setStep('closed');
                navigate('/');
              } catch (e) {
                setLoading(false);
                message.error('Invalid login or password');
              }
            }}
            layout="vertical"
          >
            <Form.Item name="login" rules={[{ required: true, message: 'Заавал оруулна уу!' }]}>
              <Input size="large" placeholder="Утасны дугаар / Имэйл" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Заавал оруулна уу!' }]}
              help={
                <Button type="link" onClick={() => setStep('password')} className="text-[#555555] p-0 mb-2" block>
                  <span className="w-full text-right">Нууц үг мартсан?</span>
                </Button>
              }
            >
              <Input.Password size="large" placeholder="Нууц үг" />
            </Form.Item>

            <Button htmlType="submit" type="primary" size="large" block icon={<CheckOutlined />} loading={loading}>
              Нэвтрэх
            </Button>
          </Form>
        </div>
      </div>
      <div className="p-[24px]">
        <div className="flex items-center justify-center text-[#555555] text-[14px]">
          <span>Шинэ хэрэглэгч бол </span>
          <Button type="link" onClick={() => setStep('open')}>
            Бүртгүүлэх
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default LoginStep;
