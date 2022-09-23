import React, { useEffect, useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Avatar, Button, Skeleton, Tabs } from 'antd';
import { imagePath } from '../../utility/Util';
import { useAuth } from '../../context/AuthContext';
import { sortBy } from 'lodash';

const FOLLOW = gql`
  mutation Follow($id: ID!) {
    toggleFollow(input: { targetType: "source", targetId: $id })
  }
`;

const CATEGORIES = gql`
  query GetSourceCategories {
    sourceCategories
  }
`;

const SOURCES = gql`
  query GetSources($filter: SourceFilter) {
    sources(filter: $filter, sort: { field: "articles_count", direction: desc }) {
      totalCount
      edges {
        node {
          id
          category
          name
          icon
          domain
          articlesCount
          slug
          following
          followersCount
        }
      }
    }
  }
`;

export default function Channels() {
  const [filter, setFilter] = useState('all');
  const { isAuth, openModal } = useAuth();
  const { data, loading, refetch } = useQuery(SOURCES, {
    variables: filter !== 'all' ? { filter: { category: { eq: filter } } } : {},
  });
  const { data: data_cat, loading: loading_cat } = useQuery(CATEGORIES);
  const categories = data_cat?.sourceCategories || [];
  const channels = data?.sources.edges.map((x) => x.node) || [];
  const [follow, { loading: saving }] = useMutation(FOLLOW);
  return (
    <div className="flex flex-col items-center">
      <p className="text-black text-[38px] font-bold font-condensed flex flex-row items-center mt-[71px] mb-[40px]">
        <span className="text-caak-primary text-[24px] mr-[12px] icon-fi-rs-rss-o" />
        СУВГУУД
      </p>
      <Tabs onChange={(e) => setFilter(e)} loading={loading_cat} activeKey={filter}>
        <Tabs.TabPane key="all" tab={<span className="font-condensed">БҮГД</span>} />
        {categories.map((x) => (
          <Tabs.TabPane key={x} tab={<span className="font-condensed">{x}</span>} />
        ))}
      </Tabs>
      <div className="bg-[#F5F5F5] w-full pt-[50px] flex justify-center pb-[62px]">
        {loading && <Skeleton />}
        <div className="max-w-[1312px] flex flex-wrap justify-center gap-[18px]">
          {sortBy(channels, 'id').map((source, index) => {
            return (
              <div
                key={index}
                className="w-[248px] h-[256px] bg-white flex rounded-[4px] border border-[#EFEEEF] hover:border hover:border-[#BBBEBE] flex-col items-center px-[20px] justify-between py-[24px]"
              >
                <div className="flex flex-col items-center">
                  <Link to={`/channel/${source.id}`}>
                    <Avatar className="h-[64px] w-[64px]" src={imagePath(source.icon)} />
                  </Link>
                  <Link
                    className="text-black font-medium text-[17px] leading-[20px] mt-[10px]"
                    to={`/channel/${source.id}`}
                  >
                    {source.name}
                  </Link>
                  <p className="text-caak-darkGray mt-[24px] text-[15px] leading-[18px] truncate-2 text-center">
                    {source.slug}
                  </p>
                </div>
                {source.following ? (
                  <button
                    className="w-[90px] h-[34px] bg-caak-darkGray rounded-[4px] text-white text-[15px] font-bold"
                    onClick={() => {
                      if (isAuth) {
                        follow({ variables: { id: source.id } }).then(() => {
                          refetch().then(console.log);
                        });
                      } else {
                        openModal('login');
                      }
                    }}
                  >
                    ДАГАСАН
                  </button>
                ) : (
                  <Button
                    type="primary"
                    className="w-[90px] h-[34px] bg-caak-primary rounded-[4px] text-white text-[15px] font-bold"
                    onClick={() => {
                      if (isAuth) {
                        follow({ variables: { id: source.id } }).then(() => {
                          refetch().then(console.log);
                        });
                      } else {
                        openModal('login');
                      }
                    }}
                  >
                    ДАГАХ
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
