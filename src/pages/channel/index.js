import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

const menu = [
  {
    title: 'ШИНЭ',
  },
  {
    title: 'ШИЛДЭГ',
  },
];

export default function Channel() {
  const { id } = useParams();
  const [selected, setSelected] = useState(0);

  const context = useContext(AppContext);

  useEffect(() => {
    context.setStore('default');
  }, []);

  useEffect(() => {
    context.setShown(true);
  }, []);

  return (
    <div className="flex flex-col w-full items-center">
      <img
        className="w-[94px] h-[94px] rounded-full mt-[30px] md:mt-[51px]"
        alt=""
        src="https://cdna.artstation.com/p/assets/images/images/049/505/328/large/constantine-sekeris-konshu-03b.jpg?1652671392"
      />
      <p className="text-black text-[30px] font-condensed font-bold leading-[35px] mt-[16px]">Wired.com</p>
      <p className="mt-[12px] text-[#555555] text-[15px] leading-[18px] ">WIRED is where tomorrow is realized.</p>
      <div className="flex flex-row items-center mt-[18px] text-[15px]">
        <p className="text-[#555555] leading-[18px]">
          <span className="text-[#111111] font-medium">8</span> Пост
        </p>
        <p className="text-[#555555] leading-[18px]">
          <span className="text-[#111111] font-medium ml-[20px]">30</span> Дагагчид
        </p>
      </div>
      <div className="flex flex-row items-center mt-[20px]">
        <button className="w-[90px] h-[34px] bg-[#FF6600] rounded-[4px] text-white text-[15px] font-bold">Дагах</button>
        <div className="w-[42px] h-[34px] flex justify-center items-center border rounded-[4px] ml-[10px] cursor-pointer">
          <span className="icon-fi-rs-more-ver rotate-90 text-[18px]" />
        </div>
      </div>
      <div className=" mt-[40px] flex flex-row max-w-[1310px] items-center border-[#EFEEEF] border-b w-full justify-center gap-[50px] pb-[1px] pt-[17px]">
        {menu.map((data, index) => {
          return (
            <p
              key={index}
              onClick={() => setSelected(index)}
              className={`text-[18px] font-bold cursor-pointer text-center leading-[21px] ${
                selected === index ? 'border-b-[3px] border-[#FF6600] pb-[12px]' : 'border-none pb-[15px]'
              } ${selected === index ? 'text-[#111111]' : 'text-[#555555]'}`}
            >
              {data.title}
            </p>
          );
        })}
      </div>
    </div>
  );
}
