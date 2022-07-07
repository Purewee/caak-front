import React, { useEffect, useContext, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { AppContext } from '../../App';
import SignInUpController from '../../component/modal/SignInUpController';
import { useAuth } from '../../context/AuthContext';
import HahaIcon from '../../assets/images/fi-rs-react-haha.svg';
import LoveIcon from '../../assets/images/fi-rs-react-love.png';
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
    }
  }
`;

//prettier-ignore
const menu = [
    {
        title: 'МЭДЭЭ',
    },
    // {
    //     title: 'ЖОР',
    // },
    {
        title: 'ДАГАГЧИД',
    },
    {
        title: 'ДАГАСАН',
    },
]

//prettier-ignore
export default function Dashboard() {
    const context = useContext(AppContext);
    const { id } = useParams()
    const [ selected, setSelected ] = useState(0)
    const [ articles, setArticles ] = useState([])
    const [isShown, setIsShown] = useState(false);
    const { data, loading } = useQuery(ME);
    const { isAuth } = useAuth();

    useEffect(() => {
        !isAuth && setIsShown('signin')
    },[]);

    useEffect(() => {
        const es = new ESService('caak');
        es.authorPosts(id).then((res) => {
            setArticles(res?.hits)
        });
    }, [id]);

    useEffect(() => {
        context.setStore('default');
      }, []);
    //prettier-ignore
    return isAuth && data?.me?.id === id ? (
        <div className='flex w-full justify-center bg-white px-[16px] md:px-0'>
            <div className='max-w-[1140px] w-full mt-[50px]'>
                <p className='text-[28px] leading-[33px] font-medium'>Дашбоард</p>
                <div className='w-full relative border-[#EFEEEF] border-b-[2px] h-[28px] mt-[42px]'>
                    <div className='absolute left-0 top-0 flex flex-row items-center gap-[40px] w-full'>
                        {
                            menu.map((data, index) => {
                                return(
                                    <p onClick={() => setSelected(index)} className={`cursor-pointer font-medium text-[14px] h-[28px] ${selected === index ? 'border-b-[2px] border-caak-primary text-caak-black' : 'text-caak-darkGray'}`} key={index}>{data.title}</p>
                                )
                            })
                        }
                    </div>
                </div>
                <p className='mt-[40px] text-[22px] font-bold leading-[25px]'>Статистик</p>
                <div className='flex flex-row w-full gap-[18px] mt-[22px]'>
                    <div className='max-w-[368px] w-full h-[123px] bg-[#DFEDF1] rounded-[4px] flex flex-col items-center justify-center text-[#163943]'>
                        <p className='font-medium text-[15px]'>Үзэлт</p>
                        <p className='mt-[6px] text-[32px] font-condensed font-bold'>3,593</p>
                    </div>
                    <div className='max-w-[368px] w-full h-[123px] bg-[#F2F1DF] rounded-[4px] flex flex-col items-center justify-center text-[#5D5B42]'>
                        <p className='font-medium text-[15px]'>Сэтгэгдэл</p>
                        <p className='mt-[6px] text-[32px] font-condensed font-bold'>2,598</p>
                    </div>
                    <div className='max-w-[368px] w-full h-[123px] bg-[#F3DEDE] rounded-[4px] flex flex-col items-center justify-center text-[#813333]'>
                        <p className='font-medium text-[15px]'>Реакшн</p>
                        <p className='mt-[6px] text-[32px] font-condensed font-bold'>1,224</p>
                    </div>
                </div>
                <table className="w-full mt-[40px] mb-[40px] border border-[#EFEEEF]">
                    <thead className="h-[44px]">
                        <tr className="bg-[#F5F5F5]">
                            <th className="w-full text-left text-[#555555] font-medium text-[15px] pl-[25px]">
                                Мэдээний нэр
                            </th>
                            <th className="text-center text-[15px] text-[#555555] font-medium min-w-[150px]">
                            Үзэлт
                            </th>
                            <th className="text-center text-[15px] text-[#555555] font-medium min-w-[150px]">
                            Сэтгэгдэл
                            </th>
                            <th className="text-center text-[15px] text-[#555555] font-medium min-w-[150px]">
                            Реакшн
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            articles.map((data, index) => {
                                return(
                                    <tr key={index} className="border-b">
                                        <td>
                                            <div className='flex flex-row items-center pl-[20px] h-[57px] paddinTop'>
                                                <img className='w-[44px] h-[44px] object-cover' src={imagePath(data.image)} />
                                                <div className='ml-[12px]'>
                                                    <Link to={`/post/view/${data.id}`}>
                                                        <p className='truncate-1 text-[17px] leading-[20px] font-medium'>{data.title}</p>
                                                    </Link>
                                                    {/* <p className='text-[#909090] leading-[16px] mt-[8px]'>Жор: Миний дуртай мэдээнүүд</p> */}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className='text-[15px] font-medium text-center'>44</p>
                                        </td>
                                        <td>
                                            <p className='text-[15px] font-medium text-center'>35</p>
                                        </td>
                                        <td>
                                            <div className='flex flex-row items-center pl-[40px]'>
                                                <img className='w-[20px]'  src={LoveIcon}/>
                                                <img className='w-[20px]'  src={HahaIcon}/>
                                                <p className='ml-[6px] text-[15px]'>{data.data?.like_count}</p>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
    :
    <SignInUpController isShown={isShown} setIsShown={setIsShown}/>
}
