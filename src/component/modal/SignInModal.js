import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { loginWithAssertion, loginWithPassword } from '../../utility/WithApolloProvider';
import { useNavigate } from 'react-router-dom';

const interest = [
  {
    title: 'Хөгжилтэй',
  },
  {
    title: 'Гэрэл зураг',
  },
  {
    title: 'Шинжлэх ухаан',
  },
  {
    title: 'Энтэртайнмент',
  },
  {
    title: 'Түүх',
  },
  {
    title: 'Кино',
  },
  {
    title: 'Спорт',
  },
  {
    title: 'Аялал',
  },
  {
    title: 'Гэр бүл',
  },
  {
    title: 'Амьтад',
  },
  {
    title: 'Хоол',
  },
  {
    title: 'Эрүүл амьдрал',
  },
  {
    title: '1',
  },
  {
    title: '2',
  },
  {
    title: '3',
  },
  {
    title: '4',
  },
  {
    title: '5',
  },
  {
    title: '6',
  },
];

export default function SignInModal({ setIsShown }) {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [step, setStep] = useState('default');

  return (
    <div className="popup_modal">
      {step === 'default' ? (
        <div className="popup_modal-content w-[380px] rounded-[6px] relative">
          <div className="px-[40px] relative w-full flex flex-col items-center">
            <p className="mt-[60px] text-[32px] text-[#111111] leading-[38px] font-condensed font-bold">Нэвтрэх</p>
            <button
              onClick={() => setStep('social')}
              className="w-full h-[44px] bg-[#1876F3] rounded-[4px] relative text-[16px] font-medium text-white mt-[30px]"
            >
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
            <button
              onClick={() => setStep('mail')}
              className="bg-[#FF6600] w-full flex flex-row items-center justify-center rounded-[4px] h-[44px] text-[16px] text-white mt-[20px] relative"
            >
              <span className="icon-fi-rs-mail-f text-[23px] w-[26px] h-[26px] flex justify-center items-center mr-[20px] text-white" />
              Имэйл хаяг/Утасны дугаар
            </button>
          </div>
          {/* footer */}
          <div className="border-t border-[#E0E0E1] mt-[40px] pb-[30px]">
            <div className="px-[40px] flex flex-col items-center">
              <div className="text-[#555555] text-[15px] mt-[21px]">
                <span className="font-inter">Шинэ хэрэглэгч бол </span>
                <span
                  onClick={() => setIsShown('signup')}
                  className="text-caak-primary text-[15px] font-bold cursor-pointer"
                >
                  Бүртгүүлэх
                </span>
              </div>
            </div>
          </div>
          <span
            onClick={() => setIsShown(false)}
            className="absolute top-[14px] right-[14px] icon-fi-rs-close text-[#909090] text-[18px] cursor-pointer w-[24px] h-[24px] flex items-center justify-center"
          />
        </div>
      ) : step === 'mail' ? (
        <LoginWithMail setIsShown={setIsShown} onSuccess={() => setIsShown(false)} />
      ) : step === 'social' ? (
        <div className="popup_modal-content w-[440px] rounded-[6px] flex flex-col items-center px-[40px] pt-[66px] pb-[40px]">
          <div className="relative w-[112px] h-[112px]">
            <img
              className="w-full h-full rounded-full object-cover"
              src="http://res.heraldm.com/content/image/2019/12/05/20191205000632_0.jpg"
            />
            <span
              style={{ boxShadow: '0px 1px 4px #00000029' }}
              className="absolute bottom-0 right-0 icon-fi-rs-camera-f text-black text-[18px] rounded-full bg-white cursor-pointer w-[32px] h-[32px] flex items-center justify-center"
            />
          </div>
          <p className="mt-[43px] text-[16px] leading-[19px]">yourname@gmail.com</p>
          <p className="mt-[20px] text-[32px] font-condensed font-bold leading-[38px]">Таныг хэн гэж дуудах вэ?</p>
          <div className="w-full relative mt-[20px]">
            <input defaultValue={'James Bold'} className="w-full text-center rounded-[4px] bg-[#EFEEEF] h-[64px]" />
            <span className="absolute top-[22px] right-0 icon-fi-rs-editor-f text-[#909090] text-[17px] rounded-fullcursor-pointer w-[20px] h-[20px] flex items-center justify-center" />
          </div>
          <button
            onClick={() => setStep('interest')}
            className="w-full bg-[#FF6600] rounded-[4px] h-[44px] font-medium text-[16px] text-white mt-[40px]"
          >
            Үргэлжлүүлэх
          </button>
        </div>
      ) : step === 'interest' ? (
        <div className="popup_modal-content w-[851px] rounded-[6px] flex flex-col items-center pt-[37px] pb-[40px]">
          <p className="text-[#111111] font-condensed font-bold text-[38px] leading-[44px]">
            Таны дуртай мэдээний төрлүүд?
          </p>
          <p className="mt-[20px] text-[#555555] text-[15px] leading-[18px]">
            Таны дуртай төрлөөр мэдээг шүүцгээе! Хамгийн багадаа 3 төрөл сонгоно уу.
          </p>
          <div className="flex flex-wrap gap-[14px] h-[380px] w-[730px] overflow-y-auto mt-[33px]">
            {interest.map((data, index) => {
              return index === hovered ? (
                <div
                  key={index}
                  onMouseLeave={() => setHovered(false)}
                  className="cursor-pointer w-[172px] h-[100px] flex justify-center items-center"
                >
                  <div key={index} className="w-[164px] h-[94px] rounded-[6px] relative">
                    <img
                      className="w-full h-full object-cover rounded-[6px]"
                      alt=""
                      src="https://i.scdn.co/image/ab67616d0000b273ede9f246191d55e7a5c95111"
                    />
                    <p className="w-full h-full bg-black bg-opacity-50 absolute top-0 flex justify-center items-center rounded-[6px] text-white text-[16px] font-medium">
                      {data.title}
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  onMouseEnter={() => setHovered(index)}
                  className="cursor-pointer w-[172px] h-[100px] rounded-[6px] relative"
                >
                  <img
                    className="w-full h-full object-cover rounded-[6px]"
                    alt=""
                    src="https://i.scdn.co/image/ab67616d0000b273ede9f246191d55e7a5c95111"
                  />
                  <p className="w-full h-full bg-black bg-opacity-50 absolute top-0 flex justify-center items-center rounded-[6px] text-white text-[16px] font-medium">
                    {data.title}
                  </p>
                </div>
              );
            })}
          </div>
          <button>Дуусгах {'(3)'}</button>
        </div>
      ) : null}
    </div>
  );
}

