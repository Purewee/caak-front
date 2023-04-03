import React, { useState } from 'react';
import { imagePath } from '../../utility/Util';
import ImpressedLink from './clicks';

export default function A1({ banner }) {
  const [isShown, setIsShown] = useState(true);
  if (!banner) {
    return <></>;
  }
  return (
    <ImpressedLink id={banner.id} href={banner?.url} target="_blank" className="max-w-[990px]">
      {banner?.bannerType === 'image' ? (
        banner.mobileFileUrl ? (
          isShown && (
            <div className="relative w-full">
              <img src={imagePath(banner?.mobileFileUrl)} alt={banner?.title} className="w-full" />
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
