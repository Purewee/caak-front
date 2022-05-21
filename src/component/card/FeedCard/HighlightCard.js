import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import PostShareModal from '../../modal/PostShareModal';
import PostSaveModal from '../../modal/PostSaveModal';

export default function HighlightCard({post}) {
    const [sharePostOpen, setSharePostOpen] = useState(false);
    const [savePostOpen, setSavePostOpen] = useState(false);
    return (
        <div className='max-w-[646px] w-full h-[430px] relative'>
            <img alt="" src={`http://graph.caak.mn${post.image}`} className="h-full w-full object-cover" />
            <div className='absolute left-0 bottom-0 highlightLinear flex flex-col justify-end h-[316px] w-full p-[30px]'>
                <div className="flex flex-col w-full">
                {
                    post.categories.map((x) => (
                        <Link key={x.id} to={`tags/${x.id}`}>
                        <p className="text-white font-medium mb-[10px] text-[14px] leading-[16px] uppercase">#{x.name}</p>
                        </Link>
                    ))
                }
                <Link to={`/post/view/${post.id}`}>
                    <p className={`text-white font-bold text-[36px] leading-[40px] truncate-3`}>{post.title}</p>
                </Link>
                {<p className="text-white text-[14px] mt-[14px] font-medium leading-[16px]">{new Date(post.publish_date).getFullYear() + '.' + (new Date(post.publish_date).getMonth() + 1) + '.' + new Date(post.publish_date).getDate() + ', ' + new Date(post.publish_date).getHours() + ':' + new Date(post.publish_date).getMinutes()}</p>}
                </div>
                <div className={"flex justify-between mt-[20px]"}>
                    <div className={"flex flex-row"}>
                        <div className="flex flex-row items-center">
                            <img alt="" src={'https://scontent.fuln2-2.fna.fbcdn.net/v/t1.18169-9/16388375_1258991760846780_6001512035944932012_n.png?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_ohc=9pNL5ldMQ0kAX_yAKha&_nc_ht=scontent.fuln2-2.fna&oh=00_AT_3pSN5nwhS6wQvQERY95zTkiYmS9VjFARKCE684yYu1w&oe=6298F67B'} className="w-[22px] h-[22px] rounded-full"/>
                            <p className="text-white leading-[18px] text-[15px] ml-[6px]">gogo.mn •
                            <Link to={`/profile/${post.author.id}`}>
                                <span> {post.author.name}</span>
                            </Link>
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row items-center">
                        <div
                            onClick={() => setSharePostOpen(true)}
                            // ref={menuRef}
                            // onClick={toggleMenu}
                            className={
                            "flex flex-row items-center cursor-pointer w-[13.6px] h-[16.6px]"
                            }
                        >
                            <span
                            className={
                                "icon-fi-rs-share text-white transition duration-150 text-[16px]"
                            }
                            />
                            {/* <DropDown
                            arrow={"centerBottom"}
                            className="absolute right-0 bottom-12"
                            open={isMenuOpen}
                            onToggle={toggleMenu}
                            content={
                                <div className={"flex flex-row items-center"}>
                                <div className={"flex flex-col  justify-start  z-1"}>
                                    <div
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
                            /> */}
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
                            className={
                            "flex flex-row items-center cursor-pointer w-[18px] h-[16px] ml-[14px]"
                            }
                        >
                            <span
                            className={
                                "icon-fi-rs-heart text-white transition duration-150 text-[16px]"
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
                            "icon-fi-rs-more-ver text-white transition duration-150 text-[16px]"
                        }
                        />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
