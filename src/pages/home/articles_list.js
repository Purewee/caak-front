import React, { useState, useEffect } from 'react';
import { ESService } from '../../lib/esService';
import { Button, Col, Skeleton } from 'antd';
import PostCard from '../../component/card/Post';
import useMediaQuery from '../../component/navigation/useMediaQuery';
import Banner from '../../component/banner';
import { FIcon } from '../../component/icon';

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
  const chunked = list.reduce((res, item, index) => {
    const chunkIndex = Math.floor(index / 8);
    if (!res[chunkIndex]) {
      res[chunkIndex] = []; // start a new chunk
    }

    res[chunkIndex].push(item);

    return res;
  }, []);
  return (
    <>
      {chunked.map((section, index) => {
        const divider = Math.floor(Math.random() * 8);
        return (
          <div
            key={index}
            className="max-w-[1310px] w-full flex flex-wrap justify-center gap-x-[22px] gap-y-[40px] px-[16px] sm:px-0 mt-[30px]"
          >
            {section.map((post, index) => (
              <div key={index}>
                {index === divider && (
                  <Col className="w-full sm:w-[422px]" key={`${index}-banner`}>
                    <Banner position="a2" />
                  </Col>
                )}
                <Col className="w-full sm:w-[422px]" key={index}>
                  <PostCard sponsored={index === 0} isMobile={isMobile} post={post} />
                </Col>
              </div>
            ))}
            {loading && <Skeleton />}
          </div>
        );
      })}
      <div className="max-w-[1310px] w-full">
        <Button
          block
          size="large"
          className="font-roboto border-caak-primary h-[74px] text-[18px] font-medium text-caak-primary mt-[20px]"
          onClick={() => setPage(page + 1)}
          loading={loading}
        >
          Илүү ихийг үзэх
          <FIcon className="icon-fi-rs-down-chevron text-caak-primary text-[16px] w-[16px] ml-[8px]" />
        </Button>
      </div>
    </>
  );
}
