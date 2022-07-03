import React, { useEffect, useState, useContext } from 'react';
import { Tabs, Statistic, Button, Row, Col, Skeleton } from 'antd';
import { ESService } from '../../lib/esService';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import PostCard from '../../component/card/Post';
import { HashTag, Title } from '../post/view/wrapper';
import { AppContext } from '../../App';

const CATEGORY = gql`
  query GetCategory($slug: String) {
    category(slug: $slug) {
      id
      name
      slug
      status
    }
  }
`;

const sortMap = {
  recent: { publish_date: 'desc' },
  top: { views_count: 'desc' },
};

export default function Category() {
  const context = useContext(AppContext);
  const es = new ESService('caak');
  const { slug } = useParams();
  const { data } = useQuery(CATEGORY, { variables: { slug } });
  const category = data?.category || {};
  const [sort, setSort] = useState('recent');
  const [count, setCount] = useState(0);
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="flex justify-center pt-[20px] md:pt-[51px] pb-[100px] px-[16px]">
      <div className="max-w-[1310px] w-full flex flex-col items-center">
        <HashTag className="uppercase">Мэдээний төрөл</HashTag>
        <Title>{category.name}</Title>
        <div className="flex">
          <Statistic title="Нийт мэдээлэл" value={count} className="mx-[24px] text-center" />
          <Statistic title="Дагагчид" value={count} className="text-center" />
        </div>
        <Tabs
          defaultActiveKey="recent"
          onChange={(e) => {
            setSort(e);
          }}
          className="my-[48px]"
        >
          <Tabs.TabPane tab={<span className="text-[24px] font-normal font-merri">ШИНЭ</span>} key="recent" />
          <Tabs.TabPane tab={<span className="text-[24px] font-normal font-merri">ШИЛДЭГ</span>} key="top" />
        </Tabs>
        <Row gutter={22} className="max-w-[1310px] my-[24px]">
          {articles.map((post) => (
            <Col key={post.id} span={8}>
              <PostCard post={post} />
            </Col>
          ))}
          {loading && <Skeleton />}
          {count > 24 * (page + 1) && (
            <Col span={24}>
              <Button
                block
                size="large"
                type="primary"
                ghost
                className="font-roboto"
                onClick={() => setPage(page + 1)}
                loading={loading}
              >
                Цааш үзэх
              </Button>
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
}
