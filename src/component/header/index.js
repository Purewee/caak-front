import React from 'react';
import { Layout } from 'antd';
import DrawerMenu from './drawer_menu';
import Logo from '../logo';
import { useAuth } from '../../context/AuthContext';
import Search from './search';
import Session from './session';
import UserInfo from './UserInfo';
import Categories from './categories';

function CaakHeader() {
  const { isAuth } = useAuth();

  return (
    <Layout.Header className="fixed md:relative z-10 w-full bg-white border-b px-[12px] md:px-[48px]">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-[24px]">
          <DrawerMenu />
          <Logo />
          <Categories />
        </div>
        <div className="flex items-center">
          <Search />
          {isAuth ? <UserInfo /> : <Session />}
        </div>
      </div>
    </Layout.Header>
  );
}

export default CaakHeader;
