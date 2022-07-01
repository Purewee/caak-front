import React, { useEffect, useState, useContext } from 'react';
import { ESService } from '../../lib/esService';
import { AppContext } from '../../App';
import StoryImage from '../../assets/images/story-news.svg';
import Logo from '../../component/logo';
import { Link, useParams } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Story() {
  // prettier-ignore
  const { id } = useParams();
  const context = useContext(AppContext);
  const [stories, setStories] = useState([]);
  const [indexOfStory, setIndexOfStory] = useState(id === 'done' ? 'done' : JSON.parse(id));
  const [shownStory, setShownStory] = useState(null);

  useEffect(() => {
    const es = new ESService('caak');
    es.stories().then((res) => {
      setStories(res);
    });
  }, []);

  useEffect(() => {
    context.setStore(null);
    // eslint-disable-next-line
  }, []);

  // prettier-ignore
  // useEffect(() => {
  //   setTimeout(( )=> {
  //     setIndexOfStory(indexOfStory + 1)
  //   }, 5000)
  // },[indexOfStory])

  useEffect(() => {
    setShownStory(stories[indexOfStory]);
  }, [indexOfStory, stories]);

  useEffect(() => {
    context.setShown(false);
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => setIndexOfStory(indexOfStory + 1 === stories.length ? 'done' : indexOfStory + 1),
    onSwipedRight: () => setIndexOfStory(indexOfStory === 0 ? 0 : indexOfStory - 1),
  });
  //prettier-ignore
  return indexOfStory === 'done' ? (
    <div {...handlers} className="w-full h-screen relative bg-black bg-opacity-60">
      <div className="w-full h-full absolute top-0 flex flex-col items-center">
        <div className="flex flex-row items-center w-full justify-between px-[19px] mt-[16px]">
          <div></div>
          <Link to={'/'}>
            <div className="w-[34px] h-[34px] bg-white rounded-full flex justify-center items-center ml-[33.8px]">
              <span className="icon-fi-rs-close text-[13.5px] text-white xl:text-[#555555] " />
            </div>
          </Link>
        </div>
        <div className="max-w-[1574px] w-full mt-[106px]">
          <span className="text-[15px] font-bold leading-[18px] inline-flex text-white">
            <span className="icon-fi-rs-bolt text-[22px] w-[24px] text-[#FF6600]" />
            ОНЦЛОХ СТОРИ <p className="font-normal">&nbsp; МЭДЭЭНҮҮД</p>
          </span>
        </div>
        <p>Өнөөдөр Улаанбаатарт өдөртөө +20 градус дулаан</p>
      </div>
    </div>
  ) : (
    <div {...handlers} className="w-full relative">
      <div>
        <LazyLoadImage
          className="w-full h-screen object-cover"
          alt=""
          src={`http://graph.caak.mn${shownStory?.image}`}
        />
      </div>
      <div className="w-full h-full absolute top-0 flex flex-col items-center justify-between">
        <div className="flex flex-row items-center w-full justify-between px-[19px] mt-[16px]">
          <div>
            <Logo />
          </div>
          <div className="flex flex-row items-center">
            <span className="icon-fi-rs-volume text-[22px] text-white" />
            <span className="icon-fi-rs-play text-[18px] text-white ml-[27px]" />
            <span className="icon-fi-rs-share text-[20px] text-white ml-[25px]" />
            <Link to={'/'}>
              <div className="w-[34px] h-[34px] bg-opacity-30 bg-white rounded-full flex justify-center items-center ml-[33.8px]">
                <span className="icon-fi-rs-close text-[13.5px] text-white xl:text-[#555555] " />
              </div>
            </Link>
          </div>
        </div>
        <div className="pt-[104px] px-[150px] storyLinearBig w-full flex flex-col items-center">
          {/* {indexOfStory === 0 && (
            <div className="w-[246px] h-[60px] border-t border-b border-white flex items-center justify-center">
              <img src={StoryImage} alt="" />
            </div>
          )} */}
          <div className="border-l-[6px] border-white w-full h-[340px] pl-[40px]">
            <div className="flex flex-row justify-start mt-[12px]">
              {shownStory?.categories?.map((x) => (
                <div key={x.id} className="bg-[#FF6600] h-[22px] flex items-center px-[8px]">
                  <p className="text-white text-[12px] font-bold leading-[14px]">
                    #{x.name}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-white mt-[12px] text-[28px] xl:text-[54px] font-condensed font-bold leading-[63px] truncate-2 xl:leading-[70px] max-w-[1032px]">
              {shownStory?.title}
            </p>
            <div className="flex flex-row items-center mt-[12px]">
              <p className="hidden xl:block font-medium text-white border-r border-[#FFFFFF] border-opacity-80 opacity-80 text-[16px] leading-[19px] pr-[12px]">
                Редактор: {shownStory?.author.name}
              </p>
              <p className="font-medium text-white opacity-80 text-[16px] leading-[19px] pl-[12px]">
                2022.04.28, 22:05
              </p>
            </div>
            <button className="bg-[#00000019] mt-[30px] text-white h-[44px] w-[190px] border border-[#FFFFFF80] rounded-[4px]">
              Дэлгэрэнгүй унших
            </button>
          </div>
        </div>
      </div>
      {indexOfStory > 0 && (
        <Link to={`/story/${indexOfStory - 1}`}>
          <div
            onClick={() => setIndexOfStory(indexOfStory - 1)}
            className="absolute hidden top-1/2 left-[20px] w-[54px] h-[54px] rounded-full bg-[#000000] bg-opacity-20 xl:flex items-center justify-center cursor-pointer"
          >
            <span className="icon-fi-rs-down-chevron text-white text-[20px] rotate-90" />
          </div>
        </Link>
      )}
      {
        <Link to={`/story/${indexOfStory + 1 === stories.length ? 'done' : indexOfStory + 1}`}>
          <div
            onClick={() => setIndexOfStory(indexOfStory + 1 === stories.length ? 'done' : indexOfStory + 1)}
            className="absolute top-1/2 right-[20px] w-[54px] h-[54px] rounded-full bg-[#000000] bg-opacity-20 hidden xl:flex items-center justify-center cursor-pointer"
          >
            <span className="icon-fi-rs-down-chevron text-white text-[20px] -rotate-90" />
          </div>
        </Link>
      }
    </div>
  );
}
