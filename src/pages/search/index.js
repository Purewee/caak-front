import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../App';
import { useLocation } from 'react-router-dom';

export default function Search() {
  //prettier-ignore
  const context = useContext(AppContext);

  const location = useLocation();

  useEffect(() => {
    context.setStore('default');
    // eslint-disable-next-line
  }, []);
  //prettier-ignore
  return (
    <div>
        <div className='w-full h-[208px] bg-[#F5F5F5] flex justify-center'>
            <div className='w-full max-w-[980px]'>
                <p className='text-[#555555] text-[16px] leading-[19px] mt-[40px]'>Хайлтын илэрц: 550 мэдээ</p>
                <div className='relative w-full mt-[20px]'>
                    <input placeholder={location.state === null && 'Хайлт хийх...'} value={location.state === null ? '' : location.state.value} className={`h-[55px] bg-[#F5F5F5] text-[38px] text-[#111111] font-condensed w-full px-[44px]`} />
                    <span className='icon-fi-rs-search absolute left-0 top-[8px] text-[22px] w-[28px] h-[28px] flex justify-center items-center text-[#555555]' />
                    <span className='icon-fi-rs-close cursor-pointer absolute right-0 top-[8px] text-[21px] w-[28px] h-[28px] flex justify-center items-center text-[#555555]' />
                </div>
            </div>
        </div>
        <div className='mt-[70px]'></div>
    </div>
  )
}
