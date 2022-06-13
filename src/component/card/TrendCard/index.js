import React from 'react'
import { generateTimeAgo } from '../../../utility/Util'
import { Link } from 'react-router-dom'

export default function TrendCard({post, index}) {
  return (
    <div className='w-[311px] max-h-[333px]'>
      <Link to={`/post/view/${post.id}`}>
        <img alt='' className={`w-full h-[217px] object-cover`} src={`http://graph.caak.mn${post.image}`} />
      </Link>
      <div className='flex flex-col h-[116px] justify-between'>
        <div className='flex flex-row mt-[14px]'>
          {/* <p className='h-[30px] min-w-[30px] rounded-[2px] bg-[#909090] text-[20px] font-merri text-center text-[#FBFAFB]'>{index + 3}</p> */}
          <Link to={`/post/view/${post.id}`}>
            <p style={{fontWeight: 600}} className='text-[20px] font-condensed font-medium leading-[24px] truncate-3'>{post.title}</p>
          </Link>
        </div>
        <div className='flex flex-row items-center mt-[14px] text-[#909090] h-[20px]'>
          <div className='flex flex-row items-center'>
            <span className='icon-fi-rs-eye text-[18px]' />
            <p className='text-[15px] leading-[18px] ml-[6px] '>{post.views_count}</p>
          </div>
          <div className='flex flex-row items-center ml-[15px]'>
            <span className='icon-fi-rs-heart text-[16px]' />
            <p className='text-[15px] leading-[18px]'>{post.views_count}</p>
          </div>
          <p className="text-[14px] leading-[16px] ml-[4px]">&nbsp;•&nbsp;{generateTimeAgo(post.publish_date)}</p>
        </div>
      </div>
    </div>
  )
}
