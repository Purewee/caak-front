import React, { useEffect, useContext, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { AppContext } from '../../App';
import SignInUpController from '../../component/modal/SignInUpController';
import { useAuth } from '../../context/AuthContext';
import HahaIcon from '../../assets/images/fi-rs-react-haha.svg';
import LoveIcon from '../../assets/images/fi-rs-react-love.png';
import { Tabs, Button } from 'antd';
import { useParams } from 'react-router-dom';
import { ESService } from '../../lib/esService';
import { imagePath } from '../../utility/Util';
import { Link } from 'react-router-dom';

const ME = gql`
  query Me {
    me {
      id
      mobile
      email
      firstName
      lastName
      avatar
      data
    }
  }
`;

const menu = [
  { title: 'МЭДЭЭ' },
  // { title: 'ЖОР' },
  { title: 'ДАГАГЧИД' },
  { title: 'ДАГАСАН' },
];

export default function Dashboard() {
  const context = useContext(AppContext);
  const { id } = useParams();
  const [selected, setSelected] = useState('posts');
  const [articles, setArticles] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const { data, loading } = useQuery(ME);
  const { isAuth } = useAuth();

  const me = data?.me || {};

  useEffect(() => {
    !isAuth && setIsShown('signin');
  }, []);

  useEffect(() => {
    const es = new ESService('caak');
    es.authorPosts(id).then((res) => {
      setArticles(res?.hits);
    });
  }, [id]);

  useEffect(() => {
    context.setStore('default');
  }, []);
  return isAuth && data?.me?.id === id ? (
    <div className="flex w-full justify-center bg-white px-[16px] md:px-0">
      <div className="max-w-[1140px] w-full mt-[50px]">
        <p className="text-[28px] leading-[33px] font-medium">Дашбоард</p>
        <div className="w-full relative mt-[42px]">
          <Tabs
            defaultActiveKey={location.state === 'saved' ? 'saved' : 'posts'}
            onChange={(e) => setSelected(e)}
            className="mb-[200px] w-full"
          >
            <Tabs.TabPane
              key="posts"
              tab={
                <div className="flex flex-row items-center">
                  <p
                    className={`text-[14px] font-medium ${selected === 'posts' ? 'text-caak-black' : 'text-caak-gray'}`}
                  >
                    МЭДЭЭ
                  </p>
                </div>
              }
            >
              <p className="mt-[40px] text-[22px] font-bold leading-[25px]">Статистик</p>
              <div className="flex flex-row w-full gap-[18px] mt-[22px]">
                <div className="max-w-[368px] w-full h-[123px] bg-[#DFEDF1] rounded-[4px] flex flex-col items-center justify-center text-[#163943]">
                  <p className="font-medium text-[15px]">Үзэлт</p>
                  <p className="mt-[6px] text-[32px] font-condensed font-bold">3,593</p>
                </div>
                <div className="max-w-[368px] w-full h-[123px] bg-[#F2F1DF] rounded-[4px] flex flex-col items-center justify-center text-[#5D5B42]">
                  <p className="font-medium text-[15px]">Сэтгэгдэл</p>
                  <p className="mt-[6px] text-[32px] font-condensed font-bold">2,598</p>
                </div>
                <div className="max-w-[368px] w-full h-[123px] bg-[#F3DEDE] rounded-[4px] flex flex-col items-center justify-center text-[#813333]">
                  <p className="font-medium text-[15px]">Реакшн</p>
                  <p className="mt-[6px] text-[32px] font-condensed font-bold">1,224</p>
                </div>
              </div>
              <table className="w-full mt-[40px] mb-[40px] border border-[#EFEEEF]">
                <thead className="h-[44px]">
                  <tr className="bg-[#F5F5F5]">
                    <th className="w-full text-left text-[#555555] font-medium text-[15px] pl-[25px]">Мэдээний нэр</th>
                    <th className="text-center text-[15px] text-[#555555] font-medium min-w-[150px]">Үзэлт</th>
                    <th className="text-center text-[15px] text-[#555555] font-medium min-w-[150px]">Сэтгэгдэл</th>
                    <th className="text-center text-[15px] text-[#555555] font-medium min-w-[150px]">Реакшн</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((data, index) => {
                    return (
                      <tr key={index} className="border-b">
                        <td>
                          <div className="flex flex-row items-center pl-[20px] h-[57px]">
                            <img className="w-[44px] h-[44px] object-cover" src={imagePath(data.image)} />
                            <div className="ml-[12px]">
                              <Link to={`/post/view/${data.id}`}>
                                <p className="truncate-1 text-[17px] leading-[20px] font-medium">{data.title}</p>
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="text-[15px] font-medium text-center">{data.views_count}</p>
                        </td>
                        <td>
                          <p className="text-[15px] font-medium text-center">{data.reactions_count}</p>
                        </td>
                        <td>
                          <div className="flex flex-row items-center pl-[40px]">
                            <img className="w-[20px]" src={LoveIcon} alt="reaction" />
                            <img className="w-[20px]" src={HahaIcon} alt="reaction" />
                            <p className="ml-[6px] text-[15px]">{data.data?.like_count}</p>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Tabs.TabPane>
            <Tabs.TabPane
              key="saved"
              tab={
                <div className="flex flex-row items-center">
                  <p
                    className={`text-[14px] font-medium ${selected === 'saved' ? 'text-caak-black' : 'text-caak-gray'}`}
                  >
                    ДАГАГЧИД
                  </p>
                </div>
              }
            >
              <div className="max-w-[1310px] w-full flex flex-wrap mt-[50px] justify-center xl:justify-start gap-x-[22px] gap-y-[40px] px-[32px] sm:px-0">
                {/* {saved_articles.map((post, index) => (
                  <Col className="w-full sm:w-[422px]" key={index}>
                    <PostCard removeSaved isMobile={isMobile} post={post} />
                  </Col>
                ))} */}
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane
              key="history"
              tab={
                <p
                  className={`text-[14px] font-medium ${selected === 'history' ? 'text-caak-black' : 'text-caak-gray'}`}
                >
                  ДАГАСАН
                </p>
              }
            >
              <div className="w-full"></div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  ) : (
    <SignInUpController isShown={isShown} setIsShown={setIsShown} />
  );
}
