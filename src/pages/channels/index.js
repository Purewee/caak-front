import React, { useEffect, useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { SOURCES } from '../add/post/_gql';
import { Avatar, Button, Skeleton } from 'antd';
import { imagePath } from '../../utility/Util';
import { useAuth } from '../../context/AuthContext';

const FOLLOW = gql`
  mutation Follow($id: ID!) {
    toggleFollow(input: { targetType: "source", targetId: $id })
  }
`;

export default function Channels() {
  const { data, loading, refetch } = useQuery(SOURCES);
  const { isAuth } = useAuth();
  const channels = data?.sources.nodes || [];
  const [follow, { loading: saving }] = useMutation(FOLLOW, { variables: 1 });
  if (loading) return <Skeleton />;
  return (
    <div className="flex flex-col items-center">
      <p className="text-black text-[38px] font-bold font-condensed flex flex-row items-center mt-[71px] mb-[40px]">
        <span className="text-caak-primary text-[24px] mr-[12px] icon-fi-rs-rss-o" />
        СУВГУУД
      </p>
      <div className="bg-[#F5F5F5] w-full pt-[50px] flex justify-center pb-[62px]">
        <div className="max-w-[1312px] flex flex-wrap justify-center gap-[18px]">
          {channels.map((data, index) => {
            return (
              <div
                key={index}
                className="w-[248px] h-[256px] bg-white flex rounded-[4px] border border-[#EFEEEF] hover:border hover:border-[#BBBEBE] flex-col items-center px-[20px] justify-between py-[24px]"
              >
                <div className="flex flex-col items-center">
                  <Avatar className="h-[64px] w-[64px]" src={imagePath(data.icon)} />
                  <p className="text-black font-medium text-[17px] leading-[20px] mt-[10px]">{data.name}</p>
                  <p className="text-caak-darkGray mt-[24px] text-[15px] leading-[18px] truncate-2">{data.slug}</p>
                </div>
                {data.following ? (
                  <button
                    className="w-[90px] h-[34px] bg-caak-darkGray rounded-[4px] text-white text-[15px] font-bold"
                    onClick={() => {
                      if (isAuth) {
                        follow().then(() => {
                          refetch().then(console.log);
                        });
                      }
                    }}
                  >
                    ДАГАСАН
                  </button>
                ) : (
                  <Button
                    type="primary"
                    loading={saving}
                    className="w-[90px] h-[34px] bg-caak-primary rounded-[4px] text-white text-[15px] font-bold"
                    onClick={() => {
                      if (isAuth) {
                        follow().then(() => {
                          refetch().then(console.log);
                        });
                      }
                    }}
                  >
                    ДАГАХ
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
