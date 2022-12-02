import React from 'react';
import { Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '../../component/navigation/useMediaQuery';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const Wrapper = styled(Tabs)`
  .ant-tabs-tab {
    padding: 8px 0px;
    color: #555555;
    &-active {
      color: #111111;
    }
  }
`;

export default function HomeTabs({ selected }) {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('screen and (max-width: 640px)');
  const categories = isAuth
    ? [
        { label: 'Шинэ', key: 'recent' },
        { label: 'Трэнд', key: 'trend' },
        { label: 'Танд', key: 'user' },
        { label: 'Чөлөөт цаг', key: 'chuluut_tsag' },
        { label: 'Цаг үе', key: 'tsag_uye' },
        { label: 'Блог', key: 'blog' },
        { label: 'Видео', key: 'vidyeo' },
      ]
    : [
        { label: 'Шинэ', key: 'recent' },
        { label: 'Трэнд', key: 'trend' },
        { label: 'Чөлөөт цаг', key: 'chuluut_tsag' },
        { label: 'Цаг үе', key: 'tsag_uye' },
        { label: 'Блог', key: 'blog' },
        { label: 'Видео', key: 'vidyeo' },
      ];

  return (
    <Wrapper
      tabBarGutter={isMobile ? 16 : 30}
      onChange={(e) => navigate(`/?type=${e}`)}
      className="w-full font-condensed pl-[16px]"
      centered
      activeKey={selected}
    >
      {categories.map((x) => (
        <Tabs.TabPane
          key={x.key}
          tab={
            <span className="text-[16px] sm:text-[22px] font-bold leading-[16px] sm:leading-[22px] uppercase">
              {x.label}
            </span>
          }
        />
      ))}
    </Wrapper>
  );
}