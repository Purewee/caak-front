import React, { useState, useEffect, useContext, useRef, useMemo } from 'react';
import { AppContext } from '../../../App';
import { gql, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { useMutation } from '@apollo/client';
import Loader from '../../../component/loader';
import { imagePath, isModerator, kFormatter } from '../../../utility/Util';
import { Wrapper, Title, HashTag, MetaTag } from './wrapper';
import Comments from './comments';
import { ARTICLE, ME, REACTIONS } from './_gql';
import PostSaveModal from '../../../component/modal/PostSaveModal';
import PostShareModal from '../../../component/modal/PostShareModal';
import { Avatar, Popover, notification, Button, Alert, Skeleton, Popconfirm, message } from 'antd';
import { useAuth } from '../../../context/AuthContext';
import { useHeader } from '../../../context/HeaderContext';
import { Link } from 'react-router-dom';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import Reaction from './reaction';
import ReportModal from '../../../component/modal/ReportModal';
import { FIcon } from '../../../component/icon';
import { orderBy, sum } from 'lodash';
import ArticlesList from '../../home/articles_list';
import Banner from '../../../component/banner';
import Configure from '../../../component/configure';
import NotFound from '../../404';
import PostMeta from './meta';
import PostBlock from './block';
import useMediaQuery from '../../../component/navigation/useMediaQuery';

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

const REMOVE = gql`
  mutation RemoveArticle($id: ID!) {
    destroyArticle(input: { id: $id })
  }
`;

const Post = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const { id, slug } = useParams();
  const [leftMenuSticky, setLeftMenuSticky] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [isBannerShown, setIsBannerShown] = useState(true);
  const [filter, setFilter] = useState([]);
  const [sort, setSort] = useState({});
  const { data, loading } = useQuery(ARTICLE, { variables: { id, slug }, fetchPolicy: 'network-only' });
  const { data: me } = useQuery(ME);
  const article = useMemo(() => data?.article || {}, [data?.article]);
  const numbering = article?.data?.numbering || false;
  const numerableBlocksCount = article?.blocks?.filter((x) => !!x.title).length;
  let currentIdx = numbering === 'desc' ? numerableBlocksCount : 1;
  const commentsRef = useRef(null);
  const reactionRef = useRef(null);
  const { data: data_source, loading: fetching } = useQuery(SOURCE, {
    variables: { id: article?.source?.id },
    skip: !!!article?.source?.id,
  });
  const source = data_source?.source || {};
  const [follow, { loading: follow_saving }] = useMutation(FOLLOW, { variables: { id: article?.source?.id } });
  const [remove] = useMutation(REMOVE, { variables: { id: article?.id } });
  const { isAuth, openModal } = useAuth();
  const { setMode } = useHeader();
  const {
    data: data_reactions,
    loading: reactions_loading,
    refetch,
  } = useQuery(REACTIONS, { variables: { articleId: article?.id }, skip: article?.kind !== 'post' });

  const isMobile = useMediaQuery(400);

  const reactions = data_reactions?.article?.reactionsSummary || {};
  const reactionsCount = sum(Object.values(reactions)) || 0;
  const title = article?.title;
  const metaDescription = article?.description;
  if (article?.kind === 'linked') window.location = article.data?.link;

  useEffect(() => {
    context.setStore('default');
    setMode('sticky');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    context.setShown(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (article?.id) {
      window.scrollTo(0, 0);
      setFilter([
        {
          more_like_this: {
            fields: ['tags_text', 'categories_text'],
            like: { _index: 'caak', _type: 'article', _id: article?.id },
            min_term_freq: 1,
            min_doc_freq: 1,
          },
        },
      ]);
      setSort({ _score: 'desc', publish_date: 'desc' });
    }
  }, [article]);

  useEffect(() => {
    const isMarketing = article.categories?.nodes?.includes((item) => {
      if (item.slug === 'marketing') {
        return true;
      }
      return false;
    });
    console.log(isMarketing);
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center p-[200px]">
        <Loader className={`bg-caak-primary self-center`} />
      </div>
    );
  }

  if (!loading && !article.id) {
    return <NotFound />;
  }
  if (!isModerator(me?.me) && article?.status === 'draft') {
    return <NotFound />;
  }

  if (fetching) return <Skeleton />;

  return (
    <div className="pb-[100px] flex flex-col items-center xl:pt-[41px]">
      <Banner position="a1" />
      <div className="flex flex-row pb-[50px] justify-center w-full px-[16px] lg:px-0">
        <PostMeta title={title} description={metaDescription} image={article.image} />
        <div className="w-full hidden xl:block max-w-[200px]">
          <div
            className={`hidden md:flex ${
              leftMenuSticky ? 'sticky top-[180px]' : 'mt-[380px]'
            } w-full flex-col items-end`}
          >
            <div className="flex flex-col items-center w-[60px] h-[226px]">
              <p className="text-[#555555] text-[15px] leading-[18px] font-bold">{reactionsCount}</p>
              {reporting || (
                <Popover
                  placement="top"
                  trigger="hover"
                  overlayStyle={{ borderRadius: 8 }}
                  overlayClassName="padding_zero"
                  content={
                    <Reaction
                      left
                      articleId={article?.id}
                      reactions={reactions}
                      refetch={refetch}
                      fetching={reactions_loading}
                    />
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
                    <div className="flex flex-col gap-[15px] h-full justify-between">
                      {article?.editable && (
                        <Link to={`/edit/${article.kind}/${article.id}`}>
                          <div className="flex flex-row items-center cursor-pointer">
                            <span className="text-[#555555] text-[20px] mr-[8px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-editor-o" />
                            <p className="text-[#555555] text-[15px] leading-[18px]">Засах</p>
                          </div>
                        </Link>
                      )}
                      {article?.editable && (
                        <Popconfirm
                          title="Энэ мэдээг үнэхээр устгах уу?"
                          onConfirm={() => {
                            remove().then(() => {
                              message.success('Мэдээ устгагдлаа.').then(() => {
                                navigate('/');
                              });
                            });
                          }}
                        >
                          <div className="flex flex-row items-center cursor-pointer">
                            <span className="text-[#555555] text-[20px] mr-[8px] w-[22px] h-[22px] flex items-center justify-center icon-fi-rs-delete" />
                            <p className="text-[#555555] text-[15px] leading-[18px]">Устгах</p>
                          </div>
                        </Popconfirm>
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
        <div className="flex flex-col max-w-[960px] w-full items-center">
          <div className="pt-0 md:pt-[40px] flex flex-col items-center max-w-[760px] w-full font-roboto md:mx-[100px]">
            {article?.status === 'draft' && (
              <Alert
                type="warning"
                description="Энэ мэдээ ноорог болсон байна!"
                showIcon={true}
                action={
                  <Link to={`/edit/post/${article.id}`}>
                    <Button size="small">Мэдээг засах</Button>
                  </Link>
                }
              />
            )}
            <div className="flex flex-row gap-[15px] mt-[20px]" key="tags">
              {article.categories?.nodes?.map((x) => (
                <Link key={x.id} to={`/category/${x.slug}`}>
                  <HashTag className="text-center leading-[15px] uppercase">{x.name}</HashTag>
                </Link>
              ))}
            </div>
            <Title className="text-center mt-[8px]" key="title">
              {article.title}
            </Title>
            <div className="flex flex-row justify-between items-center w-full h-[34px] mt-[21px]" key="meta">
              <div className="flex flex-row items-center h-[32px]" key="author">
                {/* <Avatar className="w-[32px] h-[32px] rounded-full" src={imagePath(article.source?.icon)} /> */}
                {article?.author?.avatar ? (
                  <Link to={`/profile/${article.author?.id}`}>
                    <Avatar className="w-[32px] h-[32px]" src={imagePath(article.author?.avatar)} />
                  </Link>
                ) : (
                  article?.author?.firstName && (
                    <Link to={`/profile/${article.author?.id}`}>
                      <Avatar className="w-[32px] h-[32px] flex items-center justify-center font-medium bg-[#257CEE19] text-[#257CEE]">
                        {(article?.author?.firstName || article?.author?.firstName)[0] || null}
                      </Avatar>
                    </Link>
                  )
                )}
                <div className="ml-[8px] h-full flex flex-col justify-between">
                  <Link to={`/profile/${article.author?.id}`} className="flex flex-row items-center">
                    <p className="text-caak-black text-[14px] leading-[16px]">{article?.author?.firstName}</p>
                  </Link>
                  <div className="text-[12px] text-[#909090] flex flex-row items-center leading-[14px]">
                    <p>{moment(article.publishDate).format('YYYY.MM.DD, HH:mm')}</p>
                    <Button
                      type="link"
                      size="small"
                      style={{ padding: 0 }}
                      icon={<span className="icon-fi-rs-eye-o text-[18px] mr-[4px]" />}
                      className="hidden sm:flex flex-row items-center ml-[12px] text-[#555555] text-[14px]"
                    >
                      {(article?.viewsCount).toLocaleString()}
                    </Button>
                    <Button
                      icon={<span className="icon-fi-rs-comment-o text-[18px] mr-[4px]" />}
                      className="hidden sm:flex flex-row items-center ml-[12px] text-[#555555] text-[14px]"
                      style={{ padding: 0 }}
                      size="small"
                      type="link"
                      onClick={() => commentsRef.current.scrollIntoView()}
                    >
                      {kFormatter(article?.commentsCount) || 0}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center h-[24px]" key="shares">
                <FacebookShareButton
                  className="h-[24px]"
                  url={`${Configure.domain}/post/view/${article?.id}`}
                  key="facebook"
                >
                  <FIcon className="text-[#909090] hover:text-[#1877F2] text-[24px] w-[24px] h-[24px] icon-fi-rs-fb" />
                </FacebookShareButton>
                <TwitterShareButton
                  className="h-[24px]"
                  url={`${Configure.domain}/post/view/${article?.id}`}
                  title={article?.title}
                  key="twitter"
                >
                  <FIcon className="text-[#909090] hover:text-[#1877F2] text-[24px] w-[24px] h-[24px] icon-fi-rs-tw ml-[15px] sm:ml-[20px]" />
                </TwitterShareButton>
                <span
                  onClick={() => setSaving(true)}
                  className="icon-fi-rs-bookmark cursor-pointer w-[24px] h-[24px] flex justify-center items-center rounded-[2px] text-[#909090] text-[20px] ml-[13px] sm:ml-[20px]"
                  key="save"
                />
              </div>
            </div>
            <Wrapper>
              <img src={imagePath(article.imageUrl)} alt="" className="w-full mt-[20px] sm:mt-[30px] object-cover" />
              <div className="flex sm:hidden flex-row items-center h-[18px] mt-[12px]">
                <div className="flex flex-row items-center text-[#555555] text-[14px]">
                  <span className="icon-fi-rs-eye-o text-[18px] mr-[4px]" />
                  <p>{(article?.viewsCount).toLocaleString()}</p>
                </div>
                <Button
                  icon={<span className="icon-fi-rs-comment-o text-[18px] mr-[4px]" />}
                  className="flex flex-row items-center text-[#555555] text-[14px]"
                  size="small"
                  type="link"
                  onClick={() => commentsRef.current.scrollIntoView()}
                >
                  {kFormatter(article?.commentsCount) || 0}
                </Button>
                <Button
                  icon={<span className="icon-fi-rs-heart text-[18px] mr-[4px]" />}
                  className="flex flex-row items-center text-[#555555] text-[14px]"
                  size="small"
                  type="link"
                  onClick={() => reactionRef.current.scrollIntoView()}
                >
                  {kFormatter(reactionsCount)}
                </Button>
              </div>
              {article.description && (
                <PostBlock b={{ kind: 'text', id: '00', content: article.description }} idx={false} />
              )}
              {isBannerShown && <Banner position="a3" />}
              {orderBy(article?.blocks, ['position'], 'asc').map((b, idx) => (
                <div className="mt-6 lg:mt-10" key={b.id}>
                  {numbering === 'asc' && <PostBlock b={b} idx={!!b.title && currentIdx++} />}
                  {numbering === 'desc' && <PostBlock b={b} idx={!!b.title && currentIdx--} />}
                  {numbering === false && <PostBlock b={b} idx={false} />}
                </div>
              ))}
            </Wrapper>
            <div className="flex flex-row flex-wrap gap-[8px] w-full mt-[20px]">
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
              <div
                onClick={() => setSharing(true)}
                className="bg-[#1877F2] cursor-pointer text-white font-condensed text-[15px] flex flex-row items-center justify-center rounded-[4px] h-[34px] w-[124px]"
              >
                <span className="icon-fi-rs-share text-[16.8px] mr-[6px]" />
                ХУВААЛЦАХ
              </div>
              <span
                onClick={() => setSaving(true)}
                className="icon-fi-rs-bookmark text-[#555555] text-[23.5px] w-[50px] h-[50px] rounded-full bg-[#F7F7F7] flex justify-center items-center cursor-pointer ml-[20px]"
              />
            </div>
            <div className="flex flex-row mt-[19px] md:mt-[38px] justify-between w-full md:border-t py-[17px] border-b border-[#EFEEEF]">
              <div className="flex flex-row items-center text-[#555555] h-[36px]">
                <Link to={`/channel/${article.source?.id}`} className="flex flex-row items-center">
                  <Avatar src={imagePath(article.source?.icon)} className="w-[36px] h-[36px]" />
                  <MetaTag className="text-[15px] ml-[8px] leading-[18px] font-medium sm:font-normal">
                    {article.source?.name}
                  </MetaTag>
                </Link>
                <Link className="leading-[21px]" to={`/profile/${article.author?.id}`}>
                  &nbsp;•&nbsp;
                  <MetaTag className="ml-0">{`${article.author?.firstName}`}</MetaTag>
                </Link>
              </div>
              <div
                onClick={() => setSharing(true)}
                className="bg-[#1877F2] sm:hidden text-white font-condensed text-[15px] flex flex-row items-center justify-center rounded-[4px] h-[34px] w-[124px]"
              >
                {!isMobile && <span className="icon-fi-rs-share text-[16.8px] mr-[6px]" />}
                ХУВААЛЦАХ
              </div>
              <div className="hidden sm:flex">
                {source.following ? (
                  <button
                    className="h-[34px] text-[15px] font-bold w-[90px] bg-caak-darkGray text-white rounded-[4px]"
                    onClick={() => {
                      if (isAuth) {
                        follow().then(() => {
                          refetch().then(console.log);
                        });
                        const args = {
                          message: `Та ${article?.source?.name}-г дагахаа болилоо.`,
                          duration: 4,
                          placement: 'bottom',
                          className: 'h-[50px] bg-[#FF0000] w-[300px]',
                        };
                        notification.open(args);
                      } else {
                        openModal('login');
                      }
                    }}
                  >
                    Дагасан
                  </button>
                ) : (
                  <Button
                    className="h-[34px] text-[15px] font-bold w-[90px]"
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
                        openModal('login');
                      }
                    }}
                  >
                    Дагах
                  </Button>
                )}
              </div>
            </div>
            <div ref={reactionRef}>
              {!reactions_loading && (
                <Reaction
                  articleId={article?.id}
                  reactions={reactions}
                  refetch={refetch}
                  fetching={reactions_loading}
                />
              )}
            </div>
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
        <div className="w-full hidden xl:block max-w-[200px]"></div>
        {saving && <PostSaveModal post={article} image={imagePath(article.imageUrl)} toggle={() => setSaving(false)} />}
        {sharing && (
          <PostShareModal post={article} toggle={() => setSharing(false)} image={imagePath(article.imageUrl)} />
        )}
        {reporting && <ReportModal post={article} toggle={() => setReporting(false)} />}
      </div>
      <div className="w-full max-w-[1310px]">
        <p className="font-bold mt-5 flex flex-row items-center text-[24px] border-b border-[#EFEEEF] pb-5 pl-4 lg:pl-0">
          ТӨСТЭЙ<span className="font-normal">&nbsp;МЭДЭЭНҮҮД</span>
        </p>
        <ArticlesList filter={filter} sort={sort} size={24} />
      </div>
    </div>
  );
};

export default Post;
