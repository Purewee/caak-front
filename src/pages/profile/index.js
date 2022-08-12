import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { ESService } from '../../lib/esService';
import { ME, USER } from '../post/view/_gql';
import { Avatar, Col, Statistic, Tabs, Skeleton, Button, message } from 'antd';
import PostCard from '../../component/card/Post';
import { Title } from '../post/view/wrapper';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import useMediaQuery from '../../component/navigation/useMediaQuery';
import { imagePath } from '../../utility/Util';
import { useLocation } from 'react-router-dom';
import ArticlesList from '../home/articles_list';

export default function Profile() {
  const context = useContext(AppContext);
  const { id } = useParams();
  const es = new ESService('caak');
  const location = useLocation();
  const [articles, setArticles] = useState([]);
  const [selected, setSelected] = useState(location.state ? location.state : 'posts');
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { data } = useQuery(USER, { variables: { id } });
  const user = data?.user || {};
  const { data: me } = useQuery(ME);
  const loggedUser = me?.me;
  const { isAuth, openModal } = useAuth();
  const saved_articles = user?.recipes?.map((x) => x?.articles.nodes).flat() || [];

  const isMobile = useMediaQuery('screen and (max-width: 767px)');

  useEffect(() => {
    setLoading(true);
    es.authorPosts(id, page).then(({ hits, total }) => {
      setLoading(false);
      setArticles([...articles, ...hits]);
      setCount(total);
    });
  }, [id, page]);

  useEffect(() => {
    context.setStore('default');
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [user]);

  return (
    <div className="flex justify-center px-[16px]">
      <div className="max-w-[1310px] w-full flex flex-col">
        <div className="pt-[17px] md:pt-[71px] pb-[17px] md:pb-[50px] flex flex-col md:flex-row justify-between w-full items-center">
          <div className="flex flex-col md:flex-row">
            <Avatar className="w-[57px] h-[57px] md:w-[82px] md:h-[82px] object-cover" src={imagePath(user?.avatar)} />
            <div className="md:ml-[16px] mt-[15px] md:mt-0">
              <Title className="font-condensed mt-0 font-bold text-[30px] leading-[35px]">{user?.firstName}</Title>
              <p className="mt-[9px] md:mt-[12px] text-[15px] text-[#555555] leading-[18px] max-w-[600px]">
                {user?.data?.bio}
              </p>
              <div className="flex flex-row text-[#555555] gap-[23px] mt-[18px] text-[15px] leading-[18px] font-merri text-center">
                <Statistic title="Пост" value={user?.articles?.totalCount} />
                <Statistic title="Дагагчид" value={0} />
              </div>
            </div>
          </div>
          <div className="flex flex-row mt-[20px] md:mt-0">
            {loggedUser?.id === id ? (
              <Link to={`/settings/${loggedUser?.id}`}>
                <div className="cursor-pointer w-[151px] h-[34px] border-[1px] border-[#FF6600] rounded-[4px] flex justify-center items-center">
                  <p className="text-[15px] leading-[18px] font-medium text-[#FF6600]">Мэдээллээ засах</p>
                </div>
              </Link>
            ) : (
              <button
                onClick={() => (isAuth ? message.success('success') : openModal('open'))}
                className="w-[90px] h-[34px] bg-caak-primary rounded-[4px] text-white text-[15px] font-bold"
              >
                Дагах
              </button>
            )}
            <div className=" border-[1px] cursor-pointer border-[#D4D8D8] w-[42px] h-[34px] flex justify-center items-center rounded-[4px] ml-[10px]">
              <span className="icon-fi-rs-more-ver rotate-90 text-[#111111] text-[18px]" />
            </div>
          </div>
        </div>
        <Tabs
          defaultActiveKey={location.state === 'saved' ? 'saved' : 'posts'}
          onChange={(e) => setSelected(e)}
          size="large"
          className="mb-[200px] font-merri"
        >
          <Tabs.TabPane
            key="posts"
            tab={
              <p
                className={`text-[16px] font-roboto font-bold ${
                  selected === 'posts' ? 'text-caak-black' : 'text-caak-gray'
                }`}
              >
                Оруулсан мэдээ
              </p>
            }
          >
            <div className="max-w-[1310px] w-full flex flex-wrap justify-center 2xl:justify-start gap-x-[22px] gap-y-[40px] px-[16px] sm:px-0 mt-[40px]">
              {articles.map((post, index) => (
                <Col className="w-full sm:w-[422px]" key={index}>
                  <PostCard isMobile={isMobile} post={post} />
                </Col>
              ))}
              {loading && <Skeleton />}
              <Button
                block
                size="large"
                className="font-roboto border-caak-primary text-caak-primary mt-[20px]"
                onClick={() => setPage(page + 1)}
                loading={loading}
              >
                Цааш үзэх
              </Button>
            </div>
          </Tabs.TabPane>
          {id === loggedUser?.id && (
            <Tabs.TabPane
              key="saved"
              tab={
                <p
                  className={`text-[16px] font-roboto font-bold ${
                    selected === 'saved' ? 'text-caak-black' : 'text-caak-gray'
                  }`}
                >
                  ХАДГАЛСАН МЭДЭЭ
                </p>
              }
            >
              <div className="max-w-[1310px] w-full flex flex-wrap justify-center 2xl:justify-start gap-x-[22px] gap-y-[40px] px-[16px] sm:px-0 mt-[40px]">
                {saved_articles.map((post, index) => (
                  <Col className="w-full sm:w-[422px]" key={index}>
                    <PostCard isMobile={isMobile} post={post} />
                  </Col>
                ))}
              </div>
            </Tabs.TabPane>
          )}
          <Tabs.TabPane
            key="history"
            tab={
              <p
                className={`text-[16px] font-roboto font-bold ${
                  selected === 'history' ? 'text-caak-black' : 'text-caak-gray'
                }`}
              >
                ҮЗСЭН ТҮҮХ
              </p>
            }
          />
        </Tabs>
      </div>
    </div>
  );
}
