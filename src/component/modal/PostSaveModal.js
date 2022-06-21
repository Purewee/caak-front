import { Checkbox, notification } from 'antd';
import React from 'react';

export default function PostSaveModal({ savePostOpen, setSavePostOpen, post, image }) {
  const openNotification = () => {
    const args = {
      message: 'Та мэдээ ажилттай хадгалагдлаа.',
      duration: 4,
      placement: 'bottom',
      className: 'h-[50px] bg-[#12805C]',
    };
    notification.open(args);
    setSavePostOpen(false);
  };

  return (
    savePostOpen && (
      <div className="popup_modal">
        <div className="popup_modal-content w-[480px] rounded-[4px] pt-[22px] pb-[20px]">
          <p className="text-[26px] font-condensed font-bold leading-[30px] ml-[24px]">Мэдээ хадгалах</p>
          <div className="bg-[#FBFAFB] w-full h-[132px] mt-[13px] border-t border-b border-[#D4D8D8] px-[24px] py-[16px] flex flex-row">
            <img alt="" className="min-w-[100px] max-w-[100px] h-[100px] object-cover truncate-3" src={image} />
            <div className="ml-[16px]">
              <p className="font-merri text-[16px] leading-[21px] h-[64px]">{post.title}</p>
              <div className="text-[#555555] mt-[10px] flex flex-row items-center leading-[18px] text-[15px]">
                <p>{post.source?.name}</p>
                <p className="ml-[6px]">• {post.author.firstName || post.author.name}</p>
              </div>
            </div>
          </div>
          <div className="w-full px-[24px]">
            {/* <p className="mt-[19px] text-[16px] font-medium leading-[19px]">Миний жорнууд</p> */}
            <div className="flex flex-row items-center mt-[19px]">
              <Checkbox defaultChecked className="" />
              <img
                className="w-[50px] h-[50px] object-cover ml-[14px] rounded-[2px]"
                src={require('../../assets/images/caak.jpg')}
              />
              <p className="text-[#555555] text-[16px] leading-[19px] ml-[14px]">Хэрэгтэй мэдээ</p>
            </div>
            {/* <div className="cursor-pointer w-full h-[54px] rounded-[2px] border flex flex-row justify-center items-center border-[#D4D8D8] mt-[20px]">
              <span className="icon-fi-rs-plus text-[16px]" />
              <p className="ml-[11px] font-medium text-[16px]">Жор үүсгэх</p>
            </div> */}
            <div className="w-full flex flex-row justify-end">
              <p
                onClick={() => setSavePostOpen(false)}
                className="cursor-pointer w-[76px] h-[34px] mt-[22px] text-[15px] font-medium rounded-[4px] border border-[#D4D8D8] flex justify-center items-center"
              >
                Болих
              </p>
              <p
                onClick={openNotification}
                className="cursor-pointer w-[100px] h-[34px] mt-[22px] text-[15px] font-medium rounded-[4px] text-white ml-[10px] bg-[#FF6600] flex justify-center items-center"
              >
                Хадгалах
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
