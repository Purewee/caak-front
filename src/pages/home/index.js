import NavbarPostHeader from '../../component/navigation/navbarPostHeader';
import Story from '../../component/story';
import React, { useEffect, useState } from 'react';
import { Tabs, Select } from 'antd';
import { useAuth } from '../../context/AuthContext';
import ArticlesList from './articles_list';
import { FieldTimeOutlined, LineChartOutlined } from '@ant-design/icons';
import Banner from '../../component/banner';
import { gql, useQuery } from '@apollo/client';
import { groupBy } from 'lodash/collection';

const FOLLOWS = gql`
  query GetFollows {
    me {
      follows {
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

export default function Home() {
  const [selected, setSelected] = useState('recent');
  const { isAuth } = useAuth();

  const [filter, setFilter] = useState([]);
  const [sort, setSort] = useState({});
  const { data } = useQuery(FOLLOWS, { skip: !isAuth && selected !== 'user' });
  const follows = groupBy(data?.me?.follows.map((x) => x.target) || [], (x) => x.__typename.toLowerCase());

  useEffect(() => {
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
          <Tabs onChange={(e) => setSelected(e)} className="w-full border-b font-merri" centered>
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
