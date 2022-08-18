import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Popover, Skeleton, Row, Col } from 'antd';
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

const Categories = () => {
  const { data, loading } = useQuery(CATEGORIES);
  const [open, setOpen] = useState(false);
  const categories = data?.categories?.nodes || [];
  if (loading) {
    return <Skeleton />;
  }

  return (
    <ul className="hidden md:block text-[#555555] font-bold text-[14px] p-0 ml-[20px]">
      {menuItems.map((item, index) => {
        return (
          <li key={index} className="flex flex-row relative items-center list-none mr-[40px] cursor-pointer float-left">
            {item.link && (
              <a rel="noreferrer" href={item.link} target="_blank">
                <p className="hover:text-caak-primary font-bold text-[14px] leading-[16px] tracking-[0px]">
                  {item.title}
                </p>
              </a>
            )}
            {item.sub && (
              <Popover
                placement="bottom"
                trigger="click"
                className="leading-[16px] tracking-[0px]"
                overlayInnerStyle={{ borderRadius: 8 }}
                visible={open}
                content={
                  <div className="p-[12px] flex flex-row gap-x-[50px]">
                    {categories.map((x, index) => {
                      return (
                        x.parent === null && (
                          <div
                            key={x.id}
                            className={`flex flex-col gap-y-[16px] pl-[19px] ${
                              index > 0 && 'border-l border-[#EFEEEF]'
                            }`}
                          >
                            <Link
                              className="text-[#111111] condMedium hover:text-caak-primary hover:leading-[18px] leading-[19px] hover:tracking-[0.23px] tracking-[0.24px] hover:text-[15px] text-[16px]"
                              to={`/category/${x.slug}`}
                              onClick={() => setOpen(false)}
                            >
                              {x.name}
                            </Link>
                            {x.childs?.nodes?.map((data, index) => {
                              return (
                                <Link
                                  className="text-[#555555] font-condensed hover:text-caak-primary leading-[20px] hover:tracking-[0.23px] tracking-[0.24px] text-[17px]"
                                  to={`/category/${data.slug}`}
                                  key={index}
                                  onClick={() => setOpen(false)}
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
                <p className="hover:text-caak-primary font-bold flex" onClick={() => setOpen(!open)}>
                  <span>{item.title}</span>
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
