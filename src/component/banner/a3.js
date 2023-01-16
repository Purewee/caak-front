import React, { useEffect, useState } from 'react';
import { getStorageExpiry, imagePath, setStorageExpiry } from '../../utility/Util';
import useMediaQuery from '../navigation/useMediaQuery';
import { Drawer, Button } from 'antd';
import { FIcon } from '../icon';
import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';
import ImpressedLink from './clicks';

const Wrapper = styled(Drawer)`
  .ant-drawer-content {
    border-radius: 15px 15px 0 0;
    .ant-drawer-body {
      display: flex;
      flex-direction: column;
      padding: 0px;
      height: 360px;
      .ant-btn-default {
        border-radius: 8px;
        height: 44px;
        width: 100%;
        i {
          transform: rotate(270deg);
          margin: 0 6px;
        }
      }
      .ant-btn-link {
        border-radius: 100%;
      }
    }
  }
`;

export default function A3({ banner }) {
  const isMobile = useMediaQuery('screen and (max-width: 767px)');
  const key = `a3_banner_${banner?.id}`;
  const duration = 60000 * 60 * 24; // a day
  const [open, setOpen] = useState(false);
  const [onceClosed, setOnceClosed] = useState(false);

  const handleScroll = () => {
    if (!onceClosed && !open && window.scrollY > 1200) {
      const closed = getStorageExpiry(key) || false;
      if (!closed) setOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [banner, onceClosed, open]);

  if (!banner) {
    return <></>;
  }
  return (
    <>
      {isMobile ? (
        banner?.mobileFileUrl && (
          <Wrapper
            footer={false}
            placement="bottom"
            open={open}
            bodyStyle={{ background: '#F5F5F5', position: 'relative' }}
            height={360}
            closeIcon={false}
            headerStyle={{ display: 'none' }}
            onClose={() => {
              setOpen(false);
              setOnceClosed(true);
              window.removeEventListener('scroll', handleScroll);
            }}
          >
            <Button
              icon={<CloseOutlined />}
              className="absolute top-[8px] right-[8px] bg-white text-[#000000] h-[34px] w-[34px]"
              type="link"
              onClick={() => {
                setOpen(false);
                setStorageExpiry(key, 'closed', duration);
                window.removeEventListener('scroll', handleScroll);
              }}
            />
            <ImpressedLink
              id={banner.id}
              href={banner?.url}
              target="_blank"
              className="w-full flex flex-col justify-between items-center"
            >
              <img src={imagePath(banner?.mobileFileUrl)} alt={banner?.title} className="w-full object-cover" />
              <Button
                className="text-[17px] border-0 absolute bottom-[6px] font-condensed"
                style={{
                  color: banner?.data?.button_text_color || '#555555',
                  background: banner?.data?.button_color || '#ffffff',
                  width: 360,
                }}
              >
                Дэлгэрэнгүй үзэх
                <FIcon className="icon-fi-rs-down-chevron text-[17px]" />
              </Button>
            </ImpressedLink>
          </Wrapper>
        )
      ) : (
        <ImpressedLink id={banner.id} href={banner?.url} target="_blank">
          {banner?.bannerType === 'image' ? (
            <img
              src={imagePath(banner?.fileUrl)}
              alt={banner?.title}
              className="min-w-[250px] max-w-[250px] object-cover"
            />
          ) : (
            <video src={imagePath(banner?.fileUrl)} />
          )}
        </ImpressedLink>
      )}
    </>
  );
}
