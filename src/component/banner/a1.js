import React from 'react';
import { imagePath } from '../../utility/Util';

export default function A1({ banner }) {
  if (!banner) {
    return <></>;
  }
  return (
    <a href={banner?.url} target="_blank" className="max-w-[990px] px-[16px] sm:px-0 my-[20px]">
      {banner?.bannerType === 'image' ? (
        <img src={imagePath(banner?.fileUrl)} alt={banner?.title} className="w-full object-cover" />
      ) : (
        <video src={imagePath(banner?.fileUrl)} />
      )}
    </a>
  );
}
