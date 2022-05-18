import React from 'react'
import logoIcon from "../../images/New-Logo.svg";

export default function SignUpModal({setIsShown}) {
  return (
    <div className='popup_modal'>
        <div className='popup_modal-content w-[720px] h-[620px] rounded-[6px] relative flex flex-row'>
            <div className='w-[290px] h-full bg-[#F7F7F7] rounded-l rounded-[6px] flex flex-col items-center justify-center'>
                <img
                    src={logoIcon}
                    className="cursor-pointer object-contain"
                    alt="Caak Logo"
                    width={157}
                    height={47}
                />
                <p className='mt-[22px] text-[18px] font-medium text-[#111111]'>Мэдээ мэдээллийн төв цэг!</p>
                <div className='flex flex-row mt-[58px]'>
                    <span className='icon-fi-rs-filter-f text-white w-[30px] h-[30px] flex items-center justify-center bg-[#FF6600] rounded-full'/>
                    <p className='text-[#111111] text-[15px] leading-[20px] w-[152px] ml-[14px]'>Мэдээллийг шүүн өөртөө тааруулах</p>
                </div>
                <div className='flex flex-row mt-[15px]'>
                    <span className='icon-fi-rs-network text-white w-[30px] h-[30px] flex items-center justify-center bg-[#FF6600] rounded-full'/>
                    <p className='text-[#111111] text-[15px] leading-[20px] w-[152px] ml-[14px]'>Шилдэг мэдээний сувгийг дагах</p>
                </div>
                <div className='flex flex-row mt-[15px]'>
                    <span className='icon-fi-rs-list-f text-white w-[30px] h-[30px] flex items-center justify-center bg-[#FF6600] rounded-full'/>
                    <p className='text-[#111111] text-[15px] leading-[20px] w-[152px] ml-[14px]'>Таалагдсан мэдээг хадгалан жор үүсгэх</p>
                </div>
            </div>
            <div className='w-[430px] relative'>
                <div className='px-[40px] relative w-full flex flex-col items-center'>
                    <p className='mt-[70px] text-[32px] text-[#111111] leading-[38px] font-bold'>Бүртгэл үүсгэн мэдээллийг өөрийн болгоорой!</p>
                    <button className='w-full h-[44px] bg-[#1876F3] rounded-[4px] text-[16px] font-medium text-white mt-[30px]'>
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
                    <button className='bg-[#FF6600] w-full rounded-[4px] h-[44px] text-[16px] text-white mt-[20px] relative'>
                        <span className='icon-fi-rs-mail-f text-white' />
                        Имэйл хаяг/Утасны дугаар
                    </button>
                </div>
                {/* footer */}
                <div className='border-t border-[#E0E0E1] mt-[30px]'>
                    <div className='px-[40px] flex flex-col items-center'>
                        <div className="text-[#555555] text-[15px] mt-[21px] leading-[20px]">
                            <span className='font-inter'>Бүртгэлтэй хэрэглэгч бол </span>
                            <span onClick={() => setIsShown('signin')} className="text-caak-primary text-[15px] font-bold cursor-pointer">
                                Нэвтрэх
                            </span>
                        </div>
                        <p className="mt-[40px] w-full font-inter text-13px text-[#909090]">
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
                        </p>
                    </div>
                </div>
                <span onClick={() => setIsShown(false)} className='absolute top-[14px] right-[14px] icon-fi-rs-close text-[#909090] text-[18px] cursor-pointer w-[24px] h-[24px] flex items-center justify-center'/>
            </div>
        </div>
    </div>
  )
}
