import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button } from 'antd';
import { CameraOutlined, FormOutlined, LinkOutlined } from '@ant-design/icons';
import { AppContext } from '../../App';
import { Title } from '../post/view/wrapper';
import { Helmet } from 'react-helmet';

export default function Add() {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    context.setStore('default');
  }, []);

  return (
    <>
      <Helmet>
        <title>Мэдээ оруулах/засах | Caak.mn</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Мэдээ оруулах/засах | Caak.mn" />
        <meta name="og:title" content="Мэдээ оруулах/засах | Caak.mn" />
      </Helmet>
      <Title className="text-center mt-[120px]">Төрлөө сонгоно уу?</Title>
      <div className="h-[400px] flex items-center justify-center mb-[120px]">
        <div className="mx-[30px] border-[1px] flex flex-col justify-around items-center h-[240px] w-[240px]">
          <Avatar
            icon={<FormOutlined className="text-[60px] text-caak-primary" />}
            className="w-[90px] h-[90px] flex items-center justify-center"
          />
          <Button type="primary" onClick={() => navigate('/add/post')}>
            Мэдээ оруулах
          </Button>
        </div>
        <div className="mx-[30px] border-[1px] flex flex-col justify-around items-center h-[240px] w-[240px]">
          <Avatar
            icon={<CameraOutlined className="text-[60px] text-caak-primary" />}
            className="w-[90px] h-[90px] flex items-center justify-center"
          />
          <Button type="primary" onClick={() => navigate('/add/story')}>
            Стори оруулах
          </Button>
        </div>
        <div className="mx-[30px] border-[1px] flex flex-col justify-around items-center h-[240px] w-[240px]">
          <Avatar
            icon={<LinkOutlined className="text-[60px] text-caak-primary" />}
            className="w-[90px] h-[90px] flex items-center justify-center"
          />
          <Button type="primary" onClick={() => navigate('/add/linked')}>
            Линкээр оруулах
          </Button>
        </div>
      </div>
    </>
  );
}
