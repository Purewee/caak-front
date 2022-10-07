import React, { useEffect, useState, useRef } from 'react';
import Logo from '../../component/logo';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { generateTimeAgo, imagePath } from '../../utility/Util';
import { useQuery } from '@apollo/client';
import { STORY } from './_gql';
import Stories from 'react-insta-stories';
import { Button, Skeleton } from 'antd';
import ReactPlayer from 'react-player';
import { FIcon } from '../../component/icon';
import { CloseOutlined } from '@ant-design/icons';
import AllStories from '../../assets/images/all-stories.png';
import moment from 'moment';

export default function Story() {
  const { id } = useParams();
  const navigate = useNavigate();
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
        navigate('/');
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    // 👇️ clean up event listener
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  if (loading) return <Skeleton />;
  return (
    <div className="w-full fixed top-0 z-50 h-full justify-center flex">
      <Stories
        width="100vw"
        height="100%"
        keyboardNavigation
        // preventDefault
        defaultInterval={1500}
        storyContainerStyles={{
          overflow: 'hidden',
          background: '#323232',
        }}
        stories={stories}
        currentIndex={() => console.log('first')}
        onAllStoriesEnd={() => {
          if (story?.prevStory?.id) {
            navigate(`/story/${story.prevStory.id}`);
          }
        }}
      />
    </div>
  );
}

