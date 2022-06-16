import React from 'react';
import { imagePath } from '../../utility/Util';

export default function PostSaveModal({ savePostOpen, setSavePostOpen, post }) {
  return (
    savePostOpen && (
      <div className="popup_modal">
        <div className="popup_modal-content w-[480px] rounded-[4px] pt-[22px] pb-[20px]">
          <p className="text-[26px] font-condensed font-bold leading-[30px] ml-[24px]">Жорд нэмэх</p>
          <div className="bg-[#FBFAFB] w-full h-[132px] mt-[13px] border-t border-b border-[#D4D8D8] px-[24px] py-[16px] flex flex-row">
            <img
              alt=""
              className="min-w-[100px] max-w-[100px] h-[100px] object-cover truncate-3"
              src={imagePath(post.imageUrl)}
            />
            <div className="ml-[16px]">
              <p className="font-merri text-[16px] h-[64px]">{post.title}</p>
              <div className="text-[#555555] mt-[10px] flex flex-row items-center leading-[18px] text-[15px]">
                <p>gogo.mn</p>
                <p className="ml-[6px]">• {post.author.firstName}</p>
              </div>
            </div>
          </div>
          <div className="w-full px-[24px]">
            <p className="mt-[19px] text-[16px] font-medium leading-[19px]">Миний жорнууд</p>
            <div></div>
            <div className="cursor-pointer w-full h-[54px] rounded-[2px] border flex flex-row justify-center items-center border-[#D4D8D8] mt-[20px]">
              <span className="icon-fi-rs-plus text-[16px]" />
              <p className="ml-[11px] font-medium text-[16px]">Жор үүсгэх</p>
            </div>
            <div className="w-full flex flex-row justify-end">
              <p
                onClick={() => setSavePostOpen(false)}
                className="cursor-pointer w-[76px] h-[34px] mt-[22px] text-[15px] font-medium rounded-[4px] border border-[#D4D8D8] flex justify-center items-center"
              >
                Болих
              </p>
              <p className="cursor-pointer w-[100px] h-[34px] mt-[22px] text-[15px] font-medium rounded-[4px] text-white ml-[10px] bg-[#FF6600] flex justify-center items-center">
                Хадгалах
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
