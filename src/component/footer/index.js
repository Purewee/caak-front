import React, { useEffect, useState, useContext } from 'react';
import Logo from '../../images/New-Logo-Light.svg';
import { AppContext } from '../../App';

export default function Footer() {
  // prettier-ignore
  const [isFooter, setIsFooter] = useState(true)
  const context = useContext(AppContext);
  // prettier-ignore
  useEffect(() => {
    if (context.shown === true) {
        setIsFooter(true);
    } else if (context.shown === false) {
        setIsFooter(false);
    } else if (context.shown === null) {
        setIsFooter(null);
    }
  }, [context.shown]);
  // prettier-ignore
  return isFooter ? (
    <div className='w-full h-[429px] bg-[#111111] flex justify-center'>
        <div className='flex flex-row w-full items-start max-w-[1310px]'>
            <img src={Logo} className='mr-[193px] mt-[41px]'/>
            <div className='w-full flex flex-row justify-between mt-[60px]'>
                <div>
                    <p className='text-white text-[14px] font-bold leading-[16px]'>CAAK КОНТЕНТ</p>
                    <div className='h-[120px] flex flex-col justify-between text-[15px] text-[#838383] mt-[20px]'>
                        <p>Саак мэдээ</p>
                        <p>Видео</p>
                        <p>Подкаст</p>
                        <p>Радио</p>
                    </div>
                </div>
                <div>
                    <p className='text-white text-[14px] font-bold leading-[16px]'>ТУСЛАМЖ</p>
                    <div className='h-[154px] flex flex-col justify-between text-[15px] text-[#838383] mt-[20px]'>
                        <p>Бидний тухай</p>
                        <p>Контент нийлүүлэх</p>
                        <p>Холбоо барих</p>
                        <p>Ажлын байр</p>
                        <p>Сурталчилгаа байршуулах</p>
                    </div>
                </div>
                <div>
                    <p className='text-white text-[14px] font-bold leading-[16px]'>БУСАД</p>
                    <div className='h-[52px] flex flex-col justify-between text-[15px] text-[#838383] mt-[20px]'>
                        <p>Үйлчилгээний нөхцөл</p>
                        <p>Нууцлалын бодлого</p>
                    </div> 
                </div>
                <div>
                    <p className='text-white text-[14px] font-bold leading-[16px]'>БИДНИЙГ ДАГАХ</p>
                    <div className='h-[120px] flex flex-row w-[136px] justify-between text-[15px] text-white mt-[20px]'>
                        <span className='icon-fi-rs-fb text-[20px]' />
                        <span className='icon-fi-rs-ig text-[20px]' />
                        <span className='icon-fi-rs-tw text-[20px]' />
                        <span className='icon-fi-rs-yt text-[20px]' />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
   :
   null
}
