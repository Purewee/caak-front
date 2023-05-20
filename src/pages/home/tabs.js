import React from 'react';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '../../component/navigation/useMediaQuery';
import { useAuth } from '../../context/AuthContext';

export default function HomeTabs({ selected }) {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(640);
  const categories = isAuth
    ? [
        { label: 'Шинэ', key: 'recent' },
        { label: 'Трэнд', key: 'trend' },
        { label: 'Танд', key: 'user' },
        { label: 'Цаг үе', key: 'current' },
        { label: 'Видео', key: 'video' },
        // { label: 'Блог', key: 'blog' },
        // { label: 'Чөлөөт цаг', key: 'interesting' },
      ]
    : [
        { label: 'Шинэ', key: 'recent' },
        { label: 'Трэнд', key: 'trend' },
        { label: 'Цаг үе', key: 'current' },
        { label: 'Видео', key: 'video' },
        // { label: 'Блог', key: 'blog' },
        // { label: 'Чөлөөт цаг', key: 'interesting' },
      ];

  return (
    // <Wrapper
    //   tabBarGutter={isMobile ? 16 : 30}
    //   onChange={(e) => navigate(`/?type=${e}`)}
    //   className="w-full font-condensed pl-[16px]"
    //   centered
    //   activeKey={selected}
    //   items={categories.map((x) => ({
    //     key: x.key,
    //     label: (
    //       <span className="text-[16px] sm:text-[22px] font-bold leading-[16px] sm:leading-[22px] uppercase">
    //         {x.label}
    //       </span>
    //     ),
    //   }))}
    // />
    <div
      className={`flex items-center overflow-x-auto scrollBar font-condensed pt-2 px-4 ${
        isMobile ? 'gap-x-4' : 'gap-x-10'
      }`}
    >
      {categories.map((x) => (
        <span
          onClick={() => navigate(`/?type=${x.key}`)}
          key={x.key}
          className={`text-[21px] cursor-pointer whitespace-nowrap sm:text-[20px] font-bold leading-[24px] uppercase ${
            selected === x.key ? 'text-[#111111] border-b-[3px] border-[#FF6600] pb-[10px]' : 'text-[#555555] pb-[13px]'
          }`}
        >
          {x.label}
        </span>
      ))}
      <a
        href="https://www.caak.mn/radio/"
        target="_blank"
        rel="noreferrer"
        className={`text-[21px] cursor-pointer whitespace-nowrap sm:text-[20px] font-bold leading-[24px] uppercase text-[#555555] pb-[13px]`}
      >
        Радио
      </a>
    </div>
  );
}
