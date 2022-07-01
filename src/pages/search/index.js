import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Col, Input, Row, Button, Skeleton } from 'antd';
import { FIcon } from '../../component/icon';
import { ESService } from '../../lib/esService';
import PostCard from '../../component/card/Post';

export default function Search() {
  const es = new ESService('caak');
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q');
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [totalResult, setTotalResult] = useState(0);

  useEffect(() => {
    setLoading(true);
    es.search(q, page).then(({ hits, total }) => {
      setArticles([...articles, ...hits]);
      setTotalResult(total);
      setLoading(false);
    });
  }, [q, page]);

  return (
    <div className="flex flex-col items-center mb-[100px]">
      <div className="w-full h-[208px] bg-[#F5F5F5] flex justify-center">
        <div className="w-full max-w-[980px]">
          <div className="relative w-full mt-[20px]">
            <Input.Search
              placeholder="Хайлт хийх..."
              defaultValue={q}
              allowClear
              enterButton={<FIcon className="icon-fi-rs-search text-[22px]" />}
              onSearch={(filter) => setSearchParams({ q: filter })}
              size="large"
            />
          </div>
          <p className="text-[#555555] text-[16px] leading-[19px] mt-[40px]">Хайлтын илэрц: {totalResult} мэдээ</p>
        </div>
      </div>
      <Row gutter={22} className="max-w-[1310px]">
        {articles.map((post) => (
          <Col key={post.id} span={8}>
            <PostCard post={post} />
          </Col>
        ))}
        {loading && <Skeleton />}
        {totalResult > 24 * (page + 1) && (
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
  );
}
