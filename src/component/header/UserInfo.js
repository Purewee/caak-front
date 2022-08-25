import React, { useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Popover, Badge, List, Button, Avatar, message } from 'antd';
import { useAuth } from '../../context/AuthContext';
import { FIcon } from '../icon';
import { Link, useNavigate } from 'react-router-dom';
import { imagePath } from '../../utility/Util';
import AvatarSvg from '../../assets/images/avatar.svg';
import { ME } from '../../pages/post/view/_gql';
import { sumBy } from 'lodash';

const REMOVE_SAVED = gql`
  mutation RemoveSavedArticle($id: ID, $articleId: ID!) {
    removeRecipeItem(input: { id: $id, articleId: $articleId }) {
      id
    }
  }
`;

export default function UserInfo() {
  const [hovered, setHovered] = useState(null);
  const { data, loading, refetch } = useQuery(ME);
  const { logout } = useAuth();
  const me = data?.me || {};
  const saved_articles = data?.me?.recipes.map((x) => x?.articles.nodes).flat() || [];
  const totalSaved = sumBy(data?.me?.recipes.map((x) => x.articlesCount));
  const [remove, { loading: removing }] = useMutation(REMOVE_SAVED);
  const navigate = useNavigate();

  if (loading) return <span>Loading ...</span>;

  const Settings = [
    {
      title: 'Профайл',
      icon: 'icon-fi-rs-user',
      link: `/profile/${data?.me?.id}`,
    },
    {
      title: 'Дашбоард',
      icon: 'icon-fi-rs-statistic',
      link: `/dashboard/${data?.me?.id}`,
    },
    {
      title: 'Тохиргоо',
      icon: 'icon-fi-rs-settings',
      link: `/settings/${data?.me?.id}`,
    },
  ];

  return (
    <div className="flex flex-row items-center text-[#555555]">
      <Button
        onClick={() => navigate('/add')}
        className="hidden md:block border-0"
        shape="circle"
        icon={<FIcon className="icon-fi-rs-edit" />}
      />
      <Popover
        // className="hidden md:block"
        placement="bottomRight"
        trigger="click"
        content={
          <div>
            <p className="condMedium text-[22px] leading-[25px] pb-[14px] border-b border-[#D4D8D8]">
              Хадгалсан мэдээнүүд
            </p>
            <div className="w-full max-w-[368px] pt-[6px]">
              {saved_articles.map((x, index) => {
                return (
                  <div
                    onMouseEnter={() => setHovered(x.id)}
                    onMouseLeave={() => setHovered(null)}
                    className="flex flex-row items-center w-full justify-between font-condensed hover:bg-[#EFEEEF] h-[64px]"
                  >
                    <Link key={index} className="flex flex-row" to={`/post/view/${x.id}`}>
                      <Avatar
                        className="min-w-[60px] max-w-[60px] h-[44px] object-cover"
                        src={imagePath(x.imageUrl)}
                        shape="square"
                      />
                      <p className="text-[#111111] w-full text-[15px] ml-[14px]">{x.title}</p>
                    </Link>
                    <Button
                      size="small"
                      className={`${hovered !== x.id ? 'flex sm:hidden' : 'flex'}`}
                      icon={<span className="icon-fi-rs-close text-caak-primary text-[13.5px] w-[13.5px]" />}
                      type="link"
                      onClick={() => {
                        remove({ variables: { articleId: x.id } }).then(() => {
                          refetch();
                          message.success('Амжилттай устгалаа');
                        });
                      }}
                      loading={removing}
                    />
                  </div>
                );
              })}
            </div>
            {totalSaved > 10 && (
              <Link
                state={'saved'}
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
              <FIcon className="icon-fi-rs-list-o" />
            </Badge>
          }
          className="border-0"
          shape="circle"
        />
      </Popover>
      {/* <Link className="sm:hidden" to="/notification">
        <Button
          icon={
            <Badge className="mt-[3px]" count={totalSaved} size="small" showZero={false} overflowCount={20}>
              <FIcon className="icon-fi-rs-list-o" />
            </Badge>
          }
          className="border-0"
          shape="circle"
        />
      </Link> */}
      <Popover
        placement="bottomRight"
        trigger="click"
        overlayInnerStyle={{ borderRadius: 4 }}
        content={
          <div className="w-full text-[#555555]">
            <div className="border-b w-full pb-[16px] flex flex-row items-center pl-[8px]">
              <Avatar
                className="mr-[12px] flex items-center justify-center"
                src={me.avatar ? imagePath(me.avatar) : AvatarSvg}
                size={38}
              />
              <div>
                <p className="font-condensed text-[18px] font-bold leading-[21px] text-[#111111]">
                  {data?.me?.firstName}
                </p>
                <p className="text-[14px] leading-[16px] mt-[3px]">Мэдээллээ засах</p>
              </div>
            </div>
            <div className="p-[16px] flex flex-col gap-[16px] border-b">
              {Settings.map((data, index) => {
                return (
                  <Link key={index} to={{ pathname: data.link }}>
                    <div className="flex flex-row items-center cursor-pointer">
                      <span className={`${data.icon} text-[20px]`} />
                      <p className="text-[15px] ml-[12px] -mt-[3px] leading-[18px]">{data.title}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="px-[18px] pt-[18px] pb-[8px] flex flex-col gap-[16px]">
              <div onClick={() => logout()} className="flex flex-row items-center cursor-pointer">
                <span className={`icon-fi-rs-exit text-[20px]`} />
                <p className="text-[15px] ml-[12px] leading-[18px]">Гарах</p>
              </div>
            </div>
          </div>
        }
      >
        <Avatar
          src={me.avatar ? imagePath(me.avatar) : AvatarSvg}
          className="ml-[16px] cursor-pointer flex justify-center items-center "
          shape="circle"
        />
      </Popover>
    </div>
  );
}
