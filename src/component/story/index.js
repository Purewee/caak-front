import { useRef, useState, useEffect } from 'react';
import StoryItem from './Story';
import { ESService } from '../../lib/esService';
import { Link } from 'react-router-dom';

const StoryFeed = ({ home, slug = null, tag = null }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stories, setStories] = useState([]);
  const trendPostsRef = useRef(null);
  const es = new ESService('caak');

  stories.sort((a, b) => (b.featured === true) - (a.featured === true));

  useEffect(() => {
    if (!!slug) {
      es.categoryStories(slug).then((res) => {
        setStories(res);
      });
    } else if (!!tag) {
      es.tagStories(tag).then((res) => {
        setStories(res);
      });
    } else {
      es.stories().then((res) => {
        setStories(res);
      });
    }
  }, [slug, tag]);

  const nextItem = () => {
    if (activeIndex < stories.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };
  const prevItem = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return stories?.length > 0 ? (
    <div
      className={`flex flex-col w-full max-w-[1502px] justify-center relative mt-[14px] md:mt-0 ${
        home ? 'md:pt-[80px]' : 'md:pt-[50px]'
      }`}
    >
      {home ? (
        <div className="flex flex-row items-center w-full relative justify-between md:justify-center">
          <p className="text-[17px] condMedium font-medium leading-[20px] sm:hidden">Стори мэдээ</p>
          <img
            className="h-[20px] md:h-[42px] md:w-[324px] mt-[30px] md:mt-0 hidden sm:block"
            src={require('../../assets/images/feed_story.svg').default}
            alt="Feeds"
          />
          <Link
            className="flex flex-row-reverse sm:flex-row gap-[6px] sm:absolute items-center right-[121px]"
            to="/stories"
          >
            <p className="text-[14px] condMedium sm:font-normal sm:text-[16px] text-[#909090] sm:text-[#111111]">
              Бүх сторинууд
            </p>
            <span className="icon-fi-rs-stories-o text-[#909090] sm:text-[#FF6600] text-[18px]" />
          </Link>
        </div>
      ) : (
        <p className="text-[18px] text-[#111111] leading-[21px]">
          <span className="font-bold">СТОРИ</span> МЭДЭЭ
        </p>
      )}
      <div
        ref={trendPostsRef}
        className={`w-full md:h-[457px] flex flex-row items-center wrapper overflow-y-visible gap-x-[6px] sm:gap-x-[13px] transition-all pb-[10px] md:pb-0 duration-300 mt-[14px] ${
          home ? 'md:mt-[29px]' : 'md:mt-[20px]'
        }`}
      >
        {activeIndex + 1 < stories.length - 1 && (
          <div
            onClick={() => {
              trendPostsRef.current.scrollTo({
                left: (1 + activeIndex) * 310,
                behavior: 'smooth',
              });
              nextItem();
            }}
            className="cursor-pointer hidden md:flex z-40 w-[52px] h-[52px] items-center justify-center bg-white border-[#D4D8D8] drop-shadow-md rounded-full absolute right-[-26px]"
          >
            <span className="icon-fi-rs-down-chevron text-[#555555] text-[18px] -rotate-90" />
          </div>
        )}

        {activeIndex > 0 && (
          <div
            onClick={() => {
              trendPostsRef.current.scrollTo({
                left: (activeIndex - 1) * 310,
                behavior: 'smooth',
              });
              prevItem();
            }}
            className="cursor-pointer hidden md:flex z-40 w-[52px] h-[52px] items-center justify-center bg-white border-[#D4D8D8] drop-shadow-md rounded-full absolute left-[-26px] rotate-180"
          >
            <span className="icon-fi-rs-down-chevron text-[#555555] text-[18px] -rotate-90" />
          </div>
        )}
        {stories.map((item, index) => {
          return <StoryItem border={index === 0} story={item} key={index} index={index} />;
        })}
        <div className="min-w-[106px] hidden sm:min-w-[290px] relative sm:flex items-center justify-center max-w-[290px] rounded-[8px] min-h-[160px] sm:min-h-[435px] max-h-[435px]">
          <img
            className="min-w-[106px] sm:min-w-[290px] max-w-[290px] rounded-[8px] min-h-[160px] sm:min-h-[435px] max-h-[435px]"
            src={require('../../assets/images/all-stories.png')}
            alt="All Stories"
          />
          <div className="bg-black rounded-[8px] bg-opacity-70 px-[10px] md:px-[47px] h-full w-full absolute flex justify-center items-center">
            <Link to="/stories" className="w-full">
              <div className="md:h-[34px] rounded-[4px] cursor-pointer bg-white w-full flex flex-row items-center justify-center">
                <span className="icon-fi-rs-stories-o hidden md:block text-[#FF6600] text-[14.6px] mr-[10px]" />
                <p className="text-[#111111] text-center">Бүх сторинууд үзэх</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default StoryFeed;
