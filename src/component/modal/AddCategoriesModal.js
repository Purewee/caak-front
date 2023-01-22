import React, { useState } from 'react';
import { Modal } from 'antd';
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
const FOLLOW_CATEGORY = gql`
  mutation Follow($id: ID!) {
    toggleFollow(input: { targetType: "category", targetId: $id })
  }
`;
export default function AddCategoriesModal({ toggle, image }) {
  const { isAuth, openModal } = useAuth();
  const { data, loading, refetch } = useQuery(CATEGORIES);
  const [selected, setSelected] = useState(null);
  const [follow_category] = useMutation(FOLLOW_CATEGORY);
  const categories = data?.categories?.nodes || [];
  const filtered = categories.filter((category) => {
    return category.parent === null;
  });
  return (
    <Modal
      visible
      width={738}
      onOk={() => (isAuth ? toggle() : openModal('login'))}
      onCancel={toggle}
      title={
        <p className="text-[38px] font-condensed font-bold leading-[44px] text-center pt-[15px]">
          Таны дуртай мэдээний төрлүүд?
        </p>
      }
      bodyStyle={{ padding: 0 }}
      afterClose={toggle}
      closeIcon={<span className="icon-fi-rs-close text-[18px] text-[#909090]" />}
      footer={
        <div className="w-full flex justify-center">
          <p
            onClick={() => toggle()}
            className="w-[300px] rounded-[4px] cursor-pointer h-[44px] flex justify-center items-center font-medium font-roboto text-[16px] text-[#909090] bg-[#EFEEEF]"
          >
            Хадгалах
          </p>
        </div>
      }
      okType="primary"
      confirmLoading={loading}
    >
      <div className="flex flex-wrap justify-center px-[20px] sm:px-[62px] gap-[14px] pt-[20px] pb-[30px]">
        {filtered.map((x, index) => {
          if (index < 2) {
            return x.parent === null ? (
              <div
                onClick={() => (selected === x.id ? setSelected(null) : setSelected(x.id))}
                key={index}
                className={`w-[300px] cursor-pointer h-[110px] rounded-[6px] relative ${
                  selected === x.id && 'border-[#FF6600] p-[4px] border-[2px]'
                }`}
              >
                <img className="w-full h-full object-cover rounded-[6px]" src={imagePath(x.cover)} />
                <p
                  className={`text-white rounded-[6px] absolute top-0 h-full w-full flex justify-center font-roboto font-medium text-[17px] items-center bg-black bg-opacity-50 ${
                    selected === x.id && 'w-[288px] top-[4px] h-[98px]'
                  }`}
                >
                  {x.name}
                </p>
              </div>
            ) : null;
          }
        })}
        {selected && (
          <div className="w-full bg-[#F5F5F5] flex flex-wrap gap-x-[6px] border border-[#EFEEEF] gap-y-[12px] p-[14px]">
            {categories
              .filter((x) => x.parent?.id === selected)
              .map((data, index) => {
                return (
                  <p
                    onClick={() => {
                      if (isAuth) {
                        follow_category({ variables: { id: data.id } }).then(() => {
                          refetch().then(console.log);
                        });
                      }
                    }}
                    className={`${
                      data.following ? ' bg-caak-primary text-white' : 'bg-white text-caak-black'
                    } border cursor-pointer border-[#D4D8D8] rounded-full font-roboto px-[14px] py-[4px] leading-[23px]`}
                    key={index}
                  >
                    {data.name}
                  </p>
                );
              })}
          </div>
        )}
        {filtered.map((x, index) => {
          if (index >= 2) {
            return x.parent === null ? (
              <div
                onClick={() => (selected === x.id ? setSelected(null) : setSelected(x.id))}
                key={index}
                className={`w-[300px] cursor-pointer h-[110px] rounded-[6px] relative ${
                  selected === x.id && 'border-[#FF6600] p-[4px] border-[2px]'
                }`}
              >
                <img className="w-full h-full object-cover rounded-[6px]" src={imagePath(x.cover)} />
                <p
                  className={`text-white rounded-[6px] absolute top-0 h-full w-full flex justify-center font-roboto font-medium text-[17px] items-center bg-black bg-opacity-50 ${
                    selected === x.id && 'w-[288px] top-[4px] h-[98px]'
                  }`}
                >
                  {x.name}
                </p>
              </div>
            ) : null;
          }
        })}
      </div>
    </Modal>
  );
}
