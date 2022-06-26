import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../../App';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Loader from '../../../component/loader';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { imagePath } from '../../../utility/Util';
import { Wrapper, Title, BlockTitle, Paragraph, HashTag, MetaTag } from './wrapper';
import Comments from './comments';
import { ARTICLE } from './_gql';
import LoveIcon from '../../../assets/images/fi-rs-react-love.png';
import CryIcon from '../../../assets/images/fi-rs-react-cry.svg';
import AngerIcon from '../../../assets/images/fi-rs-react-anger.svg';
import HahaIcon from '../../../assets/images/fi-rs-react-haha.svg';
import WowIcon from '../../../assets/images/fi-rs-react-wow.svg';
import DropDown from '../../../component/navigation/DropDown';
import { useClickOutSide } from '../../../utility/Util';
import PostSaveModal from '../../../component/modal/PostSaveModal';
import PostShareModal from '../../../component/modal/PostShareModal';
import { Avatar, Popover } from 'antd';
import { useAuth } from '../../../context/AuthContext';
import SignInUpController from '../../../component/modal/SignInUpController';

const Post = () => {
  const context = useContext(AppContext);
  const { id } = useParams();
  const [leftMenuSticky, setLeftMenuSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [savePostOpen, setSavePostOpen] = useState(false);
  const [sharePostOpen, setSharePostOpen] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const { data, loading } = useQuery(ARTICLE, { variables: { id } });
  const article = data?.article || {};
  const { isAuth } = useAuth();

  function createMarkup(e) {
    return { __html: e };
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const ref = useClickOutSide(() => {
    setIsMenuOpen(false);
  });

  useEffect(() => {
    context.setStore('default');
  }, []);

  useEffect(() => {
    context.setShown(true);
  }, []);

  useEffect(() => {
    const listener = () => {
      const scrolled = document.scrollingElement.scrollTop;
      if (scrolled > 180) {
        setLeftMenuSticky(true);
      } else {
        setLeftMenuSticky(false);
      }
    };
    document.addEventListener('scroll', listener);
    return () => {
      document.removeEventListener('scroll', listener);
    };
  }, [setLeftMenuSticky]);

  if (loading) {
    return (
      <div className="w-full flex justify-center p-[200px]">
        <Loader className={`bg-caak-primary self-center`} />
      </div>
    );
  }

  // prettier-ignore
  return (
    <div className="flex flex-row pb-[100px] justify-center mx-[10px]">
        <div className="w-full max-w-[250px]">
          <div className={`hidden md:flex ${leftMenuSticky ? 'sticky top-[80px]' : 'mt-[200px]'} w-full flex-col items-end`}>
            <div className="flex flex-col items-center w-[60px] h-[226px]">
              <p className="text-[#555555] text-[15px] leading-[18px] font-bold">{article.data?.like_count}</p>
              <span onClick={() => isAuth ? '' : setIsShown('signin')} className="mt-[6px] cursor-pointer icon-fi-rs-heart text-[26px] text-[#555555] flex items-center justify-center border border-[#D4D8D8] w-[60px] h-[60px] rounded-full" />
              <span onClick={() => isAuth ? setSavePostOpen(true) : setIsShown('signin')}  className="text-[#909090] cursor-pointer text-[20px] icon-fi-rs-bookmark mt-[22px]" />
              <span onClick={() => isAuth ? setSharePostOpen(true) : setIsShown('signin')} className="text-[#909090] cursor-pointer text-[19px] icon-fi-rs-share mt-[24.5px]" />
              <Popover
                placement="bottom"
                trigger="click"
                className="font-bold text-[14px] leading-[16px] tracking-[0px]"
                overlayStyle={{ width: 166 }}
                overlayInnerStyle={{ borderRadius: 8 }}
                content={
                  <div className="flex flex-col gap-[15px] h-full justify-between p-[18px]">
                    <div className="flex flex-row items-center cursor-pointer">
                      <span className="text-[#555555] text-[20px] mr-[8px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-editor-o" />
                      <p className="text-[#555555] text-[15px] leading-[18px]">Засах</p>
                    </div>
                    <div className="flex flex-row items-center cursor-pointer">
                      <span className="text-[#555555] text-[20px] mr-[8px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-delete" />
                      <p className="text-[#555555] text-[15px] leading-[18px]">Устгах</p>
                    </div>
                    {/* <div onClick={() => setSharePostOpen(true)} className="flex flex-row items-center cursor-pointer">
                      <span className="text-[#555555] text-[18px] mr-[8px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-share" />
                      <p className="text-[#555555] text-[15px] leading-[18px]">Хуваалцах</p>
                    </div> */}
                    <div className="flex flex-row items-center cursor-pointer">
                      <span className="text-[#555555] text-[18px] mr-[8px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-flag" />
                      <p className="text-[#555555] text-[15px] leading-[18px]">Репорт</p>
                    </div>
                  </div>
                }
              >
                <span className="text-[#909090] cursor-pointer text-[20px] icon-fi-rs-more-ver mt-[21px] rotate-90" />
              </Popover>
            </div>
          </div>
        </div>
        <div className="pt-[81px] flex flex-col w-[760px] font-roboto mx-[100px]">
          {article.categories?.nodes?.map((x) => (
            <HashTag key={x.id} className="text-center">
              {x.name}
            </HashTag>
          ))}
          <Wrapper>
            <Title>{article.title}</Title>
            <div className="flex flex-row items-center">
              <img className='w-[20px]' src={LoveIcon} alt=''/>
              <img className='w-[20px]' src={HahaIcon} alt=''/>
              <p className='ml-[6px] text-[15px] text-caak-primary leading-[16px]'>{article.data.like_count}</p>
            </div>
            <div className="flex flex-row justify-between w-full h-[32px] mt-[30px]">
              <div className="flex flex-row items-center">
                <img alt="" className="w-[32px] h-[32px] rounded-full" src={imagePath(article.source?.icon)} />
                <div className='ml-[8px]'>
                  <MetaTag className="ml-0 text-caak-black">{article?.source?.name}</MetaTag>
                  <div className='text-[12px] text-[#909090] flex flex-row items-center leading-[14px]'>
                    <p>{moment(article.createdAt).format('YYYY.MM.DD, hh:mm')}</p>
                    <p className='underline ml-[6px]'>ДАГАХ</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center">
                <span className="icon-fi-rs-fb hover:text-[#1877F2] cursor-pointer text-[#909090] text-[20px]" />
                <span className="icon-fi-rs-tw hover:text-[#1D9BF1] cursor-pointer text-[#909090] text-[20px] ml-[24px]" />
                <span onClick={() => isAuth ? setSavePostOpen(true) : setIsShown('signin')} className="icon-fi-rs-bookmark cursor-pointer hover:text-[#111111] w-[32px] h-[32px] flex justify-center items-center rounded-[2px] hover:bg-[#EFEEEF] border border-[#EFEEEF] text-[#909090] text-[20px] ml-[17px]" />
              </div>
            </div>
            <img src={imagePath(article.imageUrl)} alt="" className="w-full h-[530px] mt-[30px] object-cover" />
            <div className='pt-[20px] pb-[50px]'>
              <Paragraph dangerouslySetInnerHTML={createMarkup(article.description)} />
            </div>
            {article.blocks.map((b) => {
              return (
                <div key={b.id} className="flex flex-col items-center mb-[50px] w-full">
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
            <span onClick={() => isAuth ? setSavePostOpen(true) : setIsShown('signin')} className="icon-fi-rs-bookmark text-[#555555] text-[23.5px] w-[50px] h-[50px] rounded-full bg-[#F7F7F7] flex justify-center items-center cursor-pointer ml-[20px]" />
            <div ref={ref} className='relative ml-[14px] flex justify-center'>
              <span onClick={() => toggleMenu()} className="icon-fi-rs-more-ver rotate-90 text-[#555555] text-[23.5px] w-[50px] h-[50px] rounded-full bg-[#F7F7F7] flex justify-center items-center cursor-pointer" />
              <DropDown
                arrow={'centerBottom'}
                className="absolute border border-[#D4D8D8] drop-shadow-[0_2px_2px_rgba(0,0,0,0.06)] bottom-[57px] w-[166px]"
                open={isMenuOpen}
                onToggle={toggleMenu}
                content={
                  <div className="flex flex-col gap-[15px] h-full justify-between p-[18px]">
                    <div className="flex flex-row items-center cursor-pointer">
                      <span className="text-[#555555] text-[20px] mr-[8px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-editor-o" />
                      <p className="text-[#555555] text-[15px] leading-[18px]">Засах</p>
                    </div>
                    <div className="flex flex-row items-center cursor-pointer">
                      <span className="text-[#555555] text-[20px] mr-[8px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-delete" />
                      <p className="text-[#555555] text-[15px] leading-[18px]">Устгах</p>
                    </div>
                    {/* <div onClick={() => setSharePostOpen(true)} className="flex flex-row items-center cursor-pointer">
                      <span className="text-[#555555] text-[18px] mr-[8px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-share" />
                      <p className="text-[#555555] text-[15px] leading-[18px]">Хуваалцах</p>
                    </div> */}
                    <div className="flex flex-row items-center cursor-pointer">
                      <span className="text-[#555555] text-[18px] mr-[8px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-flag" />
                      <p className="text-[#555555] text-[15px] leading-[18px]">Репорт</p>
                    </div>
                  </div>
                }
              />
            </div>
          </div>
          <div className="flex flex-row mt-[38px] justify-between w-full border-t py-[17px] border-b border-[#EFEEEF] font-roboto">
            <div className="flex flex-row items-center">
              <Avatar
                src={imagePath(article.source.icon)}
                className="w-[36px] h-[36px]"
              />
              <MetaTag className="ml-[8px]">{article.source.name}</MetaTag>
              <MetaTag className="ml-0">&nbsp;• {`${article.author.firstName}`}</MetaTag>
              {/* <MetaTag className="text-[#909090]">{moment(article.createdAt).format('YYYY.MM.DD, hh:mm')}</MetaTag> */}
            </div>
            <button className="bg-caak-primary rounded-[4px] text-white font-bold text-[15px] w-[90px] h-[34px]">
              Дагах
            </button>
          </div>
          <div className="max-w-[760px] w-full flex flex-col items-center">
            <p className="text-[#111111] text-[18px] font-bold leading-[21px] mt-[50px]">
              ЭНЭ МЭДЭЭНД ӨГӨХ ТАНЫ СЭТГЭГДЭЛ?
            </p>
            <div className='flex flex-row items-center gap-[24px] mt-[14px]'>
              <span className='rounded-full border w-[60px] h-[60px] flex items-center justify-center'>
                <img className='w-[38px]' src={LoveIcon} alt=''/>
              </span>
              <span className='rounded-full border w-[60px] h-[60px] flex items-center justify-center'>
                <img className='w-[38px]' src={AngerIcon} alt=''/>
              </span>
              <span className='rounded-full border w-[60px] h-[60px] flex items-center justify-center'>
                <img className='w-[38px]' src={CryIcon} alt=''/>
              </span>
              <span className='rounded-full border w-[60px] h-[60px] flex items-center justify-center'>
                <img className='w-[38px]' src={HahaIcon} alt=''/>
              </span>
              <span className='rounded-full border w-[60px] h-[60px] flex items-center justify-center'>
                <img className='w-[38px]' src={WowIcon} alt=''/>
              </span>
            </div>
            <Comments articleId={article?.id} />
          </div>
        </div>
        <div className='w-[270px]'>
          <div className={`w-[250px] h-[392px] bg-orange-300 ${leftMenuSticky ? 'sticky top-[80px] fade-in-banner' : 'hidden'}`}></div>
        </div>
        <PostSaveModal post={article} setSavePostOpen={setSavePostOpen} savePostOpen={savePostOpen} image={imagePath(article.imageUrl)}/>
        <PostShareModal post={article} setSharePostOpen={setSharePostOpen} sharePostOpen={sharePostOpen} image={imagePath(article.imageUrl)}/>
        <SignInUpController isShown={isShown} setIsShown={setIsShown} />
      </div>
  );
};

export default Post;
