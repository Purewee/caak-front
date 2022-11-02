import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from 'antd';
import SessionModal from '../modal/session';

export default function Session({ transparent }) {
  const { openModal } = useAuth();
  const [mobileSideMenu, setMobileSideMenu] = useState(false);
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setMobileSideMenu(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const mobileRef = useRef(null);
  useOutsideAlerter(mobileRef);
  return (
    <div>
      <nav className="py-[10px] flex sm:hidden flex-col sticky top-0 z-[11]">
        <div className="w-full flex flex-row justify-between">
          <span
            onClick={() => setMobileSideMenu(!mobileSideMenu)}
            className={`icon-fi-rs-user text-[27.5px] ${transparent ? 'text-[#555555]' : 'text-caak-black'}`}
          />
        </div>
        {mobileSideMenu && (
          <div className="left-0 right-0 bottom-0 top-0 overflow-auto fixed flex justify-end bg-black bg-opacity-70">
            <div ref={mobileRef} className="w-4/5 h-screen overflow-hidden overflow-y-scroll bg-white pt-[26px]">
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
              <div className="border-t border-b w-full border-[#D4D8D8] flex flex-row items-center justify-center gap-[19px] mt-[50px]">
                <a href="https://www.facebook.com/caakweb" target={`_blank`}>
                  <span className="icon-fi-rs-fb text-[22px] text-black" />
                </a>
                <a href="https://www.instagram.com/caak.mn/" target={`_blank`}>
                  <span className="icon-fi-rs-ig text-[22px] text-black" />
                </a>
                <a href="https://twitter.com/caaktwt" target={`_blank`}>
                  <span className="icon-fi-rs-tw text-[22px] text-black" />
                </a>
                <a href="https://www.youtube.com/c/caakvideo" target={`_blank`}>
                  <span className="icon-fi-rs-yt text-[22px] text-black" />
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
      <div className="hidden sm:flex flex-row ml-[10px]">
        <Button
          onClick={() => openModal('login')}
          className={`font-bold mr-[12px] ${transparent ? 'text-white' : 'text-[#555555]'}`}
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
