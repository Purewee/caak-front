import React, { useState } from 'react';
import { notification, Modal } from 'antd';
import { gql, useMutation } from '@apollo/client';
import { MetaTag } from '../../pages/post/view/wrapper';

const SAVEPOST = gql`
  mutation SavePost($articleId: ID!) {
    addToRecipe(input: { articleId: $articleId }) {
      id
    }
  }
`;
export default function PostSaveModal({ open, onClose, post, image }) {
  const [save, { loading }] = useMutation(SAVEPOST, { variables: { articleId: post.id } });
  const openNotification = () => {
    const args = {
      message: 'Амжилттай хадгалагдлаа.',
      duration: 4,
      placement: 'bottom',
      className: 'h-[50px] bg-[#12805C]',
    };
    notification.open(args);
  };

  return (
    open && (
      <Modal
        visible
        onOk={() => {
          save().then((e) => {
            openNotification();
            onClose();
          });
        }}
        onCancel={onClose}
        title={<span className="text-[26px] font-condensed font-bold leading-[30px]">Мэдээ хадгалах</span>}
        bodyStyle={{ padding: 0 }}
        afterClose={onClose}
        cancelText="Болих"
        okText="Хадгалах"
        okType="primary"
        confirmLoading={loading}
      >
        <div className="bg-[#FBFAFB] w-full h-[132px] px-[24px] py-[16px] flex flex-row">
          <img alt={post.title} className="min-w-[100px] max-w-[100px] h-[100px] object-cover truncate-3" src={image} />
          <div className="ml-[16px]">
            <p className="font-merri text-[16px] leading-[21px] h-[64px]">{post.title}</p>
            <div className="text-[#555555] mt-[10px] flex flex-row items-center leading-[18px] text-[12px]">
              <MetaTag>{post.source?.name}</MetaTag>
              <MetaTag className="ml-[6px]">• {post.author.firstName || post.author.name}</MetaTag>
            </div>
          </div>
        </div>
      </Modal>
    )
  );
}
