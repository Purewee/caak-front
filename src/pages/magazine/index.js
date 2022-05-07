import React, {useState, useEffect, useContext} from 'react'
import FeedCard from '../../component/card/FeedCard'
import { ESService } from '../../lib/esService'
import { AppContext } from '../../App'

const menu = [
  {
      title: 'ШИНЭ',
  },
  {
      title: 'ШИЛДЭГ',
  },
]


export default function Magazine({owned}) {
    const [selected, setSelected] = useState(0)
    const [articles, setArticles] = useState([]);
	const context = useContext(AppContext);

    useEffect(() => {
        context.setStore('default')
    },[])
  
    useEffect(() => {
      const es = new ESService('caak');
      es.home_articles().then(setArticles);
    }, []);

    return (
        <div className="py-[31px] flex flex-col items-center w-full">
            <img className="w-[800px] h-[360px] rounded-[10px] object-cover" alt="" src="https://namastehallyu.com/wp-content/uploads/2021/03/suzynamastehallyu.jpg"/>
            <p className="text-[38px] font-bold text-black leading-[44px] mt-[22px]">Болдын жор</p>
            <div className="text-[#555555] text-[15px] leading-[18px] flex flex-row items-center mt-[10px]">
                жор үүсгэсэн:<div className="text-[#111111] font-medium flex flex-row items-center ml-[8px]"><img className="h-[22px] w-[22px] rounded-full object-cover mr-[6px]" alt="" src="https://i.mydramalist.com/pOqyQf.jpg"/>Sam Dorj</div>
            </div>
            <p className="text-[#555555] text-[15px] mt-[20px]">Энэхүү жор дээр технологи болон иноваци тухай мэдээнүүдийг оруулах болно.</p>
            <div className="flex flex-row text-[#555555] mt-[20px] text-[15px] leading-[18px]">
                <p><span className='text-[#111111] font-medium'>8</span> Пост</p>
                <p><span className='text-[#111111] font-medium ml-[20px]'>30</span> Дагагчид</p>
                <p><span className='text-[#111111] font-medium ml-[20px]'>132</span> Хандалт</p>
            </div>
            {
            owned ?
            <div className="flex flex-row mt-[24px]">
                <div className="bg-[#FF6600] cursor-pointer w-[90px] h-[34px] border-[1px] border-[#FF6600] rounded-[4px] flex justify-center items-center">
                <p className="text-[15px] leading-[18px] font-bold text-white">Дагах</p>
                </div>
                <span className="icon-fi-rs-more-ver cursor-pointer text-[#111111] ml-[10px] text-[18px] border-[1px] border-[#D4D8D8] w-[42px] h-[34px] flex justify-center items-center rounded-[4px]"/>
            </div>
            :
            <div className=' mt-[24px]'>
                <div className='w-[124px] h-[34px] rounded-[4px] border-[1px] border-[#FF6600] cursor-pointer flex items-center justify-center'>
                    <p className='text-[#FF6600] font-medium text-[15px]'>Жор засах</p>
                </div>
            </div>
            }
            <div className='flex flex-row items-center justify-center gap-[50px] mt-[52px] pb-[1px] max-w-[1310px] w-full border-b border-[#EFEEEF]'>
                {
                    menu.map((data, index) => {
                    return(
                        <p key={index} onClick={() => setSelected(index)} className={`text-[18px] font-bold cursor-pointer text-center leading-[21px] ${selected === index ? 'border-b-[3px] border-[#FF6600] pb-[12px]' : 'border-none pb-[15px]'} ${selected === index ? 'text-[#111111]' : 'text-[#555555]'}`}>{data.title}</p>
                    )
                    })
                }
            </div>
            <div
              className={
                "relative max-w-[1310px] w-full justify-items-center newFeedGrid justify-center mt-[50px]"
              }
            >
              {articles.map((data, index) => {
                return <FeedCard key={index} post={data} />;
              })}
            </div>
        </div>
    )
}
