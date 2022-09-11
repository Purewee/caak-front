import React, { useEffect, useState, useContext } from 'react';
import { Tabs, Statistic, Button, Row, Col, Skeleton } from 'antd';
import { ESService } from '../../lib/esService';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import PostCard from '../../component/card/Post';
import { HashTag, Title } from '../post/view/wrapper';
import { AppContext } from '../../App';
import { BellOutlined, HeartOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';

const CATEGORY = gql`
  query GetCategory($slug: String) {
    category(slug: $slug) {
      id
      name
      slug
      status
      following
      followersCount
    }
  }
`;
const FOLLOW = gql`
  mutation Follow($id: ID!) {
    toggleFollow(input: { targetType: "category", targetId: $id })
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
  const category = data?.category || {};
  const [sort, setSort] = useState('recent');
  const [count, setCount] = useState(0);
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [follow, { loading: saving }] = useMutation(FOLLOW, { variables: { id: category?.id } });

  useEffect(() => {
    setLoading(true);
    es.categoryPosts(slug, { size: 24, sort: sortMap[sort] }).then(({ hits, total }) => {
      setArticles(hits);
      setCount(total);
      setLoading(false);
    });
  }, [slug, sort]);

  useEffect(() => {
    if (page === 0) return;
    setLoading(true);
    es.categoryPosts(slug, { from: 24 * page, size: 24, sort: sortMap[sort] }).then(({ hits }) => {
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
      <div className="max-w-[1310px] w-full flex flex-col items-center">
        <HashTag className="uppercase">Мэдээний төрөл</HashTag>
        <div className="flex flex-col sm:flex-row items-center justify-center relative w-full">
          <p className="text-[38px] font-condensed font-bold leading-[44px] uppercase">{category.name}</p>
          <div className="flex flex-row items-center mt-[20px] sm:mt-0 sm:absolute top-0 right-0">
            {category.following ? (
              <button
                className="w-[90px] h-[34px] bg-caak-darkGray rounded-[4px] text-white text-[15px] font-bold"
                onClick={() => {
                  if (isAuth) {
                    follow().then(() => {
                      refetch().then(console.log);
                    });
                  }
                }}
              >
                ДАГАСАН
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
                  }
                }}
              >
                ДАГАХ
              </Button>
            )}
            <div className="w-[42px] h-[34px] flex justify-center items-center border rounded-[4px] ml-[10px] cursor-pointer">
              <span className="icon-fi-rs-more-ver rotate-90 text-[18px]" />
            </div>
          </div>
        </div>
        <div className="flex mt-[10px]">
          <Statistic title="нийтлэл" value={count} className="mx-[24px] text-center" />
          <Statistic title="дагагч" value={category.followersCount} className="text-center font-condensed" />
        </div>
        <Tabs
          defaultActiveKey="recent"
          onChange={(e) => {
            setSort(e);
          }}
          className="mt-[35px]"
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
        <div className="max-w-[1310px] w-full flex flex-wrap justify-center 2xl:justify-start gap-x-[22px] gap-y-[40px] pt-[30px] md:pt-[70px]">
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
                className="font-roboto mt-[24px] text-caak-primary border-caak-primary"
                onClick={() => setPage(page + 1)}
                loading={loading}
              >
                Цааш үзэх
              </Button>
            </Col>
          )}
        </div>
      </div>
    </div>
  );
}
