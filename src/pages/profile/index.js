import { useState, useContext, useEffect } from 'react';
import MagazineFeed from '../../../src/component/magazine';
import { AppContext } from '../../App';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Loader from '../../component/loader';
import { ESService } from '../../lib/esService';
import FeedCard from '../../component/card/FeedCard';

const USER = gql`
  query GetAuthor($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
      email
      articles {
        totalCount
      }
      status
      recipes {
        id
        name
        createdAt
      }
    }
  }
`;

const menu = [
  {
    title: 'НҮҮР',
  },
  {
    title: 'ЖОР',
  },
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
  const { id } = useParams();
  const { data, loading } = useQuery(USER, { variables: { id } });
  const author = data?.user || {};

  useEffect(() => {
    context.setStore('default');
    const es = new ESService('caak');
    es.authorPosts(id).then(setArticles);
  }, [id]);

  if (loading)
    return (
      <div className={'w-full flex justify-center'}>
        <Loader className={`bg-caak-primary self-center`} />
      </div>
    );

  return (
    <div className="flex justify-center">
      <div className="max-w-[1310px] w-full flex flex-col">
        <div className="pt-[71px] pb-[50px] flex flex-row justify-between w-full items-center">
          <div className="flex flex-row">
            <img
              alt=""
              src="https://lh3.googleusercontent.com/iZiNP57j33Ds2vQrdLiMldv1Jd61QAfU2MIo5kJhtKkysyDkOdGc0LUNDnMQKeZ6uOuZ_CWenRzwYRLpYAiKfn-rMd44Aavy=w960-rj-nu-e365"
              className="w-[82px] object-cover h-[82px] rounded-full"
            />
            <div className="ml-[16px]">
              <p className="text-[30px] font-bold text-black leading-[35px]">{`${author?.firstName} ${author?.lastName}`}</p>
              <p className="mt-[12px] text-[15px] text-[#555555] leading-[18px] max-w-[600px]">
                Өөрийн дуртай график дизайны мэдээллээ авдаг сайтнаас хүргэх болно.
              </p>
              <div className="flex flex-row text-[#555555] mt-[18px] text-[15px] leading-[18px]">
                <p>
                  <span className="text-[#111111] font-medium">{author?.articles?.totalCount}</span> Пост
                </p>
                <p>
                  <span className="text-[#111111] font-medium ml-[28px]">{author?.recipes?.length}</span> Жор
                </p>
                <p>
                  <span className="text-[#111111] font-medium ml-[28px]">30</span> Дагагчид
                </p>
                <p>
                  <span className="text-[#111111] font-medium ml-[28px]">1460</span> Аура
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="cursor-pointer w-[151px] h-[34px] border-[1px] border-[#FF6600] rounded-[4px] flex justify-center items-center">
              <p className="text-[15px] leading-[18px] font-medium text-[#FF6600]">Мэдээллээ засах</p>
            </div>
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
            <div className="pt-[50px] text-[#111111] font-bold text-[20px] leading-[24px]">
              <p>Жор</p>
              <MagazineFeed />
            </div>
            <div className="mt-[50px]">
              <p className="text-[#111111] font-bold text-[20px] leading-6">ПОСТ</p>
              <div className={'relative mt-[20px] w-full justify-items-center newFeedGrid justify-center'}>
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
