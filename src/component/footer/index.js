import React, { useEffect, useState, useContext } from 'react';
import Logo from '../../images/New-Logo-Light.svg';
import { AppContext } from '../../App';
import { Link, useNavigate } from 'react-router-dom';

export default function Footer() {
  // prettier-ignore
  const [isFooter, setIsFooter] = useState(true)
  const context = useContext(AppContext);
  const navigate = useNavigate();
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
    <div className='w-full h-[429px] bg-[#111111] flex flex-col items-center justify-between'>
        <div className='flex flex-row w-full items-start max-w-[1310px]'>
            <img src={Logo} className='mr-[193px] mt-[41px]'/>
            <div className='w-full flex flex-row justify-between mt-[60px]'>
                <div>
                    <p className='text-white text-[14px] font-bold leading-[16px]'>CAAK КОНТЕНТ</p>
                    <div className='h-[120px] flex flex-col justify-between text-[15px] text-[#838383] mt-[20px]'>
                        <a className='h-[20px]' href='https://www.caaknews.mn/' target={'_blank'}>
                            <p>Саак мэдээ</p>
                        </a>
                        <a className='h-[20px]' href='https://www.youtube.com/c/CaakVideo' target={'_blank'}>
                            <p>Видео</p>
                        </a>
                        <a className='h-[20px]' href='https://soundcloud.com/caak-podcast' target={'_blank'}>
                            <p>Подкаст</p>
                        </a>
                        <a className='h-[20px]' href='https://www.caak.mn/radio/' target={'_blank'}>
                            <p>Радио</p>
                        </a>
                    </div>
                </div>
                <div>
                    <p className='text-white text-[14px] font-bold leading-[16px]'>ТУСЛАМЖ</p>
                    <div className='h-[86px] flex flex-col justify-between text-[15px] text-[#838383] mt-[20px]'>
                        <p className='cursor-pointer' onClick={() => navigate("/help", { state: 0 })}>Бидний тухай</p>
                        <p className='cursor-pointer' onClick={() => navigate("/help", { state: 1 })}>Контент нийлүүлэх</p>
                        <p className='cursor-pointer' onClick={() => navigate("/help", { state: 2 })}>Холбоо барих</p>
                    </div>
                </div>
                <div>
                    <p className='text-white text-[14px] font-bold leading-[16px]'>БУСАД</p>
                    <div className='h-[52px] flex flex-col justify-between text-[15px] text-[#838383] mt-[20px]'>
                        <p className='cursor-pointer' onClick={() => navigate("/help", { state: 4 })}>Үйлчилгээний нөхцөл</p>
                        <p className='cursor-pointer' onClick={() => navigate("/help", {  state: 3 })}>Нууцлалын бодлого</p>
                    </div> 
                </div>
                <div>
                    <p className='text-white text-[14px] font-bold leading-[16px]'>БИДНИЙГ ДАГАХ</p>
                    <div className='h-[120px] flex flex-row w-[136px] justify-between text-[15px] text-white mt-[20px]'>
                        <a className='h-[20px]' href='https://www.facebook.com/caakweb' target={'_blank'}>
                            <span className='icon-fi-rs-fb text-[20px]' />
                        </a>
                        <a className='h-[20px]' href='https://www.instagram.com/caak.mn' target={'_blank'}>
                            <span className='icon-fi-rs-ig text-[20px]' />
                        </a>
                        <a className='h-[20px]' href='https://twitter.com/caaktwt' target={'_blank'}>
                            <span className='icon-fi-rs-tw text-[20px]' />
                        </a>
                        <a className='h-[20px]' href='https://www.youtube.com/c/CaakVideo' target={'_blank'}>
                            <span className='icon-fi-rs-yt text-[20px]' />
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div className='border-t flex justify-center w-full py-[40px]'>
            <p className='text-[#838383] text-[15px]'>©2022 “Саак Холдинг” ХХК</p>
        </div>
    </div>
  )
   :
   null
}
