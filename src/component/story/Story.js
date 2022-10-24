import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { generateTimeAgo, imagePath } from '../../utility/Util';
import { Link } from 'react-router-dom';

export default function StoryItem({ story, border }) {
  return (
    <Link
      className="h-[203px] min-w-[136px] max-w-[136px] item md:min-w-[290px] md:max-w-[290px] md:h-[435px]"
      to={`/story/${story.id}`}
    >
      <div className={`h-full w-full rounded-[6px] ${border && 'border-2 border-[#FF6600] sm:p-[5px]'}`}>
        <div className={`relative h-full w-full bg-white rounded-[6px]`}>
          <LazyLoadImage
            alt={story.id}
            className="object-cover h-full w-full rounded-[6px]"
            src={imagePath(story?.image)}
          />
          <div className="absolute bottom-[0px] rounded-[6px] w-full storyLinearItem h-1/2 sm:h-full sm:max-h-[230px] p-[12px] md:p-[24px] flex flex-col items-start justify-end">
            {story?.categories?.map((x) => (
              <p
                key={x.name}
                className="bg-[#FF6600] hidden xl:flex px-[8px] py-[4px] text-white text-[12px] font-bold uppercase"
              >
                {x.name}
              </p>
            ))}
            <p
              className="truncate-4 text-white text-[13px] xl:text-[22px] condMedium xl:font-bold mt-[10px] tracking-[0.36px] leading-[15px] xl:leading-[28px] xl:font-condensed"
              dangerouslySetInnerHTML={{ __html: story?.title }}
            />
            <p className="text-white text-[14px] font-medium mt-[10px] hidden xl:flex condMedium">
              {generateTimeAgo(story?.publish_date)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
