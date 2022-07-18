import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { generateTimeAgo, imagePath } from '../../utility/Util';
import { Link } from 'react-router-dom';

export default function StoryItem({ story, index }) {
  return (
    <div className={`min-w-[106px] sm:min-w-[290px] max-w-[290px] sm:min-h-[435px] min-h-[160px] max-h-[435px]`}>
      <Link to={`/story/${index}`}>
        <div className="h-full w-full storyBackgroundLinear hover:p-[3px] rounded-[8px]">
          <div className="relative h-full w-full bg-white rounded-[8px] hover:p-[5px]">
            <LazyLoadImage
              alt={story.id}
              className={`object-cover h-full w-full rounded-[8px]`}
              src={imagePath(story?.image)}
            />
            <div className="absolute bottom-0 rounded-[8px] storyLinear h-full w-full hover:h-[424px] hover:w-[274px] py-[14px] xl:py-[30px] px-[10px] xl:px-[20px] flex flex-col items-start justify-end">
              {story?.categories?.map((x) => (
                <p
                  key={x.name}
                  className="bg-[#FF6600] hidden xl:flex px-[8px] py-[4px] text-white text-[12px] font-bold uppercase"
                >
                  #{x.name}
                </p>
              ))}
              <p className="truncate-3 text-white text-[12px] xl:text-[22px] condMedium xl:font-bold mt-[10px] tracking-[0.36px] leading-[15px] xl:leading-[28px] xl:font-condensed">
                {story?.title}
              </p>
              <p className="text-white text-[14px] font-medium mt-[10px] hidden xl:flex condMedium">
                {generateTimeAgo(story?.publish_date)}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
