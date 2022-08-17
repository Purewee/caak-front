import React, { useEffect, useState, useRef } from 'react';
import Logo from '../../component/logo';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { imagePath } from '../../utility/Util';
import { useQuery } from '@apollo/client';
import { STORY } from './_gql';
import Stories, { WithSeeMore, WithHeader } from 'react-insta-stories';
import { Button, Skeleton } from 'antd';
import { FIcon } from '../../component/icon';
import ReactPlayer from 'react-player';

export default function Story() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useQuery(STORY, { variables: { id } });
  const story = data?.article || {};
  const stories = story?.blocks?.map((b) => {
    if (b.kind === 'video') {
      return {
        content: (props) => <VideoStory {...props} block={b} story={story} />,
        header: { heading: b.content, subheading: story.publishDate, profileImage: imagePath(story.author.avatar) },
        seeMore: () => navigate('/'),
      };
    } else {
      return {
        content: (props) => <ImageStory {...props} block={b} story={story} />,
        header: { heading: b.content, subheading: story.publishDate, profileImage: imagePath(story.author.avatar) },
        seeMore: () => navigate('/'),
      };
    }
  });
  const contRef = useRef(null);

  useEffect(() => {
    contRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [loading]);

  if (loading) return <Skeleton />;
  return (
    <div className="w-full relative" ref={contRef}>
      <div className="w-full flex justify-center">
        <Stories
          width="100vw"
          height="100vh"
          keyboardNavigation
          preventDefault
          loop={false}
          storyContainerStyles={{
            width: '100%',
            overflow: 'hidden',
            background: 'black',
            padding: 32,
          }}
          header
          stories={stories}
          onAllStoriesEnd={() => {
            if (story.prevStoryId) {
              navigate(`/story/${story.prevStoryId}`);
            }
          }}
        />
      </div>
    </div>
  );
}

function ImageStory({ block, story, config, action }) {
  const navigate = useNavigate();
  return (
    <WithSeeMore
      story={{
        header: { heading: block.content, subheading: story.publishDate, profileImage: imagePath(story.author.avatar) },
        seeMore: () => navigate(block.data.url || ''),
        // seeMoreCollapsed: ({ toggleMore, action }) => (
        //   <Button onClick={() => toggleMore(true)}>Дэлгэрэнгүй үзэх</Button>
        // ),
      }}
      action={action}
      globalHeader={config.header}
    >
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="relative">
          <img
            src={imagePath(block.imageUrl)}
            alt={block.content}
            className="min-w-[360px] max-h-[84vh] object-contain h-auto"
          />
          <div className="absolute bottom-0 p-[24px] storyLinearItem w-full">
            <span
              className="truncate-2 text-white text-[24px] font-merri"
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
            <span className="text-white font-merri text-[12px]">{story.publishDate}</span>
          </div>
        </div>
      </div>
    </WithSeeMore>
  );
}

function VideoStory({ block, story, config, action }) {
  const navigate = useNavigate();
  return (
    <WithSeeMore
      story={{
        header: { heading: block.content, subheading: story.publishDate, profileImage: imagePath(story.author.avatar) },
        seeMore: () => navigate(block.data.url || ''),
        // seeMoreCollapsed: ({ toggleMore, action }) => (
        //   <Button onClick={() => toggleMore(true)}>Дэлгэрэнгүй үзэх</Button>
        // ),
      }}
      action={action}
      globalHeader={config.header}
    >
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="relative">
          <div className="py-[12px]">
            <span
              className="truncate-2 text-white text-[24px] font-merri"
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
            <span className="text-white font-merri text-[12px]">{story.publishDate}</span>
          </div>
          <ReactPlayer url={imagePath(block.videoUrl)} playing controls />
        </div>
      </div>
    </WithSeeMore>
  );
}
