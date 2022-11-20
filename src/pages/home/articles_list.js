import React, { useState, useEffect } from 'react';
import { ESService } from '../../lib/esService';
import { Button, Col, Skeleton } from 'antd';
import PostCard from '../../component/card/Post';
import useMediaQuery from '../../component/navigation/useMediaQuery';
import Banner from '../../component/banner';
import { FIcon } from '../../component/icon';
import LoadMore from '../../component/LoadMore';

export default function ArticlesList({ filter = [], sort = {}, size = 24, asd, autoLoad = 0, currentPage = 1 }) {
  const es = new ESService('caak');
  const [page, setPage] = useState(currentPage - 1);
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery('screen and (max-width: 767px)');

  useEffect(() => {
    setLoading(true);
    es.posts(filter, sort, size, page).then((response) => {
      setList(response.hits);
      setCount(response.total);
      setLoading(false);
    });
  }, [filter, sort, size]);

  useEffect(() => {
    setLoading(true);
    es.posts(filter, sort, size, page).then((response) => {
      setList([...list, ...response.hits]);
      setCount(response.total);
      setLoading(false);
    });
  }, [page]);
  const chunked = list.reduce((res, item, index) => {
    const chunkIndex = Math.floor(index / 11);
    if (!res[chunkIndex]) {
      res[chunkIndex] = []; // start a new chunk
    }

    res[chunkIndex].push(item);

    return res;
  }, []);
  return (
    <div className="mt-[30px]">
      {chunked.map((section, index) => {
        const divider = Math.floor(6 + Math.random() * 5);
        return (
          <div
            key={index}
            className="max-w-[1310px] px-[16px] sm:px-0  w-full flex flex-wrap justify-center gap-x-[22px] gap-y-[20px] sm:gap-y-[40px] mb-[40px]"
          >
            {section.map((post, index) => (
              <React.Fragment key={index}>
                {index === divider && (
                  <Col className="w-full sm:w-[422px]" key={`${index}-banner`}>
                    <Banner position="a2" />
                  </Col>
                )}
                <Col className="w-full sm:w-[422px]" key={index}>
                  <PostCard asd={asd} sponsored={index === 0} isMobile={isMobile} post={post} />
                </Col>
              </React.Fragment>
            ))}
            {loading && <Skeleton />}
          </div>
        );
      })}
      {!loading && autoLoad > page && (
        <LoadMore
          callback={() => {
            setPage(page + 1);
          }}
        />
      )}
      {count > list?.length && autoLoad <= page && (
        <div className="max-w-[1310px] w-full px-[16px] sm:px-0">
          <Button
            block
            size="large"
            className="font-roboto border-caak-primary h-[60px] sm:h-[74px] text-[18px] font-medium text-caak-primary mt-[20px]"
            onClick={() => {
              setPage(page + 1);
            }}
            loading={loading}
          >
            Илүү ихийг үзэх
            <FIcon className="icon-fi-rs-down-chevron text-caak-primary text-[16px] w-[16px] ml-[8px]" />
          </Button>
        </div>
      )}
    </div>
  );
}
