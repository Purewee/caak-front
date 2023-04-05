import React from 'react';
import { imagePath } from '../../utility/Util';
import useMediaQuery from '../navigation/useMediaQuery';

export default function A3({ banner }) {
  const isMobile = useMediaQuery(640);

  if (!banner) {
    return <></>;
  }

  return (
    <div className="w-full">
      <p className="text-[#BBBEBE] text-[13px] py-[9px] leading-[15px]">СУРТАЛЧИЛГАА</p>
      <img src={imagePath(banner?.mobileFileUrl)} alt={banner?.title} className="w-full object-cover" />
      <div className="flex w-full justify-end py-[10px] items-center">
        <span className="icon-fi-rs-megaphone text-[16px] mr-1" />
        <p className="text-[#BBBEBE] text-[15px] leading-[18px]">Caak Ads</p>
      </div>
      <p className="text-[#555555] text-[18px] leading-[30px]">
        Туйлын туяан гэрлийн доор буга болон хаски нохойн чарга хөлөглөн мартагдашгүй дурсамжаа бүтээх алхмаа яг одоо
        хийгээрэй.
      </p>
    </div>
  );
}
