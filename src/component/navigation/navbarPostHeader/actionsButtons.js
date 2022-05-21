import React, { useState } from "react";
import PostShareModal from '../../modal/PostShareModal'
import PostSaveModal from "../../modal/PostSaveModal";
import DropDown from "../DropDown";

const ActionButtons = ({post}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sharePostOpen, setSharePostOpen] = useState(false);
  const [savePostOpen, setSavePostOpen] = useState(false);
  

  const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <div className={"flex flex-row items-center justify-center"}>
      <div
        onClick={() => setSharePostOpen(true)}
        className={
          "w-[20px] h-[20px] flex items-center justify-center cursor-pointer"
        }
      >
        <span className={"icon-fi-rs-share text-white text-[17px]"} />
      </div>
      <PostShareModal post={post} setSharePostOpen={setSharePostOpen} sharePostOpen={sharePostOpen}/>
      <div
        onClick={() => setSavePostOpen(true)}
        className={
          "w-[20px] h-[20px] flex items-center justify-center cursor-pointer ml-[12px]"
        }
      >
        <span className={"icon-fi-rs-bookmark text-white text-[17px]"} />
      </div>
      <PostSaveModal post={post} setSavePostOpen={setSavePostOpen} savePostOpen={savePostOpen}/>
      <div
        className={
          "w-[20px] h-[20px] flex items-center justify-center cursor-pointer ml-[14px]"
        }
      >
        <span className={"icon-fi-rs-heart text-white text-[18px]"} />
      </div>
      <div
        onClick={toggleMenu}
        className={
          "w-[20px] h-[20px] relative flex items-center justify-center cursor-pointer ml-[10px]"
        }
      >
        <span className={"icon-fi-rs-more-ver text-white text-[17px]"} />
        <DropDown
          arrow={"topRight"}
          className="absolute border border-[#D4D8D8] drop-shadow-[0_2px_2px_rgba(0,0,0,0.06)] top-[28px] -left-[125px] w-[166px] h-[97px]"
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
  );
};
  
export default ActionButtons;
  