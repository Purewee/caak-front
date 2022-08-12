import NavbarPostHeader from '../../component/navigation/navbarPostHeader';
import Story from '../../component/story';
import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../App';
import useMediaQuery from '../../component/navigation/useMediaQuery';
import { Tabs, Select } from 'antd';
import Logo from '../../component/logo';
import UserInfo from '../../component/header/UserInfo';
import { FIcon } from '../../component/icon';
import SearchModal from '../../component/modal/SearchModal';
import { useAuth } from '../../context/AuthContext';
import SignInUpController from '../../component/modal/SignInUpController';
import ArticlesList from './articles_list';
import { FieldTimeOutlined, LineChartOutlined } from '@ant-design/icons';
import SideMenu from '../../component/navigation/navbar/SideMenu';
import Banner from '../../component/banner';

export default function Home() {
  const context = useContext(AppContext);
  const [selected, setSelected] = useState('recent');
  const { isAuth, openModal } = useAuth();

  const [filter, setFilter] = useState([]);
  const [sort, setSort] = useState({});

  useEffect(() => {
    if (selected === 'recent') {
      setFilter([]);
      setSort({ publish_date: 'desc' });
    } else if (selected === 'trend') {
      setFilter([{ range: { publish_date: { gte: `now-1d/d` } } }]);
      setSort({ views_count: 'desc' });
    }
  }, [selected]);

  return (
    <>
      <div className={`relative bg-white flex flex-col items-center mb-[100px]`}>
        <NavbarPostHeader />
        <Banner position="a1" />
        <div className="md:px-[30px] w-full flex justify-center px-[16px] sm:px-0">
          <Story />
        </div>
        <div className="max-w-[1310px] w-full px-[16px] sm:px-0">
          <Tabs size="large" onChange={(e) => setSelected(e)} className="w-full border-b" centered>
            <Tabs.TabPane
              key="recent"
              tab={
                <span
                  className={`text-[20px] font-bold cursor-pointer text-center leading-[20px] uppercase ${
                    selected === 'recent' ? 'text-[#111111]' : 'text-[#555555]'
                  }`}
                >
                  Шинэ
                </span>
              }
            ></Tabs.TabPane>
            <Tabs.TabPane
              key="trend"
              tab={
                <span
                  className={`text-[20px] font-bold cursor-pointer text-center leading-[20px] uppercase  ${
                    selected === 'trend' ? 'text-[#111111]' : 'text-[#555555]'
                  }`}
                >
                  Трэнд
                </span>
              }
            ></Tabs.TabPane>
            {isAuth && (
              <Tabs.TabPane
                key="foryou"
                tab={
                  <span
                    className={`text-[20px] font-bold cursor-pointer text-center leading-[20px] uppercase ${
                      selected === 'foryou' ? 'text-[#111111]' : 'text-[#555555]'
                    }`}
                  >
                    Танд
                  </span>
                }
              ></Tabs.TabPane>
            )}
          </Tabs>
        </div>
        {selected === 'trend' && (
          <div className="flex mt-[12px] gap-[12px] font-merri">
            <Select
              onChange={(value) => {
                setSort({ [value]: 'desc' });
              }}
              defaultValue="views_count"
              className="w-[160px]"
              suffixIcon={<LineChartOutlined />}
            >
              <Select.Option value="views_count">Их үзсэн</Select.Option>
              <Select.Option value="comments_count">Их сэтгэгдэлтэй</Select.Option>
            </Select>
            <Select
              onChange={(value) => {
                setFilter([{ range: { publish_date: { gte: `now-${value}d/d` } } }]);
              }}
              defaultValue="1"
              className="w-[160px]"
              suffixIcon={<FieldTimeOutlined />}
            >
              <Select.Option value="1">24 цаг</Select.Option>
              <Select.Option value="7">7 хоног</Select.Option>
              <Select.Option value="30">30 хоног</Select.Option>
              <Select.Option value="360">1 жил</Select.Option>
              <Select.Option value="10000">Бүх цаг үе</Select.Option>
            </Select>
          </div>
        )}
        <ArticlesList filter={filter} sort={sort} size={24} />
      </div>
    </>
  );
}
