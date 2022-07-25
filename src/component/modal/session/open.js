import React, { useState } from 'react';
import { Modal, Button, Row, Col, Divider } from 'antd';
import logoIcon from '../../../images/New-Logo.svg';
import { FacebookFilled, GoogleCircleFilled, MailFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function OpenStep({ setStep }) {
  const navigate = useNavigate();
  return (
    <Modal
      title={false}
      visible
      footer={false}
      bodyStyle={{ padding: 0 }}
      width={800}
      destroyOnClose={true}
      onCancel={() => setStep('closed')}
    >
      <Row gutter={0} className="font-roboto">
        <Col span={10}>
          <div className="hidden h-full bg-[#F7F7F7] sm:flex flex-col items-center justify-center p-[24px]">
            <img src={logoIcon} className="cursor-pointer object-contain" alt="Caak Logo" width={157} height={47} />
            <p className="mt-[22px] text-[18px] font-medium text-[#111111]">Мэдээ мэдээллийн төв цэг!</p>
            <div className="flex flex-row mt-[58px]">
              <span className="icon-fi-rs-filter-f text-white text-[15px] w-[30px] h-[30px] flex items-center justify-center bg-[#FF6600] rounded-full" />
              <p className="text-[#111111] text-[15px] leading-[20px] w-[152px] ml-[14px]">
                Мэдээллийг шүүн өөртөө тааруулах
              </p>
            </div>
            <div className="flex flex-row mt-[15px]">
              <span className="icon-fi-rs-network text-white text-[15px] w-[30px] h-[30px] flex items-center justify-center bg-[#FF6600] rounded-full" />
              <p className="text-[#111111] text-[15px] leading-[20px] w-[152px] ml-[14px]">
                Шилдэг мэдээний сувгийг дагах
              </p>
            </div>
            <div className="flex flex-row mt-[15px]">
              <span className="icon-fi-rs-list-f text-white text-[15px] w-[30px] h-[30px] flex items-center justify-center bg-[#FF6600] rounded-full" />
              <p className="text-[#111111] text-[15px] leading-[20px] w-[152px] ml-[14px]">
                Таалагдсан мэдээг хадгалан жор үүсгэх
              </p>
            </div>
          </div>
        </Col>
        <Col span={14} className="border-l">
          <div className="p-[40px] mt-[40px] border-b">
            <h3 className="mb-[20px] text-[30px] font-bold leading-[38px]">
              Бүртгэл үүсгэн мэдээллийг өөрийн болгоорой!
            </h3>
            <Button
              block
              icon={<FacebookFilled />}
              size="large"
              className="bg-[#1876F3] mb-4 text-white border-0 hover:border"
            >
              Facebook
            </Button>
            <Button block icon={<GoogleCircleFilled />} size="large">
              Google
            </Button>
            <Divider>
              <span className="text-[#909090] font-normal text-[14px]">Эсвэл</span>
            </Divider>
            <Button block icon={<MailFilled />} size="large" type="primary" onClick={() => setStep('register')}>
              Утасны дугаар / И-мэйл хаяг
            </Button>
          </div>
          <div className="p-[24px]">
            <div className="flex items-center justify-center text-[#555555] text-[14px]">
              <span>Бүртгэлтэй хэрэглэгч бол </span>
              <Button type="link" onClick={() => setStep('login')}>
                Нэвтрэх
              </Button>
            </div>
            <p className="mt-[40px] flex items-center flex-wrap text-[14px] text-[#909090] justify-center">
              Та энэ алхамын үргэлжлүүлснээр, сайтын
              <Button
                onClick={() => {
                  navigate('/help', { state: 4 });
                }}
                type="link"
                className="text-[#111111] text-[14px]"
                size="small"
              >
                Үйлчилгээний нөхцөл
              </Button>
              болон
              <Button
                onClick={() => {
                  navigate('/help', { state: 3 });
                }}
                className="text-[#111111] text-[14px]"
                type="link"
                size="small"
              >
                Нууцлалын бодлогыг
              </Button>
              зөвшөөрсөнд тооцно.
            </p>
          </div>
        </Col>
      </Row>
    </Modal>
  );
}

export default OpenStep;
