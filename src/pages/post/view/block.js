import React, { useEffect, useRef, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { BlockTitle, Paragraph } from './wrapper';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { imagePath, parseVideoURL } from '../../../utility/Util';
import ReactPlayer from 'react-player';
import Configure from '../../../component/configure';

const Wrapper = styled.div`
  ul {
    list-style-type: disc;
    list-style-position: outside;
    padding-left: 16px;
  }
  ol {
    list-style-type: decimal;
    list-style-position: outside;
  }
  a {
    color: var(--ant-primary-color);
  }
  blockquote {
    border-radius: 6px;
    background: #eee;
    padding: 8px 16px;
    margin: 0px 12px;
  }

  .video-wrapper {
    position: relative;
    padding-top: 56.25%;
    width: 100%;
    .react-player {
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
    }
  }
`;

export default function PostBlock({ b, numbering }) {
  return (
    <Wrapper>
      {b.kind === 'image' && (
        <div key={b.id} className="flex flex-col md:items-center mb-[26px] md:mb-[50px] w-full">
          {b.title && <BlockTitle>{`${numbering ? `${b.position}. ` : ''}${b.title}`}</BlockTitle>}
          <LazyLoadImage src={imagePath(b.imageUrl)} alt={b.title} className="w-full" />
          {b.data?.meta?.length > 0 && (
            <span className="w-full bg-[#697581] text-white p-[8px] text-center font-condensed text-[12px] italic">
              {b.data.meta}
            </span>
          )}
          {b.content && (
            <Paragraph>
              <DangerouslySetHtmlContent html={b.content} />
            </Paragraph>
          )}
        </div>
      )}
      {b.kind === 'text' && (
        <div key={b.id} className="flex flex-col md:items-center mb-[26px] md:mb-[50px] w-full">
          {b.content && (
            <Paragraph className="mt-[16px] md:mt-0">
              <DangerouslySetHtmlContent html={b.content} />
            </Paragraph>
          )}
        </div>
      )}
      {b.kind === 'video' && (
        <div key={b.id} className="flex flex-col md:items-center my-[26px] md:mb-[50px] w-full">
          {b.title && <BlockTitle>{`${numbering ? `${b.position}. ` : ''}${b.title}`}</BlockTitle>}
          <div className="video-wrapper">
            <ReactPlayer
              // url={`https://www.youtube.com/embed/${parseVideoURL(b.data.url).id}`}
              url={b.data.url}
              width="100%"
              height="100%"
              className="react-player"
              controls
              config={{
                facebook: {
                  appId: Configure.appFacebookId,
                },
              }}
            />
          </div>
          {b.content && (
            <Paragraph className="mt-[16px] md:mt-0">
              <DangerouslySetHtmlContent html={b.content} />
            </Paragraph>
          )}
        </div>
      )}
    </Wrapper>
  );
}

export function DangerouslySetHtmlContent({ html, ...rest }) {
  const divRef = useRef(null);

  useEffect(() => {
    if (!html || !divRef.current) throw "html prop cant't be null";

    const slotHtml = document.createRange().createContextualFragment(html); // Create a 'tiny' document and parse the html string
    divRef.current.innerHTML = ''; // Clear the container
    divRef.current.appendChild(slotHtml); // Append the new content
  }, [html, divRef]);

  return <div {...rest} ref={divRef}></div>;
}
