import React, { useState } from 'react';
import { Modal } from 'antd';
import { gql, useQuery } from '@apollo/client';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const CATEGORIES = gql`
  query GetCategories {
    categories(sort: { direction: asc, field: "position" }, filter: { status: { eq: "active" } }) {
      nodes {
        id
        name
        slug
        position
        parent {
          id
          name
          slug
        }
        childs(sort: { direction: asc, field: "position" }) {
          nodes {
            id
            name
            position
            slug
          }
        }
      }
    }
  }
`;
export default function AddCategoriesModal({ toggle, image }) {
  const { isAuth, openModal } = useAuth();
  const { data, loading } = useQuery(CATEGORIES);
  const categories = data?.categories?.nodes || [];
  console.log(categories);

  return (
    <Modal
      visible
      width={738}
      onOk={() =>
        isAuth
          ? save().then((e) => {
              toggle();
            })
          : openModal('login')
      }
      onCancel={toggle}
      title={
        <span className="text-[38px] font-condensed font-bold leading-[44px] text-center">
          Таны дуртай мэдээний төрлүүд?
        </span>
      }
      bodyStyle={{ padding: 0 }}
      afterClose={toggle}
      cancelText={<p className="text-[15px] font-medium text-caak-black">Болих</p>}
      okText={<p className="text-[15px] font-bold">Хадгалах</p>}
      okType="primary"
      confirmLoading={loading}
    >
      <div className="flex flex-wrap gap-[14px] px-[70px] pt-[20px] pb-[30px]">
        {categories.map((x, index) => {
          return (
            x.parent === null && (
              <div key={index} className="text-white w-[190px] h-[110px] bg-black bg-opacity-50 rounded-[6px]">
                {x.name}
              </div>
            )
          );
        })}
      </div>
    </Modal>
  );
}
