import React from 'react';
import { imagePath } from '../../utility/Util';
import { Link } from 'react-router-dom';

export default function A1({ banner }) {
  if (!banner) {
    return <></>;
  }
  return (
    <Link to={banner?.url} target="_blank" className="max-w-[990px] max-h-[150px] my-[20px]">
      {banner?.bannerType === 'image' ? (
        <img src={imagePath(banner?.fileUrl)} alt={banner?.title} className="w-full object-cover" />
      ) : (
        <video src={imagePath(banner?.fileUrl)} />
      )}
    </Link>
  );
}
