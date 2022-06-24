import React, { useEffect, useContext } from 'react';
import { AppContext } from '../../App';

//prettier-ignore
export default function Settings() {
    const context = useContext(AppContext);
    useEffect(() => {
        context.setStore('default');
      }, []);
    return (
        <div className='flex justify-center w-full'>
            <div className='max-w-[1140px] w-full mt-[51px]'>
                <p>Тохиргоо</p>
                <div className='flex flex-row gap-[60px]'>
                    <div className='w-[290px] h-[162px] border border-[#EFEEEF] rounded-[4px]'>

                    </div>
                    <div className='w-[960px]'>
                        <div className='border-[#EFEEEF] border rounded-[4px] w-full h-[493px]'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
