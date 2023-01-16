import React from 'react';
import { imagePath } from '../../utility/Util';
import ImpressedLink from './clicks';

export default function A2({ banner }) {
  if (!banner) {
    return <></>;
  }
  return (
    <ImpressedLink id={banner.id} href={banner?.url} target="_blank" className="w-[425px] h-[520px]">
      {banner?.bannerType === 'image' ? (
        <img
          src={imagePath(banner?.fileUrl)}
          alt={banner?.title}
          className="w-full rounded-[8px] sm:rounded-none sm:h-[520px]"
        />
      ) : (
        <video src={imagePath(banner?.fileUrl)} />
      )}
    </ImpressedLink>
  );
}