function ImageStory({ block, story }) {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex justify-center lg:justify-between sm:p-5">
      <div
        style={{ zIndex: 1000 }}
        className="hidden lg:flex flex-col h-full w-[272px] mr-[16px] items-start justify-start"
      >
        <Logo white className="mb-[160px]" />
        {story.nextStory ? (
          <Preview story={story.nextStory} />
        ) : (
          <div className="w-[272px] h-[440px] relative flex imems-center justify-center">
            <img src={AllStories} alt="Бүх стори" className="object-cover bg-black bg-opacity-70" />
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
      <div
        className="w-full sm:rounded-[8px] bg-contain bg-no-repeat bg-center bg-[#212121]"
        style={{ backgroundImage: `url(${imagePath(block.imageUrl)})` }}
      >
        <div style={{ zIndex: 1000 }} className="absolute top-[12px] right-[12px] flex">
          <Button
            type="link"
            className="sm:hidden"
            icon={<FIcon className={`icon-fi-rs-close text-white`} />}
            onClick={() => navigate('/')}
          />
        </div>
        <div className="relative w-full h-full">
          {block.kind === 'post' && (
            <div
              style={{ zIndex: 1000 }}
              className="absolute bottom-0 pb-[20px] p-[16px] sm:p-[32px] story-linear w-full rounded-[8px]"
            >
              <p></p>
              <div className="flex flex-col">
                <span
                  className="truncate-2 text-white condMedium text-[34px] leading-[40px]"
                  dangerouslySetInnerHTML={{ __html: block?.content }}
                />
                <span className="text-white opacity-80 text-[14px] leading-[16px] mt-[10px]">
                  {moment(story.publishDate).utc('Asia/Mongolia').format('YYYY.MM.DD, HH:MM')}
                </span>
                <Link className="mt-[24px]" to={block?.data?.url}>
                  <div className="w-[180px] h-[44px] bg-white flex p-1 px-2 border-0 text-[15px] font-medium text-caak-black rounded-sm items-center justify-center">
                    Дэлгэрэнгүй үзэх
                    <FIcon className="icon-fi-rs-down-chevron text-caak-primary text-[14px] -rotate-90" />
                  </div>
                </Link>
              </div>
            </div>
          )}
          {block.kind === 'image' && block?.content && (
            <div className="absolute w-full story-linear bottom-0 pb-[20px] p-[16px] sm:p-[32px] flex flex-col items-center">
              <h3
                className="text-center w-full text-white opacity-80 leading-[32px] text-[28px] sm:text-[32px] font-condensed tracking-[0.48px] font-normal mb-[16px]"
                dangerouslySetInnerHTML={{ __html: block?.content }}
              />
              <div className="h-[4px] w-[60px] bg-caak-primary" />
            </div>
          )}
        </div>
      </div>
      <div
        style={{ zIndex: 1000 }}
        className="hidden lg:flex flex-col h-full w-[272px] ml-[16px] items-start justify-start"
      >
        <Logo white className="mb-[160px]" />
        {story.prevStory ? (
          <Preview story={story.prevStory} />
        ) : (
          <div className="w-[272px] h-[440px] relative flex imems-center justify-center">
            <img src={AllStories} alt="Бүх стори" className="object-cover bg-black bg-opacity-70" />
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

function VideoStory({ block, story, action }) {
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex justify-between sm:p-5">
      <div style={{ zIndex: 1000 }} className="hidden lg:flex flex-col h-full w-[272px] items-start justify-start">
        <Logo white className="mb-[160px]" />
        {story.nextStory ? (
          <Preview story={story.nextStory} />
        ) : (
          <div className="w-[272px] h-[440px] relative flex imems-center justify-center">
            <img src={AllStories} alt="Бүх стори" className="object-cover bg-black bg-opacity-70" />
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
      <div className="w-[100%] h-full sm:rounded-[8px] flex flex-col items-center justify-center bg-contain bg-no-repeat bg-center bg-[#212121] relative">
        <div style={{ zIndex: 1001 }} className="absolute top-[12px] right-[12px] flex">
          <Button
            type="link"
            icon={<FIcon className={`${playing ? 'icon-fi-rs-pause' : 'icon-fi-rs-play'} text-white`} />}
            onClick={() => setPlaying(!playing)}
          />
          <Button
            type="link"
            icon={<FIcon className={`${muted ? 'icon-fi-rs-mute' : 'icon-fi-rs-volume'} text-white`} />}
            onClick={() => {
              setMuted(!muted);
            }}
          />
          <Button
            type="link"
            className="sm:hidden"
            icon={<FIcon className={`icon-fi-rs-close text-white`} />}
            onClick={() => navigate('/')}
          />
        </div>
        <ReactPlayer
          url={imagePath(block.videoUrl)}
          playing={playing}
          controls
          width="100%"
          height="100%"
          muted={muted}
          style={{ zIndex: 1000 }}
          className="rounded-[8px]"
          onPause={() => action('pause')}
          onPlay={() => action('play')}
        />
        <div style={{ zIndex: 1000 }} className="absolute bottom-[80px] sm:left-[36px] flex flex-col">
          <h3
            className="truncate-2 text-center w-full text-white leading-[26px] text-[26px] font-condensed tracking-[0.39px] font-normal mb-[16px]"
            dangerouslySetInnerHTML={{ __html: block?.content }}
          />
          {block?.data?.url && (
            <a
              className="w-[180px] bg-white flex p-1 px-2 border-0 rounded-sm items-center justify-between font-bold"
              href={block.data.url}
            >
              Дэлгэрэнгүй үзэх
              <FIcon className="icon-fi-rs-down-chevron text-caak-primary text-[16px]" />
            </a>
          )}
        </div>
      </div>
      <div style={{ zIndex: 1000 }} className="hidden lg:flex flex-col h-full w-[272px] justify-start items-end">
        <Button
          shape="circle"
          type="white"
          className="bg-white border-0 mb-[180px]"
          icon={<CloseOutlined />}
          onClick={() => navigate('/')}
        />
        {story.prevStory && <Preview story={story.prevStory} />}
      </div>
    </div>
  );
}

function Preview({ story }) {
  const navigate = useNavigate();
  const block = story?.blocks[0];
  return (
    <div
      className="hidden sm:block w-[272px] h-[440px] rounded-[8px]  bg-center bg-no-repeat cursor-pointer opacity-50"
      onClick={() => navigate(`/story/${story.id}`)}
    >
      <img
        src={imagePath(block.kind === 'video' ? block.videoPreview : block.imageUrl)}
        alt="Preview"
        className="bg-[#111111] object-cover h-full rounded-[8px]"
      />
    </div>
  );
}
