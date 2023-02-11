import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, message, Modal, Skeleton } from 'antd';
import { imagePath } from '../../utility/Util';

const BATCH_FOLLOW = gql`
  mutation FollowCategories($ids: [ID!]!, $targetType: String!) {
    updateFollows(input: { targetType: $targetType, ids: $ids })
  }
`;
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

function CategoriesModal({ refetch }) {
  const { data, loading } = useQuery(CATEGORIES);
  const [follow, { loading: following }] = useMutation(BATCH_FOLLOW);
  const [ids, setIds] = useState([]);
  const categories = data?.categories?.nodes || [];

  const followedCats = categories.filter(function (el) {
    return el.following === true;
  });

  followedCats.map((item) => {
    ids.push(item.id);
  });

  return (
    <Modal open closable={false} header={false} footer={false} width={750}>
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <div className="w-full text-center mb-[12px]">
            <h3 className="font-condensed text-[24px] leading-[32px] sm:text-[38px] sm:leading-[42px] font-bold text-[#111111]">
              Таны дуртай мэдээний төрлүүд
            </h3>
            <p className="font-roboto text-[#555555] leading-[18px] text-[15px] mt-[10px] lg:mt-5">
              Таны дуртай төрлөөр мэдээг шүүцгээе. Хамгийн багадаа 3 төрөл сонгоно уу.
            </p>
          </div>
          <div className="h-[60vh] md:flex items-center mt-[20px] lg:mt-[30px] gap-[10px] grid grid-cols-2 md:flex-wrap overflow-auto">
            {categories
              .filter((x) => !x.following && !!x.parent?.id)
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
          <div className="flex justify-center w-full mt-[18px] lg:mt-7">
            <Button
              size="large"
              className={`${
                ids.length > 2 && 'bg-caak-primary text-white'
              } w-full lg:w-[300px] h-[44px] font-roboto font-medium`}
              disabled={ids.length < 3}
              onClick={() => {
                follow({ variables: { targetType: 'category', ids } }).then(() => {
                  refetch();
                  message.success('Амжилттай хадгаллаа.').then();
                });
              }}
              loading={following}
            >
              Дуусгах ({ids.length})
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
}
export default CategoriesModal;
