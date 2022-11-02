import React from 'react';
import { ME } from '../../post/view/_gql';
import { useQuery } from '@apollo/client';
import { List, Avatar, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { imagePath } from '../../../utility/Util';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export default function PostSaved() {
  const { isAuth } = useAuth();
  const { data, loading } = useQuery(ME, { skip: !isAuth });
  const saved_articles = data?.me?.recipes.map((x) => x?.articles.nodes).flat() || [];

  if (loading) return <span>Loading ...</span>;

  return (
    <div className="py-[30px]">
      <List
        className="border-t border-b"
        dataSource={saved_articles}
        size="small"
        renderItem={(x) => (
          <List.Item
            className="font-condensed"
            actions={[<Button size="small" icon={<CloseOutlined />} type="link" />]}
          >
            <List.Item.Meta
              avatar={<Avatar src={imagePath(x.imageUrl)} shape="square" />}
              title={
                <Link to={`/post/view/${x.id}`}>
                  <p className="truncate-2">{x.title}</p>
                </Link>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
}
