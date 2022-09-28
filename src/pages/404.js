import React from 'react';
import * as notfound from '../assets/json/404.json';
import Lottie from 'react-lottie';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '../component/navigation/useMediaQuery';

export default function NotFound() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('screen and (max-width: 640px)');
  return (
    <div className="flex flex-col w-full items-center pb-[100px]">
      <Lottie
        options={{
          animationData: notfound,
          loop: true,
          autoplay: true,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
        height={isMobile ? 300 : 400}
        width={isMobile ? 300 : 400}
      />
      <p className="text-caak-black text-[32px] leading-[38px] font-condensed font-bold mt-[5px]">Хуудас олдсонгүй</p>
      <p className="text-caak-darkGray text-[15px] text-center leading-[20px] mt-[28px] px-[16px] sm:px-0">
        Тухайн хуудасны линк устгагдсан эсвэл солигдсон байж болзошгүй.
      </p>
      <Button
        onClick={() => navigate('/')}
        className="h-[54px] w-[240px] text-caak-black text-[16px] font-medium border border-[#D4D8D8] rounded-[4px] mt-[30px]"
      >
        Нүүр хуудас руу буцах
      </Button>
    </div>
  );
}
