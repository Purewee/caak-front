import React from 'react';
import { Layout } from 'antd';
import DrawerMenu from './drawer_menu';
import Logo from '../logo';
import { useAuth } from '../../context/AuthContext';
import { useHeader } from '../../context/HeaderContext';
import Search from './search';
import Session from './session';
import UserInfo from './UserInfo';
import Categories from './categories';

function CaakHeader() {
  const { isAuth } = useAuth();
  const { mode, content } = useHeader();
  let cls = '';
  switch (mode) {
    case 'default':
      cls = 'border-b bg-white text-[#555555]';
      break;
    case 'sticky':
      cls = 'sticky top-0 border-b bg-white text-[#555555]';
      break;
    case 'transparent':
      cls = 'transparent-header sm:absolute top-0 border-0 text-white';
      break;
  }

  return (
    <Layout.Header className={`${cls} h-[60px] z-10 w-full  px-[12px] md:px-[48px]`}>
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-[15px] sm:gap-[24px]">
          <DrawerMenu />
          <Logo white={mode === 'transparent'} />
          <Categories />
        </div>
        <div className="flex items-center">
          <Search transparent={mode === 'transparent'} />
          {isAuth ? (
            <UserInfo transparent={mode === 'transparent'} />
          ) : (
            <Session transparent={mode === 'transparent'} />
          )}
        </div>
      </div>
    </Layout.Header>
  );
}

export default CaakHeader;
