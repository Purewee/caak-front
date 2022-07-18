import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//prettier-ignore
export default function SearchModal({setSearchShown}) {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    function handleChange(event) {
        setSearchValue(event.target.value);
    }

    //prettier-ignore
    const onPressEnter = (e) => {
      if (e.key === 'Enter') {
        navigate(`/search`, { state: { q: e.target.value }});
        setSearchShown(false)
      }
    };
    
    function useOutsideAlerter(ref) {
        useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
              setSearchShown(false)
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
    }

    const searchRef = useRef(null);
    useOutsideAlerter(searchRef);

    return (
        <div className="search_modal w-full">
            <div ref={searchRef} className="w-full flex justify-center items-center bg-white h-[70px] z-50">
                <div className="relative max-w-[600px] w-full">
                <input
                    onKeyDown={onPressEnter}
                    value={searchValue}
                    onChange={handleChange}
                    placeholder="Хайлт хийх..."
                    className={`h-[54px] text-[17px] text-[#555555] w-full border px-[50px] border-[#BBBEBE] rounded-[4px]`}
                />
                <span className="icon-fi-rs-search absolute left-[16px] top-[16px] text-[18px] w-[22px] h-[22px] flex justify-center items-center text-[#555555]" />
                {searchValue && (
                    <span
                    onClick={() => setSearchValue('')}
                    className="icon-fi-rs-close cursor-pointer absolute right-[16px] top-[16px] text-[16.5px] w-[22px] h-[22px] flex justify-center items-center text-[#555555]"
                    />
                )}
                </div>
            </div>
        </div>
    )
}
