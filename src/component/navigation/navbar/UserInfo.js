import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import Avatar from 'antd/lib/avatar';
import { Popover } from 'antd';
import { useAuth } from '../../../context/AuthContext';
import { UserOutlined } from '@ant-design/icons';
import { FIcon } from '../../icon';
import { AppContext } from '../../../App';
import { Link } from 'react-router-dom';

const ME = gql`
  query Me {
    me {
      id
      mobile
      email
      firstName
      lastName
    }
  }
`;

export default function UserInfo() {
  const context = useContext(AppContext);
  const { data, loading } = useQuery(ME);
  const { logout } = useAuth();
  const textColor = context.store === 'default' ? 'text-[#555555]' : 'text-white';
  if (loading) return <span>Loading ...</span>;

  const Settings = [
    {
      title: 'Профайл',
      icon: 'icon-fi-rs-user',
      link: `/profile/${data?.me?.id}`,
    },
    {
      title: 'Дашбоард',
      icon: 'icon-fi-rs-statistic',
      link: `/dashboard/${data?.me?.id}`,
    },
    {
      title: 'Тохиргоо',
      icon: 'icon-fi-rs-settings',
      link: `/settings/${data?.me?.id}`,
    },
  ];

  return (
    <div className="flex flex-row items-center">
      <FIcon className={`icon-fi-rs-edit mr-[6px] ${textColor}`} />
      <FIcon className={`icon-fi-rs-list-o mx-[6px] ${textColor}`} />
      <FIcon className={`icon-fi-rs-notification mx-[6px] ${textColor}`} />
      <Popover
        placement="topRight"
        trigger="click"
        overlayStyle={{ width: 220, shadow: '0px 2px 2px #00000010' }}
        overlayInnerStyle={{ borderRadius: 4 }}
        content={
          <div className="w-full text-[#555555]">
            <div className="border-b w-full py-[17px] flex flex-row items-center pl-[18px]">
              <Avatar className="w-[38px] h-[38px] mr-[10px]" icon={<UserOutlined />} />
              <div>
                <p className="font-condensed text-[18px] font-bold leading-[21px] text-[#111111]">
                  {data?.me?.firstName}
                </p>
                <p className="text-[14px] leading-[16px] mt-[3px]">Мэдээллээ засах</p>
              </div>
            </div>
            <div className="p-[18px] flex flex-col gap-[16px] border-b">
              {Settings.map((data, index) => {
                return (
                  <Link key={index} to={{ pathname: data.link }}>
                    <div className="flex flex-row items-center cursor-pointer">
                      <span className={`${data.icon} text-[20px]`} />
                      <p className="text-[15px] ml-[12px] -mt-[3px] leading-[18px]">{data.title}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="p-[18px] flex flex-col gap-[16px]">
              <div onClick={() => logout()} className="flex flex-row items-center cursor-pointer">
                <span className={`icon-fi-rs-exit text-[20px]`} />
                <p className="text-[15px] ml-[12px] leading-[18px]">Гарах</p>
              </div>
            </div>
          </div>
        }
      >
        <Avatar className="w-[34px] h-[34px] ml-[20px] cursor-pointer" />
      </Popover>
    </div>
  );
}
