import React, { useState } from 'react';
import logoIcon from '../../images/New-Logo.svg';
import OtpInput from 'react-otp-input';
import { FIcon } from '../icon';
import { useNavigate } from 'react-router-dom';

export default function SignUpModal({ setIsShown }) {
  const [step, setStep] = useState('default');
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleChange = (code) => setCode(code);
  return (
    <div className="popup_modal">
      {step === 'default' ? (
        <div className="popup_modal-content w-full md:w-[720px] h-[620px] rounded-[6px] relative flex flex-col sm:flex-row">
          <div className="w-[290px] hidden h-full bg-[#F7F7F7] rounded-l rounded-[6px] sm:flex flex-col items-center justify-center">
            <img src={logoIcon} className="cursor-pointer object-contain" alt="Caak Logo" width={157} height={47} />
            <p className="mt-[22px] text-[18px] font-medium text-[#111111]">Мэдээ мэдээллийн төв цэг!</p>
            <div className="flex flex-row mt-[58px]">
              <span className="icon-fi-rs-filter-f text-white text-[15px] w-[30px] h-[30px] flex items-center justify-center bg-[#FF6600] rounded-full" />
              <p className="text-[#111111] text-[15px] leading-[20px] w-[152px] ml-[14px]">
                Мэдээллийг шүүн өөртөө тааруулах
              </p>
            </div>
            <div className="flex flex-row mt-[15px]">
              <span className="icon-fi-rs-network text-white text-[15px] w-[30px] h-[30px] flex items-center justify-center bg-[#FF6600] rounded-full" />
              <p className="text-[#111111] text-[15px] leading-[20px] w-[152px] ml-[14px]">
                Шилдэг мэдээний сувгийг дагах
              </p>
            </div>
            <div className="flex flex-row mt-[15px]">
              <span className="icon-fi-rs-list-f text-white text-[15px] w-[30px] h-[30px] flex items-center justify-center bg-[#FF6600] rounded-full" />
              <p className="text-[#111111] text-[15px] leading-[20px] w-[152px] ml-[14px]">
                Таалагдсан мэдээг хадгалан жор үүсгэх
              </p>
            </div>
          </div>
          <div className="w-full sm:w-[430px] relative">
            <div className="px-[40px] relative w-full flex flex-col items-center">
              <p className="mt-[70px] text-[32px] text-[#111111] leading-[38px] font-bold">
                Бүртгэл үүсгэн мэдээллийг өөрийн болгоорой!
              </p>
              <button className="w-full h-[44px] bg-[#1876F3] rounded-[4px] relative text-[16px] font-medium text-white mt-[30px]">
                <span className="icon-fi-rs-fb text-[24px] absolute top-[9px] left-[22px] w-[26px] h-[26px] flex justify-center items-center text-white" />
                Facebook
              </button>
              <button className="w-full h-[44px] mt-[12px] border-[#D4D8D8] border-[1px] rounded-[4px] text-[16px] font-medium text-[#111111]">
                <span className="icon-fi-rs-google" />
                Google
              </button>
              <div className="w-full flex flex-row items-center mt-[20px]">
                <span className="h-[1px] w-full bg-[#E0E0E1]" />
                <p className="text-[#AFAFAF] text-[14px] leading-[16px] mx-[18px]">Эсвэл</p>
                <span className="h-[1px] w-full bg-[#E0E0E1]" />
              </div>
              <div
                onClick={() => setStep('register')}
                className="bg-[#FF6600] w-full rounded-[4px] h-[44px] text-[16px] cursor-pointer flex flex-row items-center justify-center text-white mt-[20px]"
              >
                <FIcon className="icon-fi-rs-mail-f mr-[27px] text-[24px] w-[26px] h-[26px]" />
                Утасны дугаар/Имэйл хаяг
              </div>
            </div>
            {/* footer */}
            <div className="border-t border-[#E0E0E1] mt-[30px]">
              <div className="px-[40px] flex flex-col items-center">
                <div className="text-[#555555] text-[15px] mt-[21px] leading-[20px]">
                  <span className="font-inter">Бүртгэлтэй хэрэглэгч бол </span>
                  <span
                    onClick={() => setIsShown('signin')}
                    className="text-caak-primary text-[15px] font-bold cursor-pointer"
                  >
                    Нэвтрэх
                  </span>
                </div>
                <p className="mt-[40px] w-full font-inter text-13px text-[#909090]">
                  Та энэ алхамын үргэлжлүүлснээр, сайтын{' '}
                  <span
                    onClick={() => {
                      navigate('/help', { state: 4 });
                      setIsShown(false);
                    }}
                    className="text-[#111111] cursor-pointer"
                  >
                    Үйлчилгээний нөхцөл
                  </span>{' '}
                  болон{' '}
                  <span
                    onClick={() => {
                      navigate('/help', { state: 3 });
                      setIsShown(false);
                    }}
                    className="text-[#111111] cursor-pointer"
                  >
                    Нууцлалын бодлогыг
                  </span>{' '}
                  зөвшөөрсөнд тооцно.
                </p>
              </div>
            </div>
            <span
              onClick={() => setIsShown(false)}
              className="absolute top-[14px] right-[14px] icon-fi-rs-close text-[#909090] text-[18px] cursor-pointer w-[24px] h-[24px] flex items-center justify-center"
            />
          </div>
        </div>
      ) : step === 'register' ? (
        <div className="popup_modal-content w-[380px] rounded-[6px] relative">
          <div className="px-[40px] relative w-full flex flex-col items-center">
            <p className="mt-[60px] text-[32px] font-condensed text-[#111111] leading-[38px] font-bold">Бүртгүүлэх</p>
            <input
              className="w-full rounded-[4px] mt-[30px] bg-[#EFEEEF] h-[44px] px-[22px]"
              placeholder="Утасны дугаар/Имэйл хаяг"
            />
            <div className="w-full relative mt-[12px]">
              <input
                type={isPasswordShown ? 'text' : 'password'}
                className="w-full rounded-[4px] bg-[#EFEEEF] h-[44px] pl-[22px] pr-[40px]"
                placeholder="Нууц үг"
              />
              <span
                onClick={() => setIsPasswordShown(!isPasswordShown)}
                className={`${
                  isPasswordShown ? 'icon-fi-rs-blind' : 'icon-fi-rs-eye'
                } absolute right-[12px] text-[#BBBEBE] cursor-pointer text-[20px] w-[24px] h-[24px] top-[10px] flex items-center justify-center leading-[24px]`}
              />
            </div>
            <div className="w-full relative mt-[12px]">
              <input
                type={isPasswordShown ? 'text' : 'password'}
                className="w-full rounded-[4px] bg-[#EFEEEF] h-[44px] pl-[22px] pr-[40px]"
                placeholder="Нууц үг давтах"
              />
              <span
                onClick={() => setIsPasswordShown(!isPasswordShown)}
                className={`${
                  isPasswordShown ? 'icon-fi-rs-blind' : 'icon-fi-rs-eye'
                } absolute right-[12px] text-[#BBBEBE] cursor-pointer text-[20px] w-[24px] h-[24px] top-[10px] flex items-center justify-center leading-[24px]`}
              />
            </div>
            <button
              onClick={() => setStep('confirmation')}
              className="bg-[#FF6600] w-full flex flex-row items-center justify-center rounded-[4px] h-[44px] text-[16px] text-white mt-[22px] relative"
            >
              Бүртгүүлэх
            </button>
          </div>
          {/* footer */}
          <div className="border-t border-[#E0E0E1] mt-[30px] pb-[33px]">
            <div className="px-[40px] flex flex-col items-center">
              <div className="text-[#555555] text-[15px] mt-[21px]">
                <span className="font-inter">Бүртгэлтэй хэрэглэгч бол </span>
                <span
                  onClick={() => setIsShown('signin')}
                  className="text-caak-primary text-[15px] font-bold cursor-pointer"
                >
                  Нэвтрэх
                </span>
              </div>
              <p className="mt-[24px] w-full font-inter text-[13px] text-[#909090]">
                Та энэ алхамын үргэлжлүүлснээр, сайтын{' '}
                <span
                  onClick={() => {
                    navigate('/help', { state: 4 });
                    setIsShown(false);
                  }}
                  className="text-[#111111] cursor-pointer"
                >
                  Үйлчилгээний нөхцөл
                </span>{' '}
                болон{' '}
                <span
                  onClick={() => {
                    navigate('/help', { state: 3 });
                    setIsShown(false);
                  }}
                  className="text-[#111111] cursor-pointer"
                >
                  Нууцлалын бодлогыг
                </span>
                зөвшөөрсөнд тооцно.
              </p>
            </div>
          </div>
          <span
            onClick={() => setIsShown(false)}
            className="absolute top-[14px] right-[14px] icon-fi-rs-close text-[#909090] text-[18px] cursor-pointer w-[24px] h-[24px] flex items-center justify-center"
          />
        </div>
      ) : step === 'confirmation' ? (
        <div className="popup_modal-content w-[440px] rounded-[6px] relative">
          <div className="px-[40px] relative w-full flex flex-col items-center">
            <p className="mt-[60px] text-[32px] font-condensed text-[#111111] leading-[38px] font-bold">
              Баталгаажуулалт
            </p>
            <p className="text-[#555555] text-[15px] leading-[18px] mt-[30px] text-center">
              Таны утасны дугаар болох ** ** ** 47 руу баталгаажуулах код илгээгдлээ!
            </p>
            <div className="flex flex-row gap-[12px] mt-[34px]">
              <OtpInput
                value={code}
                onChange={handleChange}
                numInputs={6}
                separator={<span style={{ width: '8px' }}></span>}
                isInputNum={true}
                shouldAutoFocus={true}
                focusStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #257CEE',
                }}
                inputStyle={{
                  border: '1px solid #D4D8D8',
                  borderRadius: '4px',
                  width: '50px',
                  height: '64px',
                  fontSize: '26px',
                  color: '#000',
                  fontWeight: '400',
                  backgroundColor: '#EFEEEF',
                }}
              />
            </div>
            <button className="bg-[#FF6600] w-full flex flex-row items-center justify-center rounded-[4px] h-[44px] text-[16px] text-white mt-[22px] relative">
              Бүртгүүлэх
            </button>
          </div>
          {/* footer */}
          <div className="border-t border-[#E0E0E1] mt-[30px] flex w-full justify-center pb-[33px]">
            <div className="text-[#555555] text-[15px] mt-[21px]">
              <span>Бүртгэлтэй хэрэглэгч бол </span>
              <span
                onClick={() => setIsShown('signup')}
                className="text-caak-primary text-[15px] font-bold cursor-pointer"
              >
                Нэвтрэх
              </span>
            </div>
          </div>
          <span
            onClick={() => setIsShown(false)}
            className="absolute top-[14px] right-[14px] icon-fi-rs-close text-[#909090] text-[18px] cursor-pointer w-[24px] h-[24px] flex items-center justify-center"
          />
        </div>
      ) : null}
    </div>
  );
}
