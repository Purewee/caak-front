import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { ESService } from '../../lib/esService';
import { ME, USER } from '../post/view/_gql';
import { Avatar, Col, Statistic, Row, Tabs, Skeleton, Button, notification } from 'antd';
import PostCard from '../../component/card/Post';
import { Title } from '../post/view/wrapper';
import SignInUpController from '../../component/modal/SignInUpController';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import useMediaQuery from '../../component/navigation/useMediaQuery';
import { imagePath } from '../../utility/Util';

export default function Profile() {
  const context = useContext(AppContext);
  const { id } = useParams();
  const es = new ESService('caak');
  const [articles, setArticles] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { data } = useQuery(USER, { variables: { id } });
  const user = data?.user || {};
  const { data: me } = useQuery(ME);
  const loggedUser = me?.me;
  const { isAuth } = useAuth();
  const [isShown, setIsShown] = useState(false);

  const isLaptop = useMediaQuery('(min-width: 1001px) and (max-width: 1920px)');
  const isTablet = useMediaQuery('(min-width: 401px) and (max-width: 1000px)');
  const isMobile = useMediaQuery('screen and (max-width: 767px)');

  const openNotification = () => {
    const args = {
      message: `Та ${data?.user.firstName}-г дагалаа`,
      duration: 4,
      placement: 'bottom',
      className: 'h-[50px] bg-[#12805C] w-[470px]',
    };
    notification.open(args);
  };

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
                onClick={() => (isAuth ? openNotification() : setIsShown('signin'))}
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
        <Tabs size="large" className="mb-[200px]">
          <Tabs.TabPane key="posts" tab="Оруулсан мэдээ">
            <Row gutter={[22, 40]} className="max-w-[1310px] my-[24px]">
              {articles.map((post) => (
                <Col key={post.id} span={isLaptop && 8}>
                  <PostCard post={post} />
                </Col>
              ))}
              {loading && <Skeleton />}
              {count > 24 * (page + 1) && (
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
              )}
            </Row>
          </Tabs.TabPane>
          {id === loggedUser?.id && <Tabs.TabPane key="saved" tab="Хадгалсан мэдээнүүд" />}
          <Tabs.TabPane key="history" tab="Үзсэн түүх" />
        </Tabs>
      </div>
      <SignInUpController isShown={isShown} setIsShown={setIsShown} />
    </div>
  );
}
