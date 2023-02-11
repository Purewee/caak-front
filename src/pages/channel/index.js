import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Button, Col, Skeleton, Statistic } from 'antd';
import { ESService } from '../../lib/esService';
import { Tabs } from 'antd';
import PostCard from '../../component/card/Post';
import { imagePath } from '../../utility/Util';
import { useAuth } from '../../context/AuthContext';
import useMediaQuery from '../../component/navigation/useMediaQuery';

const SOURCE = gql`
  query GetSource($id: ID!) {
    source(id: $id) {
      id
      name
      domain
      icon
      slug
      followersCount
      following
      followers(first: 10) {
        nodes {
          user {
            id
            firstName
            lastName
            avatar
          }
        }
      }
    }
  }
`;

const FOLLOW = gql`
  mutation Follow($id: ID!) {
    toggleFollow(input: { targetType: "source", targetId: $id })
  }
`;
const sortMap = {
  recent: { publish_date: 'desc' },
  top: { views_count: 'desc' },
};

export default function Channel() {
  const { isAuth, openModal } = useAuth();
  const { id } = useParams();
  const { data, loading: fetching, refetch } = useQuery(SOURCE, { variables: { id } });
  const es = new ESService('caak');
  const source = data?.source || {};
  const [sort, setSort] = useState('recent');
  const [count, setCount] = useState(0);
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [follow, { loading: saving }] = useMutation(FOLLOW, { variables: { id } });
  const isMobile = useMediaQuery(767);

  useEffect(() => {
    setLoading(true);
    es.sourcePosts(id, { size: 24, sort: sortMap[sort] }).then(({ hits, total }) => {
      setArticles(hits);
      setCount(total);
      setLoading(false);
    });
  }, [id, sort]);

  useEffect(() => {
    if (page === 0) return;
    setLoading(true);
    es.sourcePosts(id, { from: 24 * page, size: 24, sort: sortMap[sort] }).then(({ hits }) => {
      setArticles([...articles, ...hits]);
      setLoading(false);
    });
  }, [page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (fetching) return <Skeleton />;

  return (
    <div className="flex flex-col w-full items-center mb-[100px] px-[16px] sm:px-0">
      <img
        className="w-[94px] h-[94px] rounded-full mt-[30px] md:mt-[51px]"
        alt={source.domain}
        src={imagePath(source.icon)}
      />
      <p className="text-black text-[30px] font-condensed font-bold leading-[35px] mt-[16px]">
        {source.name || source.domain}
      </p>
      <div className="flex flex-row items-center mt-[18px] text-[15px]">
        <Statistic title="нийтлэл" value={count} className="text-center" />
        <Statistic title="дагагч" value={source.followersCount} className="ml-[20px] text-center" />
      </div>
      <div className="flex flex-row items-center mt-[20px]">
        {source.following ? (
          <button
            className="w-[90px] h-[34px] bg-caak-darkGray rounded-[4px] text-white text-[15px] font-bold"
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
            className="w-[90px] h-[34px] bg-caak-primary rounded-[4px] text-white text-[15px] font-medium"
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
      <Tabs
        defaultActiveKey="recent"
        onChange={(e) => {
          setSort(e);
        }}
        className="w-full max-w-[1310px] flex items-center mt-[40px] border-b border-[#EFEEEF] text-[18px]"
      >
        <Tabs.TabPane
          tab={
            <p
              className={`text-[18px] leading-[21px] font-bold ${
                sort === 'recent' ? 'text-caak-black' : 'text-caak-darkGray'
              }`}
            >
              ШИНЭ
            </p>
          }
          key="recent"
        />
        <Tabs.TabPane
          tab={
            <p
              className={`text-[18px] leading-[21px] font-bold ${
                sort === 'top' ? 'text-caak-black' : 'text-caak-darkGray'
              }`}
            >
              ШИЛДЭГ
            </p>
          }
          key="top"
        />
      </Tabs>
      <div className="max-w-[1310px] w-full flex flex-wrap justify-center 2xl:justify-start gap-x-[22px] gap-y-[20px] sm:gap-y-[40px] pt-[30px] md:pt-[50px]">
        {articles.map((post) => (
          <Col key={post.id}>
            <PostCard post={post} isMobile={isMobile} />
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
  );
}
