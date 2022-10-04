import { useRef, useState, useEffect, useContext } from 'react';
import StoryItem from '../../component/story/Story';
import { ESService } from '../../lib/esService';
import { AppContext } from '../../App';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default function AllStories() {
  // prettier-ignore
  const context = useContext(AppContext);
  const [activeIndexToday, setActiveIndexToday] = useState(0);
  const [activeIndexYes, setActiveIndexYes] = useState(0);
  const [activeIndexWeek, setActiveIndexWeek] = useState(0);
  const [stories, setStories] = useState([]);

  const currDate = new Date().toLocaleDateString();
  const yesterday = new Date(currDate);
  yesterday.setDate(yesterday.getDate() - 1);

  const todayStory = stories.filter((story) => {
    return currDate === new Date(story?.publish_date).toLocaleDateString();
  });

  const yesterdayStory = stories.filter((story) => {
    return new Date(story?.publish_date).toLocaleDateString() === yesterday.toLocaleDateString();
  });

  const todayRef = useRef(null);
  const yesterdayRef = useRef(null);
  const weekRef = useRef(null);
  // prettier-ignore

  useEffect(() => {
    const es = new ESService('caak');
    es.stories().then((res) => {
      setStories(res);
    });
  }, []);
  // prettier-ignore

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // currDate !== new Date(data?.publish_date)?.toJSON()?.slice(0, 10).replace(/-/g, '/')

  useEffect(() => {
    context.setStore('default');
  }, []);

  const nextItemToday = () => {
    if (activeIndexToday < todayStory.length - 1) {
      setActiveIndexToday(activeIndexToday + 1);
    }
  };
  // prettier-ignore
  const prevItemToday = () => {
    if (activeIndexToday > 0) {
        setActiveIndexToday(activeIndexToday - 1);
    }
  };
  const nextItemYes = () => {
    if (activeIndexYes < yesterdayStory.length - 1) {
      setActiveIndexYes(activeIndexYes + 1);
    }
  };
  // prettier-ignore
  const prevItemYes = () => {
    if (activeIndexYes > 0) {
        setActiveIndexYes(activeIndexYes - 1);
    }
  };
  const nextItemWeek = () => {
    if (activeIndexWeek < stories.length - 1) {
      setActiveIndexWeek(activeIndexWeek + 1);
    }
  };
  // prettier-ignore
  const prevItemWeek = () => {
    if (activeIndexWeek > 0) {
        setActiveIndexWeek(activeIndexWeek - 1);
    }
  };
  // prettier-ignore
  return (
    <div className='flex flex-col items-center w-full px-[16px]'>
        <p className='text-[20px] md:text-[36px] md:leading-[42px] text-[#111111] font-merri font-bold mt-[30px] md:mt-[101px]'>БҮХ СТОРИ</p>
        {todayStory.length > 0 && (
          <div className='sm:px-[30px] mt-[20px] w-full flex flex-col items-center'>
            <div className="w-full">
                <div className='flex flex-row items-center md:ml-[96px]'>
                    <span className='icon-fi-rs-star-f text-[#FF6600] text-[20px] mr-[10px]' />
                    <p className='font-condensed text-[26px] leading-[30px] font-bold'>ӨНӨӨДӨР</p>
                </div>
            </div>
            <div
                className={
                    "flex flex-col max-w-[400px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[1002px] xl:max-w-[1202px] 2xl:max-w-[1502px] w-full justify-center relative"
                }
            >
                {activeIndexToday + 3 < todayStory.length - 1 && (
                    <div
                    onClick={() => {
                        todayRef.current.scrollTo({
                        left: (1 + activeIndexToday) * 310,
                        behavior: 'smooth',
                        });
                        nextItemToday();
                    }}
                    className={
                        'cursor-pointer hidden md:flex z-40 w-[52px] h-[52px] items-center justify-center bg-white border-[#D4D8D8] drop-shadow-md rounded-full absolute right-[-26px] top-1/2'
                    }
                    >
                        <span className={'icon-fi-rs-down-chevron text-[#555555] text-[18px] -rotate-90'} />
                    </div>
                )}

                {activeIndexToday > 0 && (
                    <div
                    onClick={() => {
                        todayRef.current.scrollTo({
                        left: (activeIndexToday - 1) * 310,
                        behavior: 'smooth',
                        });
                        prevItemToday();
                    }}
                    className={
                        'cursor-pointer hidden md:flex z-40 w-[52px] h-[52px] items-center justify-center bg-white border-[#D4D8D8] drop-shadow-md rounded-full absolute left-[-26px] top-1/2 rotate-180'
                    }
                    >
                        <span className={'icon-fi-rs-down-chevron text-[#555555] text-[18px] -rotate-90'} />
                    </div>
                )}
                <div
                    ref={todayRef}
                    className={'w-full wrapper gap-[13px] transition-all pb-[26px] md:pb-0 duration-300 mt-[14px] md:mt-[39px]'}
                >
                    {todayStory.map((item, index) => {
                      return <StoryItem story={item} key={index} index={index} />;
                    })}
                </div>
            </div>
          </div>
        )}
        {yesterdayStory.length > 0 && (
          <div className='mt-[20px] md:mt-[80px] sm:px-[30px] w-full flex flex-col items-center'>
            <div className="w-full">
                <div className='flex flex-row items-center md:ml-[96px]'>
                    <span className='icon-fi-rs-time-f text-[#909090] text-[20px] mr-[10px]' />
                    <p className='font-condensed text-[26px] leading-[30px] font-bold'>ӨЧИГДӨР</p>
                </div>
            </div>
            <div
                className={
                    "flex flex-col max-w-[400px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[1002px] xl:max-w-[1202px] 2xl:max-w-[1502px] w-full justify-center relative"
                }
            >
                {activeIndexYes + 1 < yesterdayStory.length - 1 || yesterdayStory.length > 3 && (
                    <div
                    onClick={() => {
                        yesterdayRef.current.scrollTo({
                        left: (1 + activeIndexYes) * 310,
                        behavior: 'smooth',
                        });
                        nextItemYes();
                    }}
                    className={
                        'cursor-pointer hidden md:flex z-40 w-[52px] h-[52px] items-center justify-center bg-white border-[#D4D8D8] drop-shadow-md rounded-full absolute right-[-26px] top-1/2'
                    }
                    >
                        <span className={'icon-fi-rs-down-chevron text-[#555555] text-[18px] -rotate-90'} />
                    </div>
                )}

                {activeIndexYes > 0 && (
                    <div
                    onClick={() => {
                        yesterdayRef.current.scrollTo({
                        left: (activeIndexYes - 1) * 310,
                        behavior: 'smooth',
                        });
                        prevItemYes();
                    }}
                    className={
                        'cursor-pointer hidden md:flex z-40 w-[52px] h-[52px] items-center justify-center bg-white border-[#D4D8D8] drop-shadow-md rounded-full absolute left-[-26px] top-1/2 rotate-180'
                    }
                    >
                        <span className={'icon-fi-rs-down-chevron text-[#555555] text-[18px] -rotate-90'} />
                    </div>
                )}
                <div
                    ref={yesterdayRef}
                    className={'w-full wrapper gap-[13px] transition-all pb-[26px] md:pb-0 duration-300 mt-[14px] md:mt-[39px]'}
                >
                    {yesterdayStory.map((item, index) => {
                      return <StoryItem story={item} key={index} index={index} />;
                    })}
                </div>
            </div>
        </div>
        )}
        <div className='mt-[20px] md:mt-[80px] sm:px-[30px] w-full flex flex-col items-center'>
            <div className="w-full">
                <div className='flex flex-row items-center md:ml-[96px]'>
                    <span className='icon-fi-rs-time-f text-[#909090] text-[20px] mr-[10px]' />
                    <p className='font-condensed text-[26px] leading-[30px] font-bold'>ЭНЭ ДОЛОО ХОНОГ</p>
                </div>
            </div>
            <div
                className={
                    "flex flex-col max-w-[400px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[1002px] xl:max-w-[1202px] 2xl:max-w-[1502px] w-full justify-center relative"
                }
            >
                {activeIndexWeek + 3 < stories.length - 1 && (
                    <div
                    onClick={() => {
                        weekRef.current.scrollTo({
                        left: (1 + activeIndexWeek) * 310,
                        behavior: 'smooth',
                        });
                        nextItemWeek();
                    }}
                    className={
                        'cursor-pointer hidden md:flex z-40 w-[52px] h-[52px] items-center justify-center bg-white border-[#D4D8D8] drop-shadow-md rounded-full absolute right-[-26px] top-1/2'
                    }
                    >
                    <span className={'icon-fi-rs-down-chevron text-[#555555] text-[18px] -rotate-90'} />
                    </div>
                )}

                {activeIndexWeek > 0 && (
                    <div
                    onClick={() => {
                        weekRef.current.scrollTo({
                        left: (activeIndexWeek - 1) * 310,
                        behavior: 'smooth',
                        });
                        prevItemWeek();
                    }}
                    className={
                        'cursor-pointer hidden md:flex z-40 w-[52px] h-[52px] items-center justify-center bg-white border-[#D4D8D8] drop-shadow-md rounded-full absolute left-[-26px] top-1/2 rotate-180'
                    }
                    >
                    <span className={'icon-fi-rs-down-chevron text-[#555555] text-[18px] -rotate-90'} />
                    </div>
                )}
                <div
                    ref={weekRef}
                    className={'w-full wrapper gap-[13px] transition-all pb-[26px] md:pb-0 duration-300 mt-[14px] md:mt-[39px]'}
                >
                    {stories.map((item, index) => {
                    return <StoryItem story={item} key={index} index={index} />;
                    })}
                </div>
            </div>
        </div>
        <Link to={'/'} className='mt-[40px] sm:mt-[70px] max-w-[1310px] w-full border border-[#FF6600] h-[74px] rounded-[4px] flex items-center justify-center mb-[50px] sm:mb-[100px]'>
            <p className='text-[#FF6600] text-[18px] leading-[21px] font-medium'>Нүүр хуудас руу буцах</p>
        </Link>
    </div>
  )
}
