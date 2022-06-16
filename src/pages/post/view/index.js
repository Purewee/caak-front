import useAddPostLayout from '../../../../src/hooks/usePostViewLayout';
import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../../App';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Avatar from '../../../assets/images/avatar.svg';
import Loader from '../../../component/loader';
import Lottie from 'react-lottie';
import Love from '../../../component/reactions/love.json';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { imagePath } from '../../../utility/Util';
import { Wrapper, Title, BlockTitle, Paragraph, HashTag, MetaTag } from './wrapper';
import Comments from './comments';
import { ARTICLE } from './_gql';

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

  useEffect(() => {
    context.setShown(true);
  }, []);

  const options = {
    loop: false,
    autoplay: true,
    animationData: Love,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const Layout = useAddPostLayout();

  if (loading) {
    return (
      <div className="w-full flex justify-center p-[200px]">
        <Loader className={`bg-caak-primary self-center`} />
      </div>
    );
  }

  return (
    <Layout post={article}>
      <div className="pt-[81px] flex flex-col w-[960px] font-merri">
        {article.categories?.nodes?.map((x) => (
          <HashTag key={x.id} className="text-center">
            #{x.name}
          </HashTag>
        ))}
        <Wrapper>
          <Title>{article.title}</Title>
          <div className="flex flex-row justify-between w-full h-[32px] mt-[30px]">
            <div className="flex flex-row items-center">
              <img alt="" className="w-[20px] h-[20px] rounded-full" src={article.source.icon} />
              <MetaTag>{article?.source?.name}</MetaTag>
              <MetaTag className="text-[#909090] text-[13px]">
                {moment(article.createdAt).format('YYYY.MM.DD, hh:mm')}
              </MetaTag>
            </div>
            <div className="flex flex-row items-center">
              <span className="icon-fi-rs-fb cursor-pointer text-[#909090] text-[20px]" />
              <span className="icon-fi-rs-tw cursor-pointer text-[#909090] text-[20px] ml-[24px]" />
              <span className="icon-fi-rs-bookmark cursor-pointer text-[#909090] text-[17px] ml-[25px]" />
            </div>
          </div>
          <img src={imagePath(article.imageUrl)} alt="" className="w-full h-[530px] mt-[30px] object-cover" />
          <Paragraph dangerouslySetInnerHTML={createMarkup(article.description)} />
          {article.blocks.map((b) => {
            return (
              <div key={b.id} className="flex flex-col items-center mb-[60px] w-full">
                <LazyLoadImage src={imagePath(b.imageUrl)} alt="" className="w-full max-h-[640px] object-cover" />
                {b.title && <BlockTitle>{b.title}</BlockTitle>}
                {b.content && <Paragraph dangerouslySetInnerHTML={createMarkup(b.content)} />}
              </div>
            );
          })}
        </Wrapper>
        <div className="flex flex-row gap-[8px] w-full mt-[82px]">
          {article.tags?.map((x) => (
            <HashTag key={x.id} className="border border-[#D4D8D8] rounded-[3px]">
              #{x.name}
            </HashTag>
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
            <img alt="" className="w-[36px] h-[36px] rounded-full" src={imagePath(article.source.icon)} />
            <MetaTag>{article.source.name}</MetaTag>
            <MetaTag>{`${article.author.firstName}`}</MetaTag>
            <MetaTag className="text-[#909090]">{moment(article.createdAt).format('YYYY.MM.DD, hh:mm')}</MetaTag>
          </div>
          <button className="bg-caak-primary rounded-[4px] text-white font-bold text-[15px] w-[90px] h-[34px]">
            Дагах
          </button>
        </div>
        <div className="max-w-[760px] w-full flex flex-col items-center">
          <p className="text-[#111111] text-[18px] font-bold leading-[21px] mt-[50px]">
            ЭНЭ МЭДЭЭНД ӨГӨХ ТАНЫ СЭТГЭГДЭЛ?
          </p>
          <div>
            <Lottie options={options} height="80%" width="80%" />
          </div>
          <Comments articleId={article?.id} />
        </div>
      </div>
    </Layout>
  );
};

export default Post;
