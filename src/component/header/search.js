import React, { useState } from 'react';
import { Drawer, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FIcon } from '../icon';
import useMediaQuery from '../navigation/useMediaQuery';

export default function Search({ transparent, drawer }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('screen and (max-width: 670px)');

  return (
    <>
      <Button
        icon={
          <FIcon
            className={`icon-fi-rs-search text-[22px] ${
              transparent ? (isMobile ? 'text-[#555555]' : 'text-white') : drawer ? 'text-caak-black' : 'text-[#555555]'
            }`}
          />
        }
        className={`border-0 mr-[10px] sm:mt-[4px]`}
        onClick={() => setOpen(!open)}
        shape="circle"
        type="ghost"
      />
      <Drawer
        open={open}
        height={72}
        placement="top"
        onClose={() => setOpen(false)}
        className="font-condensed caak-menu p-0"
        closeIcon={false}
        bodyStyle={{ padding: 0 }}
        title={false}
        headerStyle={{ display: 'none' }}
      >
        <div className="h-[72px] flex items-end justify-center">
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
