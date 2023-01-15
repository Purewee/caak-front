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
        childs(sort: { direction: asc, field: "position" }, filter: { status: { eq: "active" } }) {
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
  console.log(selected);
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
        visible={open}
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
        <Collapse className="w-full custom borderb" bordered={false} accordion>
          {categories?.map((x, idx) => {
            return (
              x.parent === null && (
                <Collapse.Panel
                  header={
                    <div
                      onClick={() => (selected === null ? setSelected(x.id) : setSelected(null))}
                      className={`flex items-center ${
                        selected !== x.id ? 'justify-between pl-[40px]' : 'pl-[20px]'
                      } cursor-pointer w-full py-[20px] pr-[30px] text-caak-black hover:text-[#555555]`}
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
          className="pt-[24px] text-caak-black border-t border-[#EFEEEF] hover:text-caak-darkGray flex flex-row items-center cursor-pointer pl-[40px] pr-[30px]"
          to={`/channels`}
        >
          <span className="icon-fi-rs-tv text-[#909090] w-[24px] text-[] h-[24px] flex items-center justify-center text-[20px] mr-[26px]" />
          <p className="text-[18px] font-medium leading-[21px]">Сувгууд</p>
        </Link>
        <Link
          onClick={() => setOpen(false)}
          className="mt-[24px] text-caak-black hover:text-caak-darkGray flex flex-row items-center cursor-pointer pl-[40px] pr-[30px]"
          to={`/tags`}
        >
          <span className="icon-fi-rs-hashtag text-[#909090] w-[24px] h-[24px] flex items-center justify-center text-[20px] mr-[26px]" />
          <p className="text-[18px] font-medium leading-[21px]">Тагууд</p>
        </Link>
        <a
          target={'_blank'}
          href="https://www.youtube.com/c/caakvideo"
          className="mt-[24px] flex flex-row text-caak-black hover:text-caak-darkGray items-center cursor-pointer pl-[40px] pr-[30px]"
        >
          <span className="icon-fi-rs-tv text-[#909090] w-[24px] h-[24px] flex items-center justify-center text-[20px] mr-[26px]" />
          <p className="text-[18px] font-medium leading-[21px]">Видео</p>
        </a>
        <a
          target={'_blank'}
          href="https://soundcloud.com/caak-podcast"
          className="mt-[24px] flex flex-row text-caak-black hover:text-caak-darkGray items-center cursor-pointer pl-[40px] pr-[30px]"
        >
          <span className="icon-fi-rs-mic text-[#909090] w-[24px] h-[24px] flex items-center justify-center text-[20px] mr-[26px]" />
          <p className="text-[18px] font-medium leading-[21px]">Подкаст</p>
        </a>
        <a
          target={'_blank'}
          href="https://www.caak.mn/radio"
          className="mt-[24px] flex flex-row text-caak-black hover:text-caak-darkGray items-center cursor-pointer pl-[40px] pr-[30px]"
        >
          <span className="icon-fi-rs-wave text-[#909090] w-[24px] h-[24px] flex items-center justify-center text-[20px] mr-[26px]" />
          <p className="text-[18px] font-medium leading-[21px]">Радио</p>
        </a>
        <div
          onClick={() => {
            navigate('/help/1');
            setOpen(false);
          }}
          className="pt-[26px] mt-[25px] flex flex-row text-caak-black border-t border-[#EFEEEF] hover:text-caak-darkGray items-center cursor-pointer pl-[40px] pr-[30px]"
        >
          <span className="icon-fi-rs-ads text-[#909090] w-[24px] h-[24px] flex items-center justify-center text-[20px] mr-[26px]" />
          <p className="text-[18px] font-medium leading-[21px]">Сурталчилгаа</p>
        </div>
        <div
          onClick={() => {
            navigate('/help/2');
            setOpen(false);
          }}
          className="mt-[23px] flex flex-row text-caak-black hover:text-caak-darkGray items-center cursor-pointer pl-[40px] pr-[30px]"
        >
          <span className="icon-fi-rs-phone text-[#909090] w-[24px] h-[24px] flex items-center justify-center text-[20px] mr-[26px]" />
          <p className="text-[18px] font-medium leading-[21px]">Холбоо барих</p>
        </div>
        <div className="border-t w-full border-[#EFEEEF] flex flex-row items-center justify-center gap-[19px] pt-[30px] pb-[10px] mt-[26px]">
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
        {/* <p className="text-[#555555] text-[15px] mt-[30px] text-center">©2022 “Саак Холдинг” ХХК</p> */}
      </Drawer>
    </>
  );
}
