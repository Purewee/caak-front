import React, { useState, useRef, useEffect } from 'react';
import logoIcon from '../../../images/New-Logo.svg';
import { Skeleton } from 'antd';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

const CATEGORIES = gql`
  query GetCategories {
    categories(sort: { direction: asc, field: "position" }, filter: { status: { eq: "active" } }) {
      nodes {
        id
        name
        slug
        position
      }
    }
  }
`;

//prettier-ignore
export default function SideMenu({ setSideMenuOpen }) {
    const [subMenuShown, setSubMenuShown] = useState(false);
    const { data, loading } = useQuery(CATEGORIES);
    const categories = data?.categories?.nodes || [];

    function useOutsideAlerter(ref) {
        useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
              setSideMenuOpen(false)
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

    const sideMenuRef = useRef(null);
    useOutsideAlerter(sideMenuRef);

    if (loading) {
      return <Skeleton />;
    }

    return (
        <div
            ref={sideMenuRef}
            style={{boxShadow: '0px 0px 30px #00000039'}}
            className="absolute left-0 top-0 w-[410px] flex flex-col wrapper max-h-screen bg-white px-[50px] pt-[50px] pb-[55px] font-condensed z-[1]"
        >
            <div className="flex flex-row items-center justify-between w-full">
                <span className="icon-fi-rs-search text-[20px] text-[#111111]" />
                <img src={logoIcon} className="cursor-pointer w-[130px] object-contain" alt="Caak Logo" />
                <span
                onClick={() => setSideMenuOpen(false)}
                className="icon-fi-rs-close cursor-pointer text-[18px] w-[24px] h-[24px] flex items-center justify-center text-[#111111]"
                />
            </div>
            <div
                onClick={() => setSubMenuShown(!subMenuShown)}
                className="mt-[75px] flex flex-row items-center cursor-pointer"
            >
                <span
                className={`${
                    subMenuShown ? 'icon-fi-rs-minus' : 'icon-fi-rs-plus'
                } w-[24px] h-[24px] flex items-center justify-center text-[20px] text-[#FF6600] mr-[26px]`}
                />
                <p className="text-[18px] font-medium leading-[21px] hover:text-[#555555]">МЭДЭЭНИЙ ТӨРӨЛ</p>
            </div>
            {subMenuShown && (
                <div className="ml-[50px] mt-[30px] flex flex-col gap-[20px]">
                {categories.map((data, index) => {
                    return (
                    <Link onClick={() => setSideMenuOpen(false)} key={index} to={`/category/${data.slug}`}>
                        <p className="text-[#111111] leading-[20px] text-[14px] font-condensed">{data.name}</p>
                    </Link>
                    );
                })}
                </div>
            )}
            <div className="mt-[40px] text-caak-black hover:text-caak-darkGray flex flex-row items-center cursor-pointer">
                <span className="icon-fi-rs-hashtag w-[24px] h-[24px] flex items-center justify-center text-[20px] mr-[26px]" />
                <p className="text-[18px] font-medium leading-[21px]">ТАГУУД</p>
            </div>
            <a
                target={'_blank'}
                href="https://www.youtube.com/c/caakvideo"
                className="mt-[40px] flex flex-row text-caak-black hover:text-caak-darkGray items-center cursor-pointer"
            >
                <span className="icon-fi-rs-tv w-[24px] h-[24px] flex items-center justify-center text-[20px] mr-[26px]" />
                <p className="text-[18px] font-medium leading-[21px]">ВИДЕО</p>
            </a>
            <a
                target={'_blank'}
                href="https://soundcloud.com/caak-podcast"
                className="mt-[40px] flex flex-row text-caak-black hover:text-caak-darkGray items-center cursor-pointer"
            >
                <span className="icon-fi-rs-mic w-[24px] h-[24px] flex items-center justify-center text-[20px] mr-[26px]" />
                <p className="text-[18px] font-medium leading-[21px]">ПОДКАСТ</p>
            </a>
            <a
                target={'_blank'}
                href="https://www.caak.mn/radio"
                className="mt-[40px] flex flex-row text-caak-black hover:text-caak-darkGray items-center cursor-pointer"
            >
                <span className="icon-fi-rs-wave w-[24px] h-[24px] flex items-center justify-center text-[20px] mr-[26px]" />
                <p className="text-[18px] font-medium leading-[21px]">РАДИО</p>
            </a>
            <div
                onClick={() => {
                navigate('/help/1');
                setSideMenuOpen(false);
                }}
                className="mt-[40px] flex flex-row text-caak-black hover:text-caak-darkGray items-center cursor-pointer"
            >
                <span className="icon-fi-rs-ads w-[24px] h-[24px] flex items-center justify-center text-[20px] mr-[26px]" />
                <p className="text-[18px] font-medium leading-[21px]">СУРТАЛЧИЛГАА</p>
            </div>
            <div
                onClick={() => {
                navigate('/help/2');
                setSideMenuOpen(false);
                }}
                className="mt-[40px] flex flex-row text-caak-black hover:text-caak-darkGray items-center cursor-pointer"
            >
                <span className="icon-fi-rs-phone w-[24px] h-[24px] flex items-center justify-center text-[20px] mr-[26px]" />
                <p className="text-[18px] font-medium leading-[21px]">ХОЛБОО БАРИХ</p>
            </div>
            <div className="border-t border-b w-full border-[#D4D8D8] flex flex-row items-center justify-center gap-[19px] py-[30px] mt-[137px]">
                <span className="icon-fi-rs-fb text-[22px]" />
                <span className="icon-fi-rs-ig text-[22px]" />
                <span className="icon-fi-rs-tw text-[22px]" />
                <span className="icon-fi-rs-yt text-[22px]" />
            </div>
            <p className="text-[#555555] text-[15px] mt-[30px] text-center">©2023 “Саак Холдинг” ХХК</p>
        </div>
    )
}
