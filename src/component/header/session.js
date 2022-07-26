import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from 'antd';
import SessionModal from '../modal/session';

export default function Session() {
  const { openModal } = useAuth();
  return (
    <>
      <Button onClick={() => openModal('login')} className="font-bold">
        Нэвтрэх
      </Button>
      <Button onClick={() => openModal('open')} type="primary" className="font-bold">
        Бүртгүүлэх
      </Button>
      <SessionModal />
    </>
  );
}
