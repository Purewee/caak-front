import { useState, useContext, useEffect } from 'react';
import MagazineFeed from '../../../src/component/magazine';
import { AppContext } from '../../App';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Loader from '../../component/loader';
import { ESService } from '../../lib/esService';
import FeedCard from '../../component/card/FeedCard';
import { ME, USER } from '../post/view/_gql';
import { Avatar } from 'antd';
import PostSaveModal from '../../component/modal/PostSaveModal';

const menu = [
  {
    title: 'НҮҮР',
  },
  // {
  //   title: 'ЖОР',
  // },
  {
    title: 'ПОСТ',
  },
  {
    title: 'ҮЗСЭН ТҮҮХ',
  },
];

export default function Profile() {
  const context = useContext(AppContext);
  const [selected, setSelected] = useState(0);
  const [articles, setArticles] = useState([]);
  const [savePostOpen, setSavePostOpen] = useState(false);
  const { id } = useParams();
  const { data, loading } = useQuery(USER, { variables: { id } });
  const author = data?.user || {};
  const { data: me, loading: me_loading } = useQuery(ME);
  const loggedUser = me?.me;

  useEffect(() => {
    context.setStore('default');
    const es = new ESService('caak');
    es.authorPosts(id).then(setArticles);
  }, [id]);

  useEffect(() => {
    context.setShown(true);
  }, []);

  if (loading)
    return (
      <div className={'w-full flex justify-center'}>
        <Loader className={`bg-caak-primary self-center`} />
      </div>
    );

  return (
    <div className="flex justify-center px-[16px] md:px-0">
      <div className="max-w-[1310px] w-full flex flex-col">
        <div className="pt-[17px] md:pt-[71px] pb-[17px] md:pb-[50px] flex flex-col md:flex-row justify-between w-full items-center">
          <div className="flex flex-col md:flex-row">
            <Avatar className="w-[57px] h-[57px] md:w-[82px] md:h-[82px] object-cover" />
            <div className="md:ml-[16px] mt-[15px] md:mt-0">
              <p className="text-[20px] md:text-[30px] font-condensed font-bold text-black leading-[24px] md:leading-[35px]">{`${author?.firstName} ${author?.lastName}`}</p>
              <p className="mt-[9px] md:mt-[12px] text-[15px] text-[#555555] leading-[18px] max-w-[600px]">
                Өөрийн дуртай график дизайны мэдээллээ авдаг сайтнаас хүргэх болно.
              </p>
              <div className="flex flex-row text-[#555555] gap-[23px] mt-[18px] text-[15px] leading-[18px]">
                <p>
                  <span className="text-[#111111] font-medium">{author?.articles?.totalCount}</span> Пост
                </p>
                <p>
                  <span className="text-[#111111] font-medium md:ml-[28px]">{author?.recipes?.length}</span> Жор
                </p>
                <p>
                  <span className="text-[#111111] font-medium md:ml-[28px]">30</span> Дагагчид
                </p>
                <p>
                  <span className="text-[#111111] font-medium md:ml-[28px]">1460</span> Аура
                </p>
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
        <div className="flex flex-row items-center pb-[1px] gap-[36px] border-b border-t border-[#EFEEEF] pt-[16px]">
          {menu.map((data, index) => {
            return (
              <p
                key={index}
                onClick={() => setSelected(index)}
                className={`text-[18px] px-[7px] font-bold cursor-pointer text-center leading-[21px] ${
                  selected === index ? 'border-b-[3px] border-[#FF6600] pb-[12px]' : 'border-none pb-[15px]'
                } ${selected === index ? 'text-[#111111]' : 'text-[#555555]'}`}
              >
                {data.title}
              </p>
            );
          })}
        </div>
        {selected === 0 ? (
          <div>
            {/* <div className="pt-[50px] text-[#111111] font-bold text-[20px] leading-[24px]">
              <p>Жор</p>
              <MagazineFeed />
            </div> */}
            <div className="mt-[50px]">
              <p className="text-[#111111] font-bold text-[20px] leading-6">ПОСТ</p>
              <div className={'mt-[20px] flex flex-wrap gap-[22px] w-full justify-center'}>
                {articles.map((data, index) => {
                  return <FeedCard key={index} post={data} />;
                })}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
