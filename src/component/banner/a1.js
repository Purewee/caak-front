import React, { useState } from 'react';
import { imagePath } from '../../utility/Util';
import ImpressedLink from './clicks';
import useMediaQuery from '../../component/navigation/useMediaQuery';

export default function A1({ banner }) {
  const [isShown, setIsShown] = useState(true);
  const isMobile = useMediaQuery(640);
  if (!banner) {
    return <></>;
  }
  return isMobile ? (
    isShown && (
      <div className="w-full relative">
        <ImpressedLink id={banner.id} href={banner?.href} target="_blank" className="z-0">
          <img src={imagePath(banner?.mobileFileUrl)} alt={banner?.title} className="w-full" />
        </ImpressedLink>
        <span
          onClick={() => setIsShown(false)}
          className="absolute top-[10px] right-[10px] z-10 w-6 h-6 bg-white rounded-full text-black text-[14px] flex justify-center items-center icon-fi-rs-close"
        />
      </div>
    )
  ) : (
    <ImpressedLink id={banner.id} href={banner?.url} target="_blank" className="max-w-[990px]">
      {banner?.bannerType === 'image' ? (
        <img src={imagePath(banner?.fileUrl)} alt={banner?.title} className="w-full object-cover" />
      ) : (
        <video src={imagePath(banner?.fileUrl)} />
      )}
    </ImpressedLink>
  );
}
