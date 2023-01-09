import React, { useEffect, useState, useContext } from 'react';
import Logo from '../../images/New-Logo-Light.svg';
import { AppContext } from '../../App';
import { Link, useNavigate } from 'react-router-dom';
import useMediaQuery from '../navigation/useMediaQuery';
import { Collapse } from 'antd';

export default function Footer() {
  // prettier-ignore
  const [isFooter, setIsFooter] = useState(true)
  const context = useContext(AppContext);
  const navigate = useNavigate();

  const isLaptop = useMediaQuery('(min-width: 1001px) and (max-width: 1920px)');
  const isTablet = useMediaQuery('(min-width: 401px) and (max-width: 1000px)');
  const isMobile = useMediaQuery('screen and (max-width: 400)');
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
    <div className='w-full md:h-[423px] bg-[#111111] flex flex-col sm:items-center justify-between'>
        <div className="sm:hidden">
            <Collapse className="w-full custom bg-caak-black" bordered={false} accordion={true}>
                <Collapse.Panel
                    style={{borderBottomColor: '#1f1e1e'}}
                    header={
                        <div className="flex flex-row items-center justify-between py-[10px] px-[4px]">
                            <p className='text-white text-[14px] font-bold leading-[16px] w-full text-center'>CAAK КОНТЕНТ</p>
                            <span className="icon-fi-rs-down-chevron text-caak-primary" />
                        </div>
                    }
                    showArrow={false}
                >
                    <div className='flex flex-col gap-[10px] px-[16px] justify-between items-center text-[15px] text-[#838383] pb-[30px]'>
                        {/* <a className='h-[20px] hover:text-[#FF6600]' href='https://www.caaknews.mn/' target={'_blank'}>
                            <p>Саак мэдээ</p>
                        </a> */}
                        <a className='h-[20px] hover:text-[#FF6600]' href='https://www.youtube.com/c/CaakVideo' target={'_blank'}>
                            <p>Видео</p>
                        </a>
                        <a className='h-[20px] hover:text-[#FF6600]' href='https://soundcloud.com/caak-podcast' target={'_blank'}>
                            <p>Подкаст</p>
                        </a>
                        <a className='h-[20px] hover:text-[#FF6600]' href='https://www.caak.mn/radio/' target={'_blank'}>
                            <p>Радио</p>
                        </a>
                    </div>
                </Collapse.Panel>
                <Collapse.Panel
                    style={{borderBottomColor: '#1f1e1e'}}
                    header={
                        <div className="flex flex-row items-center justify-between px-[4px] py-[10px]">
                            <p className='text-white text-[14px] font-bold leading-[16px] w-full text-center'>ТУСЛАМЖ</p>
                            <span className="icon-fi-rs-down-chevron text-caak-primary" />
                        </div>
                    }
                    showArrow={false}
                >
                    <div className='flex flex-col gap-[10px] justify-between items-center px-[16px] text-[15px] text-[#838383] pb-[30px]'>
                        <p className='cursor-pointer hover:text-[#FF6600]' onClick={() => navigate("/help/2")}>Холбоо барих</p>
                        <p className='cursor-pointer hover:text-[#FF6600]' onClick={() => navigate("/help/1")}>Сурталчилгаа</p>
                        <p className='cursor-pointer hover:text-[#FF6600]' onClick={() => navigate("/help/2")}>Контент нийлүүлэх</p>
                    </div>
                </Collapse.Panel>
                <Collapse.Panel
                    style={{borderBottomColor: '#1f1e1e'}}
                    header={
                        <div className="flex flex-row items-center justify-between px-[4px] py-[10px]">
                            <p className='text-white text-[14px] font-bold leading-[16px] w-full text-center'>БУСАД</p>
                            <span className="icon-fi-rs-down-chevron text-caak-primary" />
                        </div>
                    }
                    showArrow={false}
                >
                    <div className='flex flex-col gap-[10px] px-[16px] justify-between items-center text-[15px] text-[#838383] pb-[30px]'>
                        <p className='cursor-pointer hover:text-[#FF6600]' onClick={() => navigate("/help/0")}>Бидний тухай</p>
                        <p className='cursor-pointer hover:text-[#FF6600]' onClick={() => navigate("/help/4")}>Үйлчилгээний нөхцөл</p>
                        <p className='cursor-pointer hover:text-[#FF6600]' onClick={() => navigate("/help/3")}>Нууцлалын бодлого</p>
                    </div>
                </Collapse.Panel>
                <div className='flex flex-row gap-[15px] justify-center text-[15px] text-white py-[20px]'>
                    <a className='h-[20px] hover:text-[#FF6600]' href='https://www.facebook.com/caakweb' target={'_blank'}>
                        <span className='icon-fi-rs-fb text-[20px]' />
                    </a>
                    <a className='h-[20px] hover:text-[#FF6600]' href='https://www.instagram.com/caak.mn' target={'_blank'}>
                        <span className='icon-fi-rs-ig text-[20px]' />
                    </a>
                    <a className='h-[20px] hover:text-[#FF6600]' href='https://twitter.com/caaktwt' target={'_blank'}>
                        <span className='icon-fi-rs-tw text-[20px]' />
                    </a>
                    <a className='h-[20px] hover:text-[#FF6600]' href='https://www.youtube.com/c/CaakVideo' target={'_blank'}>
                        <span className='icon-fi-rs-yt text-[20px]' />
                    </a>
                </div>
            </Collapse>
        </div>
        <div className='hidden sm:flex flex-col md:flex-row w-full items-start max-w-[1310px] px-[16px] md:px-0'>
            <img src={Logo} className='mr-[193px] mt-[41px] hidden md:block'/>
            <div className='w-full flex flex-col md:flex-row gap-[16px] justify-between mt-[30px] md:mt-[60px]'>
                <div>
                    <p className='text-white text-[14px] font-bold leading-[16px]'>CAAK КОНТЕНТ</p>
                    <div className='h-[86px] flex flex-col justify-between text-[15px] text-[#838383] mt-[20px]'>
                        {/* <a className='h-[20px] hover:text-[#FF6600]' href='https://www.caaknews.mn/' target={'_blank'}>
                            <p>Саак мэдээ</p>
                        </a> */}
                        <a className='h-[20px] hover:text-[#FF6600]' href='https://www.youtube.com/c/CaakVideo' target={'_blank'}>
                            <p>Видео</p>
                        </a>
                        <a className='h-[20px] hover:text-[#FF6600]' href='https://soundcloud.com/caak-podcast' target={'_blank'}>
                            <p>Подкаст</p>
                        </a>
                        <a className='h-[20px] hover:text-[#FF6600]' href='https://www.caak.mn/radio/' target={'_blank'}>
                            <p>Радио</p>
                        </a>
                    </div>
                </div>
                <div>
                    <p className='text-white text-[14px] font-bold leading-[16px]'>ТУСЛАМЖ</p>
                    <div className='h-[86px] flex flex-col justify-between text-[15px] text-[#838383] mt-[20px]'>
                        <p className='cursor-pointer hover:text-[#FF6600]' onClick={() => navigate("/help/2")}>Холбоо барих</p>
                        <p className='cursor-pointer hover:text-[#FF6600]' onClick={() => navigate("/help/1")}>Сурталчилгаа</p>
                        <p className='cursor-pointer hover:text-[#FF6600]' onClick={() => navigate("/help/2")}>Контент нийлүүлэх</p>
                    </div>
                </div>
                <div>
                    <p className='text-white text-[14px] font-bold leading-[16px]'>БУСАД</p>
                    <div className='h-[86px] flex flex-col justify-between text-[15px] text-[#838383] mt-[20px]'>
                        <p className='cursor-pointer hover:text-[#FF6600]' onClick={() => navigate("/help/0")}>Бидний тухай</p>
                        <p className='cursor-pointer hover:text-[#FF6600]' onClick={() => navigate("/help/4")}>Үйлчилгээний нөхцөл</p>
                        <p className='cursor-pointer hover:text-[#FF6600]' onClick={() => navigate("/help/3")}>Нууцлалын бодлого</p>
                    </div> 
                </div>
                <div className='pb-[30px]'>
                    <p className='text-white text-[14px] font-bold leading-[16px]'>БИДНИЙГ ДАГАХ</p>
                    <div className='flex flex-row w-[136px] justify-between text-[15px] text-white mt-[20px]'>
                        <a className='h-[20px] hover:text-[#FF6600]' href='https://www.facebook.com/caakweb' target={'_blank'}>
                            <span className='icon-fi-rs-fb text-[20px]' />
                        </a>
                        <a className='h-[20px] hover:text-[#FF6600]' href='https://www.instagram.com/caak.mn' target={'_blank'}>
                            <span className='icon-fi-rs-ig text-[20px]' />
                        </a>
                        <a className='h-[20px] hover:text-[#FF6600]' href='https://twitter.com/caaktwt' target={'_blank'}>
                            <span className='icon-fi-rs-tw text-[20px]' />
                        </a>
                        <a className='h-[20px] hover:text-[#FF6600]' href='https://www.youtube.com/c/CaakVideo' target={'_blank'}>
                            <span className='icon-fi-rs-yt text-[20px]' />
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div className='border-t border-[#3B3B3B] flex justify-center w-full py-[20px] md:py-[40px]'>
            <p className='text-[#838383] text-[15px]'>©2022 “Саак Холдинг” ХХК</p>
        </div>
    </div>
  )
   :
   null
}
