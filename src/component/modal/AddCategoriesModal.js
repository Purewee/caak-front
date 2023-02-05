import React, { useState } from 'react';
import { Modal, message } from 'antd';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useAuth } from '../../context/AuthContext';
import { imagePath } from '../../utility/Util';

const CATEGORIES = gql`
  query GetCategories {
    categories(sort: { direction: asc, field: "position" }, filter: { status: { eq: "active" } }) {
      nodes {
        id
        name
        slug
        following
        position
        parent {
          id
          name
          slug
        }
        childs(sort: { direction: asc, field: "position" }, filter: { status: { eq: "active" } }) {
          nodes {
            id
            name
            position
            slug
          }
        }
        cover
      }
    }
  }
`;

const BATCH_FOLLOW = gql`
  mutation FollowCategories($ids: [ID!]!, $targetType: String!) {
    updateFollows(input: { targetType: $targetType, ids: $ids })
  }
`;

export default function AddCategoriesModal({ toggle }) {
  const [ids, setIds] = useState([]);
  const { isAuth, openModal } = useAuth();
  const { data, loading, refetch } = useQuery(CATEGORIES);
  const [follow, { loading: following }] = useMutation(BATCH_FOLLOW);
  const categories = data?.categories?.nodes || [];

  // const filtered = categories.filter((category) => {
  //   return category.parent === null;
  // });

  return (
    <Modal
      open
      width={750}
      onOk={() => (isAuth ? toggle() : openModal('login'))}
      onCancel={toggle}
      title={
        <p className="text-[26px] text-caak-black font-condensed font-bold leading-[35px] text-center">Төрөл нэмэх</p>
      }
      afterClose={toggle}
      closeIcon={<span className="icon-fi-rs-close text-[18px] text-[#909090]" />}
      footer={false}
      okType="primary"
      confirmLoading={loading}
    >
      <div className="h-[60vh] md:flex items-center gap-[10px] grid grid-cols-2 md:flex-wrap overflow-auto">
        {categories
          .filter((x) => !!x.parent?.id)
          .map((x) => {
            const selected = ids.includes(x.id);
            return (
              <div
                className={`w-full h-[90px] md:w-[160px] md:h-[97px] relative items-center justify-center rounded-md cursor-pointer border-caak-primary ${
                  selected && 'border-[2px]'
                }`}
                key={x.id}
                onClick={() => {
                  if (selected) {
                    setIds(ids.filter((id) => id !== x.id));
                  } else {
                    setIds([...ids, x.id]);
                  }
                }}
              >
                {!selected && x.cover && (
                  <div
                    style={{ backgroundImage: `url("${imagePath(x.cover)}")` }}
                    className="w-full h-full bg-center rounded-md bg-cover bg-no-repeat"
                  />
                )}
                <span
                  className={`absolute top-0 h-full w-full flex items-center justify-center text-[15px] font-medium ${
                    selected ? 'bg-white text-caak-primary' : 'bg-black bg-opacity-50 text-white'
                  } rounded-md`}
                >
                  {x.name}
                </span>
                {selected && (
                  <span className="absolute rounded-full text-white top-[7px] right-[7px] icon-fi-rs-check bg-caak-primary w-6 h-6 text-[14px] flex items-center justify-center" />
                )}
              </div>
            );
          })}
      </div>
      <div className="w-full flex justify-center pt-[30px] pb-[40px]">
        <p
          onClick={() => {
            follow({ variables: { targetType: 'category', ids } }).then(() => {
              refetch();
              message.success('Амжилттай хадгаллаа.').then();
            });
          }}
          className="w-[300px] rounded-[4px] cursor-pointer h-[44px] flex justify-center items-center font-medium font-roboto text-[16px] text-white bg-caak-primary"
        >
          Хадгалах
        </p>
      </div>
    </Modal>
  );
}
