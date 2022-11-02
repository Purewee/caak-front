import React, { useState } from 'react';
import { Skeleton, Drawer, Collapse } from 'antd';
import { gql, useQuery } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { FIcon } from '../icon';
import Logo from '../logo';
import Search from './search';

const CATEGORIES = gql`
  query GetCategories {
    categories(sort: { direction: asc, field: "position" }, filter: { status: { eq: "active" } }) {
      nodes {
        id
        name
        slug
        position
        parent {
          id
          name
          slug
        }
        childs(sort: { direction: asc, field: "position" }) {
          nodes {
            id
            name
            position
            slug
          }
        }
      }
    }
  }
`;

export default function DrawerMenu({ isMobile }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const { data, loading } = useQuery(CATEGORIES);
  const categories = data?.categories?.nodes;

  const navigate = useNavigate();

  if (loading) {
    return <Skeleton />;
  }

  return (
    <>
      <span
        className={`icon-fi-rs-hamburger-menu ${isMobile && 'text-caak-black'} text-[22px] cursor-pointer`}
        onClick={() => setOpen(!open)}
      />
      <Drawer
        open={open}
        width={380}
        placement="left"
        headerStyle={{ padding: 30 }}
        onClose={() => setOpen(false)}
        className="font-condensed caak-menu"
        closeIcon={false}
        bodyStyle={{ paddingInline: 0, paddingTop: 0, scrollbarWidth: 0 }}
        title={
          <div className="flex flex-row items-center justify-between w-full">
            <Search drawer />
            <Logo />
            <FIcon
              className="icon-fi-rs-close"
              onClick={() => {
                setOpen(false);
              }}
            />
          </div>
        }
      >
        <Collapse className="w-full custom" bordered={false} accordion>
          {categories?.map((x, idx) => {
            return (
              x.parent === null && (
                <Collapse.Panel
                  header={
                    <div
                      onClick={() => setSelected(x.id)}
                      className={`flex items-center ${
                        selected !== x.id ? 'justify-between pl-[40px]' : 'pl-[20px]'
                      } cursor-pointer w-full py-[20px] border-b pr-[30px] text-caak-black hover:text-[#555555]`}
                    >
                      {selected === x.id && (
                        <span className="icon-fi-rs-down-chevron text-[#FF6600] text-[16px] rotate-90 mr-[8px]" />
                      )}
                      <p className="text-[20px] font-condensed leading-[24px]">{x.name}</p>
                      {selected !== x.id && (
                        <span className="icon-fi-rs-down-chevron text-[#FF6600] text-[16px] -rotate-90" />
                      )}
                    </div>
                  }
                  key={idx}
                  showArrow={false}
                >
                  <div className="ml-[60px] flex flex-col pr-[30px] custom">
                    {x.childs?.nodes?.map((child, index) => {
                      return (
                        <Link onClick={() => setOpen(false)} key={index} to={`/category/${child.slug}`}>
                          <div className="flex items-center cursor-pointer justify-between w-full py-[20px] border-b">
                            <p className="text-[18px] font-roboto leading-[21px] text-[#555555]">{child.name}</p>
                            <span className="icon-fi-rs-down-chevron text-[#BBBEBE] text-[16px] -rotate-90" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </Collapse.Panel>
              )
            );
          })}
        </Collapse>
        <Link
          onClick={() => setOpen(false)}
          className="mt-[40px] text-caak-black hover:text-caak-darkGray flex flex-row items-center cursor-pointer pl-[40px] pr-[30px]"
          to={`/channels`}
        >
          <span className="icon-fi-rs-tv w-[24px] h-[24px] flex items-center justify-center text-[20px] mr-[26px]" />
          <p className="text-[18px] font-medium leading-[21px]">СУВГУУД</p>
        </Link>
        <Link
          onClick={() => setOpen(false)}
          className="mt-[40px] text-caak-black hover:text-caak-darkGray flex flex-row items-center cursor-pointer pl-[40px] pr-[30px]"
          to={`/tags`}
        >
          <span className="icon-fi-rs-hashtag w-[24px] h-[24px] flex items-center justify-center text-[20px] mr-[26px]" />
          <p className="text-[18px] font-medium leading-[21px]">ТАГУУД</p>
        </Link>
        <a
          target={'_blank'}
          href="https://www.youtube.com/c/caakvideo"
          className="mt-[40px] flex flex-row text-caak-black hover:text-caak-darkGray items-center cursor-pointer pl-[40px] pr-[30px]"
        >
          <span className="icon-fi-rs-tv w-[24px] h-[24px] flex items-center justify-center text-[20px] mr-[26px]" />
          <p className="text-[18px] font-medium leading-[21px]">ВИДЕО</p>
        </a>
        <a
          target={'_blank'}
          href="https://soundcloud.com/caak-podcast"
          className="mt-[40px] flex flex-row text-caak-black hover:text-caak-darkGray items-center cursor-pointer pl-[40px] pr-[30px]"
        >
          <span className="icon-fi-rs-mic w-[24px] h-[24px] flex items-center justify-center text-[20px] mr-[26px]" />
          <p className="text-[18px] font-medium leading-[21px]">ПОДКАСТ</p>
        </a>
        <a
          target={'_blank'}
          href="https://www.caak.mn/radio"
          className="mt-[40px] flex flex-row text-caak-black hover:text-caak-darkGray items-center cursor-pointer pl-[40px] pr-[30px]"
        >
          <span className="icon-fi-rs-wave w-[24px] h-[24px] flex items-center justify-center text-[20px] mr-[26px]" />
          <p className="text-[18px] font-medium leading-[21px]">РАДИО</p>
        </a>
        <div
          onClick={() => {
            navigate('/help', { state: 1 });
            setOpen(false);
          }}
          className="mt-[40px] flex flex-row text-caak-black hover:text-caak-darkGray items-center cursor-pointer pl-[40px] pr-[30px]"
        >
          <span className="icon-fi-rs-ads w-[24px] h-[24px] flex items-center justify-center text-[20px] mr-[26px]" />
          <p className="text-[18px] font-medium leading-[21px]">СУРТАЛЧИЛГАА</p>
        </div>
        <div
          onClick={() => {
            navigate('/help', { state: 2 });
            setOpen(false);
          }}
          className="mt-[40px] flex flex-row text-caak-black hover:text-caak-darkGray items-center cursor-pointer pl-[40px] pr-[30px]"
        >
          <span className="icon-fi-rs-phone w-[24px] h-[24px] flex items-center justify-center text-[20px] mr-[26px]" />
          <p className="text-[18px] font-medium leading-[21px]">ХОЛБОО БАРИХ</p>
        </div>
        <div className="border-t border-b w-full border-[#D4D8D8] flex flex-row items-center justify-center gap-[19px] py-[30px] mt-[137px]">
          <a href="https://www.facebook.com/caakweb" className="h-[22px]" target={`_blank`}>
            <span className="icon-fi-rs-fb text-[22px]" />
          </a>
          <a href="https://www.instagram.com/caak.mn/" className="h-[22px]" target={`_blank`}>
            <span className="icon-fi-rs-ig text-[22px]" />
          </a>
          <a href="https://twitter.com/caaktwt" className="h-[22px]" target={`_blank`}>
            <span className="icon-fi-rs-tw text-[22px]" />
          </a>
          <a href="https://www.youtube.com/c/caakvideo" className="h-[22px]" target={`_blank`}>
            <span className="icon-fi-rs-yt text-[22px]" />
          </a>
        </div>
        <p className="text-[#555555] text-[15px] mt-[30px] text-center">©2022 “Саак Холдинг” ХХК</p>
      </Drawer>
    </>
  );
}
