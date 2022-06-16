import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PostSaveModal from '../../modal/PostSaveModal';
import DropDown from '../../navigation/DropDown';
import { imagePath, useClickOutSide } from '../../../utility/Util';

export default function HighlightCard({ post }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [savePostOpen, setSavePostOpen] = useState(false);

  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="max-w-[646px] w-full h-[430px] relative">
      <img alt="" src={imagePath(post.image)} className="h-full w-full object-cover" />
      <div className="absolute left-0 bottom-0 highlightLinear flex flex-col justify-end h-[316px] w-full p-[30px]">
        <div className="flex flex-col w-full">
          {post.categories.map((x) => (
            <Link key={x.id} to={`tags/${x.id}`}>
              <p className="text-white font-medium mb-[10px] text-[14px] leading-[16px] uppercase">#{x.name}</p>
            </Link>
          ))}
          <Link to={`/post/view/${post.id}`}>
            <p className={`text-white font-bold text-[36px] leading-[40px] truncate-3 font-condensed`}>{post.title}</p>
          </Link>
          {
            <p className="text-white text-[14px] mt-[14px] font-medium leading-[16px]">
              {new Date(post.publish_date).getFullYear() +
                '.' +
                (new Date(post.publish_date).getMonth() + 1) +
                '.' +
                new Date(post.publish_date).getDate() +
                ', ' +
                new Date(post.publish_date).getHours() +
                ':' +
                new Date(post.publish_date).getMinutes()}
            </p>
          }
        </div>
        <div className={'flex justify-between mt-[20px]'}>
          <div className={'flex flex-row'}>
            <div className="flex flex-row items-center">
              <img
                alt=""
                src={
                  'https://scontent.fuln2-2.fna.fbcdn.net/v/t1.18169-9/16388375_1258991760846780_6001512035944932012_n.png?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_ohc=9pNL5ldMQ0kAX_yAKha&_nc_ht=scontent.fuln2-2.fna&oh=00_AT_3pSN5nwhS6wQvQERY95zTkiYmS9VjFARKCE684yYu1w&oe=6298F67B'
                }
                className="w-[22px] h-[22px] rounded-full"
              />
              <p className="text-white leading-[18px] text-[15px] ml-[6px]">
                gogo.mn •
                <Link to={`/profile/${post.author.id}`}>
                  <span> {post.author.name}</span>
                </Link>
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <div
              onClick={() => setSavePostOpen(true)}
              className={'flex flex-row items-center cursor-pointer w-[14px] h-[16.8px] ml-[12px]'}
            >
              <span className={'icon-fi-rs-bookmark text-white transition duration-150 text-[16px]'} />
            </div>
            <PostSaveModal post={post} setSavePostOpen={setSavePostOpen} savePostOpen={savePostOpen} />
            <div
              ref={menuRef}
              onClick={toggleMenu}
              className={'flex flex-row  relative items-center cursor-pointer w-[20px] h-[20px] ml-[10px]'}
            >
              <span className={'icon-fi-rs-more-ver text-white transition duration-150 text-[16px]'} />
              <DropDown
                arrow={'topRight'}
                className="absolute border border-[#D4D8D8] drop-shadow-[0_2px_2px_rgba(0,0,0,0.06)] top-[28px] -left-[128px] w-[166px] h-[97px]"
                open={isMenuOpen}
                onToggle={toggleMenu}
                content={
                  <div className="flex flex-col justify-center h-full pl-[14px]">
                    <div className="flex flex-row items-center">
                      <span className="text-[#555555] text-[16px] mr-[11px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-bookmark" />
                      <p className="text-[#555555] text-[15px] leading-[18px]">Жорд нэмэх</p>
                    </div>
                    <div className="flex flex-row items-center mt-[12px]">
                      <span className="text-[#555555] text-[15px] mr-[11px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-flag" />
                      <p className="text-[#555555] text-[15px] leading-[18px]">Репорт</p>
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
