import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from 'antd';
import SessionModal from '../modal/session';
import { FIcon } from '../icon';
import { useNavigate } from 'react-router-dom';
import { useHeader } from '../../context/HeaderContext';

const mobileItems = [
  {
    title: 'Радио',
    icon: 'icon-fi-rs-wave',
    url: 'https://www.caak.mn/radio/',
  },
  {
    title: 'Подкаст',
    icon: 'icon-fi-rs-mic',
    url: 'https://soundcloud.com/caak-podcast',
  },
  {
    title: 'Саак мэдээ',
    icon: 'icon-fi-rs-caak-news',
    url: 'https://www.caak.mn/',
  },
];

export default function Session() {
  const { openModal } = useAuth();
  const navigate = useNavigate();
  const [mobileSideMenu, setMobileSideMenu] = useState(false);
  const { mode } = useHeader();
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setMobileSideMenu(false);
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const mobileRef = useRef(null);
  useOutsideAlerter(mobileRef);
  return (
    <div>
      <nav className="py-[10px] flex sm:hidden flex-col sticky top-0 z-[2]">
        <div className="w-full flex flex-row justify-between">
          <span
            onClick={() => setMobileSideMenu(!mobileSideMenu)}
            className="icon-fi-rs-user text-white sm:text-[#555555] text-[27.5px]"
          />
        </div>
        {mobileSideMenu && (
          <div className="left-0 right-0 bottom-0 top-0 z-[5] overflow-auto fixed flex justify-end bg-black bg-opacity-70">
            <div ref={mobileRef} className="w-3/4 h-screen overflow-hidden overflow-y-scroll bg-white pt-[26px]">
              <div>
                <div className="w-[56px] h-[56px] rounded-full bg-[#EFEEEF] flex items-center justify-center ml-[16px]">
                  <span
                    onClick={() => setMobileSideMenu(!mobileSideMenu)}
                    className="icon-fi-rs-user-f text-[#BBBEBE] text-[35px]"
                  />
                </div>
                <div className="px-[16px]">
                  <p className="font-bold text-[28px] text-caak-black font-condensed w-[233px] leading-[32px] mt-[30px]">
                    Та бүртгэл үүсгэн мэдээллийг өөрийн болгоорой!
                  </p>
                  <button
                    onClick={() => {
                      openModal('open');
                      setMobileSideMenu(false);
                    }}
                    className="w-full h-[58px] text-[16px] font-medium text-white mt-[20px] bg-caak-primary rounded-[4px]"
                  >
                    Бүртгүүлэх
                  </button>
                  <button
                    onClick={() => {
                      openModal('login');
                      setMobileSideMenu(false);
                    }}
                    className="w-full h-[58px] text-[16px] font-medium text-caak-black mt-[20px] border rounded-[4px]"
                  >
                    Нэвтрэх
                  </button>
                </div>
              </div>
              <div className="w-full border-t border-b mt-[30px] flex flex-col">
                {mobileItems.map((data, index) => {
                  return (
                    <a
                      href={data.url}
                      target="_blank"
                      key={index}
                      className="flex text-black flex-row items-center ml-[24px]"
                    >
                      <FIcon className={`${data.icon} mr-[18px] text-[24px] w-[26px] h-[26px]`} />
                      <p className="text-[18px]">{data.title}</p>
                    </a>
                  );
                })}
              </div>
              <div
                onClick={() => {
                  navigate('/help', { state: 1 });
                  setMobileSideMenu(false);
                }}
                className="flex flex-row text-caak-black items-center ml-[24px]"
              >
                <FIcon className={`icon-fi-rs-ads mr-[18px] text-[24px] w-[26px] h-[26px]`} />
                <p className="text-[18px]">Сурталчилгаа</p>
              </div>
              <div
                onClick={() => {
                  navigate('/help', { state: 2 });
                  setMobileSideMenu(false);
                }}
                className="flex flex-row text-caak-black items-center ml-[24px]"
              >
                <FIcon className={`icon-fi-rs-phone mr-[18px] text-[24px] w-[26px] h-[26px]`} />
                <p className="text-[18px]">Холбоо барих</p>
              </div>
              <div className="w-full border-t border-b flex flex-col ml-[24px]">
                <div
                  onClick={() => {
                    navigate('/help', { state: 1 });
                    setMobileSideMenu(false);
                  }}
                  className="flex flex-row text-caak-black items-center"
                >
                  <FIcon className={`icon-fi-rs-ads mr-[18px] text-[24px] w-[26px] h-[26px]`} />
                  <p className="text-[18px]">Нууцлалын бодлого</p>
                </div>
                <div
                  onClick={() => {
                    navigate('/help', { state: 1 });
                    setMobileSideMenu(false);
                  }}
                  className="flex flex-row text-caak-black items-center"
                >
                  <FIcon className={`icon-fi-rs-phone mr-[18px] text-[24px] w-[26px] h-[26px]`} />
                  <p className="text-[18px]">Үйлчилгээний нөхцөл</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
      <div className="hidden sm:flex flex-row ml-[10px]">
        <Button
          onClick={() => openModal('login')}
          className={`font-bold mr-[12px] ${mode === 'sticky' ? 'text-caak-black' : 'text-white'}`}
        >
          Нэвтрэх
        </Button>
        <Button onClick={() => openModal('open')} type="primary" className="font-bold">
          Бүртгүүлэх
        </Button>
      </div>
      <SessionModal />
    </div>
  );
}
