import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export default function Story({story}) {
  return (
    <div className='w-[290px] h-[435px] relative'>
      <LazyLoadImage
        alt=''
        className={`object-cover w-[290px] h-[435px] rounded-[4px]`}
        src={`http://graph.caak.mn${story?.image}`}
      />
      <div className='absolute bottom-0 storyLinear h-full py-[30px] px-[20px] flex flex-col items-start justify-end'>
        { story?.categories.map((x) => <p key={x.name} className="bg-[#FF6600] px-[8px] py-[4px] text-white text-[12px] font-bold uppercase">#{x.name}</p>) }
        <p className='truncate-3 text-white text-[24px] font-bold mt-[10px]'>{story?.title}</p>
        <p className='text-white text-[14px] font-medium mt-[10px]'>{story?.publish_date}</p>
      </div>
    </div>
  )
}
