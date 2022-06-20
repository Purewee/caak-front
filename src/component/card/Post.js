import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Avatar, Button } from 'antd';
import { imagePath } from '../../utility/Util';
import { HashTag, MetaTag } from '../../pages/post/view/wrapper';
import moment from 'moment';
import { LinkOutlined } from '@ant-design/icons';
import PostSaveModal from '../modal/PostSaveModal';

// Ene bol medeenii jagsaalt deer haragdah Card. Dooroo Garchigtai Merri fonttoi.
export default function PostCard({ post, ...rest }) {
  const [savePostOpen, setSavePostOpen] = useState(false);
  const postURL = `/post/view/${post.id}`;
  return (
    <Card
      bordered={false}
      {...rest}
      bodyStyle={{ padding: 0 }}
      className="mb-[20px] h-[520px]"
      cover={
        <Link to={postURL}>
          <Image
            preview={false}
            alt={post.title}
            src={imagePath(post.image)}
            className="w-full object-cover h-[300px] "
          />
        </Link>
      }
    >
      <div className="h-[220px] border-b border-[#EFEFEF] flex flex-col justify-between py-[8px]">
        <div>
          {post?.categories?.map((x, index) => (
            <HashTag key={index} primary className="font-normal text-[13px]">
              {`#${x.name}`}
            </HashTag>
          ))}
          <Link
            className="text-[#111111] hover:text-[#111111] text-[18px] font-medium leading-[27px] tracking-[0.32px] font-merri truncate-3"
            to={postURL}
          >
            {post.title}
          </Link>
          <div className="text-[12px] text-[#909090] tracking-[0.21px] leading-[16px] mt-[10px]">
            {moment(post.publish_date).format('YYYY-MM-DD, hh:mm')}
          </div>
        </div>
        <div className="flex justify-between items-center ">
          <div>
            <Avatar className="w-[22px] h-[22px]" src={imagePath(post.source?.icon)} />
            <MetaTag className="ml-[6px]">{post?.source?.name}</MetaTag>
            <MetaTag className="ml-[6px]">• {post.author?.name}</MetaTag>
          </div>
          <div className="flex">
            <Button
              onClick={() => setSavePostOpen(true)}
              type="link"
              icon={<span className="icon-fi-rs-bookmark text-[#909090] text-[17px]" />}
            />
            <Button type="link" icon={<span className="icon-fi-rs-more-ver text-[#909090] text-[17px]" />} />
          </div>
        </div>
      </div>
      <PostSaveModal
        post={post}
        setSavePostOpen={setSavePostOpen}
        savePostOpen={savePostOpen}
        image={imagePath(post.image)}
      />
    </Card>
  );
}
