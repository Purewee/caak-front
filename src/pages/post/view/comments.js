import React, { useState } from 'react';
import { Input, Form, Button, Avatar, Tabs, Comment, Skeleton } from 'antd';
import AvatarSvg from '../../../assets/images/avatar.svg';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_COMMENT, COMMENTS } from './_gql';
import { BlockTitle } from './wrapper';
import moment from 'moment';

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
        className="mt-[50px] w-full flex flex-row"
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
        <BlockTitle className="text-left px-[0px] text-[22px]">Нийт сэтгэгдэл ({comments?.totalCount})</BlockTitle>
        <Tabs size="small" defaultActiveKey="tab-1" onChange={(e) => setSort(e)}>
          <Tabs.TabPane tab="Их таалагдсан" key="liked" />
          <Tabs.TabPane tab="Сүүлд нэмэгдсэн" key="recent" />
          <Tabs.TabPane tab="Их хариулсан" key="replied" />
        </Tabs>
        {loading && <Skeleton />}
        {comments?.edges?.map((x) => {
          const comment = x.node;
          return (
            <Comment
              key={comment.id}
              content={
                <div className="bg-[#F7F7F7] rounded-[10px] p-[20px] rounded-t-[0px] rounded-r-[10px]">
                  {comment.comment}
                </div>
              }
              author={
                (comment.data?.name || `${comment.user.firstName} ${comment.user.lastName}`) +
                `[${comment.data?.ip || ''}]`
              }
              avatar={
                <Avatar
                  shape="circle"
                  size={40}
                  style={{ color: '#FF6600', backgroundColor: 'rgba(255, 102, 0, 0.1)' }}
                >
                  {(comment.data?.name || comment.user.firstName)[0]}
                </Avatar>
              }
              datetime={moment(x.node.createdAt).format('YYYY.MM.DD, hh:mm')}
            />
          );
        })}
      </div>
    </>
  );
}
