import React, { useEffect, useState, useRef } from 'react';
import Logo from '../../component/logo';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { imagePath } from '../../utility/Util';
import { useQuery } from '@apollo/client';
import { STORY } from './_gql';
import Stories from 'react-insta-stories';
import { Button, Skeleton, Typography } from 'antd';
import ReactPlayer from 'react-player';
import { FIcon } from '../../component/icon';
import AllStories from '../../assets/images/all-stories.png';
import moment from 'moment';
// import sanitize from 'sanitize-html';

const { Paragraph } = Typography;

export default function Story() {
  const { id } = useParams();
  const navigate = useNavigate();
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
        navigate('/');
      }
      if (event.key === 'ArrowLeft') {
        if (current === 0 && story?.nextStory?.id) {
          event.preventDefault();
          navigate(`/story/${story.nextStory.id}`);
        }
        if (current + 1 === story.length) {
          event.preventDefault();
          navigate(`/story/${story.nextStory.id}`);
        }
      }
      if (event.key === 'ArrowRight') {
        if (current === stories?.length - 1 && story?.prevStory?.id) {
          event.preventDefault();
          navigate(`/story/${story.prevStory.id}`);
        }
        if (current === 0) {
          event.preventDefault();
          navigate(`/story/${story.prevStory.id}`);
        }
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
          onClick={() => navigate('/')}
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
            onClick={() => navigate('/')}
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
  const [ellipsis, setEllipsis] = useState(true);
  // const clean = sanitize(block?.content ? block.content : '', {
  //   allowedTags: ['b', 'i', 'em', 'strong', 'a'],
  // });
  return (
    <div className="w-full h-full flex justify-center">
      <div
        style={{
          background: 'transparent linear-gradient(180deg, #00000067 0%, #00000000 100%) 0% 0% no-repeat padding-box',
        }}
        className="w-full h-[100px] absolute top-0"
      ></div>
      <div
        className="w-full sm:rounded-[8px] bg-contain bg-no-repeat bg-center"
        style={{ backgroundImage: `url("${imagePath(block.imageUrl)}")` }}
      >
        <div className="relative w-full h-full">
          {block.kind === 'post' && (
            <div
              style={{ zIndex: 1000 }}
              className="absolute bottom-0 pb-[20px] p-[16px] sm:p-[32px] story-linear w-full rounded-[8px]"
            >
              <div className="flex flex-col">
                <div className="flex flex-wrap gap-[10px] justify-start mb-[10px]">
                  {story?.categories?.nodes?.map((x) => (
                    <p
                      key={x.name}
                      className="bg-[#FF6600] px-[8px] py-[4px] text-white text-[12px] font-bold uppercase"
                    >
                      {x.name}
                    </p>
                  ))}
                </div>
                {block?.content && (
                  <Link to={block?.data?.url}>
                    <span
                      className="truncate-2 text-white condMedium text-[26px] sm:text-[34px] leading-[30px] sm:leading-[40px]"
                      dangerouslySetInnerHTML={{ __html: block?.content }}
                    />
                  </Link>
                )}
                <span className="text-white opacity-80 text-[14px] leading-[16px] mt-[10px]">
                  {moment(story.publishDate).utc('Asia/Mongolia').format('YYYY.MM.DD, HH:MM')}
                </span>
              </div>
              <Link className="mt-[40px] sm:mt-[24px] flex justify-center sm:justify-start" to={block?.data?.url}>
                <div className="w-[124px] sm:w-[148px] h-[34px] relative sm:h-[44px] bg-white flex p-1 px-2 border-0 text-[15px] font-medium text-caak-black rounded-[4px] items-center justify-center">
                  Дэлгэрэнгүй
                  <FIcon className="icon-fi-rs-down-chevron absolute sm:relative bottom-[40px] sm:bottom-0 text-white sm:text-caak-primary text-[14px] rotate-180 sm:-rotate-90" />
                </div>
              </Link>
            </div>
          )}
          {block.kind === 'image' && block?.content && (
            <div
              style={{ zIndex: 1001 }}
              className="absolute w-full max-h-[500px] overflow-y-scroll wrapper story-linear bottom-0 pb-[20px] p-[16px] sm:p-[32px] flex flex-col items-center"
            >
              <Paragraph
                className="text-center w-full text-white opacity-80 leading-[32px] text-[28px] sm:text-[32px] font-condensed tracking-[0.48px] font-normal mb-[16px]"
                ellipsis={ellipsis ? { rows: 3, expandable: true, symbol: 'дэлгэрэнгүй' } : null}
              >
                <span dangerouslySetInnerHTML={{ __html: block?.content || null }} />
              </Paragraph>
              <div className="h-[4px] w-[60px] bg-caak-primary" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function VideoStory({ block, story, action }) {
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [ellipsis, setEllipsis] = useState(true);
  const clean = block?.content || '';
  // const clean = sanitize(block?.content ? block.content : '', {
  //   allowedTags: ['b', 'i', 'em', 'strong', 'a'],
  // });
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex justify-between">
      <div
        style={{
          background: 'transparent linear-gradient(180deg, #00000067 0%, #00000000 100%) 0% 0% no-repeat padding-box',
        }}
        className="w-full h-[100px] absolute top-0"
      ></div>
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
          {/* <Button
            type="link"
            className="sm:hidden"
            icon={<FIcon className={`icon-fi-rs-close text-white`} />}
            onClick={() => navigate('/')}
          /> */}
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
        <div
          style={{ zIndex: 1001 }}
          className="absolute story-linear bottom-0 pb-[50px] sm:pb-[80px] sm:left-[36px] flex flex-col items-center sm:items-start"
        >
          <Paragraph
            className="text-center w-full text-white leading-[32px] text-[28px] sm:text-[32px] font-condensed tracking-[0.48px] font-normal mb-[16px]"
            ellipsis={ellipsis ? { rows: 3, expandable: true, symbol: 'дэлгэрэнгүй' } : null}
          >
            <span dangerouslySetInnerHTML={{ __html: block?.content || null }} />
          </Paragraph>
          {block?.data?.url && (
            <a href={block.data.url} target="_blank">
              <div className="w-[124px] sm:w-[148px] h-[34px] relative sm:h-[44px] bg-white flex p-1 px-2 border-0 text-[15px] font-medium text-caak-black rounded-[4px] items-center justify-center">
                Дэлгэрэнгүй
                <FIcon className="icon-fi-rs-down-chevron relative bottom-0 text-caak-primary text-[14px] -rotate-90" />
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
