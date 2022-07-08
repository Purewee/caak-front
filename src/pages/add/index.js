import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button } from 'antd';
import { CameraOutlined, FormOutlined, LinkOutlined } from '@ant-design/icons';

export default function Add() {
  const navigate = useNavigate();
  return (
    <div className="h-[600px] flex items-center justify-center">
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
        <Button type="primary">Стори оруулах</Button>
      </div>
      <div className="mx-[30px] border-[1px] flex flex-col justify-around items-center h-[240px] w-[240px]">
        <Avatar
          icon={<LinkOutlined className="text-[60px] text-caak-primary" />}
          className="w-[90px] h-[90px] flex items-center justify-center"
        />
        <Button type="primary">Линкээр оруулах</Button>
      </div>
    </div>
  );
}
