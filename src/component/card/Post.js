import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Avatar, Popover } from 'antd';
import { imagePath } from '../../utility/Util';
import { HashTag, MetaTag } from '../../pages/post/view/wrapper';
import moment from 'moment';
import PostSaveModal from '../modal/PostSaveModal';
import PostShareModal from '../modal/PostShareModal';
import ReportModal from '../modal/ReportModal';
import { FIcon } from '../icon';

// Ene bol medeenii jagsaalt deer haragdah Card. Dooroo Garchigtai Merri fonttoi.
export default function PostCard({ isMobile, post, ...rest }) {
  const [savePostOpen, setSavePostOpen] = useState(false);
  const [fixedMenu, setFixedMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [sharePostOpen, setSharePostOpen] = useState(false);
  const postURL = `/post/view/${post.id}`;

  const handleMenu = (show) => {
    setIsMenuOpen(show);
  };

  return (
    <div className="h-[150px] sm:h-[523px] flex flex-col sm:w-[422px]">
      <div className="flex flex-row md:flex-col">
        <Link className="sm:h-[300px]" to={postURL}>
          <Image
            preview={false}
            alt={post.title}
            src={imagePath(post.image)}
            className="object-cover h-[105px] min-w-[130px] sm:w-full sm:h-[300px] "
          />
        </Link>
        {post?.categories?.map((x, index) => (
          <Link className="mt-[20px] hidden sm:block" key={index} to={`/category/${x.slug}`}>
            <HashTag className="font-normal text-[13px]">{`${x.name}`}</HashTag>
          </Link>
        ))}
        <Link
          className="text-[#111111] ml-[16px] sm:ml-0 sm:mt-[10px] hover:text-[#111111] text-[16px] sm:text-[21px] font-medium leading-[20px] sm:leading-[27px] tracking-[0.32px] font-merri"
          to={postURL}
        >
          <p className="truncate-3">{post.title}</p>
        </Link>
      </div>
      <div className="border-b border-[#EFEFEF] mt-[10px] h-full flex flex-col justify-between pb-[16px] sm:pb-[19px]">
        <div className="text-[14px] text-[#909090] hidden sm:block tracking-[0.21px] leading-[16px]">
          {moment(post.publish_date).format('YYYY-MM-DD, hh:mm')}
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
            {isMobile ? (
              <FIcon
                onClick={() => setFixedMenu(true)}
                className="h-[22px] text-[#909090] icon-fi-rs-more-ver ml-[10px] text-[22px]"
              />
            ) : (
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
            )}
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
      {fixedMenu && (
        <div className="left-0 right-0 bottom-0 top-0 z-[5] overflow-auto fixed flex justify-center items-end bg-black bg-opacity-70">
          <div className="w-full">
            <div className="w-full bg-white min-h-[300px] px-[16px]">
              <div className="flex flex-row pt-[20px] pb-[25px] border-b">
                <img
                  style={{ boxShadow: '0px 3px 6px #00000029' }}
                  className="w-[90px] h-[74px] object-cover"
                  alt=""
                  src={imagePath(post.image)}
                />
                <p className="text-[#555555] text-[16px] leading-[19px] font-medium ml-[18px]">{post.title}</p>
              </div>
              <div className="flex flex-col justify-center h-full pl-[14px] pt-[24px]">
                <div
                  onClick={() => {
                    setFixedMenu(false);
                    setSharePostOpen(true);
                  }}
                  className="flex flex-row items-center cursor-pointer"
                >
                  <FIcon className="text-[#555555] text-[20px] mr-[20px] w-[24px] h-[24px] icon-fi-rs-share" />
                  <p className="text-[17px] leading-[20px]">Хуваалцах</p>
                </div>
                <div
                  onClick={() => {
                    setFixedMenu(false);
                    setIsReportOpen(true);
                  }}
                  className="flex flex-row items-center mt-[24px] cursor-pointer"
                >
                  <FIcon className="text-[#555555] text-[20px] mr-[20px] w-[24px] h-[24px] icon-fi-rs-flag" />
                  <p className="text-[17px] leading-[20px]">Репорт</p>
                </div>
              </div>
            </div>
            <div className="bg-black w-full">
              <p onClick={() => setFixedMenu(false)} className="text-[#909090] text-center text-[17px] p-[10px]">
                Хаах
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
