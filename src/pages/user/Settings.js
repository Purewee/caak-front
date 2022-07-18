import { Avatar, Switch } from 'antd';
import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../../App';
import { FIcon } from '../../component/icon';
import { useQuery, gql } from '@apollo/client';
import { useAuth } from '../../context/AuthContext';

//prettier-ignore
const menu = [
    {
        title: 'Профайл',
        icon: 'icon-fi-rs-user-f',
    },
    {
        title: 'Мэдээний төрөл',
        icon: 'icon-fi-rs-filter-f',
    },
    {
        title: 'Нууцлал',
        icon: 'icon-fi-rs-shield',
    },
]

const ME = gql`
  query Me {
    me {
      id
      mobile
      email
      firstName
      lastName
    }
  }
`;

//prettier-ignore
export default function Settings() {
    const context = useContext(AppContext);
    const [ selected, setSelected ] = useState(0)
    const { data, loading } = useQuery(ME);
    const { isAuth } = useAuth();

    useEffect(() => {
        if(selected === 0){
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        }else if(selected === 1){
            window.scrollTo({
                top: 600,
                left: 0,
                behavior: 'smooth'
            })
        }else if(selected === 2){
            window.scrollTo({
                top: 850,
                left: 0,
                behavior: 'smooth'
            })
        }
    },[selected])

    useEffect(() => {
        context.setStore('default');
      }, []);
    return isAuth ? (
        <div className='flex justify-center w-full pb-[100px] px-[16px] md:px-0'>
            <div className='max-w-[1140px] w-full mt-[51px]'>
                <div className='flex flex-col md:flex-row gap-[20px] md:gap-[60px]'>
                    <div className="md:sticky top-[106px] w-[290px] h-[216px]">
                        <p className='text-[28px] font-medium leading-[24px]'>Тохиргоо</p>
                        <div className='w-full border h-[170px] border-[#EFEEEF] rounded-[4px] p-[10px] mt-[22px]'>
                            {
                                menu.map((data, index) => {
                                    return(
                                        <div onClick={() => setSelected(index)} key={index} className={`flex flex-row items-center h-[50px] px-[14px] cursor-pointer ${selected === index ? 'bg-caak-primary bg-opacity-10 text-caak-primary' : ' text-caak-black'}`}>
                                            <FIcon className={`${data.icon} ${selected === index ? '' : 'text-[#909090]'}`} />
                                            <p className='ml-[10px] text-[16px]'>{data.title}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='w-full md:w-[790px] mt-[46px]'>
                        <div className='border-[#EFEEEF] border rounded-[4px] w-full p-[30px]'>
                            <p className='text-[22px] font-bold leading-[25px] w-full border-b border-[#D4D8D8] pb-[14px]'>Профайл</p>
                            <div className='mt-[24px]'>
                                <div className='inline-flex text-[16px] font-medium leading-[19px]'>Нэр&nbsp;<p className='text-[14px] text-[#909090] font-normal'>/Нийтэд харагдана/</p></div>
                                <div className='relative'>
                                    <input className='max-w-[500px] w-full mt-[12px] h-[44px] rounded-[2px] text-[#555555] text-[15px] border border-[#D4D8D8] hover:border-[#3B4491] px-[20px]' />
                                </div>
                                <p className='text-[16px] font-medium leading-[19px] mt-[24px]'>Аватар</p>
                                <div className='flex flex-row items-center mt-[12px]'>
                                    <Avatar className='w-[60px] h-[60px]' />
                                    <div className='flex flex-row items-center justify-center h-[34px] w-[142px] rounded-[4px] border border-[#E8E8E8] ml-[14px] cursor-pointer'>
                                        <span className='icon-fi-rs-camera-f text-[#000000] text-[18px]' />
                                        <p className='text-[15px] leading-[18px] ml-[8px]'>Зураг солих</p>
                                    </div>
                                </div>
                                <p className='text-[16px] font-medium leading-[19px] mt-[24px]'>Тухай</p>
                                <div className='mt-[12px]'>
                                    <textarea className='max-w-[500px] w-full h-[124px] border border-[#D4D8D8] px-[20px] py-[13.5px]' style={{resize: 'none'}} />
                                </div>
                            </div>
                        </div>
                        <div className='border-[#EFEEEF] border rounded-[4px] w-full p-[30px] mt-[30px]'>
                            <p className='text-[22px] font-bold leading-[25px] w-full border-b border-[#D4D8D8] pb-[14px]'>Мэдээний төрөл</p>
                            <div className='mt-[24px] flex flex-wrap justify-between'>
                                <div className='w-[172px] h-[100px] rounded-[6px] relative cursor-pointer zoom'>
                                    <img src='https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/f7ovkpuwqmuhwnfpd4ki/post?fimg-ssr-default' className='w-full h-full object-cover rounded-[8px]'/>
                                    <p className='absolute top-0 h-full w-full flex items-center justify-center text-white text-[15px] font-medium bg-black bg-opacity-50 rounded-[6px]'>Post Malone</p>
                                </div>
                                <div className='w-[172px] h-[100px] rounded-[6px] relative cursor-pointer zoom'>
                                    <img src='https://cdn.unitycms.io/images/5D0o2tfgaEsA-LuVS2RN7K.png?op=ocroped&val=1200,1200,1000,1000,0,0&sum=rDoHXgs-buo' className='w-full h-full object-cover rounded-[8px]'/>
                                    <p className='absolute top-0 h-full w-full flex items-center justify-center text-white text-[15px] font-medium bg-black bg-opacity-50 rounded-[6px]'>Post Malone</p>
                                </div>
                                <div className='w-[172px] h-[100px] rounded-[6px] relative cursor-pointer zoom'>
                                    <img src='https://townsquare.media/site/812/files/2022/06/attachment-post-malone.jpg?w=1200&h=0&zc=1&s=0&a=t&q=89' className='w-full h-full object-cover rounded-[8px]'/>
                                    <p className='absolute top-0 h-full w-full flex items-center justify-center text-white text-[15px] font-medium bg-black bg-opacity-50 rounded-[6px]'>Post Malone</p>
                                </div>
                                <div className='w-[172px] h-[100px] rounded-[6px] border border-caak-primary bg-[#FFF9F5] flex flex-col items-center justify-center'>
                                    <FIcon className='icon-fi-rs-plus w-[34px] h-[34px] text-caak-primary rounded-[6px] border-[2px] border-dashed border-[#FF6600]' />
                                    <p className='mt-[12px] text-caak-primary text-[15px] font-medium leading-[18px]'>Төрөл нэмэх</p>
                                </div>
                            </div>
                        </div>
                        <div className='border-[#EFEEEF] border rounded-[4px] w-full p-[30px] mt-[30px]'>
                            <p className='text-[22px] font-bold leading-[25px] w-full border-b border-[#D4D8D8] pb-[14px]'>Нууцлал</p>
                            <p className='text-[16px] font-medium leading-[19px] mt-[24px]'>Нууц үг солих</p>
                            <div className='mt-[12px] h-[44px] w-[190px] border rounded-[2px]'></div>
                            <p className='text-[16px] font-medium leading-[19px] mt-[24px]'>Профайл нуух</p>
                            <Switch checked className='mt-[12px] w-[40px] h-[22px] bg-[#E4E4E5]' />
                            <p className='text-[16px] font-medium leading-[19px] mt-[24px]'>Хадгалсан мэдээнүүд нуух</p>
                            <Switch className='mt-[12px] w-[40px] h-[22px] bg-[#E4E4E5]' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    :
    null
}
