import React, { useState } from "react";
import PostShareModal from '../../modal/PostShareModal'
import PostSaveModal from "../../modal/PostSaveModal";
import DropDown from "../DropDown";
import LoveIcon from '../../../assets/images/fi-rs-react-love.svg'
import CryIcon from '../../../assets/images/fi-rs-react-cry.svg'
import AngerIcon from '../../../assets/images/fi-rs-react-anger.svg'
import HahaIcon from '../../../assets/images/fi-rs-react-haha.svg'
import WowIcon from '../../../assets/images/fi-rs-react-wow.svg'
import { useClickOutSide } from "../../../utility/Util";

const ActionButtons = ({post}) => {
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
        ref={reactRef}
        onClick={toggleReactMenu}
        className={
          "w-[20px] h-[20px] relative flex items-center justify-center cursor-pointer ml-[14px]"
        }
      >
        <span className={"icon-fi-rs-heart text-white text-[18px]"} />
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
  