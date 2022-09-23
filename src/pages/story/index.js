import React, { useEffect, useState, useRef } from 'react';
import Logo from '../../component/logo';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { imagePath } from '../../utility/Util';
import { useQuery } from '@apollo/client';
import { STORY } from './_gql';
import Stories from 'react-insta-stories';
import { Button, Skeleton } from 'antd';
import ReactPlayer from 'react-player';
import { FIcon } from '../../component/icon';
import { CloseOutlined } from '@ant-design/icons';
import AllStories from '../../images/all_stories.png';

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

  if (loading) return <Skeleton />;
  return (
    <div className="w-full fixed top-0 z-50 h-[100vh] justify-center flex">
      <div className="w-full h-[100vh] flex justify-center flex-nowrap items-center gap-[24px] overflow-hidden">
        <Stories
          width="100vw"
          height="100vh"
          keyboardNavigation
          preventDefault
          loop
          storyContainerStyles={{
            overflow: 'hidden',
            background: '#323232',
          }}
          stories={stories}
          onAllStoriesEnd={() => {
            if (story?.nextStory?.id) {
              navigate(`/story/${story.nextStory.id}`);
            }
          }}
        />
      </div>
    </div>
  );
}

function ImageStory({ block, story }) {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex justify-between sm:p-5">
      <div className="hidden sm:flex flex-col h-full w-[20%] items-start justify-start">
        <Logo white className="mb-[160px]" />
        {story.prevStory && <Preview story={story.prevStory} />}
      </div>
      <div
        className="w-full sm:w-[60%] h-full rounded-[8px] flex flex-col items-center justify-center bg-contain bg-no-repeat bg-center bg-[#000000]"
        style={{ backgroundImage: `url(${imagePath(block.imageUrl)})` }}
      >
        <div className="absolute z-50 top-[12px] right-[12px] flex">
          <Button
            type="link"
            className="sm:hidden"
            icon={<FIcon className={`icon-fi-rs-close text-white`} />}
            onClick={() => navigate('/')}
          />
        </div>
        <div className="relative w-full h-full">
          {block.kind === 'post' && (
            <Link className="absolute bottom-0 p-[32px] storyLinearItem w-full rounded-[8px]" to={block?.data?.url}>
              <div className="flex flex-col gap-[8px]">
                <span
                  className="truncate-2 text-white text-[24px] font-merri"
                  dangerouslySetInnerHTML={{ __html: block?.content }}
                />
                <span className="text-white font-merri text-[12px]">{story.publishDate}</span>
                <Button className="w-[180px] bg-white flex p-1 px-2 border-0 rounded-sm items-center justify-between font-bold">
                  Дэлгэрэнгүй үзэх
                  <FIcon className="icon-fi-rs-down-chevron text-caak-primary text-[16px]" />
                </Button>
              </div>
            </Link>
          )}
          {console.log(block)}
          {block.kind === 'image' && block?.content && (
            <div className="absolute w-full bottom-[50px] sm:bottom-0 p-[16px] sm:p-[32px] flex flex-col items-center">
              <h3
                className="text-center w-full text-white opacity-80 leading-[32px] text-[28px] sm:text-[32px] font-condensed tracking-[0.48px] font-normal mb-[16px]"
                dangerouslySetInnerHTML={{ __html: block?.content }}
              />
              {/* <div className="h-[4px] w-[60px] bg-caak-primary" /> */}
            </div>
          )}
        </div>
      </div>
      <div className="hidden sm:flex flex-col h-full w-[20%] justify-start items-end">
        <Button
          shape="circle"
          type="white"
          className="bg-white border-0 mb-[180px]"
          icon={<CloseOutlined />}
          onClick={() => navigate('/')}
        />

        {story.nextStory ? (
          <Preview story={story.nextStory} />
        ) : (
          <div className="w-[272px] h-[440px] relative">
            <img src={AllStories} alt="Бүх стори" className="object-cover" />
            <Button
              size="large"
              className="py-4 absolute top-1/2 left-[60px] bg-white flex-col h-[80px] rounded-[8px]"
              onClick={() => navigate('/stories')}
            >
              <FIcon className="icon-fi-rs-play text-caak-primary" />
              Бусад сторинууд үзэх
            </Button>
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
      <div className="hidden sm:flex flex-col h-full w-[20%] items-start justify-start">
        <Logo white className="mb-[160px]" />
        {story.prevStory && <Preview story={story.prevStory} />}
      </div>
      <div className="w-[100%] sm:w-[60%] h-full rounded-[8px] flex flex-col items-center justify-center bg-contain bg-no-repeat bg-center bg-[#000000] relative">
        <div className="absolute z-50 top-[12px] right-[12px] flex">
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
          className="rounded-[8px]"
          onPause={() => action('pause')}
          onPlay={() => action('play')}
        />
        <div className="absolute z-50 bottom-[100px] sm:bottom-[54px] sm:left-[36px] flex flex-col">
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
      <div className="hidden sm:flex flex-col h-full w-[20%] justify-start items-end">
        <Button
          shape="circle"
          type="white"
          className="bg-white border-0 mb-[180px]"
          icon={<CloseOutlined />}
          onClick={() => navigate('/')}
        />

        {story.nextStory ? (
          <Preview story={story.nextStory} />
        ) : (
          <div className="w-[272px] h-[440px] relative">
            <img src={AllStories} alt="Бүх стори" className="object-cover" />
            <Button
              size="large"
              className="py-4 absolute top-1/2 left-[60px] bg-white flex-col h-[80px] rounded-[8px]"
              onClick={() => navigate('/stories')}
            >
              <FIcon className="icon-fi-rs-play text-caak-primary" />
              Бусад сторинууд үзэх
            </Button>
          </div>
        )}
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
