import React, {useContext, useEffect, useState} from 'react'
import { AppContext } from '../../App';
import TagsCard from '../../component/card/TopTags';
import { ESService } from '../../lib/esService';

const menu = [
  {
      title: 'ШИНЭ',
  },
  {
      title: 'ШИЛДЭГ',
  },
]

export default function TopTags() {
  const [selected, setSelected] = useState(0)
  const [articles, setArticles] = useState([]);
	const context = useContext(AppContext);

  useEffect(() => {
    context.setStore('default')
    // eslint-disable-next-line
  },[])

  useEffect(() => {
    const es = new ESService('caak');
    es.home_articles().then(setArticles);
  }, []);

  return (
    <div className='flex justify-center pt-[70px]'>
      <div className='max-w-[1310px] w-full flex flex-col items-center'>
        <div className='flex flex-row justify-between items-center w-full'>
          <div className='w-[142px]'>

          </div>
          <p className='text-black text-[38px] font-roboto leading-[44px] font-bold'>#БИЗНЕСС</p>
          <div className='flex flex-row items-center'>
            <button className='bg-caak-primary text-white text-[15px] font-bold font-roboto w-[90px] h-[34px] rounded-[4px] border border-caak-primary'>
              Дагах
            </button>
            <button className='font-bold font-roboto w-[42px] h-[34px] rounded-[4px] border border-[#D4D8D8] ml-[10px]'>
              <span className='icon-fi-rs-more-ver rotate-90 text-[#111111] text-[18px]' />
            </button>
          </div>
        </div>
        <div className='flex flex-row items-center mt-[10px]'>
          <p className='text-[#555555] text-[15px] leading-[18px]'><span className='text-[#111111] font-medium'>8 </span>Пост</p>
          <p className='text-[#555555] text-[15px] leading-[18px] ml-[20px]'><span className='text-[#111111] font-medium'>30 </span>Дагагчид</p>
        </div>
        <div className=' mt-[40px] flex flex-row items-center border-[#EFEEEF] border-b border-t w-full justify-center gap-[50px] pb-[1px] pt-[17px]'>
          {
              menu.map((data, index) => {
              return(
                  <p key={index} onClick={() => setSelected(index)} className={`text-[18px] font-bold cursor-pointer text-center leading-[21px] ${selected === index ? 'border-b-[3px] border-[#FF6600] pb-[12px]' : 'border-none pb-[15px]'} ${selected === index ? 'text-[#111111]' : 'text-[#555555]'}`}>{data.title}</p>
              )
              })
          }
        </div>
        <div className='flex flex-row items-center justify-between w-full mt-[50px] pb-[50px]'>
          {
            articles.slice(1, 4).map((data, index) => {
              return(
                <TagsCard data={data} middle={index === 1 && true} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
