import React, { useState } from 'react'

export default function SignInModal({setIsShown}) {
    const [isPasswordShown, setIsPasswordShown] = useState(false)
    const [step, setStep] = useState('default')
    return (
        <div className='popup_modal'>
            {
                step === 'default'
                ?
                <div className='popup_modal-content w-[380px] rounded-[6px] relative'>
                    <div className='px-[40px] relative w-full flex flex-col items-center'>
                        <p className='mt-[60px] text-[32px] text-[#111111] leading-[38px] font-bold'>Нэвтрэх</p>
                        <button onClick={() => setStep('social')} className='w-full h-[44px] bg-[#1876F3] rounded-[4px] text-[16px] font-medium text-white mt-[30px]'>
                            <span className='icon-fi-rs-facebook text-white' />
                            Facebook
                        </button>
                        <button className='w-full h-[44px] mt-[12px] border-[#D4D8D8] border-[1px] rounded-[4px] text-[16px] font-medium text-[#111111]'>
                            <span className='icon-fi-rs-google' />
                            Google
                        </button>
                        <div className='w-full flex flex-row items-center mt-[20px]'>
                            <span className='h-[1px] w-full bg-[#E0E0E1]' />
                            <p className='text-[#AFAFAF] text-[14px] leading-[16px] mx-[18px]'>Эсвэл</p>
                            <span className='h-[1px] w-full bg-[#E0E0E1]' />
                        </div>
                        <button onClick={() => setStep('mail')} className='bg-[#FF6600] w-full rounded-[4px] h-[44px] text-[16px] text-white mt-[20px] relative'>
                            <span className='icon-fi-rs-mail-f text-white' />
                            Имэйл хаяг/Утасны дугаар
                        </button>
                    </div>
                    {/* footer */}
                    <div className='border-t border-[#E0E0E1] mt-[40px] pb-[30px]'>
                        <div className='px-[40px] flex flex-col items-center'>
                            <div className="text-[#555555] text-[15px] mt-[21px]">
                                <span className='font-inter'>Шинэ хэрэглэгч бол </span>
                                <span onClick={() => setIsShown('signup')} className="text-caak-primary text-[15px] font-bold cursor-pointer">
                                    Бүртгүүлэх
                                </span>
                            </div>
                            {/* <p className="mt-[40px] w-full font-inter text-13px text-[#909090]">
                                Та энэ алхамын үргэлжлүүлснээр, сайтын{" "}
                                <a target="_blank" rel="noopener noreferrer">
                                    <span className="text-[#111111]">
                                    Үйлчилгээний нөхцөл
                                    </span>{" "}
                                </a>
                                болон{" "}
                                <a target="_blank" rel="noopener noreferrer">
                                    <span className="text-[#111111]">
                                    Нууцлалын бодлогыг
                                    </span>{" "}
                                </a>
                                зөвшөөрсөнд тооцно.
                            </p> */}
                        </div>
                    </div>
                    <span onClick={() => setIsShown(false)} className='absolute top-[14px] right-[14px] icon-fi-rs-close text-[#909090] text-[18px] cursor-pointer w-[24px] h-[24px] flex items-center justify-center'/>
                </div>
                :
                step === 'mail'
                ?
                <div className='popup_modal-content w-[380px] rounded-[6px] relative'>
                    <div className='px-[40px] relative w-full flex flex-col items-center'>
                        <p className='mt-[60px] text-[32px] text-[#111111] leading-[38px] font-bold'>Нэвтрэх</p>
                        <input className='w-full rounded-[4px] mt-[30px] bg-[#EFEEEF] h-[44px] px-[22px]'  placeholder='Имэйл хаяг/Утасны дугаар'/>
                        <div className='w-full relative mt-[12px]'>
                            <input type={isPasswordShown ? 'text' : 'password'} className='w-full rounded-[4px] bg-[#EFEEEF] h-[44px] pl-[22px] pr-[40px]'  placeholder='Нууц үг'/>
                            <span onClick={() => setIsPasswordShown(!isPasswordShown)} className={`${isPasswordShown ? 'icon-fi-rs-blind' : 'icon-fi-rs-eye'} absolute right-[12px] text-[#BBBEBE] cursor-pointer text-[20px] w-[24px] h-[24px] top-[10px] flex items-center justify-center leading-[24px]`} />
                        </div>
                        <div className='w-full justify-end flex '>
                            <p className='text-[#555555] text-[14px] leading-[16px] mt-[12px] cursor-pointer'>Нууц үг мартсан?</p>
                        </div>
                        <button className='bg-[#FF6600] w-full rounded-[4px] h-[44px] text-[16px] text-white mt-[22px]'>
                            Нэвтрэх
                        </button>
                    </div>
                    {/* footer */}
                    <div className='border-t border-[#E0E0E1] mt-[40px] pb-[30px]'>
                        <div className='px-[40px] flex flex-col items-center'>
                            <div className="text-[#555555] text-[15px] mt-[21px]">
                                <span className='font-inter'>Шинэ хэрэглэгч бол </span>
                                <span onClick={() => setIsShown('signup')} className="text-caak-primary text-[15px] font-bold cursor-pointer">
                                    Бүртгүүлэх
                                </span>
                            </div>
                            {/* <p className="mt-[40px] w-full font-inter text-13px text-[#909090]">
                                Та энэ алхамын үргэлжлүүлснээр, сайтын{" "}
                                <a target="_blank" rel="noopener noreferrer">
                                    <span className="text-[#111111]">
                                    Үйлчилгээний нөхцөл
                                    </span>{" "}
                                </a>
                                болон{" "}
                                <a target="_blank" rel="noopener noreferrer">
                                    <span className="text-[#111111]">
                                    Нууцлалын бодлогыг
                                    </span>{" "}
                                </a>
                                зөвшөөрсөнд тооцно.
                            </p> */}
                        </div>
                    </div>
                    <span onClick={() => setIsShown(false)} className='absolute top-[14px] right-[14px] icon-fi-rs-close text-[#909090] text-[18px] cursor-pointer w-[24px] h-[24px] flex items-center justify-center'/>
                </div>
                :
                step === 'social'
                ?
                <div className='popup_modal-content w-[440px] rounded-[6px] flex flex-col items-center px-[40px] pt-[66px] pb-[40px]'>
                    <div className='relative w-[112px] h-[112px]'>
                        <img className='w-full h-full rounded-full object-cover' src='http://res.heraldm.com/content/image/2019/12/05/20191205000632_0.jpg' />
                        <span style={{boxShadow: '0px 1px 4px #00000029'}} className='absolute bottom-0 right-0 icon-fi-rs-camera-f text-black text-[18px] rounded-full bg-white cursor-pointer w-[32px] h-[32px] flex items-center justify-center'/>
                    </div>
                    <p className='mt-[43px] text-[16px] leading-[19px]'>yourname@gmail.com</p>
                    <p className='mt-[20px] text-[32px] font-condensed font-bold leading-[38px]'>Таныг хэн гэж дуудах вэ?</p>
                    <div className='w-full relative mt-[20px]'>
                        <input defaultValue={'James Bold'} className='w-full text-center rounded-[4px] bg-[#EFEEEF] h-[64px]'/>
                        <span className='absolute top-[22px] right-0 icon-fi-rs-editor-f text-[#909090] text-[17px] rounded-fullcursor-pointer w-[20px] h-[20px] flex items-center justify-center'/>
                    </div>
                    <button className='w-full bg-[#FF6600] rounded-[4px] h-[44px] font-medium text-[16px] text-white mt-[40px]'>
                        Үргэлжлүүлэх
                    </button>
                </div>
                :
                null
            }
        </div>
    )
}
