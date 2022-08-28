import React, { useEffect, useState } from 'react';

const tags = [
  {
    name: 'Tagshvvde',
    news: 250,
  },
  {
    name: 'tagbnaa',
    news: 250,
  },
  {
    name: 'hobby',
    news: 250,
  },
  {
    name: 'cars',
    news: 250,
  },
  {
    name: 'news',
    news: 250,
  },
  {
    name: 'Tagshvvde',
    news: 250,
  },
  {
    name: 'tagbnaa',
    news: 250,
  },
  {
    name: 'hobby',
    news: 250,
  },
  {
    name: 'cars',
    news: 250,
  },
  {
    name: 'news',
    news: 250,
  },
];

const colors = [
  'rgb(170, 109, 228, 0.06)',
  'rgb(255, 102, 0, 0.06)',
  'rgb(59, 68, 145, 0.06)',
  'rgb(37, 124, 238, 0.06)',
  'rgb(55, 175, 55, 0.06)',
];

const colors1 = ['#AA6DE4', '#FF6600', '#3B4491', '#257CEE', '#37AF37'];

export default function AllTags() {
  const random = Math.floor(Math.random() * 5);
  return (
    <div className="flex flex-col items-center">
      <p className="text-black text-[38px] font-bold font-condensed flex flex-row items-center mt-[71px] mb-[40px]">
        <span className="text-caak-primary text-[24px] mr-[12px] icon-fi-rs-hashtag" />
        ТАГУУД
      </p>
      <div className="bg-[#F5F5F5] w-full pt-[50px] flex justify-center pb-[62px]">
        <div className="max-w-[1310px] flex flex-wrap justify-center gap-[18px]">
          {tags.map((data, index) => {
            const random = Math.floor(Math.random() * 5);
            const color = colors[random];
            const color1 = colors1[random];
            return (
              <div
                key={index}
                className="w-[314px] h-[78px] bg-white rounded-[4px] border border-[#EFEEEF] flex flex-row items-center pl-[16px]"
              >
                <div
                  className="w-[46px] h-[46px] rounded-[4px] flex justify-center items-center"
                  style={{ backgroundColor: color }}
                >
                  <p style={{ color: color1 }} className="font-roboto text-white font-medium opacity-100 text-[18px]">
                    #
                  </p>
                </div>
                <div className="ml-[14px]">
                  <p className="text-[#111111] text-[17px] leading-[20px]">#{data.name}</p>
                  <p className="text-[#707070] text-[13px] leading-[15px] mt-[4px]">{data.news} Мэдээтэй</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
