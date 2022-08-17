import React, { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from '../../../App';
import { gql, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { useMutation } from '@apollo/client';
import Loader from '../../../component/loader';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { imagePath, parseVideoURL } from '../../../utility/Util';
import { Wrapper, Title, BlockTitle, Paragraph, HashTag, MetaTag } from './wrapper';
import Comments from './comments';
import { ARTICLE, ME } from './_gql';
import LoveIcon from '../../../assets/images/fi-rs-react-love.png';
import HahaIcon from '../../../assets/images/fi-rs-react-haha.svg';
import PostSaveModal from '../../../component/modal/PostSaveModal';
import PostShareModal from '../../../component/modal/PostShareModal';
import { Avatar, Popover, notification, Button, Alert, Statistic, Skeleton } from 'antd';
import { HeartOutlined, BellOutlined } from '@ant-design/icons';
import { useAuth } from '../../../context/AuthContext';
import SignInUpController from '../../../component/modal/SignInUpController';
import { Link } from 'react-router-dom';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import Reaction from './reaction';
import ReportModal from '../../../component/modal/ReportModal';
import { Helmet } from 'react-helmet';
import * as love from '../../../assets/json/love-js.json';
import * as angry from '../../../assets/json/anry-js.json';
import * as cry from '../../../assets/json/cry-js.json';
import * as haha from '../../../assets/json/haha-js.json';
import * as wow from '../../../assets/json/wow-js.json';
import Lottie from 'react-lottie';
import { FIcon } from '../../../component/icon';
import { orderBy } from 'lodash';
import ArticlesList from '../../home/articles_list';
import Banner from '../../../component/banner';

const ACTIONS = [{ icon: love }, { icon: haha }, { icon: wow }, { icon: cry }, { icon: angry }];

const SOURCE = gql`
  query GetSource($id: ID!) {
    source(id: $id) {
      id
      name
      domain
      icon
      slug
      followersCount
      following
      followers(first: 10) {
        nodes {
          user {
            id
            firstName
            lastName
            avatar
          }
        }
      }
    }
  }
`;

const FOLLOW = gql`
  mutation Follow($id: ID!) {
    toggleFollow(input: { targetType: "source", targetId: $id })
  }
`;

const Post = () => {
  const context = useContext(AppContext);
  const { id } = useParams();
  const [isStopped, setIsStopped] = useState(true);
  const [isPaused, setIsPaused] = useState(true);
  const [leftMenuSticky, setLeftMenuSticky] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [filter, setFilter] = useState([]);
  const [sort, setSort] = useState({});
  const { data, loading } = useQuery(ARTICLE, { variables: { id } });
  const { data: me, loading: me_loading } = useQuery(ME);
  const article = data?.article || {};
  const numbering = article?.data?.numbering || false;
  const commentsRef = useRef(null);
  const {
    data: data_source,
    loading: fetching,
    refetch,
  } = useQuery(SOURCE, { variables: { id: article?.source?.id }, skip: !!!article?.source?.id });
  const source = data_source?.source || {};
  const [follow, { loading: follow_saving }] = useMutation(FOLLOW, { variables: { id: article?.source?.id } });
  const { isAuth, openModal } = useAuth();

  const title = article?.title;
  const metaDescription = 'default description';
  if (article?.kind === 'linked') window.location = article.data?.link;

  function createMarkup(e) {
    return { __html: e };
  }

  useEffect(() => {
    context.setStore('default');
  }, []);

  useEffect(() => {
    context.setShown(true);
  }, []);

  useEffect(() => {
    const listener = () => {
      const scrolled = document.scrollingElement.scrollTop;
      if (scrolled > 260) {
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

  useEffect(() => {
    setFilter([]);
    setSort({ publish_date: 'desc' });
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center p-[200px]">
        <Loader className={`bg-caak-primary self-center`} />
      </div>
    );
  }

  if (fetching) return <Skeleton />;

  return (
    <div className="pb-[100px]">
      <div className="flex flex-row pb-[100px] justify-center xl:pt-[41px]">
        <Helmet>
          <title>{title}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="description" key="description" content={metaDescription} />
          <meta name="title" key="title" content={title} />
          <meta property="og:title" key="og:title" content={title} />
          <meta property="og:locale" key="og:locale" content="en_US" />
          <meta charSet="utf-8" />
          <meta property="og:type" key="og:type" content="website" />
          <meta property="og:description" key="og:description" content={metaDescription} />
          <meta property="og:image" key="og:image" content={imagePath(article.image)} />
        </Helmet>
        <div className="w-full hidden xl:block max-w-[250px]">
          <div
            className={`hidden md:flex ${
              leftMenuSticky ? 'sticky top-[180px]' : 'mt-[380px]'
            } w-full flex-col items-end`}
          >
            <div className="flex flex-col items-center w-[60px] h-[226px]">
              <p className="text-[#555555] text-[15px] leading-[18px] font-bold">{article.data?.like_count}</p>
              {reporting || (
                <Popover
                  placement="top"
                  trigger="hover"
                  overlayStyle={{ width: 230, borderRadius: 8 }}
                  content={
                    <div className="flex flex-row gap-[8px] h-full justify-center py-[4px]">
                      {ACTIONS.map((data, index) => (
                        <Button key={index} shape="circle" type="link">
                          <Lottie
                            options={{
                              animationData: data?.icon,
                              loop: true,
                              autoplay: true,
                              rendererSettings: {
                                preserveAspectRatio: 'xMidYMid slice',
                              },
                            }}
                            height={38}
                            width={38}
                            isStopped={isStopped}
                            isPaused={isPaused}
                          />
                        </Button>
                      ))}
                    </div>
                  }
                >
                  <FIcon className="mt-[6px] icon-fi-rs-heart text-[26px] text-[#F53757] border border-[#D4D8D8] w-[60px] h-[60px] rounded-full" />
                </Popover>
              )}
              <span
                onClick={() => setSaving(true)}
                className="text-[#909090] cursor-pointer text-[24px] icon-fi-rs-bookmark mt-[22px]"
              />
              <span
                onClick={() => setSharing(true)}
                className="text-[#909090] cursor-pointer text-[24px] icon-fi-rs-share mt-[24.5px]"
              />
              {reporting || (
                <Popover
                  placement="bottom"
                  trigger="click"
                  className="leading-[16px] tracking-[0px]"
                  overlayStyle={{ width: 166 }}
                  overlayInnerStyle={{ borderRadius: 8 }}
                  content={
                    <div className="flex flex-col gap-[15px] h-full justify-between ">
                      {['admin', 'moderator'].includes(me?.me?.role) && (
                        <Link to={`/edit/${article.kind}/${article.id}`} target="_blank">
                          <div className="flex flex-row items-center cursor-pointer">
                            <span className="text-[#555555] text-[20px] mr-[8px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-editor-o" />
                            <p className="text-[#555555] text-[15px] leading-[18px]">Засах</p>
                          </div>
                        </Link>
                      )}
                      {['admin', 'moderator'].includes(me?.me?.role) && (
                        <div className="flex flex-row items-center cursor-pointer">
                          <span className="text-[#555555] text-[20px] mr-[8px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-delete" />
                          <p className="text-[#555555] text-[15px] leading-[18px]">Устгах</p>
                        </div>
                      )}
                      <div className="flex flex-row items-center cursor-pointer">
                        <span className="text-[#555555] text-[18px] mr-[8px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-flag" />
                        <button
                          onClick={() => {
                            setReporting(true);
                          }}
                          className="text-[#555555] text-[15px] leading-[18px]"
                        >
                          Репорт
                        </button>
                      </div>
                    </div>
                  }
                >
                  <span className="text-[#909090] cursor-pointer text-[22px] icon-fi-rs-more-ver mt-[21px] rotate-90" />
                </Popover>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Banner position="a1" />
          <div className="pt-0 md:pt-[40px] flex flex-col items-center max-w-[760px] w-full font-roboto md:mx-[100px] px-[16px] md:px-0">
            <img
              src={imagePath(article.imageUrl)}
              alt=""
              className="w-full h-[210px] flex md:hidden mt-[20px] object-cover"
            />
            <div className="flex flex-row gap-[15px]">
              {article.categories?.nodes?.map((x) => (
                <Link key={x.id} to={`/category/${x.slug}`}>
                  <HashTag className="text-center hidden md:block">{x.name}</HashTag>
                </Link>
              ))}
            </div>
            <Wrapper>
              <Title className="text-center">{article.title}</Title>
              <div className="hidden sm:flex flex-row items-center mt-[30px]">
                <img className="w-[20px]" src={LoveIcon} alt="" />
                <img className="w-[20px]" src={HahaIcon} alt="" />
                <p className="ml-[6px] text-[15px] text-caak-primary leading-[16px]">{article.data?.like_count}</p>
              </div>
              <div className="flex flex-row justify-between w-full h-[32px] mt-[21px]">
                <div className="flex flex-row items-center h-[32px]">
                  <Avatar className="w-[32px] h-[32px] rounded-full" src={imagePath(article.source?.icon)} />
                  <div className="ml-[8px] h-full flex flex-col justify-between">
                    <Link to={`/channel/${article.source?.id}`} className="flex flex-row items-center">
                      <p className="text-caak-black text-[14px] leading-[16px]">{article?.source?.name}</p>
                    </Link>
                    <div className="text-[12px] text-[#909090] flex flex-row items-center leading-[14px]">
                      <p>{moment(article.createdAt).format('YYYY.MM.DD, hh:mm')}</p>
                      <Button
                        type="link"
                        size="small"
                        icon={<span className="icon-fi-rs-eye text-[18px] mr-[4px]" />}
                        className="flex flex-row items-center text-[#555555] text-[14px]"
                      >
                        {article?.viewsCount}
                      </Button>
                      <Button
                        icon={<span className="icon-fi-rs-comment-o text-[18px] mr-[4px]" />}
                        className="flex flex-row items-center text-[#555555] text-[14px]"
                        size="small"
                        type="link"
                        onClick={() => commentsRef.current.scrollIntoView()}
                      >
                        {article?.commentsCount || 0}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex sm:hidden flex-row items-center">
                  <img className="w-[20px]" src={LoveIcon} alt="" />
                  <img className="w-[20px]" src={HahaIcon} alt="" />
                  <p className="ml-[6px] text-[15px] text-caak-primary leading-[16px]">
                    {article.data?.like_count || 0}
                  </p>
                </div>
                <div className="hidden md:flex flex-row items-center">
                  <FacebookShareButton className="h-[20px]" url={`http://front.caak.mn/post/view/${article.id}`}>
                    <FIcon className="text-[#909090] hover:text-[#1877F2] text-[22px] w-[24px] h-[24px] icon-fi-rs-fb" />
                  </FacebookShareButton>
                  <TwitterShareButton
                    className="h-[20px] ml-[24px]"
                    url={`http://front.caak.mn/post/view/${article.id}`}
                  >
                    <FIcon className="text-[#909090] hover:text-[#1877F2] text-[22px] w-[24px] h-[24px] icon-fi-rs-tw" />
                  </TwitterShareButton>
                  <span
                    onClick={() => setSaving(true)}
                    className="icon-fi-rs-bookmark cursor-pointer hover:text-[#111111] w-[32px] h-[32px] flex justify-center items-center rounded-[2px] hover:bg-[#EFEEEF] border border-[#EFEEEF] text-[#909090] text-[20px] ml-[17px]"
                  />
                </div>
              </div>
              <img src={imagePath(article.imageUrl)} alt="" className="w-full hidden md:flex mt-[30px] object-cover" />
              <div className="pb-[26px] md:pb-[50px]">
                <Paragraph dangerouslySetInnerHTML={createMarkup(article.description)} />
              </div>
              {orderBy(article?.blocks, ['position'], [numbering || 'asc']).map((b) => {
                return (
                  <div key={b.position}>
                    {b.kind === 'image' && (
                      <div key={b.id} className="flex flex-col md:items-center mb-[26px] md:mb-[50px] w-full">
                        {b.title && <BlockTitle>{`${numbering ? `${b.position}. ` : ''}${b.title}`}</BlockTitle>}
                        <LazyLoadImage src={imagePath(b.imageUrl)} alt={b.title} className="w-full object-cover" />
                        {b.data?.meta?.length > 0 && (
                          <span className="w-[99%] bg-[#697581] text-white p-[8px] text-center font-condensed text-[12px] italic">
                            {b.data.meta}
                          </span>
                        )}
                        {b.content && <Paragraph dangerouslySetInnerHTML={createMarkup(b.content)} />}
                      </div>
                    )}
                    {b.kind === 'text' && (
                      <div key={b.id} className="flex flex-col md:items-center mb-[26px] md:mb-[50px] w-full">
                        <Paragraph className="mt-[16px] md:mt-0" dangerouslySetInnerHTML={createMarkup(b.content)} />
                      </div>
                    )}
                    {b.kind === 'video' && (
                      <div key={b.id} className="flex flex-col md:items-center mb-[26px] md:mb-[50px] w-full">
                        {b.title && <BlockTitle>{`${numbering ? `${b.position}. ` : ''}${b.title}`}</BlockTitle>}
                        <iframe
                          width="100%"
                          height="420px"
                          className="object-cover"
                          src={`https://www.youtube.com/embed/${parseVideoURL(b.data.url).id}`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        <Paragraph className="mt-[16px] md:mt-0" dangerouslySetInnerHTML={createMarkup(b.content)} />
                      </div>
                    )}
                  </div>
                );
              })}
            </Wrapper>
            <div className="flex flex-row gap-[8px] w-full mt-[29px] md:mt-[82px]">
              {article.tags?.map((x) => (
                <Link to={`/tags/${x.slug}`} key={x.slug}>
                  <p
                    key={x.id}
                    className="border border-[#D4D8D8] hover:border-caak-primary hover:text-caak-primary rounded-[3px] h-[30px] flex items-center text-[14px] leading-[16px] px-[12px]"
                  >
                    #{x.name}
                  </p>
                </Link>
              ))}
            </div>
            <div className="hidden md:flex flex-row  w-full justify-end items-center">
              <FacebookShareButton url={`http://front.caak.mn/post/view/${article.id}`}>
                <div className="bg-[#1877F2] text-white font-roboto text-[15px] flex flex-row items-center justify-center rounded-[4px] h-[34px] pl-[11.6px] pr-[10px]">
                  <span className="icon-fi-rs-fb text-[16.8px] mr-[7.4px]" />
                  ХУВААЛЦАХ
                </div>
              </FacebookShareButton>
              <TwitterShareButton url={`http://front.caak.mn/post/view/${article.id}`}>
                <div className="bg-[#1D9BF1] ml-[10px] text-white font-roboto text-[15px] flex flex-row items-center justify-center rounded-[4px] h-[34px] pl-[11.6px] pr-[10px]">
                  <span className="icon-fi-rs-tw text-[16.5px] mr-[7.7px]" />
                  ЖИРГЭХ
                </div>
              </TwitterShareButton>
              <span
                onClick={() => setSaving(true)}
                className="icon-fi-rs-bookmark text-[#555555] text-[23.5px] w-[50px] h-[50px] rounded-full bg-[#F7F7F7] flex justify-center items-center cursor-pointer ml-[20px]"
              />
              <Popover
                placement="bottom"
                trigger="click"
                className="font-bold text-[14px] leading-[16px] tracking-[0px] ml-[14px]"
                overlayStyle={{ width: 166 }}
                overlayInnerStyle={{ borderRadius: 8 }}
                content={
                  <div className="flex flex-col gap-[15px] h-full justify-between">
                    {me?.me?.id === article.author?.id && (
                      <Link to={`/add/${article.kind}/${article.id}`} target="_blank">
                        <div className="flex flex-row items-center cursor-pointer">
                          <span className="text-[#555555] text-[20px] mr-[8px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-editor-o" />
                          <p className="text-[#555555] text-[15px] leading-[18px]">Засах</p>
                        </div>
                      </Link>
                    )}
                    {me?.me?.id === article.author?.id && (
                      <div className="flex flex-row items-center cursor-pointer">
                        <span className="text-[#555555] text-[20px] mr-[8px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-delete" />
                        <p className="text-[#555555] text-[15px] leading-[18px]">Устгах</p>
                      </div>
                    )}
                    <div onClick={() => setReporting(true)} className="flex flex-row items-center cursor-pointer">
                      <span className="text-[#555555] text-[18px] mr-[8px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-flag" />
                      <p className="text-[#555555] text-[15px] leading-[18px]">Репорт</p>
                    </div>
                  </div>
                }
              >
                <span className="icon-fi-rs-more-ver rotate-90 text-[#555555] text-[23.5px] w-[50px] h-[50px] rounded-full bg-[#F7F7F7] flex justify-center items-center cursor-pointer" />
              </Popover>
            </div>
            <div className="flex flex-row mt-[19px] md:mt-[38px] justify-between w-full md:border-t py-[17px] border-b border-[#EFEEEF]">
              <div className="flex flex-row items-center text-[#555555]">
                <Link to={`/channel/${article.source?.id}`} className="flex flex-row items-center">
                  <Avatar src={imagePath(article.source?.icon)} className="w-[36px] h-[36px]" />
                  <MetaTag className="ml-[8px] text-[15px]">{article.source?.name}</MetaTag>
                </Link>
                &nbsp;•&nbsp;
                <Link className=" leading-[16px]" to={`/profile/${article.author?.id}`}>
                  <MetaTag className="ml-0">{`${article.author?.firstName}`}</MetaTag>
                </Link>
                {/* <MetaTag className="text-[#909090]">{moment(article.createdAt).format('YYYY.MM.DD, hh:mm')}</MetaTag> */}
              </div>
              {source.following ? (
                <Button
                  className="h-[34px] text-[15px] font-bold px-[24px]"
                  type="primary"
                  loading={follow_saving}
                  onClick={() => {
                    if (isAuth) {
                      follow().then(() => {
                        refetch().then(console.log);
                      });
                      const args = {
                        message: `Та ${article?.source?.name}-г дагахаа болилоо.`,
                        duration: 4,
                        placement: 'bottom',
                        className: 'h-[50px] bg-[#12805C] w-[300px]',
                      };
                      notification.open(args);
                    } else {
                      openModal('open');
                    }
                  }}
                >
                  ДАГАСАН
                </Button>
              ) : (
                <Button
                  className="h-[34px] text-[15px] font-bold px-[24px]"
                  type="primary"
                  loading={follow_saving}
                  onClick={() => {
                    if (isAuth) {
                      follow().then(() => {
                        refetch().then(console.log);
                      });
                      const followNotify = {
                        message: `Та ${article?.source?.name} сувгийг дагалаа.`,
                        duration: 4,
                        placement: 'bottom',
                        className: 'h-[50px] bg-[#12805C] w-[300px]',
                        icon: (
                          <FIcon className="icon-fi-rs-check w-[20px] h-[20px] text-[13px] bg-white rounded-full text-[#12805C]" />
                        ),
                      };
                      notification.open(followNotify);
                    } else {
                      openModal('open');
                    }
                  }}
                >
                  ДАГАХ
                </Button>
              )}
            </div>
            <Reaction articleId={article?.id} />
            {article?.acceptComment === true ? (
              <Comments articleId={article?.id} refProp={commentsRef} />
            ) : (
              <Alert
                type="warning"
                message="Уучлаарай, энэ мэдээнд сэтгэгдэл бичих боломжгүй байна!"
                showIcon
                banner
                className="mt-[40px] py-[24px]"
                ref={commentsRef}
              />
            )}
          </div>
        </div>
        <div className="w-[270px] hidden xl:block">
          <div
            className={`w-[250px] h-[392px] bg-orange-300 ${
              leftMenuSticky ? 'sticky top-[80px] fade-in-banner' : 'hidden'
            }`}
          ></div>
        </div>
        {saving && <PostSaveModal post={article} image={imagePath(article.imageUrl)} toggle={() => setSaving(false)} />}
        {sharing && (
          <PostShareModal post={article} toggle={() => setSharing(false)} image={imagePath(article.imageUrl)} />
        )}
        <SignInUpController isShown={isShown} setIsShown={setIsShown} />
        {reporting && <ReportModal post={article} toggle={() => setReporting(false)} />}
      </div>
      <div className="w-full flex flex-col items-center">
        <span className="font-bold inline-flex text-[24px] max-w-[1310px] px-[40px] border-b border-[#EFEEEF] pb-[20px] w-full">
          ТӨСТЭЙ<p className="font-normal">&nbsp;МЭДЭЭНҮҮД</p>
        </span>
        <ArticlesList filter={filter} sort={sort} size={24} />
      </div>
    </div>
  );
};

export default Post;
