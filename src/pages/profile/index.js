import {useState, useContext, useEffect} from 'react'
import MagazineFeed from '../../../src/component/magazine'
import { AppContext } from '../../App'
import { gql, useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import Loader from '../../component/loader';

const USER = gql`
  query GetAuthor($id: ID!) {
    author(id: $id, impression: true) {
      id
      name
    }
  }
`;

const menu = [
  {
    title: 'НҮҮР'
  },
  {
    title: 'ЖОР'
  },
  {
    title: 'ПОСТ'
  },
  {
    title: 'ҮЗСЭН ТҮҮХ'
  },
]

export default function Profile() {
	const context = useContext(AppContext);
  const [selected, setSelected] = useState(0)
  const { id } = useParams();
  // const { data, loading } = useQuery(USER, { variables: { id } })
  // const author = data?.author || {};

  useEffect(() => {
    context.setStore('default')
  },[])

  // if (loading ) 
  // return (
  //   <div className={"w-full flex justify-center"}>
  //     <Loader className={`bg-caak-primary self-center`} />
  //   </div>
  // )

  return (
    <div className='flex justify-center'>
      <div className="max-w-[1310px] w-full flex flex-col">
        <div className="pt-[71px] pb-[50px] flex flex-row justify-between w-full items-center">
          <div className="flex flex-row">
            <img alt="" src="https://lh3.googleusercontent.com/iZiNP57j33Ds2vQrdLiMldv1Jd61QAfU2MIo5kJhtKkysyDkOdGc0LUNDnMQKeZ6uOuZ_CWenRzwYRLpYAiKfn-rMd44Aavy=w960-rj-nu-e365" className="w-[82px] object-cover h-[82px] rounded-full"/>
            <div className="ml-[16px]">
              <p className="text-[30px] font-bold text-black leading-[35px]">user name</p>
              <p className="mt-[12px] text-[15px] text-[#555555] leading-[18px] max-w-[600px]">Өөрийн дуртай график дизайны мэдээллээ авдаг сайтнаас хүргэх болно.</p>
              <div className="flex flex-row text-[#555555] mt-[18px] text-[15px] leading-[18px]">
                <p><span className='text-[#111111] font-medium'>8</span> Пост</p>
                <p><span className='text-[#111111] font-medium ml-[28px]'>132</span> Жор</p>
                <p><span className='text-[#111111] font-medium ml-[28px]'>30</span> Дагагчид</p>
                <p><span className='text-[#111111] font-medium ml-[28px]'>1460</span> Аура</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="cursor-pointer w-[151px] h-[34px] border-[1px] border-[#FF6600] rounded-[4px] flex justify-center items-center">
              <p className="text-[15px] leading-[18px] font-medium text-[#FF6600]">Мэдээллээ засах</p>
            </div>
            <div className=' border-[1px] border-[#D4D8D8] w-[42px] h-[34px] flex justify-center items-center rounded-[4px] ml-[10px]'>
              <span className="icon-fi-rs-more-ver cursor-pointer rotate-90 text-[#111111] text-[18px]"/>
            </div>
          </div>
        </div>
        <div className='flex flex-row items-center pb-[1px] gap-[36px] border-b border-t border-[#EFEEEF] pt-[16px]'>
          {
            menu.map((data, index) => {
              return(
                <p key={index} onClick={() => setSelected(index)} className={`text-[18px] px-[7px] font-bold cursor-pointer text-center leading-[21px] ${selected === index ? 'border-b-[3px] border-[#FF6600] pb-[12px]' : 'border-none pb-[15px]'} ${selected === index ? 'text-[#111111]' : 'text-[#555555]'}`}>{data.title}</p>
              )
            })
          }
        </div>
        {
          selected === 0
          ?
          <div className='pt-[50px] text-[#111111] font-bold text-[20px] leading-[24px]'>
            <p>Жор</p>
            <MagazineFeed/>
          </div>
          :
          null
        }
      </div>
    </div>
  )
}
