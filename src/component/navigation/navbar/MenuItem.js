import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Button, Popover, Skeleton, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

const menuItems = [
  { title: 'ВИДЕО', link: 'https://www.youtube.com/c/caakvideo' },
  { title: 'ПОДКАСТ', link: 'https://soundcloud.com/caak-podcast' },
  { title: 'РАДИО', link: 'https://www.caak.mn/radio/' },
  { title: 'TOP 100' },
  { title: 'МЭДЭЭНИЙ ТӨРӨЛ', sub: [{ title: 'Улс төр' }, { title: 'Нийгэм' }] },
];

const CATEGORIES = gql`
  query GetCategories {
    categories(sort: { direction: asc, field: "position" }) {
      nodes {
        id
        name
        slug
        position
      }
    }
  }
`;

const MenuItems = ({ navBarStyle }) => {
  const { data, loading } = useQuery(CATEGORIES);
  const categories = data?.categories?.nodes || [];
  if (loading) {
    return <Skeleton />;
  }

  return (
    <ul className={`${navBarStyle ? 'text-white' : 'text-[#555555]'} font-bold text-[14px] p-0 ml-[40px]`}>
      {menuItems.map((item, index) => {
        return (
          <li
            key={index}
            className={'flex flex-row relative items-center list-none mr-[40px] cursor-pointer float-left'}
          >
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
                className="font-bold text-[14px] leading-[16px] tracking-[0px]"
                overlayStyle={{ width: 800 }}
                overlayInnerStyle={{ borderRadius: 8 }}
                content={
                  <Row gutter={24} className="p-[12px]">
                    {categories?.map((x) => {
                      return (
                        <Col key={x.id} span={8} className="mt-[12px]">
                          <Link to={`/tags/${x.slug}`} key={x.id}>
                            <span className="text-[#111111] p-[8px] leading-[18px] tracking-[0.23px] font-roboto font-normal text-[15px]">
                              {x.name}
                            </span>
                          </Link>
                        </Col>
                      );
                    })}
                  </Row>
                }
              >
                <p className="hover:text-caak-primary">
                  <span>{item.title}</span>
                  <span className={'icon-fi-rs-down-chevron text-[12px] text-caak-primary px-[8px]'} />
                </p>
              </Popover>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default MenuItems;
