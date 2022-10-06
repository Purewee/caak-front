import React, { useEffect, useState } from 'react';
import { imagePath } from '../../utility/Util';
import useMediaQuery from '../navigation/useMediaQuery';
import { Drawer, Button } from 'antd';
import { FIcon } from '../icon';
import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

const Wrapper = styled(Drawer)`
  .ant-drawer-content {
    border-radius: 15px 15px 0 0;
    .ant-drawer-body {
      display: flex;
      flex-direction: column;
      padding: 24px;
      .ant-btn-default {
        border-radius: 10px;
        height: 54px;
        width: 100%;
        i {
          transform: rotate(270deg);
          margin: 0 6px;
        }
      }
    }
  }
`;

export default function A3({ banner }) {
  const isMobile = useMediaQuery('screen and (max-width: 767px)');
  const key = `banner_${banner.id}`;
  const closed = localStorage.getItem(key) || false;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (closed) return;
    setOpen(true);
  }, [closed]);

  if (!banner) {
    return <></>;
  }
  return (
    <>
      {isMobile ? (
        <Wrapper
          footer={false}
          placement="bottom"
          visible={open}
          bodyStyle={{ background: '#F5F5F5', position: 'relative' }}
          closable={false}
          height={360}
        >
          <Button
            icon={<CloseOutlined />}
            size="small"
            className="absolute top-[8px] right-[8px] bg-white text-[#555555] border-[1px] border-[#00000010]"
            type="link"
            shape="circle"
            onClick={() => {
              setOpen(false);
              localStorage.setItem(key, 'closed');
            }}
          />
          <a href={banner?.url} target="_blank" className="w-full flex flex-col justify-between items-center h-[360px]">
            <img
              src={imagePath(banner?.mobileFileUrl || banner?.fileUrl)}
              alt={banner?.title}
              className="w-full max-h-[240px] object-contain"
            />
            <Button
              className="mt-2 text-[17px] border-0"
              style={{
                color: banner?.data?.button_text_color || '#555555',
                background: banner?.data?.button_color || '#ffffff',
              }}
            >
              Дэлгэрэнгүй үзэх
              <FIcon className="icon-fi-rs-down-chevron text-[17px]" />
            </Button>
          </a>
        </Wrapper>
      ) : (
        <a href={banner?.url} target="_blank">
          {banner?.bannerType === 'image' ? (
            <img
              src={imagePath(banner?.fileUrl)}
              alt={banner?.title}
              className="min-w-[250px] max-w-[250px] object-cover"
            />
          ) : (
            <video src={imagePath(banner?.fileUrl)} />
          )}
        </a>
      )}
    </>
  );
}
