import React, { useState, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Popover, Badge, Button, Avatar, message, Spin } from 'antd';
import { useAuth } from '../../context/AuthContext';
import { FIcon } from '../icon';
import { Link, useNavigate } from 'react-router-dom';
import { imagePath, isAdmin } from '../../utility/Util';
import { ME } from '../../pages/post/view/_gql';
import { sumBy } from 'lodash';
import ProfileModal from './ProfileModal';
import CategoriesModal from './CategoriesModal';
import useMediaQuery from '../navigation/useMediaQuery';

const REMOVE_SAVED = gql`
  mutation RemoveSavedArticle($id: ID, $articleId: ID!) {
    removeRecipeItem(input: { id: $id, articleId: $articleId }) {
      id
    }
  }
`;

export default function UserInfo({ transparent }) {
  const [hovered, setHovered] = useState();
  const [savedVisible, setSavedVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [step, setStep] = useState(0);
  const { data, loading, refetch } = useQuery(ME);
  const { logout } = useAuth();
  const me = data?.me || {};
  const saved_articles = me?.recipes?.map((x) => x?.articles.nodes).flat() || [];
  const totalSaved = sumBy(me?.recipes?.map((x) => x.articlesCount));
  const [remove, { loading: removing }] = useMutation(REMOVE_SAVED);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('screen and (max-width: 670px)');

  const toggleMenu = () => {
    setProfileVisible(!profileVisible);
  };

  const toggleSaving = () => {
    setSavedVisible(!savedVisible);
  };

  const hide = () => {
    setProfileVisible(false);
  };

  const hideSaved = () => {
    setSavedVisible(false);
  };

  useEffect(() => {
    if (!me.id) {
      setStep(0);
    } else if (!me.firstName) {
      setStep(1);
    } else if (me.follows?.length === 0) {
      setStep(2);
    } else {
      setStep(0);
    }
  }, [me]);

  if (loading) return <Spin className="text-caak-primary" />;
  const Settings = isAdmin(me)
    ? [
        { title: 'Профайл', icon: 'icon-fi-rs-user', link: `/profile/${me?.id}` },
        { title: 'Дашбоард', icon: 'icon-fi-rs-statistic', link: `/dashboard/${me?.id}` },
        { title: 'Тохиргоо', icon: 'icon-fi-rs-settings', link: `/settings/${me?.id}` },
      ]
    : [
        { title: 'Профайл', icon: 'icon-fi-rs-user', link: `/profile/${me?.id}` },
        { title: 'Тохиргоо', icon: 'icon-fi-rs-settings', link: `/settings/${me?.id}` },
      ];

  return (
    <div className="flex flex-row items-center">
      {isAdmin(me) && (
        <Button
          onClick={() => navigate('/add')}
          className={`hidden md:flex border-0`}
          shape="circle"
          icon={
            <FIcon
              className={`icon-fi-rs-edit ${transparent ? 'text-white' : 'text-[#555555]'} text-[22px] mx-0 p-0`}
            />
          }
          type="ghost"
        />
      )}
      <Popover
        placement="bottomRight"
        trigger="click"
        overlayClassName="padding_zero paddin"
        visible={savedVisible}
        onVisibleChange={toggleSaving}
        content={
          <div className="w-screen sm:w-[400px]">
            <h3 className="text-[22px] leading-[25px] border-b border-[#D4D8D8] condMedium mb-1 pb-[14px] px-[16px] pt-[18px]">
              Хадгалсан мэдээнүүд
            </h3>
            <div className="w-full pt-[6px] pb-[10px]">
              {saved_articles.map((x, index) => {
                if (index < 10) {
                  return (
                    <div
                      key={index}
                      onMouseEnter={() => setHovered(x.id)}
                      onMouseLeave={() => setHovered(null)}
                      className="flex flex-row items-center w-full justify-between px-[16px] hover:bg-[#EFEEEF] h-[64px]"
                    >
                      <Link onClick={hideSaved} className="flex flex-row" to={`/post/view/${x.id}`}>
                        <Avatar
                          className="min-w-[60px] max-w-[60px] h-[44px] object-cover"
                          src={imagePath(x.imageUrl)}
                          shape="square"
                        />
                        <p className="text-[#111111] w-full text-[15px] font-roboto ml-[14px] truncate-2">{x.title}</p>
                      </Link>
                      <Button
                        size="small"
                        className={`${hovered !== x.id ? 'flex sm:hidden' : 'flex'}`}
                        icon={<span className="icon-fi-rs-close text-caak-primary text-[13.5px] w-[13.5px]" />}
                        type="link"
                        onClick={() => {
                          remove({ variables: { articleId: x.id } }).then(() => {
                            refetch().then(() => message.success('Амжилттай устгалаа'));
                          });
                        }}
                        loading={removing}
                      />
                    </div>
                  );
                }
              })}
            </div>
            {totalSaved > 10 && (
              <Link
                state="saved"
                to={{ pathname: `/profile/${me.id}` }}
                className="w-full h-[47px] cursor-pointer flex justify-center items-center bg-[#F5F5F5]"
              >
                <p className="text-caak-primary font-medium text-[16px]">Бусад мэдээнүүд</p>
              </Link>
            )}
          </div>
        }
      >
        <Button
          icon={
            <Badge className="mt-[3px]" count={totalSaved} size="small" showZero={false} overflowCount={20}>
              <FIcon
                className={`icon-fi-rs-list-o text-[22px] ${
                  transparent ? (isMobile ? 'text-caak-black' : 'text-white') : 'text-[#555555]'
                }`}
              />
            </Badge>
          }
          className="border-0 sm:ml-[10px]"
          shape="circle"
          type="ghost"
        />
      </Popover>
      <Popover
        placement="bottomRight"
        trigger="click"
        overlayClassName="padding_zero"
        visible={profileVisible}
        onVisibleChange={toggleMenu}
        overlayInnerStyle={{ borderRadius: 4 }}
        content={
          <div className="text-[#555555] w-[220px] py-[18px]">
            <div className="border-b w-full pb-[16px] flex flex-row items-center pl-[18px]">
              {me.avatar ? (
                <Link onClick={hide} to={`/profile/${me.id}`}>
                  <Avatar className="mr-[12px] flex items-center justify-center" src={imagePath(me.avatar)} size={38} />
                </Link>
              ) : (
                <Link onClick={hide} to={`/profile/${me.id}`}>
                  <Avatar size={38} className="flex items-center bg-[#257CEE19] text-[#257CEE] text-[26px] font-medium">
                    {me?.firstName ? me?.firstName[0] : '?'}
                  </Avatar>
                </Link>
              )}
              <div className="flex flex-col ml-[15px]">
                <Link
                  className="font-condensed text-[18px] font-bold leading-[21px] text-[#111111]"
                  onClick={hide}
                  to={`/profile/${me.id}`}
                >
                  {me?.firstName || null}
                </Link>
                <Link onClick={hide} to={`/settings/${me.id}`} className="text-[14px] leading-[16px] mt-[3px]">
                  Мэдээллээ засах
                </Link>
              </div>
            </div>
            <div className="pl-[18px] flex flex-col border-b gap-y-[16px] py-[19px]">
              {Settings.map((item, index) => {
                return (
                  <Link onClick={hide} key={index} to={{ pathname: item.link }}>
                    <div className="flex flex-row items-center cursor-pointer">
                      <span className={`${item.icon} text-[20px]`} />
                      <p className="text-[15px] ml-[12px] -mt-[3px] leading-[18px]">{item.title}</p>
                    </div>
                  </Link>
                );
              })}
              {me?.role === 'admin' && (
                <Link onClick={hide} className="sm:hidden" to={'/add'}>
                  <div className="flex flex-row items-center cursor-pointer">
                    <span className={`icon-fi-rs-edit text-[20px]`} />
                    <p className="text-[15px] ml-[12px] -mt-[3px] leading-[18px]">Пост нэмэх</p>
                  </div>
                </Link>
              )}
            </div>
            <div
              onClick={() => {
                logout();
                setProfileVisible(false);
              }}
              className="flex flex-row items-center cursor-pointer mt-[18px] ml-[18px]"
            >
              <span className={`icon-fi-rs-exit text-[20px]`} />
              <p className="text-[15px] ml-[12px] leading-[18px]">Гарах</p>
            </div>
          </div>
        }
      >
        {me.avatar ? (
          <div>
            <Avatar
              src={imagePath(me.avatar)}
              size={34}
              className="ml-[20px] cursor-pointer flex justify-center items-center "
              shape="circle"
            />
          </div>
        ) : (
          <div>
            <Avatar
              size={34}
              className="ml-[20px] flex items-center bg-[#257CEE19] text-[#257CEE] text-[20px] cursor-pointer font-medium"
            >
              {me?.firstName ? me?.firstName[0] : '?'}
            </Avatar>
          </div>
        )}
      </Popover>
      {step === 1 && <ProfileModal login={me?.login} />}
      {step === 2 && <CategoriesModal refetch={refetch} />}
    </div>
  );
}
