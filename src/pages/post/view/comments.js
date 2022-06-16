import React from 'react';
import { Input, Form, Button, Avatar, Tabs, Comment } from 'antd';
import AvatarSvg from '../../../assets/images/avatar.svg';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_COMMENT, COMMENTS } from './_gql';
import { BlockTitle, Paragraph } from './wrapper';
import moment from 'moment';

export default function Comments({ articleId }) {
  const [addComment, { loading: saving }] = useMutation(ADD_COMMENT, { variables: { articleId } });
  const { data, loading, refetch } = useQuery(COMMENTS, { variables: { articleId } });
  const comments = data?.article?.comments;
  return (
    <>
      <Form
        className="mt-[50px] w-full flex flex-row"
        onFinish={(values) => {
          addComment({ variables: values }).then(() => {
            refetch().then(console.log);
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
            <Form.Item className="w-full">
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
        <Tabs size="small" defaultActiveKey="tab-1">
          <Tabs.TabPane tab="Их таалагдсан" key="tab-1">
            {comments?.edges?.map((x) => {
              return (
                <Comment
                  key={x.node.id}
                  content={x.node.comment}
                  author={`${x.node.user.firstName} ${x.node.user.lastName}`}
                  avatar={<Avatar src={AvatarSvg} shape="square" />}
                  datetime={moment(x.node.createdAt).format('YYYY.MM.DD, hh:mm')}
                />
              );
            })}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Сүүлд нэмэгдсэн" key="tab-2"></Tabs.TabPane>
          <Tabs.TabPane tab="Их хариулсан" key="tab-3"></Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
}
