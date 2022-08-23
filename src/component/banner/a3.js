import React from 'react';
import { imagePath } from '../../utility/Util';

export default function A3({ banner }) {
  if (!banner) {
    return <></>;
  }
  return (
    <a href={banner?.url} target="_blank">
      {banner?.bannerType === 'image' ? (
        <img
          src={imagePath(banner?.fileUrl)}
          alt={banner?.title}
          className="min-w-[250px] max-w-[250px] object-cover"
        />
      ) : (
        <video src={imagePath(banner?.fileUrl)} />
      )}
    </a>
  );
}
