import React, { useState } from 'react';
import { FIcon } from '../icon';

//prettier-ignore
const menu = [
    {
        icon: 'icon-fi-rs-search'
    },
    {
        icon: 'icon-fi-rs-search'
    },
    {
        icon: 'icon-fi-rs-search'
    },
    {
        icon: 'icon-fi-rs-notification'
    },
    {
        icon: 'icon-fi-rs-list-o'
    },
]

//prettier-ignore
export default function MobileBottomMenu() {
    const [selected, setSelected] = useState(0)

    return (
        <div className="h-[82px] sm:hidden flex pb-[35px] fixed bottom-0 w-full bg-black z-30">
            {
                menu.map((data, index) => {
                    return(
                        <div className={`py-[10px] flex justify-center w-1/5 ${selected === index ? 'border-b-[3px] border-caak-primary' : ''}`} key={index}>
                            <FIcon onClick={() => setSelected(index)} className={`${selected === index ? 'text-white' : 'text-[#909090]'} w-[24px] h-[24px] text-[22px] ${data.icon}`} />
                        </div>
                    )
                })
            }
        </div>
    );
}
