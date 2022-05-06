import React from 'react'

export default function TopTagsItem({data}) {
    return (
        <div className=' h-[96px] max-w-[150px] rounded-[4px] relative'>
            <img className='h-full min-w-[150px] object-cover rounded-[4px]' alt='' src={data.image}/>
            <p className='absolute top-0 w-full h-full pt-[14px] px-[14px] bg-black bg-opacity-20 text-white text-[18px] font-bold'>#{data.name}</p>
        </div>
    )
}
