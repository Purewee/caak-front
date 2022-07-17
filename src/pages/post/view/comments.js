import React, { useState } from 'react';
import { Input, Form, Button, Avatar, Tabs, Comment, Skeleton } from 'antd';
import AvatarSvg from '../../../assets/images/avatar.svg';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_COMMENT, COMMENTS } from './_gql';
import { BlockTitle } from './wrapper';
import moment from 'moment';
import { FIcon } from '../../../component/icon';

const SORTS = {
  recent: { direction: 'desc', field: 'createdAt' },
  liked: { direction: 'asc', field: 'createdAt' },
  replied: { direction: 'desc', field: 'createdAt' },
};
export default function Comments({ articleId }) {
  const [sort, setSort] = useState('recent');
  const [addComment, { loading: saving }] = useMutation(ADD_COMMENT, { variables: { articleId } });
  const { data, loading, refetch } = useQuery(COMMENTS, { variables: { articleId, sort: SORTS[sort] } });
  const comments = data?.article?.comments;
  return (
    <>
      <Form
        className="mt-[37px] md:mt-[50px] w-full flex flex-row"
        onFinish={(values) => {
          addComment({ variables: values }).then(() => {
            refetch();
          });
        }}
      >
        <Avatar size="large" src={AvatarSvg} shape="square" />
        <div className="w-full ml-[12px]">
          <Form.Item className="w-full" name="comment">
            <Input.TextArea
              style={{ resize: 'none' }}
              className="w-full rounded-[2px] py-[20px] px-[24px] max-h-[104px] border border-[#D4D8D8]"
              placeholder="Сэтгэгдлээ үлдээнэ үү..."
            />
          </Form.Item>
          <div className="flex flex-row items-start">
            <Form.Item className="w-full" name="name">
              <Input
                className="w-full max-w-[508px] h-[54px] rounded-[2px] px-[24px] border border-[#D4D8D8] mr-[10px]"
                placeholder="Нэрээ бичнэ үү"
              />
            </Form.Item>
            <Button
              htmlType="submit"
              loading={saving}
              className="w-[180px] h-[54px] bg-[#555555] rounded-[2px] text-white text-[16px] font-medium"
            >
              Сэтгэгдэл үлдээх
            </Button>
          </div>
        </div>
      </Form>
      <div className="flex flex-col justify-start w-full">
        <BlockTitle className="text-left px-[0px] font-medium md:font-bold text-[17px] md:text-[22px]">
          Нийт сэтгэгдэл ({comments?.totalCount})
        </BlockTitle>
        <Tabs className="hidden md:flex" size="small" defaultActiveKey="tab-1" onChange={(e) => setSort(e)}>
          <Tabs.TabPane tab="ИХ ХАНДАЛТТАЙ" key="liked" />
          <Tabs.TabPane tab="СҮҮЛД НЭМЭГДСЭН" key="recent" />
          <Tabs.TabPane tab="ИХ ХАРИУЛСАН" key="replied" />
        </Tabs>
        {loading && <Skeleton />}
        {comments?.edges?.map((x) => {
          const comment = x.node;
          return (
            <Comment
              key={comment.id}
              content={
                <div className="bg-[#F7F7F7] mt-[10px] rounded-[10px] p-[20px] rounded-t-[0px] rounded-r-[10px]">
                  <p className="text-[#555555] text-[15px] leading-[21px]">{comment.comment}</p>
                  <div className="flex flex-row items-center mt-[17px]">
                    <div className="flex flex-row items-center cursor-pointer">
                      <FIcon className="text-[#37AF37] text-[13px] w-[16px] h-[16px] icon-fi-rs-down-chevron rotate-180" />
                      <p className="text-caak-darkGray text-[13px] font-medium ml-[3px]">5</p>
                    </div>
                    <div className="flex flex-row items-center ml-[12px] cursor-pointer">
                      <FIcon className="text-[#F53757] text-[13px] w-[16px] h-[16px] icon-fi-rs-down-chevron" />
                      <p className="text-caak-darkGray text-[13px] font-medium ml-[3px]">0</p>
                    </div>
                    <p className="text-caak-darkGray text-[13px] font-medium ml-[20px] cursor-pointer">Хариулах</p>
                  </div>
                </div>
              }
              author={
                <div className="flex flex-row items-center">
                  <p className="text-caak-black text-[15px] font-medium leading-[18px]">
                    {comment.data?.name || `${comment.user.firstName} ${comment.user.lastName}`}
                  </p>
                  <p className="ml-[8px] text-[#BBBEBE] text-[14px] leading-[16px]">{`[${comment.data?.ip || ''}]`}</p>
                </div>
              }
              avatar={
                <Avatar
                  shape="circle"
                  size={40}
                  style={{
                    color: '#FF6600',
                    backgroundColor: 'rgba(255, 102, 0, 0.1)',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}
                >
                  {(comment.data?.name || comment.user.firstName)[0]}
                </Avatar>
              }
              datetime={
                <p className="text-[13px] leading-[15px] text-caak-darkGray">
                  {moment(x.node.createdAt).format('YYYY.MM.DD, hh:mm')}
                </p>
              }
            />
          );
        })}
      </div>
    </>
  );
}
