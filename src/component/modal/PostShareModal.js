import React from 'react';
import { notification } from 'antd';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import Configure from '../configure';
import { CopyToClipboard } from 'react-copy-to-clipboard/src';

export default function PostShareModal({ post, toggle, image }) {
  const openNotification = () => {
    const args = {
      message: 'Линк хуулагдлаа',
      duration: 4,
      placement: 'bottom',
      className: 'h-[50px] bg-[#12805C] w-[200px]',
    };
    notification.open(args);
  };

  return (
    <div className="popup_modal">
      <div className="popup_modal-content w-[480px] rounded-[4px] pt-[22px] pb-[20px]">
        <p className="text-[26px] font-condensed font-bold leading-[30px] ml-[24px]">Түгээх</p>
        <div className="bg-[#FBFAFB] w-full h-[132px] mt-[13px] border-t border-b border-[#D4D8D8] px-[24px] py-[16px] flex flex-row">
          <img alt="" className="min-w-[100px] max-w-[100px] h-[100px] object-cover truncate-3" src={image} />
          <div className="ml-[16px]">
            <p className="font-merri text-[16px] leading-[21px] h-[64px] truncate-3">{post?.title}</p>
            <div className="text-[#555555] mt-[10px] flex flex-row items-center leading-[18px] text-[14px]">
              <p>{post?.source?.name}</p>
              <p className="ml-[6px]">• {post?.author?.name || post?.author.firstName}</p>
            </div>
          </div>
        </div>
        <div className="w-full px-[24px]">
          <FacebookShareButton className="w-full" url={`${Configure.domain}'/post/view/${post?.id}`}>
            <div className="cursor-pointer w-full rounded-[4px] h-[44px] bg-[#1877F2] mt-[20px] flex items-center justify-center relative">
              <p className="text-[16px] text-white font-medium leading-[19px]">Хуваалцах</p>
              <span className="absolute top-[10px] left-[20px] w-[24px] h-[24px] icon-fi-rs-fb text-white text-[23px] flex items-center justify-center" />
            </div>
          </FacebookShareButton>
          <TwitterShareButton className="mt-[8px] w-full" url={`${Configure.domain}'/post/view/${post?.id}`}>
            <div className="cursor-pointer w-full rounded-[4px] h-[44px] bg-[#1D9BF1] flex items-center justify-center relative">
              <p className="text-[16px] text-white font-medium leading-[19px]">Жиргэх</p>
              <span className="absolute top-[10px] left-[20px] w-[24px] h-[24px] icon-fi-rs-tw text-white text-[22px] flex items-center justify-center" />
            </div>
          </TwitterShareButton>
          <p className="text-[16px] font-roboto leading-[19px] mt-[16px]">Эвлэл мэдээний линк хуулж авах</p>
          <div className="bg-[#FBFAFB] w-full h-[44px] mt-[8px] border flex flex-row items-center justify-between border-[#EFEEEF] py-[12px] pl-[12px] pr-[16px]">
            <div className="flex flex-row items-center text-[#555555]">
              <span className="icon-fi-rs-link" />
              <p id="myInput" className="text-[15px] ml-[10px]">{`${Configure.domain}'/post/view/${post?.id}`}</p>
            </div>
            <CopyToClipboard text={`${Configure.domain}'/post/view/${post?.id}`}>
              <p
                className="cursor-pointer text-[#FF6600] font-medium text-[15px] leading-[18px]"
                onClick={() => openNotification()}
              >
                Хуулах
              </p>
            </CopyToClipboard>
          </div>
          <div className="w-full flex justify-end">
            <p
              onClick={toggle}
              className="cursor-pointer w-[76px] h-[34px] mt-[22px] text-[15px] font-medium rounded-[4px] border border-[#D4D8D8] flex justify-center items-center"
            >
              Болих
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
