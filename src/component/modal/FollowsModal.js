import React, { useState } from 'react';
import { Avatar, Modal, Button } from 'antd';
import { imagePath } from '../../utility/Util';
import { useMutation, gql, useQuery } from '@apollo/client';
import { useAuth } from '../../context/AuthContext';
import { USER } from '../../pages/post/view/_gql';
import { useParams } from 'react-router-dom';

const FOLLOW = gql`
  mutation Follow($id: ID!) {
    toggleFollow(input: { targetType: "user", targetId: $id })
  }
`;

export default function FollowsModal({ toggle, followers }) {
  const [value, setValue] = useState();
  const { id } = useParams();
  const { isAuth, openModal } = useAuth();
  const { loading, refetch } = useQuery(USER, { variables: { id } });
  const [follow] = useMutation(FOLLOW);

  return (
    <Modal
      open
      width={540}
      title={<span className="text-[26px] font-condensed font-bold leading-[30px]">Дагагчид</span>}
      bodyStyle={{ padding: 0 }}
      afterClose={toggle}
      footer={false}
      closeIcon={<span onClick={toggle} className="icon-fi-rs-close text-[18px] text-[#909090]" />}
    >
      <div>
        <div className="bg-[#FBFAFB] p-4 h-[76px] relative">
          <input
            placeholder="Хэрэглэгч хайх"
            className="w-full pl-[47px] h-full border border-[#D4D8D8] rounded-[2px"
            onChange={(e) => setValue(e.target.value)}
          />
          <span className="text-[#909090] icon-fi-rs-search text-[21px] absolute left-8 top-7" />
        </div>
        <div className="w-full h-[400px] bg-white overflow-y-scroll flex flex-col gap-y-[16px] pl-[20px] pr-[14px] pb-[16px]">
          {followers?.nodes?.map((data, index) => {
            const user = data.user;
            return (
              <div className="flex flex-row items-center w-full justify-between" key={index}>
                <div className="flex flex-row items-center">
                  <Avatar src={imagePath(user.avatar)} className="w-[54px] h-[54px]" />
                  <p className="ml-[14px] text-[16px] leading-[19px] text-[#111111] font-roboto">{user.firstName}</p>
                </div>
                <Button
                  loading={loading}
                  className="w-[92px] h-[34px] border border-[#D4D8D8] rounded-[4px] text-[#555555] text-[15px] font-medium"
                  onClick={() => {
                    if (isAuth) {
                      follow({ variables: { id: user.id } }).then(() => {
                        refetch().then(console.log);
                      });
                    } else {
                      openModal('login');
                    }
                  }}
                >
                  Хасах
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
