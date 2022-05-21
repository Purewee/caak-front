import React, { useState } from "react";
import PostShareModal from '../../modal/PostShareModal'
import PostSaveModal from "../../modal/PostSaveModal";

const ActionButtons = ({post}) => {
  const [sharePostOpen, setSharePostOpen] = useState(false);
  const [savePostOpen, setSavePostOpen] = useState(false);
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
          className={
            "w-[20px] h-[20px] flex items-center justify-center cursor-pointer ml-[10px]"
          }
        >
          <span className={"icon-fi-rs-more-ver text-white text-[17px]"} />
        </div>
      </div>
    );
  };
  
  export default ActionButtons;
  