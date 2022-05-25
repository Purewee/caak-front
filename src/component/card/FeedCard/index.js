import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useClickOutSide } from "../../../utility/Util";
import PostSaveModal from "../../modal/PostSaveModal";
import PostShareModal from "../../modal/PostShareModal";
import DropDown from "../../navigation/DropDown";
import LoveIcon from '../../../assets/images/fi-rs-react-love.svg'
import CryIcon from '../../../assets/images/fi-rs-react-cry.svg'
import AngerIcon from '../../../assets/images/fi-rs-react-anger.svg'
import HahaIcon from '../../../assets/images/fi-rs-react-haha.svg'
import WowIcon from '../../../assets/images/fi-rs-react-wow.svg'
import useMediaQuery from "../../navigation/useMediaQuery";


const postColors =
  [
    {
      color: '#2D3C48'
    }, 
    {
      color: '#463146'
    },
    {
      color: '#5D5B42'
    },
    {
      color: '#131D1C'
    }, 
    {
      color: '#1E1642'
    }, 
    {
      color: '#163943'
    }, 
    {
      color: '#813333'
    }, 
    {
      color: '#233C6A'
    }
  ]

const FeedCard = ({
  post,
  loading,
  className,
  sponsored
}) => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [reactMenuOpen, setReactMenuOpen] = useState(false);
  const [sharePostOpen, setSharePostOpen] = useState(false);
  const [savePostOpen, setSavePostOpen] = useState(false);
  const [randomColorIndex, setRandomColorIndex] = useState(false);
  
  const isLaptop = useMediaQuery("(min-width: 1001px) and (max-width: 1920px)");
  const isTablet = useMediaQuery("(min-width: 401px) and (max-width: 1000px)");
  const isMobile = useMediaQuery("screen and (max-width: 767px)");

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

  useEffect(() => {
    setRandomColorIndex(Math.floor(Math.random() * postColors.length))
  }, [])

  return (
    post && (
      <div
        className={`${
          className ?? ""
        } relative w-full h-[150px] sm:w-[422px] sm:h-[523px] bg-white ${!sponsored && 'border-b border-[#EFEEEF]'}`}
      >
        <div className=" flex flex-row xl:flex-col">
        <Link to={`/post/view/${post.id}`}>
          <img alt="" src={`http://graph.caak.mn${post.image}`} className="min-h-[105px] max-h-[105px] sm:min-h-[300px] sm:max-h-[300px] sm:min-w-full min-w-[130px] max-w-[130px] object-cover" />
        </Link>
        <div className={`relative flex flex-col ${sponsored ? `bg-[#463146] pt-[22px] px-[16px]` : 'pt-[20px]'} justify-between pb-[21px] xl:h-[223px]`}>
          <div className="flex flex-col w-full">
            {!sponsored && isLaptop && post.categories.map((x) => (
              <Link key={x.id} to={`tags/${x.slug}`}>
                <p className="text-[#FF6600] mb-[10px] text-[13px] uppercase">#{x.name}</p>
              </Link>
            ))}
            <Link to={`/post/view/${post.id}`}>
              <p className={`${sponsored ? 'text-white text-center' : 'text-[#111111]'} ml-[16px] sm:ml-0 cursor-pointer text-[15px] sm:text-[22px] sm:leading-[28px] truncate-3`}>{post.title}</p>
            </Link>
            {!sponsored && isLaptop && <p className="text-[#909090] text-[14px] mt-[10px]">{new Date(post.publish_date).getFullYear() + '.' + (new Date(post.publish_date).getMonth() + 1) + '.' + new Date(post.publish_date).getDate() + ', ' + new Date(post.publish_date).getHours() + ':' + new Date(post.publish_date).getMinutes()}</p>}
          </div>
          {isLaptop &&
            (
              sponsored
            ?
            <div>
              <div className="flex flex-row items-center justify-between mt-[16px]">
                <div className="flex flex-row items-center">
                    <img alt="" src={'https://scontent.fuln2-2.fna.fbcdn.net/v/t1.18169-9/16388375_1258991760846780_6001512035944932012_n.png?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_ohc=9pNL5ldMQ0kAX_yAKha&_nc_ht=scontent.fuln2-2.fna&oh=00_AT_3pSN5nwhS6wQvQERY95zTkiYmS9VjFARKCE684yYu1w&oe=6298F67B'} className="w-[22px] h-[22px] rounded-full"/>
                  <Link to={'/channel/4'}>
                    <p className="text-white leading-[18px] text-[15px] ml-[6px]">gogo.mn</p>
                  </Link>
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
                            <img alt="" src={LoveIcon} className="w-[30px] h-[30px] cursor-pointer rounded-full"/>
                            <img alt="" src={HahaIcon} className="w-[30px] h-[30px] cursor-pointer rounded-full"/>
                            <img alt="" src={WowIcon} className="w-[30px] h-[30px] cursor-pointer rounded-full"/>
                            <img alt="" src={CryIcon} className="w-[30px] h-[30px] cursor-pointer rounded-full"/>
                            <img alt="" src={AngerIcon} className="w-[30px] h-[30px] cursor-pointer rounded-full"/>
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
                  <div className="text-[#555555] inline-flex leading-[18px] text-[15px] ml-[6px]">
                    <Link to={'/channel/4'}>
                      <p>gogo.mn •</p>
                    </Link>
                    <Link to={`/profile/${post.author.id}`}>
                      <span className="ml-[6px]"> {post.author.name}</span>
                    </Link>
                  </div>
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
                            <img alt="" src={LoveIcon} className="w-[30px] rounded-full h-[30px] cursor-pointer"/>
                            <img alt="" src={HahaIcon} className="w-[30px] rounded-full h-[30px] cursor-pointer"/>
                            <img alt="" src={WowIcon} className="w-[30px] rounded-full h-[30px] cursor-pointer"/>
                            <img alt="" src={CryIcon} className="w-[30px] rounded-full h-[30px] cursor-pointer"/>
                            <img alt="" src={AngerIcon} className="w-[30px] rounded-full h-[30px] cursor-pointer"/>
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
            )
          }
        </div>
        </div>
        {
          sponsored && 
          <div className="absolute top-[14px] pl-[10px] pr-[12px] pt-[5.3px] pb-[4.3px] left-[14px] bg-black bg-opacity-40 rounded-[2px] flex flex-row items-center">
            <span className="text-[11.8px] text-white icon-fi-rs-megaphone" />
            <p className="text-white text-[13px] leading-[15px] font-roboto ml-[8px]">ОНЦЛОХ МЭДЭЭ</p>
          </div>
        }
      </div>
    )
  );
};

export default FeedCard;
