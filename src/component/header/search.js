import React, { useState } from 'react';
import { Drawer, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FIcon } from '../icon';
import useMediaQuery from '../navigation/useMediaQuery';

export default function Search({ transparent }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('screen and (max-width: 670px)');

  return (
    <>
      <Button
        icon={
          <FIcon
            className={`icon-fi-rs-search text-[22px] ${
              transparent ? (isMobile ? 'text-caak-black' : 'text-white') : 'text-[#555555]'
            }`}
          />
        }
        className={`border-0 mr-[10px]`}
        onClick={() => setOpen(!open)}
        shape="circle"
        type="ghost"
      />
      <Drawer
        visible={open}
        height={72}
        placement="top"
        onClose={() => setOpen(false)}
        className="font-condensed caak-menu p-0"
        closeIcon={false}
        bodyStyle={{ padding: 0 }}
      >
        <div className="flex items-start justify-center">
          <Input.Search
            placeholder="Хайлт хийх..."
            onSearch={(text) => {
              navigate(`/search?q=${text}`);
              setOpen(false);
            }}
            className="h-[54px] text-[17px] text-[#555555] max-w-[600px] w-full px-[50px] border-[#BBBEBE] rounded-[4px]"
            size="large"
            allowClear
          />
        </div>
      </Drawer>
    </>
  );
}
