import React, { useEffect, useState, useContext } from 'react';
import { Tabs, Statistic, Button, Col, Skeleton } from 'antd';
import { ESService } from '../../lib/esService';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import PostCard from '../../component/card/Post';
import { AppContext } from '../../App';
import { useAuth } from '../../context/AuthContext';

const CATEGORY = gql`
  query getTag($slug: String) {
    tag(slug: $slug) {
      id
      name
      slug
      followersCount
      following
    }
  }
`;

const FOLLOW = gql`
  mutation Follow($id: ID!) {
    toggleFollow(input: { targetType: "tag", targetId: $id })
  }
`;
const sortMap = {
  recent: { publish_date: 'desc' },
  top: { views_count: 'desc' },
};

export default function Category() {
  const context = useContext(AppContext);
  const es = new ESService('caak');
  const { isAuth, openModal } = useAuth();
  const { slug } = useParams();
  const { data, refetch } = useQuery(CATEGORY, { variables: { slug } });
  const category = data?.tag || {};
  const [sort, setSort] = useState('recent');
  const [count, setCount] = useState(0);
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [follow, { loading: saving }] = useMutation(FOLLOW, { variables: { id: category?.id } });

  useEffect(() => {
    setLoading(true);
    es.tagPosts(slug, { size: 24, sort: sortMap[sort] }).then(({ hits, total }) => {
      setArticles(hits);
      setCount(total);
      setLoading(false);
    });
  }, [slug, sort]);

  useEffect(() => {
    if (page === 0) return;
    setLoading(true);
    es.tagPosts(slug, { from: 24 * page, size: 24, sort: sortMap[sort] }).then(({ hits }) => {
      setArticles([...articles, ...hits]);
      setLoading(false);
    });
  }, [page]);

  useEffect(() => {
    context.setStore('default');
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex justify-center pt-[20px] md:pt-[51px] pb-[100px] px-[16px] md:px-[0px]">
      <div className="max-w-[1310px] w-full flex flex-col items-center relative">
        <p className="font-condensed text-center font-bold text-[30px] leading-[36px] sm:text-[38px] sm:leading-[44px] uppercase">
          #{category.name}
        </p>
        <div className="flex flex-row items-center sm:absolute mt-[20px] sm:mt-0 top-0 right-0">
          {category.following ? (
            <button
              className="w-[90px] h-[34px] bg-caak-darkGray flex justify-center items-center rounded-[4px] text-white text-[15px] font-bold"
              onClick={() => {
                if (isAuth) {
                  follow().then(() => {
                    refetch().then(console.log);
                  });
                } else {
                  openModal('login');
                }
              }}
            >
              Дагасан
            </button>
          ) : (
            <Button
              type="primary"
              loading={saving}
              className="w-[90px] h-[34px] bg-caak-primary rounded-[4px] text-white text-[15px] font-bold"
              onClick={() => {
                if (isAuth) {
                  follow().then(() => {
                    refetch().then(console.log);
                  });
                } else {
                  openModal('login');
                }
              }}
            >
              Дагах
            </Button>
          )}
          <div className="w-[42px] h-[34px] flex justify-center items-center border rounded-[4px] ml-[10px] cursor-pointer">
            <span className="icon-fi-rs-more-ver rotate-90 text-[18px]" />
          </div>
        </div>
        <div className="flex mt-[10px] font-roboto">
          <Statistic title="нийтлэл" value={count} className="text-center text-[15px] leading-[18px]" />
          <Statistic
            title="дагагч"
            value={category.followersCount}
            className="text-center text-[15px] leading-[18px] ml-[20px]"
          />
        </div>
        <Tabs
          defaultActiveKey="recent"
          onChange={(e) => {
            setSort(e);
          }}
          className="mt-[48px] flex items-center w-full border-t border-b"
        >
          <Tabs.TabPane
            tab={
              <span
                className={`text-[18px] font-bold leading-[21px] ${
                  sort === 'recent' ? 'text-[#111111]' : 'text-[#555555]'
                }`}
              >
                ШИНЭ
              </span>
            }
            key="recent"
          />
          <Tabs.TabPane
            tab={
              <span
                className={`text-[18px] font-bold leading-[21px] ${
                  sort === 'top' ? 'text-[#111111]' : 'text-[#555555]'
                }`}
              >
                ШИЛДЭГ
              </span>
            }
            key="top"
          />
        </Tabs>
        <div className="max-w-[1310px] w-full flex flex-wrap justify-center xl:justify-start gap-x-[22px] gap-y-[40px] pt-[30px] md:pt-[50px]">
          {articles.map((post) => (
            <Col key={post.id}>
              <PostCard post={post} />
            </Col>
          ))}
          {loading && <Skeleton />}
          {count > 24 * (page + 1) && (
            <Col span={24}>
              <Button
                block
                size="large"
                className="font-roboto font-medium mt-[24px] h-[74px] text-caak-primary border-caak-primary"
                onClick={() => setPage(page + 1)}
                loading={loading}
              >
                Илүү ихийг үзэх
                <span className="icon-fi-rs-down-chevron text-[14px] ml-[8px]" />
              </Button>
            </Col>
          )}
        </div>
      </div>
    </div>
  );
}
