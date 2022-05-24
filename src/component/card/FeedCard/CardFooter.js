import { useState } from "react";
import { Link } from "react-router-dom";
import { useClickOutSide } from "../../../utility/Util";
import PostShareModal from "../../modal/PostShareModal";
import PostSaveModal from "../../modal/PostSaveModal";
import DropDown from "../../navigation/DropDown";
import LoveIcon from '../../../assets/images/fi-rs-react-love.svg'
import CryIcon from '../../../assets/images/fi-rs-react-cry.svg'
import AngerIcon from '../../../assets/images/fi-rs-react-anger.svg'
import HahaIcon from '../../../assets/images/fi-rs-react-haha.svg'
import WowIcon from '../../../assets/images/fi-rs-react-wow.svg'

const CardFooter = ({
  post,
  sponsored
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [reactMenuOpen, setReactMenuOpen] = useState(false);
  const [sharePostOpen, setSharePostOpen] = useState(false);
  const [savePostOpen, setSavePostOpen] = useState(false);

  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });

  const reactRef = useClickOutSide(() => {
    setReactMenuOpen(false)
  });

  const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
  };

  const toggleReactMenu = () => {
    setReactMenuOpen(!reactMenuOpen);
  };

  return (
    <>
      <div className={`relative flex flex-col ${sponsored ? 'bg-[#813333] pt-[22px] px-[16px]' : 'pt-[20px]'} justify-between pb-[21px] h-[223px]`}>
        <div className="flex flex-col w-full">
          {!sponsored && post.categories.map((x) => (
            <Link key={x.id} to={`tags/${x.slug}`}>
              <p className="text-[#FF6600] mb-[10px] text-[13px] uppercase">#{x.name}</p>
            </Link>
          )) }
          <Link to={`/post/view/${post.id}`}>
            <p className={`${sponsored ? 'text-white text-center' : 'text-[#111111]'} cursor-pointer text-[22px] leading-[28px] truncate-3`}>{post.title}</p>
          </Link>
          {!sponsored && <p className="text-[#909090] text-[14px] mt-[10px]">{new Date(post.publish_date).getFullYear() + '.' + (new Date(post.publish_date).getMonth() + 1) + '.' + new Date(post.publish_date).getDate() + ', ' + new Date(post.publish_date).getHours() + ':' + new Date(post.publish_date).getMinutes()}</p>}
        </div>
        {
          sponsored
          ?
          <div>
            <div className="flex flex-row items-center justify-between mt-[16px]">
              <div className="flex flex-row items-center">
                  <img alt="" src={'https://scontent.fuln2-2.fna.fbcdn.net/v/t1.18169-9/16388375_1258991760846780_6001512035944932012_n.png?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_ohc=9pNL5ldMQ0kAX_yAKha&_nc_ht=scontent.fuln2-2.fna&oh=00_AT_3pSN5nwhS6wQvQERY95zTkiYmS9VjFARKCE684yYu1w&oe=6298F67B'} className="w-[22px] h-[22px] rounded-full"/>
                  <p className="text-white leading-[18px] text-[15px] ml-[6px]">gogo.mn</p>
              </div>
              <button className="text-white w-[90px] h-[32px] bg-white bg-opacity-10 rounded-[4px]">
                Дагах
              </button>
            </div>
            <div className="flex flex-row items-center justify-end mt-[25px]">
              <div
                onClick={() => setSharePostOpen(true)}
                className={
                  "flex flex-row items-center cursor-pointer w-[14px] h-[16.8px] ml-[12px]"
                }
              >
                <span
                  className={
                    "icon-fi-rs-share text-white transition duration-150 text-[16px]"
                  }
                />
              </div>
              <PostShareModal post={post} setSharePostOpen={setSharePostOpen} sharePostOpen={sharePostOpen}/>
              <div
                onClick={() => setSavePostOpen(true)}
                className={
                  "flex flex-row items-center cursor-pointer w-[14px] h-[16.8px] ml-[12px]"
                }
              >
                <span
                  className={
                    "icon-fi-rs-bookmark text-white transition duration-150 text-[16px]"
                  }
                />
              </div>
              <PostSaveModal post={post} setSavePostOpen={setSavePostOpen} savePostOpen={savePostOpen}/>
              <div
                ref={reactRef}
                onClick={toggleReactMenu}
                className={
                  "flex flex-row relative items-center cursor-pointer w-[18px] h-[16px] ml-[14px]"
                }
              >
                <span
                  className={
                    "icon-fi-rs-heart text-white transition duration-150 text-[16px]"
                  }
                />
                <DropDown
                  className="absolute cursor-auto h-[40px] w-[182px] drop-shadow bottom-[28px] -left-[81px]"
                  open={reactMenuOpen}
                  onToggle={toggleReactMenu}
                  content={
                      <div className='flex flex-row items-center h-full justify-evenly'> 
                          <img alt="" src={LoveIcon} className="w-[30px] h-[30px] cursor-pointer"/>
                          <img alt="" src={HahaIcon} className="w-[30px] h-[30px] cursor-pointer"/>
                          <img alt="" src={WowIcon} className="w-[30px] h-[30px] cursor-pointer"/>
                          <img alt="" src={CryIcon} className="w-[30px] h-[30px] cursor-pointer"/>
                          <img alt="" src={AngerIcon} className="w-[30px] h-[30px] cursor-pointer"/>
                      </div>
                  }
                />
              </div>
              <div
                ref={menuRef}
                onClick={toggleMenu}
                className={
                  "flex flex-row relative items-center cursor-pointer w-[20px] h-[20px] ml-[10px]"
                }
              >
                <span
                  className={
                    "icon-fi-rs-more-ver text-white transition duration-150 text-[16px]"
                  }
                />
                <DropDown
                  arrow={"topRight"}
                  className="absolute border border-[#D4D8D8] drop-shadow-[0_2px_2px_rgba(0,0,0,0.06)] top-[28px] -left-[128px] w-[166px] h-[97px]"
                  open={isMenuOpen}
                  onToggle={toggleMenu}
                  content={
                      <div className='flex flex-col justify-center h-full pl-[14px]'>
                          <div className='flex flex-row items-center'>
                              <span className='text-[#555555] text-[16px] mr-[11px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-bookmark'/>
                              <p className='text-[#555555] text-[15px] leading-[18px]'>Жорд нэмэх</p>
                          </div>
                          <div className='flex flex-row items-center mt-[12px]'>
                              <span className='text-[#555555] text-[15px] mr-[11px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-flag'/>
                              <p className='text-[#555555] text-[15px] leading-[18px]'>Репорт</p>
                          </div>
                      </div>
                  }
                />
              </div>
            </div>
          </div>
          :
          <div className={"flex justify-between"}>
            <div className={"flex flex-row"}>
              <div className="flex flex-row items-center">
                <img alt="" src={'https://scontent.fuln2-2.fna.fbcdn.net/v/t1.18169-9/16388375_1258991760846780_6001512035944932012_n.png?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_ohc=9pNL5ldMQ0kAX_yAKha&_nc_ht=scontent.fuln2-2.fna&oh=00_AT_3pSN5nwhS6wQvQERY95zTkiYmS9VjFARKCE684yYu1w&oe=6298F67B'} className="w-[22px] h-[22px] rounded-full"/>
                <p className="text-[#555555] leading-[18px] text-[15px] ml-[6px]">gogo.mn •
                  <Link to={`/profile/${post.author.id}`}>
                    <span> {post.author.name}</span>
                  </Link>
                </p>
              </div>
              {/* <div
                className={
                  "flex flex-row group items-center mr-4 cursor-pointer rounded-full text-caak-nocturnal"
                }
              >
                <AnimatedCaakButton
                  subscription={subscription}
                  reactionType={"POST"}
                  reacted={reacted}
                  setReacted={(changedReacted) => {
                    reacted = changedReacted;
                  }}
                  totals={totals}
                  itemId={postId}
                  iconContainerClassname={"w-[24px] h-[24px]"}
                  iconClassname={"text-[23px]"}
                  iconColor={"text-caak-scriptink"}
                  textClassname={"ml-[6px] text-[15px]"}
                />
              </div>
              <div
                onClick={() =>
                  router.push(
                    {
                      query: {
                        ...router.query,
                        viewPost: "post",
                        id: postId,
                        prevPath: router.asPath,
                        isModal: true,
                        jumpToComment: true,
                      },
                    },
                    `/post/view/${postId}`,
                    { shallow: true }
                  )
                }
                className={"flex flex-row items-center mr-4 cursor-pointer group"}
              >
                <span
                  className={
                    "icon-fi-rs-comment-o text-[21px] mr-1.5 transition duration-150 text-caak-scriptink group-hover:text-caak-carbonfootprint"
                  }
                />
                <span className={"text-[15px] text-caak-nocturnal"}>
                  {totals?.comments ?? 0}
                </span>
              </div> */}
            </div>
            <div className="flex flex-row items-center">
              <div
                  onClick={() => setSharePostOpen(true)}
                  className={
                    "flex flex-row items-center cursor-pointer w-[14px] h-[16.8px] ml-[12px]"
                  }
                >
                  <span
                    className={
                      "icon-fi-rs-share text-[#909090] transition duration-150 text-[16px]"
                    }
                  />
              </div>
              <PostShareModal post={post} setSharePostOpen={setSharePostOpen} sharePostOpen={sharePostOpen}/>
              <div
                onClick={() => setSavePostOpen(true)}
                className={
                  "flex flex-row items-center cursor-pointer w-[14px] h-[16.8px] ml-[12px]"
                }
              >
                <span
                  className={
                    "icon-fi-rs-bookmark text-[#909090] transition duration-150 text-[16px]"
                  }
                />
              </div>
              <PostSaveModal post={post} setSavePostOpen={setSavePostOpen} savePostOpen={savePostOpen}/>
              <div
                ref={reactRef}
                onClick={toggleReactMenu}
                className={
                  "flex flex-row items-center relative cursor-pointer w-[18px] h-[16px] ml-[14px]"
                }
              >
                <span
                  className={
                    "icon-fi-rs-heart text-[#909090] transition duration-150 text-[16px]"
                  }
                />
                <DropDown
                  className="absolute cursor-auto h-[40px] w-[182px] drop-shadow bottom-[28px] -left-[81px]"
                  open={reactMenuOpen}
                  onToggle={toggleReactMenu}
                  content={
                      <div className='flex flex-row items-center h-full justify-evenly'> 
                          <img alt="" src={LoveIcon} className="w-[30px] caak-button shake h-[30px] cursor-pointer"/>
                          <img alt="" src={HahaIcon} className="w-[30px] h-[30px] cursor-pointer"/>
                          <img alt="" src={WowIcon} className="w-[30px] h-[30px] cursor-pointer"/>
                          <img alt="" src={CryIcon} className="w-[30px] h-[30px] cursor-pointer"/>
                          <img alt="" src={AngerIcon} className="w-[30px] h-[30px] cursor-pointer"/>
                      </div>
                  }
                />
              </div>
              <div
                ref={menuRef}
                onClick={toggleMenu}
                className={
                  "flex flex-row relative items-center cursor-pointer w-[20px] h-[20px] ml-[10px]"
                }
              >
                <span
                  className={
                    "icon-fi-rs-more-ver text-[#909090] transition duration-150 text-[16px]"
                  }
                />
                <DropDown
                  arrow={"topRight"}
                  className="absolute border border-[#D4D8D8] drop-shadow-[0_2px_2px_rgba(0,0,0,0.06)] top-[28px] -left-[128px] w-[166px] h-[97px]"
                  open={isMenuOpen}
                  onToggle={toggleMenu}
                  content={
                      <div className='flex flex-col justify-center h-full pl-[14px]'>
                          <div className='flex flex-row items-center'>
                              <span className='text-[#555555] text-[16px] mr-[11px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-bookmark'/>
                              <p className='text-[#555555] text-[15px] leading-[18px]'>Жорд нэмэх</p>
                          </div>
                          <div className='flex flex-row items-center mt-[12px]'>
                              <span className='text-[#555555] text-[15px] mr-[11px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-flag'/>
                              <p className='text-[#555555] text-[15px] leading-[18px]'>Репорт</p>
                          </div>
                      </div>
                  }
                />
              </div>
            </div>
          </div>
        }
      </div>
    </>
  );
};

export default CardFooter;

