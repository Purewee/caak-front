import React, { useState, useEffect } from 'react';
import { ESService } from '../../lib/esService';
import { Button, Col, Skeleton } from 'antd';
import PostCard from '../../component/card/Post';
import useMediaQuery from '../../component/navigation/useMediaQuery';

export default function ArticlesList({ filter = [], sort = {}, size = 24 }) {
  const es = new ESService('caak');
  const [page, setPage] = useState(0);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery('screen and (max-width: 767px)');

  useEffect(() => {
    setLoading(true);
    es.posts(filter, sort, size, 0).then((response) => {
      setList(response.hits);
      setLoading(false);
    });
  }, [filter, sort, size]);

  useEffect(() => {
    setLoading(true);
    es.posts(filter, sort, size, page).then((response) => {
      setList([...list, ...response.hits]);
      setLoading(false);
    });
  }, [page]);

  return (
    <div className="max-w-[1310px] w-full flex flex-wrap justify-center gap-x-[22px] gap-y-[40px] px-[16px] sm:px-0 mt-[40px]">
      {list.map((post, index) => (
        <Col className="w-full sm:w-[422px]" key={index}>
          <PostCard isMobile={isMobile} post={post} />
        </Col>
      ))}
      {loading && <Skeleton />}
      <Col span={24}>
        <Button
          block
          size="large"
          className="font-roboto border-caak-primary text-caak-primary mt-[20px]"
          onClick={() => setPage(page + 1)}
          loading={loading}
        >
          Цааш үзэх
        </Button>
      </Col>
    </div>
  );
}
