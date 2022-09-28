import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Popover, message } from 'antd';
import { generateTimeAgo, imagePath } from '../../utility/Util';
import { HashTag, MetaTag } from '../../pages/post/view/wrapper';
import PostSaveModal from '../modal/PostSaveModal';
import PostShareModal from '../modal/PostShareModal';
import ReportModal from '../modal/ReportModal';
import { FIcon } from '../icon';
import moment from 'moment';
import { useMutation, gql, useQuery } from '@apollo/client';
import { ME } from '../../pages/post/view/_gql';

const REMOVE_SAVED = gql`
  mutation RemoveSavedArticle($id: ID, $articleId: ID!) {
    removeRecipeItem(input: { id: $id, articleId: $articleId }) {
      id
    }
  }
`;

const colors = ['#163943', '#463146', '#131D1C', '#1E1642', '#854D0E', '#233C6A', '#813333'];

export default function PostCard({ isMobile, post, removeSaved, asd, ...rest }) {
  const [saving, setSaving] = useState(false);
  const [fixedMenu, setFixedMenu] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [sharing, setSharing] = useState(false);
  const { refetch } = useQuery(ME);
  const [remove, { loading: removing }] = useMutation(REMOVE_SAVED);
  const [random] = useState(Math.floor(Math.random() * colors.length));

  const postURL = `/post/view/${post?.id}`;
  const sponsored = post?.featured && moment().isBetween(moment(post.featured_from), moment(post.featured_to));

  const color = sponsored ? { backgroundColor: colors[random] } : {};
  const text = sponsored ? 'text-[#ffffff] sm:text-center hover:text-[#ffffff]' : 'hover:text-[#111111]';

  const width = window.screen.width;

  return (
    <div
      className={`${sponsored ? 'h-[417px]' : asd ? 'h-[324px]' : `h-[150px] w-[${width - 32}px] sm:w-full`}
      sm:h-[520px] flex flex-col justify-between text-[#111111] sm:w-[422px] border-b border-[#EFEFEF] rounded-sm`}
      style={color}
    >
      {sponsored && (
        <div className="flex flex-row items-center text-white justify-center absolute top-[14px] left-[14px] w-[133px] h-[25px] rounded-[2px] bg-black bg-opacity-20">
          <FIcon className="icon-fi-rs-bolt text-[15px] w-[16px] h-[16px]" />
          <p className="text-[13px] condMedium ml-[4px]">ОНЦЛОХ МЭДЭЭ</p>
        </div>
      )}
      <div className={`flex ${sponsored || asd ? 'flex-col' : 'flex-row md:flex-col'}`}>
        <Link className="sm:h-[300px]" to={postURL} target={post.kind === 'linked' ? '_blank' : '_self'}>
          <img
            alt={post.title}
            src={imagePath(post.image)}
            className={`${
              sponsored
                ? 'h-[220px] w-full'
                : asd
                ? 'h-[212px] min-w-full rounded-[8px] sm:rounded-none'
                : 'h-[105px] min-w-[130px] max-w-[130px] sm:min-w-full sm:max-w-[422px]'
            } sm:h-[300px] object-cover`}
          />
        </Link>
        <div className="flex flex-row gap-[15px] overflow-hidden">
          {!sponsored &&
            post?.categories?.map((x, index) => (
              <Link className="hidden sm:block mt-[20px]" key={index} to={`/category/${x.slug}`}>
                <HashTag className="uppercase font-roboto font-medium leading-[15px]">{x.name}</HashTag>
              </Link>
            ))}
        </div>
        <Link
          className={`${sponsored ? 'mt-[22px]' : 'sm:mt-[10px]'} calculated-width ${text}`}
          to={postURL}
          target={post.kind === 'linked' ? '_blank' : '_self'}
        >
          <p
            className={`${
              sponsored
                ? 'px-[16px] h-[85px] truncate-4 sm:truncate-3 text-[22px] sm:text-[21px] leading-[30px] sm:leading-[29px] font-bold sm:font-normal'
                : `truncate-3 font-medium hover:underline underline-offset-4 decoration-[#3B4491]/20 sm:font-normal sm:text-[21px] leading-[20px] sm:leading-[29px] ${
                    asd ? 'text-[18px] mt-[12px] truncate-2' : 'text-[16px] mt-0 ml-[16px] sm:ml-0'
                  }`
            } font-roboto sm:font-merri ${text}`}
          >
            {post.title}
          </p>
        </Link>
        {!sponsored && (
          <div className={`text-[14px] text-[#909090] hidden sm:block tracking-[0.21px] leading-[16px] mt-[12px]`}>
            {generateTimeAgo(post.publish_date)}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between pb-[13px] sm:pb-[15px]">
        <div className={`flex items-center w-full justify-between ${sponsored && 'sm:pl-[20px] sm:pr-[16px]'}`}>
          <div className={`flex flex-row items-center ${sponsored && 'px-[13px] sm:px-0'}`}>
            <div className="flex flex-row items-center">
              <Link to={`/channel/${post.source?.id}`} className="flex flex-row items-center">
                <Avatar className={`w-[22px] h-[22px]`} src={imagePath(post.source?.icon)} />
                <MetaTag
                  className={`ml-[6px] text-[14px] leading-[16px] font-roboto ${
                    sponsored ? 'text-white' : 'text-[#555555]'
                  }`}
                >
                  {post?.source?.name}
                </MetaTag>
              </Link>
              {!sponsored && (
                <div className="flex sm:hidden flex-row items-center text-[#555555]">
                  <span className={`h-[18px] ${sponsored ? 'text-white' : 'sm:text-[#555555]'}`}>
                    &nbsp;&#8226;&nbsp;
                  </span>
                  <p className="text-[14px] leading-[16px]">{generateTimeAgo(post.publish_date)}</p>
                </div>
              )}
            </div>
            <span className={`h-[18px] hidden items-center sm:flex ${sponsored ? 'text-white' : 'sm:text-[#555555]'}`}>
              &nbsp;&#8226;&nbsp;
            </span>
            <Link
              className={`hidden sm:block leading-[16px] ${sponsored ? 'text-white' : 'sm:text-[#555555]'}`}
              to={`/profile/${post.author?.id}`}
            >
              <MetaTag className={`ml-0 font-roboto ${sponsored && 'text-white'}`}>{post.author?.name}</MetaTag>
            </Link>
          </div>
          <div className="flex flex-row items-center">
            {removeSaved && (
              <FIcon
                onClick={() => {
                  remove({ variables: { articleId: post.id } }).then(() => {
                    refetch();
                    message.success('Амжилттай устгалаа');
                  });
                }}
                className={`h-[22px] ${
                  sponsored ? 'text-white' : 'text-[#F53757]'
                } icon-fi-rs-delete mr-[12px] text-[22px]`}
              />
            )}
            <FIcon
              onClick={() => setSaving(true)}
              className={`h-[22px] ${sponsored ? 'text-white' : 'text-[#909090]'} icon-fi-rs-bookmark text-[22px]`}
            />
            {reporting || sharing || (
              <Popover
                placement={isMobile ? 'left' : 'bottom'}
                trigger="click"
                overlayStyle={{ width: 166 }}
                overlayInnerStyle={{ borderRadius: 4 }}
                content={
                  <div className="w-[166px]">
                    <div
                      onClick={() => {
                        setSharing(true);
                      }}
                      className="flex flex-row items-center cursor-pointer text-[#555555]"
                    >
                      <span className="text-[22px] mr-[11px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-share" />
                      <p className="text-[15px] leading-[18px]">Хуваалцах</p>
                    </div>
                    <div
                      onClick={() => {
                        setReporting(true);
                      }}
                      className="flex flex-row items-center mt-[12px] cursor-pointer text-[#555555]"
                    >
                      <span className="text-[22px] mr-[11px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-flag" />
                      <p className="text-[15px] leading-[18px]">Репорт</p>
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
            )}
          </div>
        </div>
      </div>
      {saving && <PostSaveModal post={post} toggle={() => setSaving(false)} image={imagePath(post.image)} />}
      {sharing && <PostShareModal post={post} toggle={() => setSharing(false)} image={imagePath(post.image)} />}
      {reporting && <ReportModal post={post} toggle={() => setReporting(false)} />}
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
                <p className="text-[#555555] text-[16px] leading-[19px] hover:underline font-medium ml-[18px]">
                  {post.title}
                </p>
              </div>
              <div className="flex flex-col justify-center h-full pl-[14px] pt-[24px]">
                <div
                  onClick={() => {
                    setFixedMenu(false);
                    setSharing(true);
                  }}
                  className="flex flex-row items-center cursor-pointer"
                >
                  <FIcon className="text-[#555555] text-[20px] mr-[20px] w-[24px] h-[24px] icon-fi-rs-share" />
                  <p className="text-[17px] leading-[20px]">Хуваалцах</p>
                </div>
                <div
                  onClick={() => {
                    setFixedMenu(false);
                    setReporting(true);
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
