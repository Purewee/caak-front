import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { ESService } from '../../lib/esService';
import { ME, USER } from '../post/view/_gql';
import { Avatar, Col, Statistic, Row, Tabs, Skeleton, Button } from 'antd';
import PostCard from '../../component/card/Post';
import { Title } from '../post/view/wrapper';

export default function Profile() {
  const es = new ESService('caak');
  const [articles, setArticles] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { data } = useQuery(USER, { variables: { id } });
  const user = data?.user || {};
  const { data: me } = useQuery(ME);
  const loggedUser = me?.me;

  useEffect(() => {
    setLoading(true);
    es.authorPosts(id).then(({ hits, total }) => {
      setLoading(false);
      setArticles([...articles, ...hits]);
      setCount(total);
    });
  }, [id, page]);

  return (
    <div className="flex justify-center px-[16px] md:px-0">
      <div className="max-w-[1310px] w-full flex flex-col">
        <div className="pt-[17px] md:pt-[71px] pb-[17px] md:pb-[50px] flex flex-col md:flex-row justify-between w-full items-center">
          <div className="flex flex-col md:flex-row">
            <Avatar className="w-[57px] h-[57px] md:w-[82px] md:h-[82px] object-cover" />
            <div className="md:ml-[16px] mt-[15px] md:mt-0">
              <Title className="font-condensed">{`${user?.firstName} ${user?.lastName}`}</Title>
              <p className="mt-[9px] md:mt-[12px] text-[15px] text-[#555555] leading-[18px] max-w-[600px]">
                Өөрийн дуртай график дизайны мэдээллээ авдаг сайтнаас хүргэх болно.
              </p>
              <div className="flex flex-row text-[#555555] gap-[23px] mt-[18px] text-[15px] leading-[18px] font-merri text-center">
                <Statistic title="Пост" value={user?.articles?.totalCount} />
                <Statistic title="Дагагчид" value={30} />
                <Statistic title="Аура" value={1500} />
              </div>
            </div>
          </div>
          <div className="flex flex-row mt-[20px] md:mt-0">
            {loggedUser?.id === id ? (
              <div className="cursor-pointer w-[151px] h-[34px] border-[1px] border-[#FF6600] rounded-[4px] flex justify-center items-center">
                <p className="text-[15px] leading-[18px] font-medium text-[#FF6600]">Мэдээллээ засах</p>
              </div>
            ) : (
              <button className="w-[90px] h-[34px] bg-caak-primary rounded-[4px] text-white text-[15px] font-bold">
                Дагах
              </button>
            )}
            <div className=" border-[1px] border-[#D4D8D8] w-[42px] h-[34px] flex justify-center items-center rounded-[4px] ml-[10px]">
              <span className="icon-fi-rs-more-ver cursor-pointer rotate-90 text-[#111111] text-[18px]" />
            </div>
          </div>
        </div>
        <Tabs size="large">
          <Tabs.TabPane key="posts" tab="Оруулсан мэдээ">
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
          </Tabs.TabPane>
          <Tabs.TabPane key="history" tab="Үзсэн түүх" />
        </Tabs>
      </div>
    </div>
  );
}
