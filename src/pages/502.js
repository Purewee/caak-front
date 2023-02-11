import React from 'react';
import * as notfound from '../assets/json/502.json';
import Lottie from 'react-lottie';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '../component/navigation/useMediaQuery';

export default function ServerError() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery(640);
  return (
    <div className="flex flex-col w-full items-center pt-[60px] sm:pt-[100px] pb-[100px]">
      <Lottie
        options={{
          animationData: notfound,
          loop: true,
          autoplay: true,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
        height={100}
        width={isMobile ? 300 : 400}
      />
      <p className="text-caak-primary text-[80px] leading-[106px] condMedium mt-[20px]">502</p>
      <p className="text-caak-black text-[18px] sm:text-[32px] text-center leading-[21px] sm:leading-[38px] font-condensed font-bold mt-[15px] sm:mt-[28px] px-[16px] sm:px-0">
        Техникийн засвар үйлчилгээ хийж байна…
      </p>
      <p className="text-caak-darkGray text-[15px] text-center leading-[20px] mt-[15px] sm:mt-[28px] px-[16px] sm:px-0">
        Уучлаарай, техникийн засвар дуустал та түр хүлээнэ үү. Баярлалаа.
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
