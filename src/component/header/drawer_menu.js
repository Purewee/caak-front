import React, { useState } from 'react';
import logoIcon from '../../images/New-Logo.svg';
import { Skeleton, Drawer, Collapse } from 'antd';
import { gql, useQuery } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { FIcon } from '../icon';

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

export default function DrawerMenu() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { data, loading } = useQuery(CATEGORIES);
  const categories = data?.categories?.nodes || [];

  if (loading) {
    return <Skeleton />;
  }

  return (
    <>
      <span className="icon-fi-rs-hamburger-menu text-[22px] cursor-pointer" onClick={() => setOpen(!open)} />
      <Drawer
        visible={open}
        width={380}
        placement="left"
        onClose={() => setOpen(false)}
        className="font-condensed caak-menu"
        closeIcon={false}
        bodyStyle={{ padding: 50 }}
        title={
          <div className="flex flex-row items-center justify-between w-full">
            <FIcon className="icon-fi-rs-search" />
            <img src={logoIcon} className="cursor-pointer w-[130px] object-contain" alt="Caak Logo" />
            <FIcon
              className="icon-fi-rs-close"
              onClick={() => {
                setOpen(false);
              }}
            />
          </div>
        }
      >
        <Collapse bordered={false} ghost>
          <Collapse.Panel
            header={
              <div className="flex items-center cursor-pointer">
                <FIcon className="icon-fi-rs-plus text-[#FF6600] mr-[26px]" />
                <p className="text-[18px] font-medium leading-[21px] hover:text-[#555555]">МЭДЭЭНИЙ ТӨРӨЛ</p>
              </div>
            }
            key="1"
            showArrow={false}
            className="p-0"
          >
            <div className="ml-[36px] mt-[20px] flex flex-col gap-[20px]">
              {categories.map((data, index) => {
                return (
                  <Link onClick={() => setOpen(false)} key={index} to={`/category/${data.slug}`}>
                    <p className="text-[#111111] leading-[20px] text-[14px] font-condensed">{data.name}</p>
                  </Link>
                );
              })}
            </div>
          </Collapse.Panel>
        </Collapse>

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
        <Link
          to="/help"
          onClick={() => {
            setOpen(false);
          }}
          className="mt-[40px] flex flex-row text-caak-black hover:text-caak-darkGray items-center cursor-pointer"
        >
          <span className="icon-fi-rs-ads w-[24px] h-[24px] flex items-center justify-center text-[20px] mr-[26px]" />
          <p className="text-[18px] font-medium leading-[21px]">СУРТАЛЧИЛГАА</p>
        </Link>
        <Link
          to="/help"
          onClick={() => {
            setOpen(false);
          }}
          className="mt-[40px] flex flex-row text-caak-black hover:text-caak-darkGray items-center cursor-pointer"
        >
          <span className="icon-fi-rs-phone w-[24px] h-[24px] flex items-center justify-center text-[20px] mr-[26px]" />
          <p className="text-[18px] font-medium leading-[21px]">ХОЛБОО БАРИХ</p>
        </Link>
        <div className="border-t border-b w-full border-[#D4D8D8] flex flex-row items-center justify-center gap-[19px] py-[30px] mt-[137px]">
          <span className="icon-fi-rs-fb text-[22px]" />
          <span className="icon-fi-rs-ig text-[22px]" />
          <span className="icon-fi-rs-tw text-[22px]" />
          <span className="icon-fi-rs-yt text-[22px]" />
        </div>
        <p className="text-[#555555] text-[15px] mt-[30px] text-center">©2022 “Саак Холдинг” ХХК</p>
      </Drawer>
    </>
  );
}