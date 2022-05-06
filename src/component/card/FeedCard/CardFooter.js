import { useEffect, useState } from "react";
import { useClickOutSide } from "../../../utility/Util";
import DropDown from "../../navigation/DropDown";
// import FacebookIcon from "../../../../public/assets/images/Facebook-Color.svg";
// import TwitterIcon from "../../../../public/assets/images/Twitter-Color.svg";
import Button from "../../button";
import { Link } from "react-router-dom";

const CardFooter = ({
  totals,
  postId,
  reacted,
  handleToast,
  subscription,
  title,
  postUser,
  notBoosted,
  post
}) => {
  const [pathName, setPathName] = useState("");
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setPathName(window.location.origin);
  }, []);

  return (
    <>
      { notBoosted && (
        <>
          <div
            className={
              "flex flex-row items-center justify-end h-[46px] bg-white p-[12px] border-b-[1px]"
            }
          >
            <Button
              iconPosition={"left"}
              icon={
                <div
                  className={
                    "w-[20px] h-[20px] flex items-center justify-center mr-[6px]"
                  }
                >
                  <span className={"icon-fi-rs-rocket text-[16.66px]"} />
                </div>
              }
              className={
                "bg-[#257CEE] h-[28px] m-0 text-white px-[8px] py-[4px] font-medium text-[14px] rounded-[4px] leading-[16px] tracking-[0.21px]"
              }
            >
              Бүүстлэх
            </Button>
          </div>
        </>
      )}

      <div className="relative flex flex-col pb-[21px] pt-[20px] justify-between h-[223px]">
        <div className="flex flex-col items-start w-full">
          { post.categories.map((x) => (<p key={x.id} className="text-[#FF6600] text-[13px] uppercase">#{x.name}</p>)) }
            <p className="text-[#111111] cursor-pointer text-[21px] mt-[10px] leading-[27px] truncate-3">{post.title}</p>
          <p className="text-[#909090] text-[14px] mt-[10px]">{new Date(post.publish_date).getFullYear() + '.' + (new Date(post.publish_date).getMonth() + 1) + '.' + new Date(post.publish_date).getDate() + ', ' + new Date(post.publish_date).getHours() + ':' + new Date(post.publish_date).getMinutes()}</p>
        </div>
        <div className={"flex row justify-between"}>
          <div className={"flex flex-row"}>
            <div className="flex flex-row items-center">
              <img alt="" src={'https://scontent.fuln2-2.fna.fbcdn.net/v/t1.18169-9/16388375_1258991760846780_6001512035944932012_n.png?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_ohc=9pNL5ldMQ0kAX_yAKha&_nc_ht=scontent.fuln2-2.fna&oh=00_AT_3pSN5nwhS6wQvQERY95zTkiYmS9VjFARKCE684yYu1w&oe=6298F67B'} className="w-[22px] h-[22px] rounded-full"/>
              <p className="text-[#555555] text-[15px] ml-[6px]">gogo.mn • {post.author.name}</p>
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
              ref={menuRef}
              onClick={toggleMenu}
              className={
                "flex flex-row items-center cursor-pointer w-[13.6px] h-[16.6px]"
              }
            >
              <span
                className={
                  "icon-fi-rs-share text-caak-scriptink transition duration-150 text-[16px]"
                }
              />
              <DropDown
                arrow={"centerBottom"}
                className="absolute right-0 bottom-12"
                open={isMenuOpen}
                onToggle={toggleMenu}
                content={
                  <div className={"flex flex-row items-center"}>
                    <div className={"flex flex-col  justify-start  z-1    "}>
                      {/* <FacebookShareButton
                        url={`${pathName}/post/view/${postId}`}
                      >
                        <div className="hover:bg-caak-liquidnitrogen w-full px-c6">
                          <div
                            className={
                              "flex items-center rounded-full cursor-pointer h-[36px] "
                            }
                          >
                            <img
                              // priority={true}
                              width={22}
                              height={22}
                              alt={"facebook icon"}
                              src={FacebookIcon.src}
                            />
                            <p className="text-14px text-caak-extraBlack ml-px-12">
                              Facebook
                            </p>
                          </div>
                        </div>
                      </FacebookShareButton>
                      <TwitterShareButton
                        title={`${title} @caaktwt`}
                        url={`${pathName}/post/view/${postId}`}
                      >
                        <div className="hover:bg-caak-liquidnitrogen w-full px-c6">
                          <div
                            className={
                              "flex items-center rounded-full cursor-pointer h-[36px]"
                            }
                          >
                            <img
                              // priority={true}
                              width={22}
                              height={22}
                              alt={"twitter icon"}
                              src={TwitterIcon.src}
                            />
                            <p className="text-14px text-caak-extraBlack ml-px-12">
                              Twitter
                            </p>
                          </div>
                        </div>
                      </TwitterShareButton> */}
                      <div
                        onClick={() => {
                          if (typeof navigator !== "undefined")
                            navigator.clipboard.writeText(
                              `${pathName}/post/view/${postId}`
                            );
                          handleToast({ param: "copy" });
                        }}
                        className="hover:bg-caak-liquidnitrogen w-full px-c6"
                      >
                        <div
                          className={
                            "flex items-center  rounded-full cursor-pointer h-[36px]"
                          }
                        >
                          <div
                            className={
                              "flex justify-center items-center p-[5px] w-[22px] h-[22px] rounded-full bg-caak-red"
                            }
                          >
                            <span
                              className={
                                "icon-fi-rs-link text-white text-[11px]"
                              }
                            />
                          </div>
                          <p className="text-14px text-caak-extraBlack ml-px-12">
                            Линк хуулах
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
            <div
              className={
                "flex flex-row items-center cursor-pointer w-[14px] h-[16.8px] ml-[12px]"
              }
            >
              <span
                className={
                  "icon-fi-rs-bookmark text-caak-scriptink transition duration-150 text-[16px]"
                }
              />
            </div>
            <div
              className={
                "flex flex-row items-center cursor-pointer w-[18px] h-[16px] ml-[14px]"
              }
            >
              <span
                className={
                  "icon-fi-rs-heart text-caak-scriptink transition duration-150 text-[16px]"
                }
              />
            </div>
            <div
              className={
                "flex flex-row items-center cursor-pointer w-[20px] h-[20px] ml-[10px]"
              }
            >
              <span
                className={
                  "icon-fi-rs-more-ver text-caak-scriptink transition duration-150 text-[16px]"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardFooter;

