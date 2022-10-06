import NavbarPostHeader from '../../component/navigation/navbarPostHeader';
import Story from '../../component/story';
import React, { useEffect, useState, useRef } from 'react';
import { Tabs, Select } from 'antd';
import { useAuth } from '../../context/AuthContext';
import ArticlesList from './articles_list';
import { FieldTimeOutlined, LineChartOutlined } from '@ant-design/icons';
import Banner from '../../component/banner';
import { gql, useQuery } from '@apollo/client';
import { groupBy } from 'lodash/collection';
import useMediaQuery from '../../component/navigation/useMediaQuery';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const FOLLOWS = gql`
  query GetFollows {
    me {
      id
      follows {
        id
        target {
          ... on Source {
            id
            name
          }
          ... on Tag {
            id
            name
          }
          ... on Category {
            id
            name
          }
          ... on User {
            id
            firstName
          }
        }
      }
    }
  }
`;

const SOURCE_CATEGORIES = gql`
  query GetSourceCategories {
    sourceCategoriesMap
  }
`;

export default function Home() {
  const [q] = useSearchParams();
  const selected = q.get('type') || 'recent';
  const tabsRef = useRef(null);

  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const [filter, setFilter] = useState([]);
  const [sort, setSort] = useState({ publish_date: 'desc' });
  const { data } = useQuery(FOLLOWS, { skip: !isAuth && selected !== 'user' });
  const { data: dataCategories } = useQuery(SOURCE_CATEGORIES);
  const follows = groupBy(data?.me?.follows.map((x) => x.target) || [], (x) => x.__typename.toLowerCase());
  const categories = dataCategories?.sourceCategoriesMap || [];
  const isMobile = useMediaQuery('screen and (max-width: 640px)');

  useEffect(() => {
    tabsRef.current?.scrollIntoView(true);
    if (selected === 'recent') {
      setFilter([]);
      setSort({ publish_date: 'desc' });
    } else if (selected === 'trend') {
      setFilter([{ range: { publish_date: { gte: `now-1d/d` } } }]);
      setSort({ views_count: 'desc' });
    } else if (selected === 'user') {
      const should = [];

      if (follows.user) {
        should.push({ terms: { 'author.id': follows.user.map((x) => x.id) } });
      }
      if (follows.tag) {
        should.push({
          nested: {
            path: 'tags',
            query: { terms: { 'tags.id': follows.tag.map((x) => x.id) } },
          },
        });
      }
      if (follows.category) {
        should.push({
          nested: {
            path: 'categories',
            query: { terms: { 'categories.id': follows.category.map((x) => x.id) } },
          },
        });
      }
      if (follows.source) {
        should.push({ terms: { 'source.id': follows.source.map((x) => x.id) } });
      }
      setFilter([{ bool: { should: should } }]);

      setSort({ publish_date: 'desc' });
    } else {
      setFilter([{ term: { 'source.category': selected } }]);
      setSort({ publish_date: 'desc' });
    }
  }, [selected]);

  return (
    <>
      <div className={`relative bg-white flex flex-col items-center mb-[40px] sm:mb-[100px]`}>
        <NavbarPostHeader />
        <div style={{ zIndex: 10 }} className="sticky sm:hidden bg-white top-0 max-w-[1310px] w-full px-[16px] sm:px-0">
          <Tabs
            tabBarGutter={isMobile ? 16 : 30}
            onChange={(e) => navigate(`/?type=${e}`)}
            className="w-full border-b font-roboto"
            centered
            activeKey={selected}
          >
            <Tabs.TabPane
              key="recent"
              tab={
                <span
                  className={`text-[16px] sm:text-[20px] font-bold cursor-pointer text-center leading-[16px] sm:leading-[20px] uppercase ${
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
                  className={`text-[16px] sm:text-[20px] font-bold cursor-pointer text-center leading-[16px] sm:leading-[20px] uppercase  ${
                    selected === 'trend' ? 'text-[#111111]' : 'text-[#555555]'
                  }`}
                >
                  Трэнд
                </span>
              }
            ></Tabs.TabPane>
            {isAuth && (
              <Tabs.TabPane
                key="user"
                tab={
                  <span
                    className={`text-[16px] sm:text-[20px] font-bold cursor-pointer text-center leading-[16px] sm:leading-[20px] uppercase ${
                      selected === 'user' ? 'text-[#111111]' : 'text-[#555555]'
                    }`}
                  >
                    Танд
                  </span>
                }
              ></Tabs.TabPane>
            )}
            {categories.map((x) => (
              <Tabs.TabPane
                key={x.code}
                tab={
                  <span
                    className={`text-[16px] sm:text-[20px] font-bold cursor-pointer text-center leading-[16px] sm:leading-[20px] uppercase ${
                      selected === x.code ? 'text-[#111111]' : 'text-[#555555]'
                    }`}
                  >
                    {x.name}
                  </span>
                }
              />
            ))}
          </Tabs>
        </div>
        <div className="mt-[20px] hidden sm:block sm:mt-[50px] mb-[20px] sm:mb-0 px-[16px] sm:px-0">
          <Banner position="a1" />
        </div>
        {selected === 'recent' && (
          <div className="md:px-[30px] w-full flex justify-center px-[16px] sm:px-0">
            <Story />
          </div>
        )}
        <div className="hidden sm:block sticky bg-white z-[2] top-0 max-w-[1310px] w-full px-[16px] sm:px-0 mt-[80px]">
          <Tabs
            onChange={(e) => navigate(`/?type=${e}`)}
            className="w-full border-b font-roboto"
            activeKey={selected}
            centered
          >
            <Tabs.TabPane
              key="recent"
              tab={
                <span
                  className={`text-[16px] sm:text-[20px] font-bold cursor-pointer text-center leading-[16px] sm:leading-[20px] uppercase ${
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
                  className={`text-[16px] sm:text-[20px] font-bold cursor-pointer text-center leading-[16px] sm:leading-[20px] uppercase  ${
                    selected === 'trend' ? 'text-[#111111]' : 'text-[#909090] sm:text-[#555555]'
                  }`}
                >
                  Трэнд
                </span>
              }
            ></Tabs.TabPane>
            {isAuth && (
              <Tabs.TabPane
                key="user"
                tab={
                  <span
                    className={`text-[16px] sm:text-[20px] font-bold cursor-pointer text-center leading-[16px] sm:leading-[20px] uppercase ${
                      selected === 'user' ? 'text-[#111111]' : 'text-[#909090] sm:text-[#555555]'
                    }`}
                  >
                    Танд
                  </span>
                }
              ></Tabs.TabPane>
            )}
            {categories.map((x) => (
              <Tabs.TabPane
                key={x.code}
                tab={
                  <span
                    className={`text-[16px] sm:text-[20px] font-bold cursor-pointer text-center leading-[16px] sm:leading-[20px] uppercase ${
                      selected === x.code ? 'text-[#111111]' : 'text-[#909090] sm:text-[#555555]'
                    }`}
                  >
                    {x.name}
                  </span>
                }
              />
            ))}
          </Tabs>
        </div>
        {selected === 'recent' && (
          <div className="mt-[20px] sm:hidden sm:mt-[50px] px-[16px] sm:px-0">
            <Banner position="a1" />
          </div>
        )}
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
        <span style={{ position: 'relative' }}>
          <span ref={tabsRef} style={{ position: 'absolute', top: '-50px' }} />
        </span>
        <ArticlesList
          asd={selected === 'vidyeo' ? true : selected === 'chuluut_tsag' ? true : selected === 'blog' ? true : false}
          filter={filter}
          sort={sort}
          size={22}
        />
      </div>
      {isMobile && <Banner position="a3" />}
    </>
  );
}
