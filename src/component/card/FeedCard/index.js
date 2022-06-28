import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { imagePath, useClickOutSide } from '../../../utility/Util';
import PostSaveModal from '../../modal/PostSaveModal';
import DropDown from '../../navigation/DropDown';
import { generateTimeAgo } from '../../../utility/Util';
import useMediaQuery from '../../navigation/useMediaQuery';

const postColors = [
  {
    color: '#2D3C48',
  },
  {
    color: '#463146',
  },
  {
    color: '#5D5B42',
  },
  {
    color: '#131D1C',
  },
  {
    color: '#1E1642',
  },
  {
    color: '#163943',
  },
  {
    color: '#813333',
  },
  {
    color: '#233C6A',
  },
];

const FeedCard = ({ post, loading, className, sponsored, trend }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [savePostOpen, setSavePostOpen] = useState(false);
  const [randomColorIndex, setRandomColorIndex] = useState(false);

  const isLaptop = useMediaQuery('(min-width: 1001px) and (max-width: 1920px)');
  const isTablet = useMediaQuery('(min-width: 401px) and (max-width: 1000px)');
  const isMobile = useMediaQuery('screen and (max-width: 767px)');

  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setRandomColorIndex(Math.floor(Math.random() * postColors.length));
  }, []);

  // prettier-ignore
  return !trend ? (
    post &&
    (sponsored ? (
      <div
        className={`${
          className ?? ''
        } relative w-full h-[370px] sm:w-[422px] sm:h-[526px] bg-white border-b border-[#EFEEEF]`}
      >
        <div className=" flex flex-col">
          <Link to={`/post/view/${post.id}`}>
            <img
              alt=""
              src={imagePath(post.image)}
              className="min-h-[220px] max-h-[220px] sm:min-h-[300px] sm:max-h-[300px] w-full object-cover"
            />
          </Link>
          <div
            className={`relative flex flex-col bg-[#463146] px-[16px] pt-[14px] md:pt-[22px] pb-[19px] md:h-[226px]`}
          >
            <Link className="min-h-[85px]" to={`/post/view/${post.id}`}>
              <p
                className={`text-white xl:text-center' cursor-pointer text-[22px] sm:leading-[28px] truncate-4 xl:truncate-3 font-merri`}
              >
                {post.title}
              </p>
            </Link>
            {isMobile ? (
              <div className="flex flex-row items-center justify-between mt-[16px]">
                <div className="flex flex-row items-center">
                  <img
                    alt=""
                    src={
                      'https://scontent.fuln2-2.fna.fbcdn.net/v/t1.18169-9/16388375_1258991760846780_6001512035944932012_n.png?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_ohc=9pNL5ldMQ0kAX_yAKha&_nc_ht=scontent.fuln2-2.fna&oh=00_AT_3pSN5nwhS6wQvQERY95zTkiYmS9VjFARKCE684yYu1w&oe=6298F67B'
                    }
                    className="w-[22px] h-[22px] rounded-full"
                  />
                  <Link to={'/channel/4'}>
                    <p className="text-white leading-[18px] text-[15px] ml-[6px]">{post.source.name}</p>
                  </Link>
                </div>
                <div className="flex flex-row items-center justify-end">
                  <div
                    onClick={() => setSavePostOpen(true)}
                    className={'flex flex-row items-center cursor-pointer w-[14px] h-[16.8px] ml-[12px]'}
                  >
                    <span className={'icon-fi-rs-bookmark text-white transition duration-150 text-[16px]'} />
                  </div>
                  <div
                    ref={menuRef}
                    onClick={toggleMenu}
                    className={'flex flex-row relative items-center cursor-pointer w-[20px] h-[20px] ml-[10px]'}
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
            ) : (
              <div className="flex flex-col mt-[16px]">
                <div className="flex flex-row itemsce justify-between w-full">
                  <div className="flex flex-row items-center">
                    <img
                      alt=""
                      src={
                        'https://scontent.fuln2-2.fna.fbcdn.net/v/t1.18169-9/16388375_1258991760846780_6001512035944932012_n.png?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_ohc=9pNL5ldMQ0kAX_yAKha&_nc_ht=scontent.fuln2-2.fna&oh=00_AT_3pSN5nwhS6wQvQERY95zTkiYmS9VjFARKCE684yYu1w&oe=6298F67B'
                      }
                      className="w-[22px] h-[22px] rounded-full"
                    />
                    <Link to={'/channel/4'}>
                      <p className="text-white leading-[18px] text-[15px] ml-[6px]">gogo.mn</p>
                    </Link>
                  </div>
                  <button className="text-white bg-white bg-opacity-10 hover:bg-opacity-20 rounded-[4px] w-[90px] h-[34px] text-[15px] font-bold">
                    Дагах
                  </button>
                </div>
                <div className="flex flex-row items-center justify-end mt-[24px] h-[20px]">
                  <div
                    onClick={() => setSavePostOpen(true)}
                    className={'flex flex-row items-center cursor-pointer w-[14px] h-[16.8px] ml-[12px]'}
                  >
                    <span className={'icon-fi-rs-bookmark text-white transition duration-150 text-[16px]'} />
                  </div>
                  <div
                    ref={menuRef}
                    onClick={toggleMenu}
                    className={'flex flex-row relative items-center cursor-pointer w-[20px] h-[20px] ml-[10px]'}
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
            )}
          </div>
        </div>

        <div className="absolute top-[14px] pl-[10px] pr-[12px] pt-[5.3px] pb-[4.3px] left-[14px] bg-black bg-opacity-40 rounded-[2px] flex flex-row items-center">
          <span className="text-[11.8px] text-white icon-fi-rs-megaphone" />
          <p className="text-white text-[13px] leading-[15px] font-roboto ml-[8px]">ОНЦЛОХ МЭДЭЭ</p>
        </div>
      </div>
    ) : (
      <div
        className={`${
          className ?? ''
        } relative w-full h-[150px] sm:w-[422px] sm:h-[526px] bg-white border-b border-[#EFEEEF]`}
      >
        <div className="flex flex-row sm:flex-col">
          <Link to={`/post/view/${post.id}`}>
            <img
              alt=""
              src={`http://graph.caak.mn${post.image}`}
              className="min-h-[105px] max-h-[105px] sm:min-h-[300px] sm:max-h-[300px] sm:min-w-full min-w-[130px] max-w-[130px] object-cover"
            />
          </Link>
          <div className={`relative flex flex-col pt-[20px] justify-between md:pb-[21px] md:h-[226px]`}>
            <div className="flex flex-col w-full">
              {isLaptop &&
                post.categories.map((x) => (
                  <Link key={x.id} to={`tags/${x.slug}`}>
                    <p className="text-[#FF6600] mb-[10px] text-[13px] uppercase leading-[15px] font-medium">#{x.name}</p>
                  </Link>
                ))}
              <Link to={`/post/view/${post.id}`}>
                <p
                  className={`${
                    sponsored ? 'text-white text-center' : 'text-[#111111]'
                  } ml-[16px] sm:ml-0 cursor-pointer text-[15px] sm:text-[22px] sm:leading-[28px] truncate-3 font-merri`}
                >
                  {post.title}
                </p>
              </Link>
              {isLaptop && (
                <p className="text-[#909090] text-[14px] mt-[10px]">
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
              )}
            </div>
            <div className={'flex justify-between'}>
              <div className={'hidden md:flex flex-row'}>
                <div className="flex flex-row items-center">
                  <img
                    alt=""
                    src={
                      'https://scontent.fuln2-2.fna.fbcdn.net/v/t1.18169-9/16388375_1258991760846780_6001512035944932012_n.png?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_ohc=9pNL5ldMQ0kAX_yAKha&_nc_ht=scontent.fuln2-2.fna&oh=00_AT_3pSN5nwhS6wQvQERY95zTkiYmS9VjFARKCE684yYu1w&oe=6298F67B'
                    }
                    className="w-[22px] h-[22px] rounded-full"
                  />
                  <div className="inline-flex leading-[18px] text-[15px] ml-[6px]">
                    <Link to={'/channel/4'}>
                      <p className='text-[#555555]'>gogo.mn •</p>
                    </Link>
                    <Link to={`/profile/${post.author.id}`}>
                      <span className="ml-[6px] text-[#555555]"> {post.author.name}</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex flex-row items-center">
                <div
                  onClick={() => setSavePostOpen(true)}
                  className={'flex flex-row items-center cursor-pointer w-[14px] h-[16.8px] ml-[12px]'}
                >
                  <span className={'icon-fi-rs-bookmark text-[#909090] transition duration-150 text-[16px]'} />
                </div>
                <div
                  ref={menuRef}
                  onClick={toggleMenu}
                  className={'flex flex-row relative items-center cursor-pointer w-[20px] h-[20px] ml-[10px]'}
                >
                  <span className={'icon-fi-rs-more-ver text-[#909090] transition duration-150 text-[16px]'} />
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
        <div className="flex md:hidden flex-row items-center justify-between mt-[10px]">
          <div className="flex flex-row items-center text-[14px] text-[#909090]">
            <p>{post.source?.name}</p>
            <p>&nbsp;•&nbsp;{generateTimeAgo(post.publish_date)}</p>
          </div>
          <div className="flex flex-row items-center">
            <div
              onClick={() => setSavePostOpen(true)}
              className={'flex flex-row items-center cursor-pointer w-[14px] h-[16.8px] ml-[12px]'}
            >
              <span className={'icon-fi-rs-bookmark text-[#909090] transition duration-150 text-[16px]'} />
            </div>
            <div
              ref={menuRef}
              onClick={toggleMenu}
              className={'flex flex-row relative items-center cursor-pointer w-[20px] h-[20px] ml-[10px]'}
            >
              <span className={'icon-fi-rs-more-ver text-[#909090] transition duration-150 text-[16px]'} />
              <DropDown
                arrow={'topRight'}
                className="absolute border border-[#D4D8D8] drop-shadow-[0_2px_2px_rgba(0,0,0,0.06)] top-[28px] -left-[128px] w-[166px] h-[97px]"
                open={isMenuOpen}
                onToggle={toggleMenu}
                content={
                  <div className="flex flex-col justify-center h-full pl-[14px]">
                    <div className="flex flex-row items-center">
                      <span className="text-[#555555] text-[16px] mr-[11px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-share" />
                      <p className="text-[#555555] text-[15px] leading-[18px]">Хуцаалцах</p>
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
        <PostSaveModal post={post} image={imagePath(post.image)} setSavePostOpen={setSavePostOpen} savePostOpen={savePostOpen} />
      </div>
    ))
  )
  :
  <div className="w-[422px] max-h-[475px] h-full border-b">
    <Link to={`/post/view/${post.id}`}>
      <img alt="" className={`w-full h-[300px] object-cover`} src={`http://graph.caak.mn${post.image}`} />
    </Link>
    <div className="flex flex-col h-[175px] pb-[21px] justify-between">
      <div>
        <div className="flex flex-row mt-[20px]">
          <Link to={`/post/view/${post.id}`}>
            <p style={{ fontWeight: 600 }} className="text-[21px] font-condensed font-medium leading-[27px] text-[#111111] truncate-2">
              {post.title}
            </p>
          </Link>
        </div>
        <div className="flex flex-row items-center mt-[12px] text-[#909090] h-[20px]">
          <div className="flex flex-row items-center">
            <span className="icon-fi-rs-eye text-[18px]" />
            <p className="text-[15px] ml-[6px] ">{post.views_count}</p>
          </div>
          <div className="flex flex-row items-center ml-[15px]">
            <span className="icon-fi-rs-heart text-[16px]" />
            <p className="text-[14px] ml-[6px]">{post.views_count}</p>
          </div>
          <p className="text-[14px] ml-[4px]">&nbsp;•&nbsp;{generateTimeAgo(post.publish_date)}</p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <img
            alt=""
            src={
              'https://scontent.fuln2-2.fna.fbcdn.net/v/t1.18169-9/16388375_1258991760846780_6001512035944932012_n.png?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_ohc=9pNL5ldMQ0kAX_yAKha&_nc_ht=scontent.fuln2-2.fna&oh=00_AT_3pSN5nwhS6wQvQERY95zTkiYmS9VjFARKCE684yYu1w&oe=6298F67B'
            }
            className="w-[22px] h-[22px] rounded-full"
          />
          <p className="text-[#555555] leading-[18px] text-[15px] ml-[6px]">
            gogo.mn •
            <Link to={`/profile/${post.author.id}`}>
              <span> {post.author.name}</span>
            </Link>
          </p>
        </div>
        <div className="flex flex-row items-center justify-end">
          <div
            onClick={() => setSavePostOpen(true)}
            className={'flex flex-row items-center cursor-pointer w-[14px] h-[16.8px] ml-[12px]'}
          >
            <span className={'icon-fi-rs-bookmark text-[#555555] transition duration-150 text-[16px]'} />
          </div>
          <div
            ref={menuRef}
            onClick={toggleMenu}
            className={'flex flex-row relative items-center cursor-pointer w-[20px] h-[20px] ml-[10px]'}
          >
            <span className={'icon-fi-rs-more-ver text-[#555555] transition duration-150 text-[16px]'} />
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
    <PostSaveModal post={post} image={imagePath(post.image)} setSavePostOpen={setSavePostOpen} savePostOpen={savePostOpen} />
  </div>
};

export default FeedCard;
