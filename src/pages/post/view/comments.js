import React, { useState } from 'react';
import { Input, Form, Button, Avatar, Tabs, Comment, Skeleton, Modal, message } from 'antd';
import AvatarSvg from '../../../assets/images/avatar.svg';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_COMMENT, COMMENTS, REACT_COMMENT } from './_gql';
import { useAuth } from '../../../context/AuthContext';
import { BlockTitle } from './wrapper';
import moment from 'moment';
import { FIcon } from '../../../component/icon';
import { DownOutlined } from '@ant-design/icons';
import { ME } from './_gql';
import { imagePath } from '../../../utility/Util';
import { useNavigate } from 'react-router-dom';

const SORTS = {
  recent: { direction: 'desc', field: 'createdAt' },
  liked: { direction: 'desc', field: 'likesCount' },
  disliked: { direction: 'desc', field: 'dislikesCount' },
};

export default function Comments({ articleId, refProp }) {
  const { isAuth } = useAuth();
  const [sort, setSort] = useState('recent');
  const [addComment, { loading: saving }] = useMutation(ADD_COMMENT, { variables: { articleId } });
  const { data, loading, refetch, fetchMore } = useQuery(COMMENTS, { variables: { articleId, sort: SORTS[sort] } });
  const comments = data?.article?.comments;
  const pageInfo = comments?.pageInfo;
  const { data: loggedUser } = useQuery(ME, { skip: !isAuth });
  const me = loggedUser?.me || {};
  const navigate = useNavigate();
  const [form] = Form.useForm();

  return (
    <>
      <Form
        form={form}
        className="mt-[37px] md:mt-[50px] w-full flex flex-row"
        onFinish={(values) => {
          addComment({ variables: values }).then(() => {
            refetch().then(() => message.success('Сэтггдэл үлдээсэнд баярлалаа.'));
          });
          form.resetFields();
        }}
        initialValues={{ name: me?.firstName || 'Зочин' }}
      >
        {isAuth ? (
          me.avatar ? (
            <div className="relative">
              <Avatar shape="square" className="w-[50px] h-[50px] object-cover" src={imagePath(me?.avatar)} />
              {me?.id === loggedUser?.id && (
                <span
                  onClick={() => navigate(`/settings/${loggedUser?.id}`)}
                  style={{ boxShadow: '0px 1px 4px #00000029' }}
                  className="w-[32px] h-[32px] rounded-full cursor-pointer flex justify-center items-center text-[19px] absolute bottom-0 -right-[6px] text-black icon-fi-rs-camera-f bg-white"
                />
              )}
            </div>
          ) : (
            me.firstName && (
              <div className="relative">
                <Avatar
                  shape="square"
                  className="w-[50px] h-[50px] flex items-center bg-[#257CEE19] text-[#257CEE] text-[32px] font-medium"
                >
                  {(me?.firstName || me?.name)[0] || null}
                </Avatar>
                {me?.id === loggedUser?.id && (
                  <span
                    onClick={() => navigate(`/settings/${loggedUser?.id}`)}
                    style={{ boxShadow: '0px 1px 4px #00000029' }}
                    className="w-[32px] h-[32px] rounded-full cursor-pointer flex justify-center items-center text-[19px] absolute bottom-0 -right-[6px] text-black icon-fi-rs-camera-f bg-white"
                  />
                )}
              </div>
            )
          )
        ) : (
          <Avatar size="large" src={AvatarSvg} shape="square" />
        )}
        <div className="w-full ml-[12px]">
          <Form.Item
            className="w-full mb-[10px]"
            name="comment"
            rules={[{ required: true, min: 3, message: '3 - аас дээш тэмдэгт бичнэ үү.' }]}
          >
            <Input.TextArea
              style={{ resize: 'none' }}
              className="w-full rounded-[2px] py-[20px] px-[24px] max-h-[104px] border border-[#D4D8D8]"
              placeholder="Сэтгэгдлээ үлдээнэ үү..."
            />
          </Form.Item>
          <div className="flex flex-row h-[54px]">
            <Form.Item className="w-full mr-[10px]" name="name">
              <Input
                className="w-full h-[54px] rounded-[2px] px-[24px] border border-[#D4D8D8]"
                placeholder="Нэрээ бичнэ үү"
              />
            </Form.Item>
            <Button
              htmlType="submit"
              loading={saving}
              className="min-w-[180px] h-[54px] bg-[#363946] rounded-[2px] text-white text-[16px] font-medium"
            >
              Сэтгэгдэл үлдээх
            </Button>
          </div>
        </div>
      </Form>
      <div className="flex flex-col justify-start w-full mt-[57px]" ref={refProp}>
        <BlockTitle className="text-left sm:mb-[37px] px-[0px] font-medium md:font-bold text-[17px] md:text-[22px]">
          Нийт сэтгэгдэл ({data?.article?.commentsCount})
        </BlockTitle>
        <Tabs className="flex border-b" size="small" defaultActiveKey="tab-1" onChange={(e) => setSort(e)}>
          <Tabs.TabPane
            tab={
              <p
                className={`text-[14px] leading-[19px] font-medium ${
                  sort === 'recent' ? 'text-caak-black' : 'text-caak-darkGray'
                }`}
              >
                ШИНЭ
              </p>
            }
            key="recent"
          />
          <Tabs.TabPane
            tab={
              <p
                className={`text-[14px] leading-[19px] font-medium ${
                  sort === 'liked' ? 'text-caak-black' : 'text-caak-darkGray'
                }`}
              >
                ТААЛАГДСАН
              </p>
            }
            key="liked"
          />
          <Tabs.TabPane
            tab={
              <p
                className={`text-[14px] leading-[19px] font-medium ${
                  sort === 'disliked' ? 'text-caak-black' : 'text-caak-darkGray'
                }`}
              >
                ТААЛАГДААГҮЙ
              </p>
            }
            key="disliked"
          />
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

const colors = ['#257CEE', '#37AF37'];
const colors1 = ['#257CEE19', '#37AF371A'];

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
  const random = Math.floor(Math.random() * 2);
  const color = colors[random];
  const color1 = colors1[random];
  return (
    <Comment
      key={comment.id}
      content={
        <>
          <div className="bg-[#F7F7F7] mt-[10px] rounded-[10px] pt-[20px] px-[20px] pb-[15px] rounded-t-[0px] rounded-r-[10px]">
            <p className="text-[#555555] text-[15px] leading-[21px]">{comment.comment}</p>
            <div className="flex flex-row items-center mt-[12px]">
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
                      width={400}
                      open
                      title="Сэтгэгдэл бичих"
                      onCancel={() => setOpen(false)}
                      confirmLoading={loading}
                      footer={false}
                    >
                      <Form
                        initialValues={{ name: 'Зочин' }}
                        onFinish={(values) => {
                          reply({ variables: values }).then(() => {
                            refetch();
                            setOpen(false);
                          });
                        }}
                      >
                        <Form.Item name="name">
                          <Input placeholder="Нэрээ бичнэ үү" className="my-2" />
                        </Form.Item>
                        <Form.Item
                          name="comment"
                          rules={[{ required: true, min: 3, message: '3 - аас дээш тэмдэгт бичнэ үү.' }]}
                        >
                          <Input.TextArea rows={4} placeholder="Сэтгэгдэл" />
                        </Form.Item>
                        <Button htmlType="submit" type="primary">
                          Сэтгэгдэл үлдээх
                        </Button>
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
          <p className="text-caak-black text-[15px] font-medium leading-[18px]">{comment?.name || 'Зочин'}</p>
          <p className="ml-[8px] text-[#BBBEBE] text-[14px] leading-[16px]">{`[${comment?.ip || ''}]`}</p>
        </div>
      }
      avatar={
        <Avatar
          style={{ backgroundColor: color1 }}
          shape="circle"
          size={40}
          className={`text-[${color}] text-[18px] font-bold`}
        >
          {(comment.data?.name || comment.user?.firstName || 'Зочин')[0]}
        </Avatar>
      }
      datetime={
        <p className="text-[13px] leading-[15px] text-[#BBBEBE]">
          {moment(comment.createdAt).format('YYYY.MM.DD, hh:mm')}
        </p>
      }
    />
  );
}
