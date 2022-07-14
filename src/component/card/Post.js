import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Avatar, Popover } from 'antd';
import { generateTimeAgo, imagePath } from '../../utility/Util';
import { HashTag, MetaTag } from '../../pages/post/view/wrapper';
import moment from 'moment';
import PostSaveModal from '../modal/PostSaveModal';
import PostShareModal from '../modal/PostShareModal';
import ReportModal from '../modal/ReportModal';
import { FIcon } from '../icon';

const colors = ['#163943', '#463146', '#131D1C', '#1E1642', '#854D0E', '#233C6A', '#813333'];

export default function PostCard({ isMobile, post, ...rest }) {
  const [savePostOpen, setSavePostOpen] = useState(false);
  const [fixedMenu, setFixedMenu] = useState(false);
  const [sponsored, setSponsored] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [sharePostOpen, setSharePostOpen] = useState(false);
  const postURL = `/post/view/${post.id}`;
  const random = Math.floor(Math.random() * colors.length);

  const color = sponsored ? { backgroundColor: colors[random] } : {};
  const text = sponsored ? 'text-[#ffffff] sm:text-center hover:text-[#ffffff]' : 'hover:text-[#111111]';

  const handleMenu = (show) => {
    setIsMenuOpen(show);
  };

  useEffect(() => {
    if (parseInt(post.id) % 4 === 0) {
      setSponsored(true);
    } else {
      setSponsored(false);
    }
  }, []);

  return (
    <div
      className={`${
        sponsored ? 'h-[417px]' : 'h-[150px]'
      } sm:h-[520px] flex flex-col justify-between text-[#111111] sm:w-[422px] border-b border-[#EFEFEF] rounded-sm`}
      style={color}
    >
      {sponsored && (
        <div className="flex flex-row items-center text-white justify-center absolute top-[14px] left-[14px] w-[133px] h-[25px] rounded-[2px] bg-black bg-opacity-20">
          <FIcon className="icon-fi-rs-bolt text-[15px] w-[16px] h-[16px]" />
          <p className="text-[13px] condMedium ml-[4px]">ОНЦЛОХ МЭДЭЭ</p>
        </div>
      )}
      <div className={`flex ${sponsored ? 'flex-col' : 'flex-row md:flex-col'}`}>
        <Link className="sm:h-[300px]" to={postURL}>
          <img
            alt={post.title}
            src={imagePath(post.image)}
            className={`${
              sponsored ? 'h-[220px] w-full' : 'h-[105px] min-w-[130px] max-w-[130px] sm:max-w-[422px]'
            } sm:h-[300px] object-cover`}
          />
        </Link>
        {!sponsored &&
          post?.categories?.map((x, index) => (
            <Link className="hidden sm:block mt-[20px]" key={index} to={`/category/${x.slug}`}>
              <HashTag>{x.name}</HashTag>
            </Link>
          ))}
        <Link className={`${sponsored ? 'mt-[22px]' : 'sm:mt-[10px]'} ${text}`} to={postURL}>
          <p
            className={`${
              sponsored
                ? 'px-[16px] h-[85px] truncate-4 sm:truncate-3 text-[22px] sm:text-[21px] leading-[30px] sm:leading-[29px] font-bold sm:font-normal'
                : 'truncate-3 font-medium sm:font-normal text-[16px] sm:text-[21px] leading-[20px] sm:leading-[29px] ml-[16px] sm:ml-0'
            } font-roboto sm:font-merri ${text}`}
          >
            {post.title}
          </p>
        </Link>
        {sponsored && (
          <div className="hidden sm:flex flex-row items-center justify-between w-full mt-[18px] px-[16px]">
            <div className="flex flex-row items-center">
              <Link to={`/channel/${post.source?.slug}`} className="flex flex-row items-center">
                <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-white bg-opacity-20">
                  <Avatar className={`w-[34px] h-[34px]`} src={imagePath(post.source?.icon)} />
                </div>
                <MetaTag className={`ml-[6px] text-[15px] text-white`}>{post?.source?.name}</MetaTag>
              </Link>
              &nbsp;•&nbsp;
              <p className=""></p>
            </div>
            <button className="w-[90px] rounded-[4px] text-[15px] font-bold bg-white bg-opacity-10 text-white h-[34px]">
              Дагах
            </button>
          </div>
        )}
        {!sponsored && (
          <div className={`text-[14px] text-[#909090] hidden sm:block tracking-[0.21px] leading-[16px] mt-[12px]`}>
            {moment(post.publish_date).format('YYYY-MM-DD, hh:mm')}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between px-[8px] sm:px-0 pb-[13px] sm:pb-[15px]">
        <div className={`flex ${sponsored ? 'justify-between sm:justify-end' : 'justify-between'} items-center`}>
          <div className={`${sponsored ? 'flex sm:hidden' : 'flex'} flex-row items-end`}>
            <div className="flex flex-row items-center">
              <Link to={`/channel/${post.source?.slug}`} className="flex flex-row items-center">
                <Avatar className={`w-[22px] h-[22px]`} src={imagePath(post.source?.icon)} />
                <MetaTag className={`ml-[6px] text-[14px] ${sponsored ? 'text-white' : 'text-[#555555]'}`}>
                  {post?.source?.name}
                </MetaTag>
              </Link>
              {!sponsored && (
                <div className="flex sm:hidden flex-row items-center text-[#555555]">
                  &nbsp;•&nbsp;
                  <p className="text-[14px]">{generateTimeAgo(post.publish_date)}</p>
                </div>
              )}
            </div>
            <div className="hidden sm:block">
              &nbsp;•&nbsp;
              <Link to={`/profile/${post.author?.id}`}>
                <MetaTag className={`ml-0`}>{post.author?.name}</MetaTag>
              </Link>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <FIcon
              onClick={() => setSharePostOpen(true)}
              className={`${
                sponsored ? 'text-white' : 'text-[#909090]'
              } h-[22px] icon-fi-rs-share sm:hidden text-[22px] mr-[20px]`}
            />
            <FIcon
              onClick={() => setSavePostOpen(true)}
              className={`h-[22px] ${sponsored ? 'text-white' : 'text-[#909090]'} icon-fi-rs-bookmark text-[22px]`}
            />
            <Popover
              placement="bottom"
              trigger="click"
              className="leading-[16px] tracking-[0px]"
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
              <FIcon
                className={`${
                  sponsored ? 'text-white' : 'text-[#909090]'
                } cursor-pointer text-[22px] w-[22px] h-[22px] icon-fi-rs-more-ver ml-[10px]`}
              />
            </Popover>
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
