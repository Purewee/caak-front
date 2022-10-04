import React, { useState } from 'react';
import { Modal } from 'antd';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
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
        childs(sort: { direction: asc, field: "position" }) {
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
      <div className="flex flex-wrap justify-center px-[62px] gap-[14px] pt-[20px] pb-[30px]">
        {filtered.map((x, index) => {
          if(index < 2){
            return x.parent === null ? (
              <div onClick={() => selected ? setSelected(null) : setSelected(x.id)} key={index} className="w-[300px] h-[110px] rounded-[6px] relative">
                <img className="w-full h-full object-cover rounded-[6px]" src={imagePath(x.cover)} />
                <p className="text-white rounded-[6px] absolute top-0 h-full w-full flex justify-center items-center bg-black bg-opacity-50">{x.name}</p>
              </div>
            ) : null;
          }
        })}
        {selected && (
          <div className="w-full bg-[#F5F5F5] flex flex-wrap gap-x-[6px] border border-[#EFEEEF] gap-y-[12px] p-[14px]">
            {categories.map((data, index) => {
              if(selected === data.parent?.id){
                return (
                  <p
                    onClick={() => {
                      if (isAuth) {
                        follow_category({ variables: { id: data.id } }).then(() => {
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
              }
            })}
          </div>
        )}
        {filtered.map((x, index) => {
          if(index >= 2){
            return x.parent === null ? (
              <div onClick={() => selected ? setSelected(null) : setSelected(x.id)} key={index} className="w-[300px] h-[110px] rounded-[6px] relative">
                <img className="w-full h-full object-cover rounded-[6px]" src={imagePath(x.cover)} />
                <p className="text-white rounded-[6px] absolute top-0 h-full w-full flex justify-center items-center bg-black bg-opacity-50">{x.name}</p>
              </div>
            ) : null;
          }
        })}
      </div>
    </Modal>
  );
}