function LoginWithMail({ onSuccess, setIsShown }) {
  const [password, setPassword] = useState(false);
  const { handleSubmit, register } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="popup_modal-content w-[380px] rounded-[6px] relative">
      <form
        className="px-[40px] relative w-full flex flex-col items-center"
        onSubmit={handleSubmit(async ({ username, password }) => {
          try {
            const token = await loginWithPassword(username, password);
            if (!token) return console.error('Login failed: Server Error');
            await login();
            console.log('Login Success');
            onSuccess();
            navigate('/');
          } catch (e) {
            console.error('Invalid login or password');
          }
        })}
      >
        <p className="mt-[60px] text-[32px] text-[#111111] leading-[38px] font-condensed font-bold">Нэвтрэх</p>
        <input
          {...register('username')}
          className="w-full rounded-[4px] mt-[30px] bg-[#EFEEEF] h-[44px] px-[22px]"
          placeholder="Имэйл хаяг/Утасны дугаар"
          name="username"
        />
        <div className="w-full relative mt-[12px]">
          <input
            {...register('password')}
            type={password ? 'text' : 'password'}
            className="w-full rounded-[4px] bg-[#EFEEEF] h-[44px] pl-[22px] pr-[40px]"
            placeholder="Нууц үг"
          />
          <span
            onClick={() => setPassword(!password)}
            className={`${
              password ? 'icon-fi-rs-blind' : 'icon-fi-rs-eye'
            } absolute right-[12px] text-[#BBBEBE] cursor-pointer text-[20px] w-[24px] h-[24px] top-[10px] flex items-center justify-center leading-[24px]`}
          />
        </div>
        <div className="w-full justify-end flex ">
          <p className="text-[#555555] text-[14px] leading-[16px] mt-[12px] cursor-pointer">Нууц үг мартсан?</p>
        </div>
        <button className="bg-[#FF6600] w-full rounded-[4px] h-[44px] text-[16px] text-white mt-[22px]" type="submit">
          Нэвтрэх
        </button>
      </form>
      {/* footer */}
      <div className="border-t border-[#E0E0E1] mt-[40px] pb-[30px]">
        <div className="px-[40px] flex flex-col items-center">
          <div className="text-[#555555] text-[15px] mt-[21px]">
            <span className="font-inter">Шинэ хэрэглэгч бол </span>
            <span className="text-caak-primary text-[15px] font-bold cursor-pointer">Бүртгүүлэх</span>
          </div>
        </div>
      </div>
      <span
        onClick={() => setIsShown(false)}
        className="absolute top-[14px] right-[14px] icon-fi-rs-close text-[#909090] text-[18px] cursor-pointer w-[24px] h-[24px] flex items-center justify-center"
      />
    </div>
  );
}
