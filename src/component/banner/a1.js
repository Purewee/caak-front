import React from 'react';
import { imagePath } from '../../utility/Util';
import ImpressedLink from './clicks';

export default function A1({ banner }) {
  if (!banner) {
    return <></>;
  }
  return (
    <ImpressedLink id={banner.id} href={banner?.url} target="_blank" className="max-w-[990px]">
      {banner?.bannerType === 'image' ? (
        <img src={imagePath(banner?.fileUrl)} alt={banner?.title} className="w-full object-cover" />
      ) : (
        <video src={imagePath(banner?.fileUrl)} />
      )}
    </ImpressedLink>
  );
}
