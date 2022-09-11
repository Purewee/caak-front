import React, { useState, useEffect, useRef } from 'react';
import { imagePath } from '../../utility/Util';
import { Affix } from 'antd';

export default function A4({ banner }) {
  console.log(banner);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [bannerClose, setBannerClose] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const currentBannerScrollPosition = useRef(1000);

  const handleScroll = () => {
    if (window) {
      if (!bannerDismissed && window.scrollY > currentBannerScrollPosition.current) {
        setBannerOpen(true);
        setBannerDismissed(true);
      } else if (window.scrollY < currentBannerScrollPosition.current) {
        setBannerOpen(false);
        setBannerDismissed(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    //  eslint-disable-next-line
  }, []);

  return (
    banner &&
    bannerOpen &&
    !bannerClose && (
      <Affix className="fixed left-[10px] bottom-[50px] sm:left-[50px] z-[3]">
        <div className="flex flex-row items-start">
          <div className={`rounded-[8px] cursor-pointer border-[5px] sm:border-[10px] relative bg-black`}>
            <img
              src={imagePath(banner?.fileUrl)}
              alt=""
              className="w-[80px] h-[80px] sm:w-[130px] sm:h-[130px] object-cover"
            />
          </div>
          <span
            onClick={() => setBannerClose(true)}
            className="cursor-pointer icon-fi-rs-close bg-[#9A9FB4] p-1 rounded-[6px]"
          />
        </div>
      </Affix>
    )
  );
}
