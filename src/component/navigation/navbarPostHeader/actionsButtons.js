import React, { useState } from 'react';
import PostShareModal from '../../modal/PostShareModal';
import PostSaveModal from '../../modal/PostSaveModal';
import DropDown from '../DropDown';
import ReportModal from '../../modal/ReportModal';
import { useClickOutSide } from '../../../utility/Util';
import { imagePath } from '../../../utility/Util';
import { Popover } from 'antd';

const ActionButtons = ({ post }) => {
  const [sharing, setSharing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [reporting, setReporting] = useState(false);

  return (
    <div className="flex flex-row items-center justify-between">
      <div
        onClick={() => setSaving(true)}
        className="w-[20px] h-[20px] flex items-center justify-center cursor-pointer"
      >
        <span className="icon-fi-rs-bookmark text-white text-[22px]" />
      </div>
      <div className="w-[20px] h-[20px] relative flex items-center justify-center cursor-pointer ml-[10px]">
        {reporting || sharing || (
          <Popover
            placement="bottom"
            trigger="click"
            className="leading-[16px] tracking-[0px]"
            overlayStyle={{ width: 166 }}
            overlayInnerStyle={{ borderRadius: 8 }}
            content={
              <div className="flex flex-col justify-center h-full">
                <div onClick={() => setSharing(true)} className="flex flex-row items-center cursor-pointer">
                  <span className="text-[#555555] text-[16px] mr-[11px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-share" />
                  <p className="text-[#555555] text-[15px] leading-[18px]">Хуваалцах</p>
                </div>
                <div onClick={() => setReporting(true)} className="flex flex-row items-center mt-[12px] cursor-pointer">
                  <span className="text-[#555555] text-[15px] mr-[11px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-flag" />
                  <p className="text-[#555555] text-[15px] leading-[18px]">Репорт</p>
                </div>
              </div>
            }
          >
            <span className="icon-fi-rs-more-ver text-white text-[22px]" />
          </Popover>
        )}
      </div>
      {saving && <PostSaveModal post={post} toggle={() => setSaving(false)} image={imagePath(post.image)} />}
      {sharing && <PostShareModal post={post} toggle={() => setSharing(false)} image={imagePath(post.image)} />}
      {reporting && <ReportModal post={post} toggle={() => setReporting(false)} />}
    </div>
  );
};

export default ActionButtons;
