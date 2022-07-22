import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Col, Input, Row, Button, Skeleton } from 'antd';
import { FIcon } from '../../component/icon';
import { ESService } from '../../lib/esService';
import PostCard from '../../component/card/Post';
import { AppContext } from '../../App';

export default function Search() {
  const context = useContext(AppContext);
  const location = useLocation();
  const es = new ESService('caak');
  const [searchParams, setSearchParams] = useSearchParams(location.state === null ? '' : location.state);
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

  useEffect(() => {
    context.setStore('default');
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col items-center mb-[100px]">
      <div className="w-full h-[208px] bg-[#F5F5F5] flex justify-center px-[16px] sm:px-0">
        <div className="w-full max-w-[980px]">
          <p className="text-[#555555] text-[16px] leading-[19px] mt-[40px]">Хайлтын илэрц: {totalResult} мэдээ</p>
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
        </div>
      </div>
      <div className="max-w-[1310px] w-full flex flex-wrap justify-center gap-x-[22px] gap-y-[40px] pt-[30px] md:pt-[70px] px-[16px] md:px-[0px]">
        {articles.map((post, index) => (
          <Col key={index}>
            <PostCard post={post} />
          </Col>
        ))}
        {loading && <Skeleton />}
        {totalResult > 24 * (page + 1) && (
          <Col span={24}>
            <Button
              block
              size="large"
              className="font-roboto border-caak-primary text-caak-primary"
              onClick={() => setPage(page + 1)}
              loading={loading}
            >
              Цааш үзэх
            </Button>
          </Col>
        )}
      </div>
    </div>
  );
}
