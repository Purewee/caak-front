import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Popover, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { FIcon } from '../icon';

const menuItems = [
  { title: 'ВИДЕО', link: 'https://www.youtube.com/c/caakvideo' },
  { title: 'ПОДКАСТ', link: 'https://soundcloud.com/caak-podcast' },
  { title: 'РАДИО', link: 'https://www.caak.mn/radio/' },
  { title: 'TOP 100' },
  { title: 'МЭДЭЭНИЙ ТӨРӨЛ', sub: [{ title: 'Улс төр' }, { title: 'Нийгэм' }] },
];

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

const Categories = () => {
  const { data, loading } = useQuery(CATEGORIES);
  const [open, setOpen] = useState(false);
  const categories = data?.categories?.nodes || [];

  const toggleMenu = () => {
    setOpen(!open);
  };

  const hide = () => {
    setOpen(false);
  };

  if (loading) {
    return <Skeleton />;
  }

  return (
    <ul className="hidden md:block font-bold text-[14px] p-0 ml-[20px]">
      {menuItems.map((item, index) => {
        return (
          <li key={index} className="flex flex-row relative items-center list-none mr-[40px] cursor-pointer float-left">
            {item.link && (
              <a rel="noreferrer" href={item.link} target="_blank">
                <p className="hover:text-caak-primary font-bold text-[14px] leading-[16px] select-none tracking-[0px]">
                  {item.title}
                </p>
              </a>
            )}
            {item.sub && (
              <Popover
                placement="bottom"
                trigger="click"
                overlayClassName="padding_zero"
                className="leading-[16px] tracking-[0px]"
                overlayInnerStyle={{ borderRadius: 8 }}
                onOpenChange={toggleMenu}
                content={
                  <div className="p-[30px] flex flex-row gap-x-[50px]">
                    {categories.map((x, index) => {
                      return (
                        x.parent === null && (
                          <div
                            key={x.id}
                            className={`flex flex-col gap-y-[16px] pl-[19px] ${
                              index > 0 && 'border-l border-[#EFEEEF]'
                            }`}
                          >
                            {x.childs?.nodes?.length > 0 ? (
                              <p className="text-[#111111] condMedium leading-[19px] tracking-[0.24px] text-[16px]">
                                {x.name}
                              </p>
                            ) : (
                              <Link
                                className="text-[#555555] condMedium hover:text-caak-primary leading-[20px] hover:tracking-[0.23px] tracking-[0.24px] text-[17px]"
                                to={`/category/${x.slug}`}
                                onClick={hide}
                              >
                                {x.name}
                              </Link>
                            )}
                            {x.childs?.nodes?.map((data, index) => {
                              return (
                                <Link
                                  className="text-[#555555] font-condensed hover:text-caak-primary leading-[20px] hover:tracking-[0.23px] tracking-[0.24px] text-[17px]"
                                  to={`/category/${data.slug}`}
                                  key={index}
                                  onClick={hide}
                                >
                                  {data.name}
                                </Link>
                              );
                            })}
                          </div>
                        )
                      );
                    })}
                  </div>
                }
              >
                <p className="hover:text-caak-primary font-bold flex">
                  <span className="select-none">{item.title}</span>
                  <FIcon className="icon-fi-rs-down-chevron text-[14px] h-[14px] text-caak-primary" />
                </p>
              </Popover>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Categories;
