import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Avatar, Button, Popover } from 'antd';
import { imagePath } from '../../utility/Util';
import { HashTag, MetaTag } from '../../pages/post/view/wrapper';
import moment from 'moment';
import PostSaveModal from '../modal/PostSaveModal';
import PostShareModal from '../modal/PostShareModal';
import ReportModal from '../modal/ReportModal';
import { FIcon } from '../icon';

const colors = ['#163943', '#463146', '#131D1C', '#1E1642', '#854D0E', '#233C6A', '#813333'];

export default function PostCard({ post, ...rest }) {
  const [savePostOpen, setSavePostOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [sharePostOpen, setSharePostOpen] = useState(false);
  const postURL = `/post/view/${post.id}`;
  const random = Math.floor(Math.random() * colors.length);

  const color = parseInt(post.id) % 4 === 0 ? { backgroundColor: colors[random] } : {};
  const text = parseInt(post.id) % 4 === 0 ? 'text-[#ffffff]' : '';

  const handleMenu = (show) => {
    setIsMenuOpen(show);
  };
  return (
    <div
      className="h-[150px] sm:h-[520px] flex flex-col text-[#111111] sm:w-[422px] border-b border-[#EFEFEF] rounded-sm"
      style={color}
    >
      <div className="flex flex-row md:flex-col">
        <Link className="sm:h-[300px]" to={postURL}>
          <img
            alt={post.title}
            src={imagePath(post.image)}
            className="object-cover h-[105px] min-w-[130px] sm:w-full sm:h-[300px]"
          />
        </Link>
        <div className="flex flex-col sm:h-[220px] justify-between px-[8px] py-[20px] font-condensed">
          <div>
            {post?.categories?.map((x, index) => (
              <Link className="hidden sm:block" key={index} to={`/category/${x.slug}`}>
                <HashTag className="font-normal text-[13px]">{x.name}</HashTag>
              </Link>
            ))}
            <Link
              to={postURL}
              className={`sm:ml-0 sm:mt-[10px] text-[16px] sm:text-[21px] font-medium leading-[20px] sm:leading-[27px] tracking-[0.32px] font-merri truncate-3 ${text}`}
            >
              {post.title}
            </Link>
            <div
              className={`text-[14px] text-[#909090] hidden sm:block tracking-[0.21px] leading-[16px] mt-[12px] ${text}`}
            >
              {moment(post.publish_date).format('YYYY-MM-DD, hh:mm')}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-row items-end">
              <Link to={`/channel/${post.source?.id}`} className="flex flex-row items-center">
                <Avatar className={`w-[22px] h-[22px] ${text}`} src={imagePath(post.source?.icon)} />
                <MetaTag className={`ml-[6px] text-[15px] ${text}`}>{post?.source?.name}</MetaTag>
              </Link>
              <Link to={`/profile/${post.author?.id}`}>
                <MetaTag className={`ml-0 ${text}`}> &nbsp;•&nbsp;{post.author?.name}</MetaTag>
              </Link>
            </div>
            <div className="flex flex-row items-center">
              <FIcon
                onClick={() => setSavePostOpen(true)}
                className="h-[22px] text-[#909090] icon-fi-rs-bookmark text-[22px]"
              />
              <Popover
                placement="bottom"
                trigger="click"
                className="font-bold text-[14px] leading-[16px] tracking-[0px]"
                overlayStyle={{ width: 166 }}
                overlayInnerStyle={{ borderRadius: 8 }}
                visible={isMenuOpen}
                onVisibleChange={handleMenu}
                content={
                  <div className="flex flex-col justify-center h-full ">
                    <div
                      onClick={() => {
                        setIsMenuOpen(false);
                        setSharePostOpen(true);
                      }}
                      className="flex flex-row items-center cursor-pointer"
                    >
                      <span className="text-[#555555] text-[16px] mr-[11px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-share" />
                      <p className="text-[#555555] text-[15px] leading-[18px]">Хуваалцах</p>
                    </div>
                    <div
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsReportOpen(true);
                      }}
                      className="flex flex-row items-center mt-[12px] cursor-pointer"
                    >
                      <span className="text-[#555555] text-[15px] mr-[11px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-flag" />
                      <p className="text-[#555555] text-[15px] leading-[18px]">Репорт</p>
                    </div>
                  </div>
                }
              >
                <span className="text-[#909090] cursor-pointer text-[22px] w-[22px] h-[22px] flex justify-center items-center icon-fi-rs-more-ver ml-[10px]" />
              </Popover>
            </div>
          </div>
        </div>
      </div>
      <PostSaveModal
        post={post}
        onClose={() => setSavePostOpen(false)}
        open={savePostOpen}
        image={imagePath(post.image)}
      />
      <PostShareModal
        post={post}
        setSharePostOpen={setSharePostOpen}
        sharePostOpen={sharePostOpen}
        image={imagePath(post.image)}
      />
      <ReportModal isOpen={isReportOpen} setIsOpen={setIsReportOpen} />
    </div>
  );
}
