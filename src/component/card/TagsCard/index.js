import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useClickOutSide } from '../../../utility/Util';
import DropDown from '../../navigation/DropDown';

export default function TagsCard({ middle, data }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });
  return (
    <div className={`${middle ? 'w-[640px] h-[528px]' : 'w-[290px] h-[434px]'}`}>
      <img
        alt=""
        className={`${middle ? 'w-full h-[370px]' : 'w-full h-[217.5px]'} object-cover`}
        src={`http://graph.caak.mn${data.image}`}
      />
      <div className="flex flex-row mt-[10px]">
        {data.categories.map((x) => (
          <p key={x.id} className="text-[#FF6600] leading-[15px] text-[13px] uppercase">
            #{x.name}
          </p>
        ))}
        <p className="text-[14px] font-roboto leading-[16px] text-[#555555] ml-[10px]">5 мин</p>
      </div>
      <p
        className={`${
          middle ? 'truncate-2 text-[34px] ' : 'truncate-4 text-[22px]'
        } text-[#111111] font-bold font-roboto leading-[40px] mt-[10px]`}
      >
        {data.title}
      </p>
      <div className={`flex ${middle ? 'flex-row justify-between' : 'flex-col'} mt-[23px]`}>
        <div className={'flex flex-row'}>
          <div className="flex flex-row items-center">
            <img
              alt=""
              src={
                'https://scontent.fuln2-2.fna.fbcdn.net/v/t1.18169-9/16388375_1258991760846780_6001512035944932012_n.png?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_ohc=9pNL5ldMQ0kAX_yAKha&_nc_ht=scontent.fuln2-2.fna&oh=00_AT_3pSN5nwhS6wQvQERY95zTkiYmS9VjFARKCE684yYu1w&oe=6298F67B'
              }
              className="w-[22px] h-[22px] rounded-full"
            />
            <p className="text-[#555555] leading-[18px] text-[15px] ml-[6px]">
              gogo.mn •
              <Link to={'/profile/2'}>
                <span> {data.author.name}</span>
              </Link>
            </p>
          </div>
        </div>
        <div className={`flex flex-row items-center justify-end ${!middle && 'mt-[16px]'}`}>
          <div
            ref={menuRef}
            onClick={toggleMenu}
            className={'flex flex-row items-center cursor-pointer w-[13.6px] h-[16.6px]'}
          >
            <span className={'icon-fi-rs-share text-[#909090] transition duration-150 text-[16px]'} />
            <DropDown
              arrow={'centerBottom'}
              className="absolute right-0 bottom-12"
              open={isMenuOpen}
              onToggle={toggleMenu}
              content={
                <div className={'flex flex-row items-center'}>
                  <div className={'flex flex-col  justify-start  z-1'}>
                    <div className="hover:bg-caak-liquidnitrogen w-full px-c6">
                      <div className={'flex items-center  rounded-full cursor-pointer h-[36px]'}>
                        <div
                          className={
                            'flex justify-center items-center p-[5px] w-[22px] h-[22px] rounded-full bg-caak-red'
                          }
                        >
                          <span className={'icon-fi-rs-link text-white text-[11px]'} />
                        </div>
                        <p className="text-14px text-caak-extraBlack ml-px-12">Линк хуулах</p>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
          </div>
          <div className={'flex flex-row items-center cursor-pointer w-[14px] h-[16.8px] ml-[12px]'}>
            <span className={'icon-fi-rs-bookmark text-[#909090] transition duration-150 text-[16px]'} />
          </div>
          <div className={'flex flex-row items-center cursor-pointer w-[18px] h-[16px] ml-[14px]'}>
            <span className={'icon-fi-rs-heart text-[#909090] transition duration-150 text-[16px]'} />
          </div>
          <div className={'flex flex-row items-center cursor-pointer w-[20px] h-[20px] ml-[10px]'}>
            <span className={'icon-fi-rs-more-ver text-[#909090] transition duration-150 text-[16px]'} />
          </div>
        </div>
      </div>
    </div>
  );
}
