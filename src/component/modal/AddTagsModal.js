import React from 'react';
import { Modal } from 'antd';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useAuth } from '../../context/AuthContext';
import { TAGS } from '../../pages/add/post/_gql';

const FOLLOW_TAG = gql`
  mutation Follow($id: ID!) {
    toggleFollow(input: { targetType: "tag", targetId: $id })
  }
`;
export default function AddTagsModal({ toggle, image }) {
  const { isAuth, openModal } = useAuth();
  const { data, loading, refetch } = useQuery(TAGS);
  const [follow_tag] = useMutation(FOLLOW_TAG);
  const tags = data?.tags?.nodes || [];
  //prettier-ignore
  return (
    <Modal
      visible
      width={738}
      onOk={() =>
        isAuth
          ? toggle()
          : openModal('login')
      }
      onCancel={toggle}
      title={
        <span className="text-[38px] font-condensed font-bold leading-[44px] text-center">
          Таны дуртай мэдээний тагууд?
        </span>
      }
      bodyStyle={{ padding: 0 }}
      afterClose={toggle}
      cancelText={<p className="text-[15px] font-medium text-caak-black">Болих</p>}
      okText={<p className="text-[15px] font-bold">Хадгалах</p>}
      okType="primary"
      confirmLoading={loading}
    >
      <div className="flex flex-wrap justify-center px-[62px] gap-[14px] pt-[20px] pb-[30px]">
        <div className="w-full bg-[#F5F5F5] flex flex-wrap gap-x-[6px] border border-[#EFEEEF] gap-y-[12px] p-[14px]">
            {tags.map((data, index) => {
              return (
                <p
                  onClick={() => {
                      if (isAuth) {
                      follow_tag({ variables: { id: data.id } }).then(() => {
                          refetch().then(console.log);
                      });
                      }
                  }}
                  className={`${data.following ? ' bg-caak-primary text-white' : 'bg-white text-caak-black'} border cursor-pointer border-[#D4D8D8] rounded-full font-roboto px-[14px] py-[4px] leading-[16px]`}
                  key={index}
                >
                  {data.name}
                </p>
              )
            })}
        </div>
      </div>
    </Modal>
  );
}
