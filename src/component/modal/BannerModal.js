import React from 'react';
import A1_SP_2 from '../../assets/images/A1-SP-2.png';
import A1_SP_1 from '../../assets/images/A1-SP-1.png';
import A1_1 from '../../assets/images/A1-1.png';
import A1_2 from '../../assets/images/A1-2.png';
import A2 from '../../assets/images/A2.png';
import A2_SP from '../../assets/images/A2-SP.png';
import A3 from '../../assets/images/A3.png';
import A3_SP from '../../assets/images/A3-SP.png';
import { Modal } from 'antd';
export default function BannerModal({ open, setOpen }) {
  //prettier-ignore
  return open && (
    <Modal
      visible
      width={810}
      bodyStyle={{ padding: 0 }}
      style={{top: 20}}
      afterClose={() => setOpen(false)}
      footer={false}
      closeIcon={<span onClick={() => setOpen(false)} className="icon-fi-rs-close text-[18px] text-[#909090]" />}
    >
      <div className="relative bg-white pt-[17px] pb-[18px]">
          <p className="text-center text-[#111111] font-condensed font-bold text-[26px] leading-[32px]">
            {open === 'A1' ? 'A1 Баннер' : open === 'A2' ? 'A2 Баннер' : open === 'A3' ? 'A3 Баннер' : null}
          </p>
          {open === 'A1' ? (
            <div className="mt-[13px] w-full border-t border-[#D4D8D8] pt-[18px] px-[24px]">
              <p className="text-caak-primary font-bold text-[16px] leading-[21px]">Веб сайт</p>
              <div className="flex flex-col sm:flex-row justify-center mt-[30px]">
                <div>
                  <img className="w-[330px]" src={A1_1} />
                  <p className="text-center mt-[18px] text-caak-darkGray text-[15px] leading-[20px]">Нүүр хуудсанд харагдах байдал</p>
                </div>
                <div className="ml-[40px]">
                  <img className="w-[330px]" src={A1_2} />
                  <p className="text-center mt-[18px] text-caak-darkGray text-[15px] leading-[20px]">Мэдээний дэлгэрэнгүйд харагдах байдал</p>
                </div>
              </div>
              <p className="text-caak-primary font-bold text-[16px] leading-[21px] mt-[28px]">Гар утас</p>
              <div className="flex flex-col sm:flex-row justify-around mt-[30px]">
                <div className="flex flex-col items-center">
                  <img className="w-[132px]" src={A1_SP_1} />
                  <p className="mt-[18px] text-caak-darkGray text-[15px] leading-[20px]">Нүүр хуудсанд харагдах байдал</p>
                </div>
                <div className="flex flex-col items-center">
                  <img className="w-[132px]" src={A1_SP_2} />
                  <p className="mt-[18px] text-caak-darkGray text-[15px] leading-[20px]">Мэдээний дэлгэрэнгүйд харагдах байдал</p>
                </div>
              </div>
            </div>
          ) : open === 'A2' ? (
            <div className="mt-[13px] w-full border-t border-[#D4D8D8] pt-[18px] px-[24px]">
              <p className="text-caak-primary font-bold text-[16px] leading-[21px]">Веб сайт</p>
              <div className="flex flex-col items-center mt-[30px]">
                <img className="w-[330px]" src={A2} />
                <p className="mt-[18px] text-caak-darkGray text-[15px] leading-[20px]">Нүүр хуудасны мэдээнүүд дунд ингэж харагдана</p>
              </div>
              <p className="text-caak-primary font-bold text-[16px] leading-[21px] mt-[28px]">Гар утас</p>
              <div className="flex flex-col items-center mt-[30px]">
                <img className="w-[132px]" src={A2_SP} />
                <p className="mt-[18px] text-caak-darkGray text-[15px] leading-[20px]">Утсаар үзэхэд мэдээнүүд дунд ингэж харагдах</p>
              </div>
            </div>
          ) : open === 'A3' ? (
            <div className="mt-[13px] w-full border-t border-[#D4D8D8] pt-[18px] px-[24px]">
              <p className="text-caak-primary font-bold text-[16px] leading-[21px]">Веб сайт</p>
              <div className="flex flex-col items-center mt-[30px]">
                <img className="w-[330px]" src={A3} />
                <p className="mt-[18px] text-caak-darkGray text-[15px] leading-[20px]">Мэдээний дэлгэрэнгүй дээр баруун талд дагаж харагдана</p>
              </div>
              <p className="text-caak-primary font-bold text-[16px] leading-[21px] mt-[28px]">Гар утас</p>
              <div className="flex flex-col items-center mt-[30px]">
                <img className="w-[132px]" src={A3_SP} />
                <p className="mt-[18px] text-caak-darkGray text-[15px] leading-[20px]">Утсаар үзэхэд доороос дээш дэлгэцийн 40%-г эзлэн гарч ирнэ</p>
              </div>
            </div>
          ) : null}
          <div className="mt-[20px] w-full border-t border-[#D4D8D8] pt-[24px] px-[24px] flex flex-row items-center justify-between">
            <span className="text-[#111111] text-[16px] font-bold leading-[21px] inline-flex">Хэмжээ:<p className="text-[#555555] font-normal ml-[4px]">{open === 'A1' ? '1300х200' : open === 'A2' ? '420х520' : open === 'A3' ? 'Веб сайт: 340х500, Гар утас: 780x780' : null}</p></span>
            <button onClick={() => setOpen(false)} className="w-[66px] h-[34px] border border-[#D4D8D8] rounded-[4px] text-[#111111] font-medium text-[15px]">Хаах</button>
          </div>
        </div>
    </Modal>
  );
}
