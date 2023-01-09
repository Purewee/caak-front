import React, { useState, useEffect, useContext } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { ESService } from '../../lib/esService';
import { ME, USER } from '../post/view/_gql';
import { Avatar, Col, Statistic, Tabs, Skeleton, Button, Badge } from 'antd';
import PostCard from '../../component/card/Post';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import useMediaQuery from '../../component/navigation/useMediaQuery';
import { imagePath } from '../../utility/Util';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import FollowsModal from '../../component/modal/FollowsModal';

const FOLLOW = gql`
  mutation Follow($id: ID!) {
    toggleFollow(input: { targetType: "user", targetId: $id })
  }
`;

const HISTORY = gql`
  query histories {
    impressions(sort: { field: "id", direction: desc }) {
      totalCount
      edges {
        node {
          id
          impressionable {
            ... on Article {
              id
              title
              image: imageUrl
              publish_date: publishDate
              author {
                id
                name: firstName
                avatar
              }
              source {
                id
                icon
                name
              }
            }
          }
          actionName
          createdAt
        }
      }
    }
  }
`;

export default function Profile() {
  const context = useContext(AppContext);
  const { id } = useParams();
  const es = new ESService('caak');
  const location = useLocation();
  const [articles, setArticles] = useState([]);
  const [followsOpen, setFollowsOpen] = useState(false);
  const [selected, setSelected] = useState(location.state ? location.state : 'posts');
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { data, loading: fetching, refetch } = useQuery(USER, { variables: { id } });
  const user = data?.user || {};
  const { data: me } = useQuery(ME);
  const loggedUser = me?.me;
  const { isAuth, openModal } = useAuth();
  const saved_articles = user?.recipes?.map((x) => x?.articles.nodes).flat() || [];
  const [follow, { loading: saving }] = useMutation(FOLLOW, { variables: { id } });
  const { data: historyData, loading: historyLoading } = useQuery(HISTORY, { skip: selected !== 'history' });
  const histories = historyData?.impressions?.edges?.map((x) => x.node) || [];
  const navigate = useNavigate();

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

  if (fetching) return <Skeleton />;

  return (
    <div className="flex justify-center px-[16px]">
      <div className="max-w-[1310px] w-full flex flex-col">
        <div className="pt-[17px] md:pt-[71px] pb-[17px] md:pb-[50px] flex flex-col md:flex-row justify-between w-full items-center">
          <div className="flex flex-row w-full">
            {user.avatar ? (
              <div className="relative w-[57px] h-[57px] md:w-[82px] md:h-[82px]">
                <Avatar
                  className="w-[57px] h-[57px] md:w-[82px] md:h-[82px] object-cover"
                  src={imagePath(user?.avatar)}
                />
                {user?.id === loggedUser?.id && (
                  <span
                    onClick={() => navigate(`/settings/${loggedUser?.id}`)}
                    style={{ boxShadow: '0px 1px 4px #00000029' }}
                    className="w-[32px] h-[32px] rounded-full cursor-pointer flex justify-center items-center text-[19px] absolute -bottom-[11px] -right-[6px] text-black icon-fi-rs-camera-f bg-white"
                  />
                )}
              </div>
            ) : (
              user.firstName && (
                <div className="relative w-[57px] h-[57px] md:w-[82px] md:h-[82px]">
                  <Avatar className="w-[57px] h-[57px] flex items-center md:w-[82px] md:h-[82px] bg-[#257CEE19] text-[#257CEE] text-[32px] font-medium">
                    {(user?.firstName || user?.name)[0] || null}
                  </Avatar>
                  {user?.id === loggedUser?.id && (
                    <span
                      onClick={() => navigate(`/settings/${loggedUser?.id}`)}
                      style={{ boxShadow: '0px 1px 4px #00000029' }}
                      className="w-[32px] h-[32px] rounded-full cursor-pointer flex justify-center items-center text-[19px] absolute -bottom-[11px] -right-[6px] text-black icon-fi-rs-camera-f bg-white"
                    />
                  )}
                </div>
              )
            )}
            <div className="ml-[24px] max-h-[82px]">
              <p className="font-condensed font-bold text-[30px] leading-[35px]">{user?.firstName}</p>
              <p className="md:mt-[12px] text-[15px] text-[#555555] leading-[18px] max-w-[600px]">{user?.data?.bio}</p>
              <div className="flex flex-row text-[#555555] gap-[23px] sm:mt-[12px] text-[15px] font-roboto text-center">
                {user?.role !== 'member' && (
                  <Statistic className="leading-[18px]" title="нийтлэл" value={user?.articles?.totalCount || 0} />
                )}
                <Statistic className="leading-[18px]" title="дагагчид" value={user?.followersCount || 0} />
                {id === me?.id && (
                  <Statistic
                    className="leading-[18px]"
                    title={
                      <p className="cursor-pointer" onClick={() => setFollowsOpen(true)}>
                        дагаж буй
                      </p>
                    }
                    value={user?.follows?.length || 0}
                  />
                )}
                {followsOpen && <FollowsModal follows={user?.follows} toggle={() => setFollowsOpen(!followsOpen)} />}
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
            ) : user.following ? (
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
                className="w-[90px] h-[34px] bg-caak-primary rounded-[4px] text-white text-[15px] font-bold"
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
            <div className=" border-[1px] cursor-pointer border-[#D4D8D8] w-[42px] h-[34px] flex justify-center items-center rounded-[4px] ml-[10px]">
              <span className="icon-fi-rs-more-ver rotate-90 text-[#111111] text-[18px]" />
            </div>
          </div>
        </div>
        <Tabs
          defaultActiveKey={location.state === 'saved' ? 'saved' : id === loggedUser?.id ? 'history' : 'posts'}
          onChange={(e) => setSelected(e)}
          tabBarStyle={{ borderBottom: '1px solid #EFEEEF' }}
          className="mb-[120px] font-condensed w-full border-t border-1"
        >
          {loggedUser?.role !== 'member' && (
            <Tabs.TabPane
              key="posts"
              tab={
                <Statistic
                  title={
                    <span
                      className={`font-bold text-[16px] ${
                        selected === 'posts' ? 'text-caak-black' : 'text-caak-darkGray'
                      }`}
                    >
                      ОРУУЛСАН МЭДЭЭ
                    </span>
                  }
                  value={user.articles?.totalCount}
                  valueStyle={{
                    backgroundColor: '#BBBEBE',
                    paddingInline: 6,
                    fontSize: 14,
                    height: 20,
                    color: 'white',
                    borderRadius: 4,
                    fontWeight: 'bold',
                  }}
                  style={{ flexDirection: 'row', gap: 6 }}
                />
              }
            >
              <div className="max-w-[1310px] w-full flex flex-wrap justify-center mt-[50px] xl:justify-start gap-x-[22px] gap-y-[40px]">
                {articles.map((post, index) => (
                  <Col className="w-full sm:w-[422px]" key={index}>
                    <PostCard isMobile={isMobile} post={post} />
                  </Col>
                ))}
                {loading && <Skeleton />}
                <Button
                  block
                  size="large"
                  className="font-roboto font-medium h-[74px] border-caak-primary text-caak-primary mt-[20px]"
                  onClick={() => setPage(page + 1)}
                  loading={loading}
                >
                  Илүү ихийг үзэх
                  <span className="icon-fi-rs-down-chevron text-[14px] ml-[8px]" />
                </Button>
              </div>
            </Tabs.TabPane>
          )}
          {id === loggedUser?.id && loggedUser?.role === 'member' && (
            <Tabs.TabPane
              key="history"
              tab={
                <Statistic
                  title={
                    <span
                      className={`font-bold text-[16px] ${
                        selected === 'history' ? 'text-caak-black' : 'text-caak-darkGray'
                      }`}
                    >
                      ҮЗСЭН ТҮҮХ
                    </span>
                  }
                  value={historyData?.impressions?.totalCount || ' '}
                  valueStyle={{
                    backgroundColor: '#BBBEBE',
                    paddingInline: historyData?.impressions?.totalCount && 6,
                    fontSize: 14,
                    height: 20,
                    color: 'white',
                    borderRadius: 4,
                    fontWeight: 'bold',
                  }}
                  className="flex font-condensed font-bold"
                  style={{ flexDirection: 'row', gap: 8 }}
                  loading={historyLoading}
                />
              }
            >
              {historyLoading && <Skeleton className="p-2" />}
              <div className="max-w-[1310px] w-full flex flex-wrap mt-[50px] justify-center xl:justify-start gap-x-[22px] gap-y-[40px] px-[32px] sm:px-0 border-t">
                {histories.map((x) => {
                  return (
                    <Col className="w-full sm:w-[422px]" key={x.id}>
                      <PostCard removeSaved isMobile={isMobile} post={x.impressionable} />
                    </Col>
                  );
                })}
              </div>
            </Tabs.TabPane>
          )}
          {loggedUser?.id === id && (
            <Tabs.TabPane
              key="note"
              tab={
                <Statistic
                  title={
                    <span
                      className={`font-bold text-[16px] ${
                        selected === 'note' ? 'text-caak-black' : 'text-caak-darkGray'
                      }`}
                    >
                      НООРОГ
                    </span>
                  }
                  // value={saved_articles.length}
                  valueStyle={{
                    backgroundColor: '#BBBEBE',
                    paddingInline: 6,
                    fontSize: 14,
                    height: 20,
                    color: 'white',
                    borderRadius: 4,
                    fontWeight: 'bold',
                  }}
                  style={{ flexDirection: 'row', gap: 8 }}
                />
              }
            >
              <div className="max-w-[1310px] w-full flex flex-wrap mt-[50px] justify-center xl:justify-start gap-x-[22px] gap-y-[40px] px-[32px] sm:px-0 border-t">
                {/* {saved_articles.map((post, index) => (
                  <Col className="w-full sm:w-[422px]" key={index}>
                    <PostCard removeSaved isMobile={isMobile} post={post} />
                  </Col>
                ))} */}
              </div>
            </Tabs.TabPane>
          )}
          {id === loggedUser?.id && (
            <Tabs.TabPane
              key="saved"
              tab={
                <Statistic
                  title={
                    <span
                      className={`font-bold text-[16px] ${
                        selected === 'saved' ? 'text-caak-black' : 'text-caak-darkGray'
                      }`}
                    >
                      ХАДГАЛСАН МЭДЭЭ
                    </span>
                  }
                  value={saved_articles.length}
                  valueStyle={{
                    backgroundColor: '#BBBEBE',
                    paddingInline: 6,
                    fontSize: 14,
                    height: 20,
                    color: 'white',
                    borderRadius: 4,
                    fontWeight: 'bold',
                  }}
                  style={{ flexDirection: 'row', gap: 8 }}
                />
              }
            >
              <div className="max-w-[1310px] w-full flex flex-wrap mt-[50px] justify-center xl:justify-start gap-x-[22px] gap-y-[40px] px-[32px] sm:px-0 border-t">
                {saved_articles.map((post, index) => (
                  <Col className="w-full sm:w-[422px]" key={index}>
                    <PostCard removeSaved isMobile={isMobile} post={post} />
                  </Col>
                ))}
              </div>
            </Tabs.TabPane>
          )}
        </Tabs>
      </div>
    </div>
  );
}
