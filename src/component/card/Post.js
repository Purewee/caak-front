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

// Ene bol medeenii jagsaalt deer haragdah Card. Dooroo Garchigtai Merri fonttoi.
export default function PostCard({ post, ...rest }) {
  const [savePostOpen, setSavePostOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [sharePostOpen, setSharePostOpen] = useState(false);
  const postURL = `/post/view/${post.id}`;

  //content dotor baigaa buttong darhad modal tsonh garaad popover alga bolohgv bsan uchir hiiw.
  const handleMenu = (show) => {
    setIsMenuOpen(show);
  };

  return (
    <Card
      bordered={false}
      {...rest}
      bodyStyle={{ padding: 0 }}
      className="h-[523px] w-[422px]"
      cover={
        <Link className="h-[300px]" to={postURL}>
          <Image
            preview={false}
            alt={post.title}
            src={imagePath(post.image)}
            className="w-full object-cover h-[300px] "
          />
        </Link>
      }
    >
      <div className="h-[223px] border-b border-[#EFEFEF] flex flex-col justify-between pt-[20px] pb-[19px]">
        <div>
          {post?.categories?.map((x, index) => (
            <Link key={index} to={`/category/${x.slug}`}>
              <HashTag className="font-normal text-[13px]">{`${x.name}`}</HashTag>
            </Link>
          ))}
          <Link
            className="text-[#111111] hover:text-[#111111] text-[21px] font-medium mt-[10px] leading-[27px] tracking-[0.32px] font-merri truncate-3"
            to={postURL}
          >
            {post.title}
          </Link>
          <div className="text-[14px] text-[#909090] tracking-[0.21px] leading-[16px] mt-[10px]">
            {moment(post.publish_date).format('YYYY-MM-DD, hh:mm')}
          </div>
        </div>
        <div className="flex justify-between items-center ">
          <div className="flex flex-row items-center">
            <Link to={`/channel/${post.source?.id}`} className="flex flex-row items-center">
              <Avatar className="w-[22px] h-[22px]" src={imagePath(post.source?.icon)} />
              <MetaTag className="ml-[6px] text-[15px]">{post?.source?.name}</MetaTag>
            </Link>
            &nbsp;•&nbsp;
            <Link to={`/profile/${post.author?.id}`}>
              <MetaTag className="ml-0">{post.author?.name}</MetaTag>
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
                <div className="flex flex-col justify-center h-full pl-[14px] py-[18px]">
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
      <PostSaveModal
        post={post}
        setSavePostOpen={setSavePostOpen}
        savePostOpen={savePostOpen}
        image={imagePath(post.image)}
      />
      <PostShareModal
        post={post}
        setSharePostOpen={setSharePostOpen}
        sharePostOpen={sharePostOpen}
        image={imagePath(post.image)}
      />
      <ReportModal isOpen={isReportOpen} setIsOpen={setIsReportOpen} />
    </Card>
  );
}
