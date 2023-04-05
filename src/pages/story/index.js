import React, { useEffect, useRef, useState } from 'react';
import Logo from '../../component/logo';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { generateTimeAgo, imagePath } from '../../utility/Util';
import { useQuery } from '@apollo/client';
import { STORY } from './_gql';
import Stories from 'react-insta-stories';
import { Button, Skeleton, Typography } from 'antd';
import ReactPlayer from 'react-player';
import { FIcon } from '../../component/icon';
import AllStories from '../../assets/images/all-stories.png';
import moment from 'moment';
import sanitizeHtml from 'sanitize-html';

const { Paragraph } = Typography;

export default function Story() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(0);
  const { data, loading } = useQuery(STORY, { variables: { id } });
  const story = data?.article || {};
  const stories = story?.blocks?.map((b) => {
    if (b.kind === 'video') {
      return {
        content: (props) => <VideoStory {...props} block={b} story={story} />,
        duration: (b.videoDuration || 10) * 1100,
      };
    } else {
      return {
        content: (props) => <ImageStory {...props} block={b} story={story} />,
        duration: 8000,
      };
    }
  });

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        navigate(location.state || '/');
      }
      if (event.key === 'ArrowLeft') {
        if (current === 0 && story?.nextStory?.id) {
          event.preventDefault();
          navigate(`/story/${story.nextStory.id}`);
        }
        // if (current + 1 === story.length) {
        //   event.preventDefault();
        //   navigate(`/story/${story.nextStory.id}`);
        // }
      }
      if (event.key === 'ArrowRight') {
        if (current === stories?.length - 1 && story?.prevStory?.id) {
          event.preventDefault();
          navigate(`/story/${story.prevStory.id}`);
        }
        // if (current === 0) {
        //   event.preventDefault();
        //   navigate(`/story/${story.prevStory.id}`);
        // }
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [stories]);

  if (loading) return <Skeleton />;
  return (
    <div className="w-full h-full z-50 fixed top-0 flex flex-col sm:flex-row justify-center lg:justify-between bg-[#212121] sm:p-[20px]">
      {/* <span
        onClick={() => navigate('/')}
        style={{ zIndex: 1000 }}
        className="icon-fi-rs-close sm:hidden absolute right-[15px] top-[25px] text-[20px] text-white"
      /> */}
      <div
        style={{
          background: 'transparent linear-gradient(0deg, #00000000 0%, #000000 100%) 0% 0% no-repeat padding-box',
        }}
        className="flex flex-row items-center justify-between w-full sm:hidden p-[10px]"
      >
        <Logo white />
        <span
          onClick={() => navigate(location.state || '/')}
          style={{ zIndex: 1000 }}
          className="icon-fi-rs-close sm:hidden right-[15px] top-[25px] text-[20px] text-white"
        />
      </div>
      <div className="hidden lg:flex flex-col h-full w-[272px] mr-[16px] items-start justify-start">
        <Logo white className="mb-[135px]" />
        {story.nextStory ? (
          <Preview story={story.nextStory} />
        ) : (
          <div className="w-[272px] h-[440px] relative flex imems-center justify-center">
            <img src={AllStories} alt="Бүх стори" className="object-cover opacity-70" />
            <div
              className="py-4 absolute top-[180px] bg-white flex w-[188px] cursor-pointer flex-col items-center text-[#111111] text-[15px] h-[80px] rounded-[8px]"
              onClick={() => navigate('/stories')}
            >
              <FIcon className="icon-fi-rs-stories-o text-caak-primary" />
              Бусад сторинууд үзэх
            </div>
          </div>
        )}
      </div>
      <Stories
        width="100%"
        height="100%"
        keyboardNavigation
        defaultInterval={1500}
        storyContainerStyles={{ overflow: 'hidden', background: '#212121' }}
        stories={stories}
        onStoryStart={(currentId) => setCurrent(currentId)}
        onAllStoriesEnd={() => {
          if (story?.prevStory?.id) {
            navigate(`/story/${story.prevStory.id}`);
          }
        }}
      />
      <div className="hidden lg:flex flex-col justify-center h-full w-[272px] ml-[16px]">
        <div className="absolute top-[12px] right-[12px] flex">
          <Button
            type="link"
            icon={<FIcon className={`icon-fi-rs-close text-white`} />}
            onClick={() => navigate(location.state || '/')}
          />
        </div>
        {story.prevStory ? (
          <Preview story={story.prevStory} />
        ) : (
          <div className="w-[272px] h-[440px] relative flex imems-center justify-center">
            <img src={AllStories} alt="Бүх стори" className="object-cover opacity-70" />
            <div
              className="py-4 absolute top-[180px] bg-white flex w-[188px] cursor-pointer flex-col items-center text-[#111111] text-[15px] h-[80px] rounded-[8px]"
              onClick={() => navigate('/stories')}
            >
              <FIcon className="icon-fi-rs-stories-o text-caak-primary" />
              Бусад сторинууд үзэх
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ImageStory({ block, story }) {
  const [expanded, setExpanded] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const containerRef = useRef(null);

  const ellipsis = sanitizeHtml(block?.content, {
    allowedTags: [],
    allowedAttributes: {},
    allowedIframeHostnames: [],
    parser: {
      decodeEntities: true,
    },
  });

  useEffect(() => {
    if (block.content && block.content?.length > 90) {
      setHasMore(true);
    }
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* <div
        style={{
          background: 'transparent linear-gradient(180deg, #00000067 0%, #00000000 100%) 0% 0% no-repeat padding-box',
        }}
        className="w-full h-[100px] absolute top-0"
      ></div> */}
      <img alt="" src={imagePath(block.imageUrl)} className="w-full h-full object-contain mb-[53px] sm:mb-0" />
      {block.kind === 'post' && (
        <div className="absolute bottom-0 pb-[20px] p-[16px] sm:p-[32px] h-1/3 story-linear w-full rounded-[8px] flex flex-col justify-end">
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-[10px] justify-start mb-[10px]">
              {story?.categories?.nodes?.map((x) => (
                <p
                  key={x.name}
                  className="bg-[#FF6600] px-[8px] py-[4px] text-white text-[12px] leading-[14px] font-bold uppercase"
                >
                  {x.name}
                </p>
              ))}
            </div>
            {block?.content && (
              <Link to={block?.data?.url}>
                <span
                  className="truncate-2 max-w-[500px] text-white condMedium text-[26px] leading-[30px]"
                  dangerouslySetInnerHTML={{ __html: block?.content }}
                />
              </Link>
            )}
            <span className="text-white opacity-80 text-[14px] leading-[16px] mt-[10px]">
              {generateTimeAgo(story.publishDate)}
            </span>
          </div>
          <Link
            style={{ zIndex: 1000 }}
            className="mt-10 sm:mt-5 flex w-full justify-center sm:justify-start"
            to={block?.data?.url}
          >
            <div className="w-[124px] sm:w-[136px] h-[34px] relative bg-white flex p-1 px-2 border-0 text-[15px] font-medium text-caak-black rounded-[4px] items-center justify-center">
              Дэлгэрэнгүй
              <FIcon className="icon-fi-rs-down-chevron absolute sm:relative bottom-[40px] sm:bottom-0 text-white sm:text-caak-primary text-[14px] rotate-180 sm:-rotate-90" />
            </div>
          </Link>
        </div>
      )}
      {block.kind === 'image' && block?.content && (
        <div className="flex flex-col absolute bottom-0 items-start w-full justify-end h-1/2 p-4 md:p-[30px] story-linear">
          <p
            style={{ textShadow: '0px 2px 3px #00000029' }}
            className={`${
              !expanded && 'truncate-2 max-w-[500px]'
            } w-full text-white opacity-80 text-[22px] leading-[27px] font-condensed tracking-[0.48px] font-normal mb-[16px]`}
            ref={containerRef}
          >
            {ellipsis}
          </p>
          {hasMore && (
            <button
              onClick={() => setExpanded(!expanded)}
              style={{ zIndex: 1001 }}
              className="w-[112px] text-[14px] flex items-center justify-center h-[28px] rounded-[100px] bg-white bg-opacity-20 text-white"
            >
              Илүү ихийг
              <FIcon className={`icon-fi-rs-down-chevron text-white text-[12px] ${expanded && 'rotate-180'}`} />
            </button>
          )}
        </div>
      )}
      <div className="flex flex-row items-center absolute top-7 right-[14px]">
        <div className="flex flex-row items-center h-9 px-[12px] text-white bg-black bg-opacity-40 rounded-full">
          <span className="icon-fi-rs-eye-o text-[18px] mr-1" />
          <p className="text-[14px] leading-[16px]">{story?.viewCount}</p>
        </div>
      </div>
    </div>
  );
}

function VideoStory({ block, story, action }) {
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const containerRef = useRef(null);

  const ellipsis = sanitizeHtml(block?.content, {
    allowedTags: [],
    allowedAttributes: {},
    allowedIframeHostnames: [],
    parser: {
      decodeEntities: true,
    },
  });

  useEffect(() => {
    if (block.content && block.content?.length > 90) {
      setHasMore(true);
    }
  }, []);

  return (
    <div className="w-full h-full flex justify-between">
      <div
        style={{
          background: 'transparent linear-gradient(180deg, #00000067 0%, #00000000 100%) 0% 0% no-repeat padding-box',
        }}
        className="w-full h-[100px] absolute top-0"
      ></div>
      <div className="w-[100%] h-full sm:rounded-[8px] flex flex-col items-center justify-center bg-contain bg-no-repeat bg-center bg-[#212121] relative">
        <div
          style={{ zIndex: 1001 }}
          className="flex flex-row items-center absolute top-[18px] lg:top-7 right-[14px] gap-2"
        >
          <div className="flex flex-row items-center h-[30px] lg:h-9 px-[12px] text-white bg-black bg-opacity-40 rounded-full">
            <span className="icon-fi-rs-eye-o text-[18px] mr-1" />
            <p className="text-[14px] leading-[16px]">{story?.viewCount}</p>
          </div>
          <FIcon
            onClick={() => setPlaying(!playing)}
            className={`${playing ? 'icon-fi-rs-pause' : 'icon-fi-rs-play'}
              w-[30px] h-[30px] lg:w-9 lg:h-9 bg-black bg-opacity-40 rounded-full text-[18px] lg:text-[20px] text-white`}
          />
          <FIcon
            onClick={() => {
              setMuted(!muted);
            }}
            className={`${muted ? 'icon-fi-rs-mute' : 'icon-fi-rs-volume'}
              w-[30px] h-[30px] lg:w-9 lg:h-9 bg-black bg-opacity-40 rounded-full text-[18px] lg:text-[20px] text-white`}
          />
        </div>
        <ReactPlayer
          url={imagePath(block.videoUrl)}
          playing={playing}
          controls={false}
          width="100%"
          height="100%"
          muted={muted}
          style={{ zIndex: 1000 }}
          className="rounded-[8px]"
          onPause={() => action('pause')}
          onPlay={() => action('play')}
        />
        <div
          style={{ zIndex: 1001 }}
          className="flex flex-col absolute bottom-0 items-start w-full justify-end h-1/2 p-4 md:p-[30px] story-linear"
        >
          <p
            style={{ textShadow: '0px 2px 3px #00000029' }}
            className={`${
              !expanded && 'truncate-2 max-w-[450px]'
            } w-full text-white opacity-80 text-[16px] lg:text-[22px] leading-[27px] font-condensed tracking-[0.48px] font-normal mb-[16px]`}
            ref={containerRef}
          >
            {ellipsis}
          </p>
          {hasMore && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-[112px] text-[14px] flex items-center justify-center h-[28px] rounded-[100px] bg-white bg-opacity-20 text-white"
            >
              Илүү ихийг
              <FIcon className={`icon-fi-rs-down-chevron text-white text-[12px] ${expanded && 'rotate-180'}`} />
            </button>
          )}
          {block?.data?.url && (
            <a
              className="mt-[10px] sm:mt-5 flex w-full justify-center sm:justify-start"
              href={block?.data?.url}
              target="_blank"
            >
              <div className="w-[124px] sm:w-[136px] h-[34px] relative bg-white flex p-1 px-2 border-0 text-[15px] font-medium text-caak-black rounded-[4px] items-center justify-center">
                Дэлгэрэнгүй
                <FIcon className="icon-fi-rs-down-chevron absolute sm:relative bottom-[40px] sm:bottom-0 text-white sm:text-caak-primary text-[14px] rotate-180 sm:-rotate-90" />
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Preview({ story }) {
  const navigate = useNavigate();
  const block = story?.blocks[0];
  return (
    <div
      className="hidden sm:block w-[272px] h-[440px] rounded-[8px] relative cursor-pointer"
      onClick={() => navigate(`/story/${story.id}`)}
    >
      <img
        src={imagePath(block.kind === 'video' ? block.videoPreview : block.imageUrl)}
        alt="Preview"
        className="object-cover h-full rounded-[8px]"
      />
      <div className="w-full h-full bg-black bg-opacity-40 absolute top-0 z-10"></div>
      <p
        style={{ textShadow: '0px 2px 3px #00000029' }}
        className="absolute bottom-0 text-white z-20 condMedium text-[16px] leading-[19px] w-full p-[18px]"
      >
        {story?.title}
      </p>
    </div>
  );
}
