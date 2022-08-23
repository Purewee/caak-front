import React, { useState } from 'react';
import { Input, Form, Button, Avatar, Tabs, Comment, Skeleton, Modal } from 'antd';
import AvatarSvg from '../../../assets/images/avatar.svg';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_COMMENT, COMMENTS, REACT_COMMENT } from './_gql';
import { BlockTitle } from './wrapper';
import moment from 'moment';
import { FIcon } from '../../../component/icon';
import { DownOutlined } from '@ant-design/icons';

const SORTS = {
  recent: { direction: 'desc', field: 'createdAt' },
  liked: { direction: 'desc', field: 'likesCount' },
  disliked: { direction: 'desc', field: 'dislikesCount' },
};
export default function Comments({ articleId, refProp }) {
  const [sort, setSort] = useState('recent');
  const [addComment, { loading: saving }] = useMutation(ADD_COMMENT, { variables: { articleId } });
  const { data, loading, refetch, fetchMore } = useQuery(COMMENTS, { variables: { articleId, sort: SORTS[sort] } });
  const comments = data?.article?.comments;
  const pageInfo = comments?.pageInfo;
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
      <div className="flex flex-col justify-start w-full" ref={refProp}>
        <BlockTitle className="text-left px-[0px] font-medium md:font-bold text-[17px] md:text-[22px]">
          Нийт сэтгэгдэл ({data?.article?.commentsCount})
        </BlockTitle>
        <Tabs size="small" defaultActiveKey="tab-1" onChange={(e) => setSort(e)}>
          <Tabs.TabPane tab="ШИНЭ" key="recent" />
          <Tabs.TabPane tab="ТААЛАГДСАН" key="liked" />
          <Tabs.TabPane tab="ТААЛАГДААГҮЙ" key="disliked" />
        </Tabs>
        {loading && <Skeleton />}
        {comments?.edges?.map((x) => {
          return (
            <React.Fragment key={x.node.id}>
              <SingleComment comment={x.node} key={x.node.id} refetch={refetch} />
              {x.node.childs.totalCount > 0 && (
                <div className="mx-[50px]">
                  {x.node.childs.edges.map((c) => {
                    return <SingleComment comment={c.node} key={c.node.id} refetch={refetch} />;
                  })}
                </div>
              )}
            </React.Fragment>
          );
        })}
        {pageInfo?.hasNextPage && (
          <Button
            block
            size="large"
            icon={<DownOutlined />}
            onClick={() => fetchMore({ variables: { after: pageInfo?.endCursor } })}
            className="mx-[20px]"
            loading={loading}
          >
            Бусад сэтгэгдэлүүд
          </Button>
        )}
      </div>
    </>
  );
}

function SingleComment({ comment, refetch }) {
  const [open, setOpen] = useState(false);
  const [reply, { loading }] = useMutation(ADD_COMMENT, {
    variables: { articleId: comment.targetId, parentId: comment.id },
  });
  const [react, { loading: reacting }] = useMutation(REACT_COMMENT, {
    variables: {
      commentId: comment.id,
    },
  });
  const [reacted, setReacted] = useState(false);
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  return (
    <Comment
      key={comment.id}
      content={
        <>
          <div className="bg-[#F7F7F7] mt-[10px] rounded-[10px] p-[20px] rounded-t-[0px] rounded-r-[10px]">
            <p className="text-[#555555] text-[15px] leading-[21px]">{comment.comment}</p>
            <div className="flex flex-row items-center mt-[17px]">
              <Button
                icon={
                  <FIcon className="text-[#37AF37] text-[13px] w-[16px] h-[16px] icon-fi-rs-down-chevron rotate-180" />
                }
                size="small"
                type="link"
                loading={reacting}
                className="text-caak-darkGray text-[13px] font-medium ml-[3px]"
                disabled={reacted}
                onClick={() => {
                  react({ variables: { action: 'like' } }).then(() => {
                    setReacted(true);
                  });
                }}
              >
                {comment.likesCount}
              </Button>
              <Button
                icon={<FIcon className="text-[#F53757] text-[13px] w-[16px] h-[16px] icon-fi-rs-down-chevron" />}
                size="small"
                type="link"
                loading={reacting}
                className="text-caak-darkGray text-[13px] font-medium ml-[3px]"
                disabled={reacted}
                onClick={() => {
                  react({ variables: { action: 'dislike' } }).then(() => {
                    setReacted(true);
                  });
                }}
              >
                {comment.dislikesCount}
              </Button>
              {!comment.parentId && (
                <>
                  <Button
                    type="link"
                    className="text-caak-darkGray text-[13px] font-medium ml-[8px] cursor-pointer"
                    onClick={() => setOpen(true)}
                    size="small"
                  >
                    Хариулах
                  </Button>
                  {open && (
                    <Modal
                      width={300}
                      visible
                      title="Сэтгэгдэл бичих"
                      onOk={() => {
                        reply({ variables: { name: name, comment: body } }).then(() => {
                          refetch();
                          setOpen(false);
                        });
                      }}
                      onCancel={() => setOpen(false)}
                      confirmLoading={loading}
                    >
                      <Form>
                        <Input.TextArea rows={4} onChange={(e) => setBody(e.target.value)} placeholder="Сэтгэгдэл" />
                        <Input
                          placeholder="Нэрээ бичнэ үү"
                          onChange={(e) => setName(e.target.value)}
                          className="my-2"
                        />
                      </Form>
                    </Modal>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      }
      author={
        <div className="flex flex-row items-center">
          <p className="text-caak-black text-[15px] font-medium leading-[18px]">{comment.data?.name || 'Зочин'}</p>
          <p className="ml-[8px] text-[#BBBEBE] text-[14px] leading-[16px]">{`[${comment.data?.ip || ''}]`}</p>
        </div>
      }
      avatar={
        <Avatar
          shape="circle"
          size={40}
          style={{
            backgroundColor: 'rgba(255, 102, 0, 0.1)',
            fontSize: 20,
            fontWeight: 'bold',
          }}
          className="text-caak-primary"
        >
          {(comment.data?.name || comment.user?.firstName || 'Зочин')[0]}
        </Avatar>
      }
      datetime={
        <p className="text-[13px] leading-[15px] text-caak-darkGray">
          {moment(comment.createdAt).format('YYYY.MM.DD, hh:mm')}
        </p>
      }
    />
  );
}
