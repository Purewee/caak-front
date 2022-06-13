import useAddPostLayout from '../../../../src/hooks/usePostViewLayout';
import React, { useState, useEffect, useContext } from 'react';
import { ESService } from '../../../lib/esService';
import { AppContext } from '../../../App';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Configure from '../../../component/configure';
import Loader from '../../../component/loader';

const ARTICLE = gql`
  query GetArticle($id: ID!) {
    article(id: $id, impression: true) {
      id
      title
      slug
      imageUrl
      data
      viewCount
      publishDate
      description
      createdAt
      categories {
        nodes {
          id
          name
        }
      }
      author {
        id
        firstName
        lastName
      }
      blocks {
        id
        kind
        title
        content
        imageUrl
        data
        position
        status
      }
    }
  }
`;

const Post = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(ARTICLE, { variables: { id } });
  const context = useContext(AppContext);
  const article = data?.article || {};

  function createMarkup(e) {
    return { __html: e };
  }

  useEffect(() => {
    context.setStore('default');
  }, []);

  const Layout = useAddPostLayout();

  if (loading)
    return (
      <div className={'w-full flex justify-center'}>
        <Loader className={`bg-caak-primary self-center`} />
      </div>
    );

  return (
    <Layout>
      <div className="pt-[81px] flex flex-col items-center max-w-[960px] w-full">
        {article.categories?.nodes?.map((x) => (
          <p key={x.id} className="text-[#FF6600] text-[13px] font-medium">
            #{x.name}
          </p>
        ))}
        <p className="text-[#111111] text-[38px] mt-[20px]">{article.title}</p>
        <div className="flex flex-row justify-between w-full h-[32px] mt-[30px]">
          <div className="flex flex-row items-center">
            <img
              alt=""
              className="w-[20px] h-[20px] rounded-full"
              src="https://scontent.fuln2-2.fna.fbcdn.net/v/t1.18169-9/16388375_1258991760846780_6001512035944932012_n.png?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_ohc=9pNL5ldMQ0kAX9pezvA&_nc_ht=scontent.fuln2-2.fna&oh=00_AT_EajREYn111vXVkurvpyOYzjTeuOzuFyv0-fQvIPkcCQ&oe=6298F67B"
            />
            <p className="ml-[6px] text-[#555555] text-[15px]">Gogo.mn</p>
            &nbsp;&middot;&nbsp;
            <p className="text-[#555555] text-[14px]">{`${article.author.firstName} ${article.author.lastName}`}</p>
            <p className="ml-[12px] text-[#909090] text-[13px]">
              {moment(article.createdAt).format('YYYY.MM.DD, hh:mm')}
            </p>
          </div>
          <div className="flex flex-row items-center">
            <span className="icon-fi-rs-fb cursor-pointer text-[#909090] text-[20px]" />
            <span className="icon-fi-rs-tw cursor-pointer text-[#909090] text-[20px] ml-[24px]" />
            <span className="icon-fi-rs-bookmark cursor-pointer text-[#909090] text-[17px] ml-[25px]" />
          </div>
        </div>
        <img src={`${Configure.host}${article.imageUrl}`} alt="" className="w-full h-[530px] mt-[30px] object-cover" />
        {/* <p className='text-[#555555] text-[18px] max-w-[760px] mt-[60px]'>{article.description}</p> */}

        <p
          dangerouslySetInnerHTML={createMarkup(article.description)}
          className="text-[#555555] text-[18px] max-w-[760px] mt-[60px]"
        />
        <div className="mt-[60px] w-full">
          {article.blocks.map((b) => {
            return (
              <div key={b.id} className="flex flex-col items-center mb-[60px] w-full">
                <img src={`${Configure.host}${b.imageUrl}`} alt="" className="w-full" />
                {b.title && (
                  <p className="mt-[60px] text-[#111111] text-[26px] font-bold font-roboto max-w-[760px]">{b.title}</p>
                )}
                {b.content && (
                  <p
                    className="text-[#555555] text-[18px] max-w-[760px] mt-[30px] text"
                    dangerouslySetInnerHTML={createMarkup(b.content)}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="flex flex-row w-full mt-[82px]">
          {article.categories?.nodes?.map((x) => (
            <p
              key={x.id}
              className="text-[14px] leading-[16px] text-[#111111] py-[7px] px-[12px] border border-[#D4D8D8] rounded-[3px]"
            >
              #{x.name}
            </p>
          ))}
        </div>
        <div className="flex flex-row  w-full justify-end items-center">
          <button className="bg-[#1877F2] text-white font-roboto text-[15px] flex flex-row items-center justify-center rounded-[4px] h-[34px] pl-[11.6px] pr-[10px]">
            <span className="icon-fi-rs-fb text-[16.8px] mr-[7.4px]" />
            ХУВААЛЦАХ
          </button>
          <button className="bg-[#1D9BF1] ml-[10px] text-white font-roboto text-[15px] flex flex-row items-center justify-center rounded-[4px] h-[34px] pl-[11.6px] pr-[10px]">
            <span className="icon-fi-rs-tw text-[16.5px] mr-[7.7px]" />
            ЖИРГЭХ
          </button>
          <span className="icon-fi-rs-bookmark text-[#555555] text-[23.5px] w-[50px] h-[50px] rounded-full bg-[#F7F7F7] flex justify-center items-center cursor-pointer ml-[20px]" />
          <span className="icon-fi-rs-more-ver rotate-90 text-[#555555] text-[23.5px] w-[50px] h-[50px] rounded-full bg-[#F7F7F7] flex justify-center items-center cursor-pointer ml-[14px]" />
        </div>
        <div className="flex flex-row mt-[38px] justify-between w-full border-t py-[17px] border-b border-[#EFEEEF]">
          <div className="flex flex-row items-center">
            <img
              alt=""
              className="w-[36px] h-[36px] rounded-full"
              src="https://scontent.fuln2-2.fna.fbcdn.net/v/t1.18169-9/16388375_1258991760846780_6001512035944932012_n.png?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_ohc=9pNL5ldMQ0kAX9pezvA&_nc_ht=scontent.fuln2-2.fna&oh=00_AT_EajREYn111vXVkurvpyOYzjTeuOzuFyv0-fQvIPkcCQ&oe=6298F67B"
            />
            <p className="ml-[8px] text-[#555555] text-[15px]">Gogo.mn</p>
            &nbsp;&middot;&nbsp;
            <p className="text-[#555555] text-[14px]">{`${article.author.firstName} ${article.author.lastName}`}</p>
            <p className="ml-[12px] text-[#909090] text-[13px]">
              {moment(article.createdAt).format('YYYY.MM.DD, hh:mm')}
            </p>
          </div>
          <button className="bg-caak-primary rounded-[4px] text-white font-bold text-[15px] w-[90px] h-[34px]">
            Дагах
          </button>
        </div>
        <p className="text-[#111111] text-[18px] font-bold leading-[21px] mt-[50px]">
          ЭНЭ МЭДЭЭНД ӨГӨХ ТАНЫ СЭТГЭГДЭЛ?
        </p>
        <div className="max-w-[490px] w-full mt-[40px]">
          <div className="border h-[189px] w-full border-[#EFEEEF]"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Post;
