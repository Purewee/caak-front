import React, { useState } from 'react';
import { Card, Image, Avatar, Button } from 'antd';
import { imagePath } from '../../utility/Util';
import { HashTag, MetaTag } from '../../pages/post/view/wrapper';
import moment from 'moment';

export default function PostCard({ post, ...rest }) {
  return (
    <Card
      bordered={false}
      {...rest}
      bodyStyle={{ padding: 0 }}
      className="mb-[20px] h-[520px]"
      cover={
        <Image
          preview={false}
          alt={post.title}
          src={imagePath(post.image)}
          className="h-full w-full object-cover h-[300px] "
        />
      }
    >
      <div className="h-[220px] border-b border-[#EFEFEF] flex flex-col justify-between py-[8px]">
        <div>
          {post?.categories?.map((x) => (
            <HashTag primary className="font-normal text-[13px]">
              {`#${x.name}`}
            </HashTag>
          ))}
          <h3 className="text-[#111111] text-[18px] font-medium leading-[27px] tracking-[0.32px] font-merri truncate-3">
            {post.title}
          </h3>
          <div className="text-[12px] text-[#909090] tracking-[0.21px] leading-[16px] mt-[10px]">
            {moment(post.publish_date).format('YYYY-MM-DD, hh:mm')}
          </div>
        </div>
        <div className="flex justify-between items-center ">
          <div>
            <Avatar src={post?.source?.icon} size="small" />
            <MetaTag>{post?.source?.name}</MetaTag>
            <MetaTag>{`${post.author?.name}`}</MetaTag>
          </div>
          <div className="flex">
            <Button type="link" icon={<span className="icon-fi-rs-bookmark text-[16px]" />} />
            <Button type="link" icon={<span className="icon-fi-rs-more-ver text-[16px]" />} />
          </div>
        </div>
      </div>
    </Card>
  );
}
