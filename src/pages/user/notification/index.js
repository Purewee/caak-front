import React, { useState } from 'react';
import { List, Button, Avatar } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { ME } from '../../post/view/_gql';
import { useQuery, gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { imagePath } from '../../../utility/Util';

const REMOVE_SAVED = gql`
  mutation RemoveSavedArticle($id: ID, $articleId: ID!) {
    removeRecipeItem(input: { id: $id, articleId: $articleId }) {
      id
    }
  }
`;

//prettier-ignore
export default function Notification() {
    const { data, loading, refetch } = useQuery(ME);
    const saved_articles = data?.me?.recipes.map((x) => x?.articles.nodes).flat() || [];
    const [remove, { loading: removing }] = useMutation(REMOVE_SAVED);
    return (
        <div className="py-[20px]">
            <List
                className="caak-saved-articles max-h-screen overflow-hidden overflow-y-scroll"
                dataSource={saved_articles}
                size="small"
                renderItem={(x) => (
                <List.Item
                    className="font-condensed"
                    actions={[
                    <Button
                        size="small"
                        icon={<CloseOutlined />}
                        type="link"
                        onClick={() => {
                        remove({ variables: { articleId: x.id } }).then(() => {
                            refetch();
                            message.success('Амжилттай устгалаа');
                        });
                        }}
                        loading={removing}
                    />,
                    ]}
                >
                    <List.Item.Meta
                    avatar={
                        <Link to={`/post/view/${x.id}`}>
                        <Avatar src={imagePath(x.imageUrl)} shape="square" />
                        </Link>
                    }
                    title={
                        <Link to={`/post/view/${x.id}`} className="truncate-3 text-[13px]">
                        {x.title}
                        </Link>
                    }
                    />
                </List.Item>
                )}
            />
        </div>
    )
}
