import React, { useState } from 'react';
import { FIcon } from '../icon';
import { Link } from 'react-router-dom';

//prettier-ignore
const menu = [
    {
        icon: 'icon-fi-rs-home-f',
        icon1: 'icon-fi-rs-home-o',
        route: '/'
    },
    {
        icon: 'icon-fi-rs-grid-f',
        icon1: 'icon-fi-rs-grid-o',
        route: '/'
    },
    {
        icon: 'icon-fi-rs-search-f',
        icon1: 'icon-fi-rs-search-o',
        route: '/search'
    },
    {
        icon: 'icon-fi-rs-notification-f',
        icon1: 'icon-fi-rs-notification',
        route: '/notification'
    },
    {
        icon: 'icon-fi-rs-list-f',
        icon1: 'icon-fi-rs-list-o',
        route: '/post/saved'
    },
]

//prettier-ignore
export default function MobileBottomMenu() {
    const [selected, setSelected] = useState(0)

    return (
        <div className="sm:hidden flex fixed bottom-0 w-full bg-black z-[3]">
            {
                menu.map((data, index) => {
                    return(
                        <Link className={`py-[10px] flex justify-center w-1/5 ${selected === index ? 'border-b-[3px] border-caak-primary' : ''}`} key={index} onClick={() => setSelected(index)} to={data.route}>
                            <FIcon className={`${selected === index ? 'text-white' : 'text-[#909090]'} w-[24px] h-[24px] text-[22px] ${selected === index ? data.icon : data.icon1}`} />
                        </Link>
                    )
                })
            }
        </div>
    );
}
