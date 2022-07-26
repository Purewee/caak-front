import React, { useState } from 'react';
import { notification, Modal, message } from 'antd';
import { gql, useMutation } from '@apollo/client';
import { MetaTag } from '../../pages/post/view/wrapper';
import { useAuth } from '../../context/AuthContext';
import SignInUpController from './SignInUpController';

const SAVE_POST = gql`
  mutation SavePost($articleId: ID!) {
    addToRecipe(input: { articleId: $articleId }) {
      id
    }
  }
`;
export default function PostSaveModal({ post, toggle, image }) {
  const [isShown, setIsShown] = useState(false);
  const [save, { loading }] = useMutation(SAVE_POST, { variables: { articleId: post.id } });
  const { isAuth, openModal } = useAuth();

  return (
    <Modal
      visible
      width={480}
      onOk={() =>
        isAuth
          ? save().then((e) => {
              message.success('Амжилттай хадгалагдлаа');
              toggle();
            })
          : openModal('open')
      }
      onCancel={toggle}
      title={<span className="text-[26px] font-condensed font-bold leading-[30px]">Мэдээ хадгалах</span>}
      bodyStyle={{ padding: 0 }}
      afterClose={toggle}
      cancelText="Болих"
      okText="Хадгалах"
      okType="primary"
      confirmLoading={loading}
    >
      <div className="bg-[#FBFAFB] h-[132px] px-[24px] py-[16px] flex flex-row">
        <img alt={post.title} className="min-w-[100px] max-w-[100px] h-[100px] object-cover truncate-3" src={image} />
        <div className="ml-[16px]">
          <p className="font-merri text-[16px] leading-[21px] h-[64px] truncate-3">{post.title}</p>
          <div className="text-[#555555] mt-[10px] flex flex-row items-center leading-[18px] text-[12px]">
            <MetaTag className="ml-0">{post.source?.name}</MetaTag>
            <MetaTag className="ml-[6px]">• {post.author.firstName || post.author.name}</MetaTag>
          </div>
        </div>
      </div>
      <SignInUpController isShown={isShown} setIsShown={setIsShown} />
    </Modal>
  );
}
