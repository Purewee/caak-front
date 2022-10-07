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
import HomeTabs from './tabs';
import Logo from '../../component/logo';
import Search from '../../component/header/search';
import UserInfo from '../../component/header/UserInfo';
import Session from '../../component/header/session';

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

export default function Home() {
  const [q] = useSearchParams();
  const selected = q.get('type') || 'recent';
  const tabsRef = useRef(null);

  const { isAuth } = useAuth();
  const [filter, setFilter] = useState([]);
  const [sort, setSort] = useState({ publish_date: 'desc' });
  const { data } = useQuery(FOLLOWS, { skip: !isAuth && selected !== 'user' });
  const follows = groupBy(data?.me?.follows.map((x) => x.target) || [], (x) => x.__typename.toLowerCase());
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
    } else if (selected === 'vidyeo') {
      const should = [];
      should.push({ term: { 'source.category': selected } });
      should.push({
        nested: {
          path: 'categories',
          query: { term: { 'categories.slug': 'video' } },
        },
      });
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
        <div style={{ zIndex: 10 }} className="sticky sm:hidden bg-white top-0 w-full px-[16px] sm:px-0">
          <div className="w-full flex items-center justify-between">
            <HomeTabs selected={selected} />
          </div>
        </div>
        <div className="hidden sm:block sticky bg-white z-[2] top-0 w-full px-[16px] sm:px-0 mt-[80px]">
          <div className="w-full flex items-center justify-between border-b px-8">
            <Logo className="sm:h-[28px]" />
            <HomeTabs selected={selected} />
            <div className="flex items-center">
              <Search transparent={false} />
              {isAuth ? <UserInfo transparent={false} /> : <Session transparent={false} />}
            </div>
          </div>
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
          <span ref={tabsRef} style={{ position: 'absolute', top: selected === 'trend' ? '-80px' : '-40px' }} />
        </span>
        <ArticlesList filter={filter} sort={sort} size={22} />
      </div>
      {isMobile && <Banner position="a3" />}
    </>
  );
}
