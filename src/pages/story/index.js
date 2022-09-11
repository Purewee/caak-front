import React, { useEffect, useState, useRef } from 'react';
import Logo from '../../component/logo';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { imagePath } from '../../utility/Util';
import { useQuery } from '@apollo/client';
import { STORY } from './_gql';
import Stories, { WithSeeMore, WithHeader } from 'react-insta-stories';
import { Button, Image, Skeleton, Tag } from 'antd';
import ReactPlayer from 'react-player';
import { FIcon } from '../../component/icon';

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
        duration: (b.videoDuration || 10) * 1000,
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
    <div className="w-full relative h-[100vh] bg-[#111111] justify-center flex" ref={contRef}>
      <div className="w-full h-[100vh] flex justify-center flex-nowrap items-center gap-[24px] overflow-hidden">
        {story.nextStories.map((x) => (
          <Preview story={x} key={x.id} />
        ))}
        <Stories
          width="800px"
          height="600px"
          keyboardNavigation
          preventDefault
          loop={false}
          storyContainerStyles={{
            overflow: 'hidden',
            background: 'black',
            borderRadius: 8,
          }}
          stories={stories}
          onAllStoriesEnd={() => {
            if (story.prevStoryId) {
              navigate(`/story/${story.prevStoryId}`);
            }
          }}
        />
        {story.nextStories.map((x) => (
          <Preview story={x} key={x.id} />
        ))}
      </div>
    </div>
  );
}

function ImageStory({ block, story, config, action }) {
  const navigate = useNavigate();
  return (
    <WithHeader
      story={{
        seeMore: () => navigate(block.data.url || ''),
        // seeMoreCollapsed: ({ toggleMore, action }) => (
        //   <Button onClick={() => toggleMore(true)}>Дэлгэрэнгүй үзэх</Button>
        // ),
      }}
      action={action}
      globalHeader={config.header}
    >
      <div
        className="w-full h-full flex flex-col items-center justify-center bg-contain bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${imagePath(block.imageUrl)})` }}
      >
        <div className="relative w-full h-full">
          <div className="absolute bottom-0 p-[24px] storyLinearItem w-full">
            <div className="flex flex-col gap-[8px]">
              <div className="flex flex-row gap-8">
                {story.categories.nodes.map((x) => (
                  <Tag color="#ff6600" key={x.id} className="uppercase">
                    {x.name || x.slug}
                  </Tag>
                ))}
              </div>
              <span
                className="truncate-2 text-white text-[24px] font-merri"
                dangerouslySetInnerHTML={{ __html: block.content }}
              />
              <span className="text-white font-merri text-[12px]">{story.publishDate}</span>
              <Link
                to="/story"
                className="w-[180px] bg-white flex p-1 px-2 rounded-sm items-center justify-between font-bold"
              >
                Дэлгэрэнгүй үзэх
                <FIcon className="icon-fi-rs-down-chevron text-caak-primary text-[16px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </WithHeader>
  );
}

function VideoStory({ block, story, config, action }) {
  return (
    <WithHeader
      story={{
        header: (
          <div className="py-[12px]">
            <span
              className="truncate-2 text-white text-[24px] font-merri"
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
            <span className="text-white font-merri text-[12px]">{story.publishDate}</span>
          </div>
        ),
      }}
      action={action}
      globalHeader={config.header}
      header={{ heading: block.content, subheading: story.publishDate, profileImage: imagePath(story.author.avatar) }}
    >
      <ReactPlayer url={imagePath(block.videoUrl)} playing controls muted width={800} height={600} />
    </WithHeader>
  );
}

function Preview({ story }) {
  return (
    <div
      style={{ backgroundImage: `url(${imagePath(story.blocks[0].imageUrl || story.blocks[0].videoPreview)})` }}
      className="w-[300px] h-[440px] rounded-[8px] bg-white bg-cover bg-center bg-no-repeat"
    >
      {story.title}
    </div>
  );
}
