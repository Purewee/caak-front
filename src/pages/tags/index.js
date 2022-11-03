import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Skeleton } from 'antd';

const colors = [
  'rgb(170, 109, 228, 0.06)',
  'rgb(255, 102, 0, 0.06)',
  'rgb(59, 68, 145, 0.06)',
  'rgb(37, 124, 238, 0.06)',
  'rgb(55, 175, 55, 0.06)',
];

const colors1 = ['#AA6DE4', '#FF6600', '#3B4491', '#257CEE', '#37AF37'];

const TAGS = gql`
  query GetTags {
    tags(sort: { field: "articles_count", direction: desc }) {
      edges {
        node {
          id
          name
          articlesCount
          slug
          articles {
            nodes {
              id
            }
          }
        }
      }
    }
  }
`;

export default function AllTags() {
  const { data, loading } = useQuery(TAGS);
  const tags = data?.tags.edges.map((x) => x.node) || [];
  return (
    <div className="flex flex-col items-center">
      <p className="text-black text-[38px] font-bold font-condensed flex flex-row items-center mt-[71px] mb-[40px]">
        <span className="text-caak-primary text-[24px] mr-[12px] icon-fi-rs-hashtag" />
        ТАГУУД
      </p>
      <div className="bg-[#F5F5F5] w-full pt-[50px] flex justify-center pb-[62px]">
        {loading && <Skeleton />}
        <div className="max-w-[1310px] flex flex-wrap justify-center gap-[18px]">
          {tags.map((tag, index) => {
            const random = Math.floor(Math.random() * 5);
            const color = colors[random];
            const color1 = colors1[random];
            return (
              <Link
                key={index}
                to={`/tags/${tag.slug}`}
                className="w-[314px] h-[78px] bg-white rounded-[4px] border border-[#EFEEEF] flex flex-row items-center pl-[16px]"
              >
                <div
                  className="w-[46px] h-[46px] rounded-[4px] flex justify-center items-center"
                  style={{ backgroundColor: color }}
                >
                  <p style={{ color: color1 }} className="font-roboto text-white font-medium opacity-100 text-[18px]">
                    #
                  </p>
                </div>
                <div className="ml-[14px]">
                  <p className="text-[#111111] text-[17px] leading-[20px]">#{tag.name}</p>
                  <p className="text-[#707070] text-[13px] leading-[15px] mt-[4px]">{tag.articlesCount} Мэдээтэй</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
