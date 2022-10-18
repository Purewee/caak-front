import React, { useState } from 'react';
import { notification, Modal, message, Button } from 'antd';
import { gql, useMutation, useQuery } from '@apollo/client';
import { MetaTag } from '../../pages/post/view/wrapper';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FIcon } from '../icon';
import { ME } from '../../pages/post/view/_gql';

const SAVE_POST = gql`
  mutation SavePost($articleId: ID!) {
    addToRecipe(input: { articleId: $articleId }) {
      id
      articlesCount
      articles {
        nodes {
          id
          title
          imageUrl
        }
      }
    }
  }
`;
export default function PostSaveModal({ post, toggle, image }) {
  const [save, { loading }] = useMutation(SAVE_POST, { variables: { articleId: post.id } });
  const { isAuth, openModal } = useAuth();
  const navigate = useNavigate();
  const { data: me } = useQuery(ME);

  const openNotification = () => {
    const args = {
      message: (
        <div className="flex flex-row items-center">
          Амжилттай хадгалагдлаа.
          <div className="inline-flex">
            <p
              className="font-medium text-[15px] flex items-center justify-center font-roboto border h-[30px] w-[64px] rounded-[4px] ml-[6px] sm:ml-[49px] border-white cursor-pointer"
              onClick={() => navigate(`/profile/${me?.me.id}`, { state: 'saved' })}
            >
              ҮЗЭХ
            </p>
          </div>
        </div>
      ),
      duration: 20,
      icon: (
        <FIcon className="icon-fi-rs-check text-[14px] mt-[5px] bg-white text-[#12805C] rounded-full w-[20px] h-[20px]" />
      ),
      closeIcon: <FIcon className="icon-fi-rs-close text-[14px] mt-[3px] text-white w-[14px] h-[14px]" />,
      placement: 'bottom',
      className: 'md:h-[50px] bg-[#12805C] sm:w-[470px] flex flex-row items-center',
    };
    notification.open(args);
  };

  return (
    <Modal
      visible
      width={480}
      title={<span className="text-[26px] font-condensed font-bold leading-[30px]">Мэдээ хадгалах</span>}
      bodyStyle={{ padding: 0 }}
      afterClose={toggle}
      footer={false}
      closeIcon={<span onClick={toggle} className="icon-fi-rs-close text-[18px] text-[#909090]" />}
      confirmLoading={loading}
    >
      <div>
        <div className="bg-[#FBFAFB] h-[132px] px-[24px] py-[16px] flex flex-row">
          <img alt={post.title} className="min-w-[100px] max-w-[100px] h-[100px] object-cover truncate-3" src={image} />
          <div className="ml-[16px]">
            <p className="font-merri text-[16px] leading-[22px] h-[64px] text-caak-black truncate-3">{post.title}</p>
            <div className="text-[#555555] mt-[10px] flex flex-row items-center leading-[18px] text-[12px]">
              <MetaTag className="ml-0 font-roboto">{post.source?.name}</MetaTag>
              <MetaTag className="ml-[6px] font-roboto">• {post.author.firstName || post.author.name}</MetaTag>
            </div>
          </div>
        </div>
        <div className="border-t py-[18px] flex flex-row items-center justify-end pr-[24px]">
          <Button
            onClick={toggle}
            className="w-[76px] h-[34px] border border-[#D4D8D8] hover:border-[#D4D8D8] rounded-[4px] text-[15px] text-caak-black hover:text-caak-black font-medium font-roboto"
          >
            Болих
          </Button>
          <Button
            onClick={() =>
              isAuth
                ? save().then((e) => {
                    openNotification();
                    toggle();
                  })
                : openModal('login')
            }
            className="w-[100px] h-[34px] rounded-[4px] text-[15px] font-bold font-roboto ml-[10px]"
            type="primary"
          >
            Хадгалах
          </Button>
        </div>
      </div>
    </Modal>
  );
}
