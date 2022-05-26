import React, {useEffect, useState, useContext} from 'react'
import { ESService } from '../../lib/esService'
import { AppContext } from '../../App';
import StoryImage from '../../assets/images/story-news.svg'
import Logo from '../../component/logo';
import { Link } from 'react-router-dom';
import { useSwipeable } from "react-swipeable";

export default function Story() {
	const context = useContext(AppContext);
    const [stories, setStories] = useState([]);
    const [indexOfStory, setIndexOfStory] = useState(0) 
    const [shownStory, setShownStory] = useState(null)

    console.log(indexOfStory)

    useEffect(() => {
        const es = new ESService('caak');
        es.stories().then(res => {
          setStories(res)
        });
    }, []);

    useEffect(() => {
        context.setStore(null)
        // eslint-disable-next-line
    },[])

    useEffect(() => {
        setShownStory(stories[indexOfStory])
    },[indexOfStory, stories.length])

    const handlers = useSwipeable({
        onSwipedLeft: () => setIndexOfStory(indexOfStory + 1 === stories.length ? 'done' : indexOfStory + 1),
        onSwipedRight: () => setIndexOfStory(indexOfStory === 0 ? 0 : indexOfStory - 1)
    });

    return indexOfStory === 'done' ?
    <div {...handlers} className='w-full h-screen relative bg-black bg-opacity-60'>
        <div className='w-full h-full absolute top-0 flex flex-col items-center'>
            <div className='flex flex-row items-center w-full justify-between px-[19px] mt-[16px]'>
                <div></div>
                <Link to={'/'}>
                    <div className='w-[34px] h-[34px] bg-white rounded-full flex justify-center items-center ml-[33.8px]'>
                        <span className='icon-fi-rs-close text-[13.5px] text-white xl:text-[#555555] ' />
                    </div>
                </Link>
            </div>
            <div className='max-w-[1574px] w-full mt-[106px]'>
                <span className='text-[15px] font-bold leading-[18px] inline-flex text-white'><span className='icon-fi-rs-bolt text-[22px] w-[24px] text-[#FF6600]'/>ОНЦЛОХ СТОРИ <p className='font-normal'>&nbsp; МЭДЭЭНҮҮД</p></span>
            </div>
        </div>
    </div>
    :
    <div {...handlers} className='w-full relative'>
        <div>
            <img className='w-full h-screen object-cover' src={`http://graph.caak.mn${shownStory?.image}`}/>
        </div>
        <div className='w-full h-full absolute top-0 flex flex-col items-center justify-between'>
            <div className='flex flex-row items-center w-full justify-between px-[19px] mt-[16px]'>
                <div></div>
                <div className='flex flex-row items-center'>
                    <span className='icon-fi-rs-volume text-[22px] text-white'/>
                    <span className='icon-fi-rs-play text-[18px] text-white ml-[27px]'/>
                    <span className='icon-fi-rs-share text-[20px] text-white ml-[25px]'/>
                    <Link to={'/'}>
                        <div className='w-[34px] h-[34px] bg-opacity-30 bg-white rounded-full flex justify-center items-center ml-[33.8px]'>
                            <span className='icon-fi-rs-close text-[13.5px] text-white xl:text-[#555555] ' />
                        </div>
                    </Link>
                </div>
            </div>
            <div className='pb-[60px] pt-[104px] storyLinearBig w-full flex flex-col items-center'>
                {
                    indexOfStory === 0 &&
                    <div className='w-[246px] h-[60px] border-t border-b border-white flex items-center justify-center'>
                        <img src={StoryImage}  alt=''/>
                    </div>
                }
                <p className='text-white text-[28px] xl:text-[60px] font-bold leading-[37px] xl:leading-[70px] mt-[67px] font-merri max-w-[1032px] text-center'>{shownStory?.title}</p>
                <div className='flex flex-row items-center mt-[24px]'>
                    <p className='hidden xl:block font-medium text-white opacity-80 text-[16px] leading-[19px] mr-[25px]'>Редактор: {shownStory?.author.name}</p>
                    <p className='font-medium text-white opacity-80 text-[16px] leading-[19px]'>2022.04.28, 22:05</p>
                </div>
            </div>
        </div>
        {
            indexOfStory > 0 &&
            <div onClick={() => setIndexOfStory(indexOfStory - 1)} className='absolute hidden top-1/2 left-[20px] w-[54px] h-[54px] rounded-full bg-[#000000] bg-opacity-20 xl:flex items-center justify-center cursor-pointer'>
                <span className='icon-fi-rs-down-chevron text-white text-[20px] rotate-90'/>
            </div>
        }
        {
            <div onClick={() => setIndexOfStory(indexOfStory + 1 === stories.length ? 'done' : indexOfStory + 1)} className='absolute top-1/2 right-[20px] w-[54px] h-[54px] rounded-full bg-[#000000] bg-opacity-20 hidden xl:flex items-center justify-center cursor-pointer'>
                <span className='icon-fi-rs-down-chevron text-white text-[20px] -rotate-90'/>
            </div>
        }
    </div>
}
