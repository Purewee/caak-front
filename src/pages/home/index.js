import NavbarPostHeader from '../../component/navigation/navbarPostHeader';
import Story from '../../component/story';
import React, { useEffect, useState, useRef } from 'react';
import { Select } from 'antd';
import { useAuth } from '../../context/AuthContext';
import ArticlesList from './articles_list';
import { FieldTimeOutlined, LineChartOutlined } from '@ant-design/icons';
import Banner from '../../component/banner';
import { gql, useQuery } from '@apollo/client';
import { groupBy } from 'lodash/collection';
import useMediaQuery from '../../component/navigation/useMediaQuery';
import { useSearchParams } from 'react-router-dom';
import HomeTabs from './tabs';
import Logo from '../../component/logo';
import Search from '../../component/header/search';
import UserInfo from '../../component/header/UserInfo';
import Session from '../../component/header/session';
import styled from 'styled-components';

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

const StickyWrapper = styled.div`
  .sticky-part {
    opacity: 0;
  }
  &.stuck {
    box-shadow: 0 1px 6px 0 rgb(32 33 36 / 16%);
    .sticky-part {
      opacity: 1;
    }
  }
`;

export default function Home() {
  const [q] = useSearchParams();
  const selected = q.get('type') || 'recent';
  const page = parseInt(q.get('p') || 1);

  const tabsRef = useRef(null);
  const stickyRef = useRef(null);

  const { isAuth } = useAuth();
  const [filter, setFilter] = useState(false);
  const [sort, setSort] = useState(false);
  const isMobile = useMediaQuery('screen and (max-width: 640px)');
  const { data } = useQuery(FOLLOWS, { skip: !isAuth && selected !== 'user' });
  const follows = groupBy(data?.me?.follows.map((x) => x.target) || [], (x) => x.__typename.toLowerCase());
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 1500) {
        stickyRef.current?.classList?.add('stuck');
      } else {
        stickyRef.current?.classList?.remove('stuck');
      }
    });
  }, []);

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
    } else if (selected === 'current') {
      const should = [];
      should.push({
        bool: {
          must: [
            { term: { 'source.id': 1 } },
            { nested: { path: 'categories', query: { terms: { 'categories.slug': ['news', 'social'] } } } },
          ],
        },
      });
      should.push({ term: { 'source.category': 'tsag_uye' } });
      setFilter([{ bool: { should: should } }]);
      setSort({ publish_date: 'desc' });
    } else if (selected === 'video') {
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
    } else if (selected === 'blog') {
      const should = [];
      should.push({ term: { 'source.category': selected } });
      should.push({
        nested: {
          path: 'categories',
          query: { term: { 'categories.slug': 'blog' } },
        },
      });
      setFilter([{ bool: { should: should } }]);
      setSort({ publish_date: 'desc' });
    }
  }, [q, selected, page]);

  return (
    <>
      <div className={`relative bg-white flex flex-col items-center mb-[40px] sm:mb-[100px]`}>
        <NavbarPostHeader />
        <div style={{ zIndex: 10 }} className="sticky sm:hidden bg-white top-0 w-full">
          <div className="w-full flex items-center z-10 justify-between relative">
            <HomeTabs selected={selected} />
          </div>
          <div className="h-[2px] w-full bg-[#D4D8D8] z-0 absolute bottom-0 left-0"></div>
        </div>
        <div className="mt-[20px] hidden sm:block sm:mt-[50px] px-[16px] sm:px-0">
          <Banner position="a1" />
        </div>
        {selected === 'recent' && (
          <div className="md:px-[30px] w-full flex justify-center px-[16px] sm:px-0">
            <Story home />
          </div>
        )}
        <StickyWrapper
          ref={stickyRef}
          className="hidden sm:flex sticky sm:justify-center bg-white z-[2] top-0 w-full px-[16px] sm:px-0 mt-[80px]"
        >
          <div className="w-full flex items-center justify-between border-b px-[16px] md:px-[48px]">
            <Logo className="sm:h-[32px] sticky-part" />
            <HomeTabs selected={selected} />
            <div className="flex items-center sticky-part">
              <Search transparent={false} />
              {isAuth ? <UserInfo transparent={false} /> : <Session transparent={false} />}
            </div>
          </div>
        </StickyWrapper>
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
        {sort && filter && page && (
          <ArticlesList
            asd={['recent', 'video', 'blog'].includes(selected)}
            filter={filter}
            sort={sort}
            size={33}
            autoLoad={3}
            currentPage={page}
          />
        )}
      </div>
      {isMobile && <Banner position="a3" />}
    </>
  );
}
