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
  return (
    <Modal open closable={false} header={false} footer={false} width={850}>
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <div className="w-full text-center mb-[12px]">
            <h3 className="font-condensed text-[28px] leading-[32px] sm:text-[38px] sm:leading-[42px] font-bold text-[#111111]">
              Таны дуртай мэдээний төрлүүд
            </h3>
            <p className="font-roboto text-[#555555] text-[15px]">
              Таны дуртай төрлөөр мэдээг шүүцгээе. Хамгийн багадаа 3 төрөл сонгоно уу.
            </p>
          </div>
          <div className="h-[60vh] md:flex items-center justify-center gap-[8px] grid grid-cols-2 md:flex-wrap overflow-auto">
            {categories
              .filter((x) => !!x.parent?.id)
              .map((x) => {
                const selected = ids.includes(x.id);
                return (
                  <div
                    className={`w-full h-[90px] sm:w-[170px] sm:h-[100px] relative items-center justify-center rounded-md cursor-pointer border-caak-primary ${
                      selected && 'border-2'
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
                    {x.cover && (
                      <div
                        style={{ backgroundImage: `url("${imagePath(x.cover)}")` }}
                        className="w-full h-full bg-center bg-cover bg-no-repeat"
                      />
                    )}
                    <span className="absolute top-0 h-full w-full flex items-center justify-center text-white text-[15px] font-medium bg-black bg-opacity-50 rounded-md">
                      {x.name}
                    </span>
                  </div>
                );
              })}
          </div>
          <div className="w-full flex justify-center mt-[24px]">
            <Button
              size="large"
              className={`${ids.length > 2 && 'bg-caak-primary text-white'}`}
              disabled={ids.length < 3}
              onClick={() => {
                follow({ variables: { targetType: 'category', ids } }).then(() => {
                  refetch();
                  message.success('Амжилттай хадгаллаа.').then();
                });
              }}
              loading={following}
            >
              Үргэлжлүүлэх ({ids.length})
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
}
export default CategoriesModal;
