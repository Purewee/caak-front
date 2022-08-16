import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { generateTimeAgo, imagePath } from '../../utility/Util';
import { Link } from 'react-router-dom';

export default function StoryItem({ story, index, border }) {
  return (
    <Link className="w-[110px] sm:w-[290px] h-[164px] sm:h-[435px]" to={`/story/${index}`}>
      <div className={`h-full w-full storyBackgroundLinear ${border && 'p-[2px] sm:p-[3px]'} rounded-[8px]`}>
        <div className={`relative h-full w-full bg-white rounded-[8px] ${border && 'sm:p-[5px]'}`}>
          <LazyLoadImage
            alt={story.id}
            className="object-cover h-full w-full rounded-[8px]"
            src={imagePath(story?.image)}
          />
          <div
            className={`absolute ${
              border ? 'bottom-0 sm:bottom-[5px] w-[132px] md:w-[274px] py-[10px]' : 'bottom-0 py-[18px]'
            } rounded-[8px] storyLinearItem h-1/2 xl:py-[30px] px-[10px] xl:px-[20px] flex flex-col items-start justify-end`}
          >
            {story?.categories?.map((x) => (
              <p
                key={x.name}
                className="bg-[#FF6600] hidden xl:flex px-[8px] py-[4px] text-white text-[12px] font-bold uppercase"
              >
                {x.name}
              </p>
            ))}
            <p className="truncate-3 text-white text-[13px] xl:text-[22px] condMedium xl:font-bold mt-[10px] tracking-[0.36px] leading-[15px] xl:leading-[28px] xl:font-condensed">
              {story?.title}
            </p>
            <p className="text-white text-[14px] font-medium mt-[10px] hidden xl:flex condMedium">
              {generateTimeAgo(story?.publish_date)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
