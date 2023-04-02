import React, { useState } from 'react';
import { imagePath } from '../../utility/Util';
import useMediaQuery from '../navigation/useMediaQuery';
import ImpressedLink from './clicks';

export default function A1({ banner }) {
  const [isShown, setIsShown] = useState(true);
  const isMobile = useMediaQuery(640);
  if (!banner) {
    return <></>;
  }
  return (
    <ImpressedLink id={banner.id} href={banner?.url} target="_blank" className="max-w-[990px]">
      {banner?.bannerType === 'image' ? (
        isMobile ? (
          isShown && (
            <div className="relative w-full">
              <img
                src={imagePath(banner?.mobileFileUrl)}
                alt={banner?.title}
                className="w-full object-cover h-[220px]"
              />
              <span
                onClick={() => setIsShown(false)}
                className="w-6 h-6 bg-white rounded-full icon-fi-rs-close absolute top-[10px] right-[10px]"
              />
            </div>
          )
        ) : (
          <img src={imagePath(banner?.fileUrl)} alt={banner?.title} className="w-full object-cover" />
        )
      ) : (
        <video src={imagePath(banner?.fileUrl)} />
      )}
    </ImpressedLink>
  );
}
