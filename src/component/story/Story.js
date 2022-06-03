import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { generateTimeAgo } from '../../utility/Util'
import { Link } from 'react-router-dom'

export default function StoryItem({story, border }) {
  return (
    <div className={`min-w-[106px] sm:min-w-[290px] ${border && 'border-[3px] border-[#F53757] xl:p-[5px]'} max-w-[290px] rounded-[8px] min-h-[160px] sm:min-h-[435px] max-h-[435px]`}>
      <div className='relative h-full w-full'>
        <LazyLoadImage
          alt=''
          className={`object-cover h-full w-full rounded-[8px]`}
          src={`http://graph.caak.mn${story?.image}`}
        />
        <div className='absolute bottom-0 rounded-[8px] storyLinear h-full w-full py-[14px] xl:py-[30px] px-[10px] xl:px-[20px] flex flex-col items-start justify-end'>
          { story?.categories.map((x) => <p key={x.name} className="bg-[#FF6600] hidden xl:flex px-[8px] py-[4px] text-white text-[12px] font-bold uppercase">#{x.name}</p>) }
          <Link to={`/story`}>
              <p className='truncate-3 text-white text-[12px] xl:text-[24px] font-medium xl:font-bold mt-[10px]'>{story?.title}</p>
          </Link>
          <p className='text-white text-[14px] font-medium mt-[10px] hidden xl:flex'>{generateTimeAgo(story?.publish_date)}</p>
        </div>
      </div>
    </div>
  )
}
