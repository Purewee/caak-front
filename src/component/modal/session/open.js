import React, { useState } from 'react';
import { Modal, Button, Row, Col, Divider } from 'antd';
import logoIcon from '../../../images/New-Logo.svg';
import Google from '../../../assets/images/fi-rs-google.svg';
import { useNavigate } from 'react-router-dom';
import { FIcon } from '../../icon';

function OpenStep({ setStep }) {
  const navigate = useNavigate();
  return (
    <Modal
      title={false}
      visible
      footer={false}
      bodyStyle={{ padding: 0 }}
      width={720}
      destroyOnClose={true}
      onCancel={() => setStep('closed')}
    >
      <Row gutter={0} className="font-roboto">
        <Col className="hidden sm:block" span={10}>
          <div className="h-full bg-[#F7F7F7] rounded-l-[6px] flex flex-col items-center justify-center p-[24px]">
            <img src={logoIcon} className="cursor-pointer object-contain" alt="Caak Logo" width={157} height={47} />
            <p className="mt-[24px] text-[18px] leading-[21px] condMedium text-[#111111]">Мэдээ мэдээллийн төв цэг!</p>
            <div className="flex flex-row mt-[60px]">
              <FIcon className="icon-fi-rs-filter-f text-white text-[15px] w-[30px] h-[30px] bg-[#FF6600] rounded-full" />
              <p className="text-[#111111] text-[15px] leading-[18px] w-[152px] ml-[14px]">
                Мэдээллийг шүүн өөртөө тааруулах
              </p>
            </div>
            <div className="flex flex-row mt-[15px]">
              <span className="icon-fi-rs-network text-white text-[15px] w-[30px] h-[30px] flex items-center justify-center bg-[#FF6600] rounded-full" />
              <p className="text-[#111111] text-[15px] leading-[18px] w-[152px] ml-[14px]">
                Шилдэг мэдээний сувгийг дагах
              </p>
            </div>
            <div className="flex flex-row mt-[15px]">
              <span className="icon-fi-rs-list-f text-white text-[15px] w-[30px] h-[30px] flex items-center justify-center bg-[#FF6600] rounded-full" />
              <p className="text-[#111111] text-[15px] leading-[18px] w-[152px] ml-[14px]">
                Таалагдсан мэдээг хадгалан жор үүсгэх
              </p>
            </div>
          </div>
        </Col>
        <Col xs={24} xl={14} className="border-l">
          <div className="px-[40px] py-[30px] mt-[40px] border-b">
            <h3 className="text-[32px] font-bold font-condensed leading-[38px]">
              Бүртгэл үүсгэн мэдээллийг өөрийн болгоорой!
            </h3>
            <Button
              block
              icon={<FIcon className="icon-fi-rs-fb text-[26px] absolute left-[22px] top-[9px]" />}
              size="large"
              className="bg-[#1876F3] mb-4 h-[44px] text-white font-medium border-0 hover:border mt-[30px]"
            >
              Facebook
            </Button>
            <Button
              block
              className="h-[44px]"
              icon={<img src={Google} alt="" className="w-[26px] absolute left-[18px] top-[9px]" />}
              size="large"
            >
              Google
            </Button>
            <Divider>
              <span className="text-[#AFAFAF] font-normal text-[14px]">Эсвэл</span>
            </Divider>
            <Button
              block
              icon={<FIcon className="icon-fi-rs-mail-f text-[26px] absolute left-[22px] top-[9px]" />}
              size="large"
              type="primary"
              onClick={() => setStep('register')}
            >
              Утасны дугаар / И-мэйл хаяг
            </Button>
          </div>
          <div className="p-[24px]">
            <div className="flex items-center justify-center text-[#555555] text-[14px] leading-[18px]">
              <span>Бүртгэлтэй хэрэглэгч бол </span>
              <button className="text-[#FF6600] font-bold" type="link" onClick={() => setStep('login')}>
                &nbsp;Нэвтрэх
              </button>
            </div>
            <p className="mt-[40px] flex items-center leading-[17px] flex-wrap text-[14px] text-[#909090]">
              Та энэ алхамын үргэлжлүүлснээр, сайтын
              <button
                onClick={() => {
                  navigate('/help', { state: 4 });
                }}
                type="link"
                className="text-[#111111] text-[14px]"
                size="small"
              >
                Үйлчилгээний нөхцөл&nbsp;
              </button>
              болон
              <button
                onClick={() => {
                  navigate('/help', { state: 3 });
                }}
                className="text-[#111111] text-[14px]"
                type="link"
                size="small"
              >
                &nbsp;Нууцлалын бодлогыг&nbsp;
              </button>
              зөвшөөрсөнд тооцно.
            </p>
          </div>
        </Col>
      </Row>
    </Modal>
  );
}

export default OpenStep;
