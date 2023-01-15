import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Avatar, Button, Image, List, Tag } from 'antd';
import { imagePath } from '../../utility/Util';
import moment from 'moment';
import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const DRAFTS = gql`
  query GetDraftArticles($userId: ID!, $cursor: String) {
    user(id: $userId) {
      articles(filter: { status: { eq: "draft" } }, first: 100, after: $cursor) {
        edges {
          node {
            id
            title
            kind
            status
            imageUrl
            publishDate
            createdAt
            updatedAt
          }
        }
      }
    }
  }
`;

const Drafts = ({ userId }) => {
  const { data, loading } = useQuery(DRAFTS, { variables: { userId }, skip: !userId });
  const articles = data?.user.articles?.edges.map((x) => x.node);
  return (
    <List
      dataSource={articles}
      loading={loading}
      bordered
      style={{ marginTop: 20 }}
      renderItem={(item) => (
        <List.Item
          extra={
            <>
              <Tag>{item.kind}</Tag>
              <Link to={`/edit/post/${item.id}`}>
                <Button size="small" icon={<EditOutlined />}>
                  Засварлах
                </Button>
              </Link>
            </>
          }
        >
          <List.Item.Meta
            title={item.title}
            description={moment(item.createdAt).format('YYYY-MM-DD HH:mm')}
            avatar={<Avatar src={imagePath(item.imageUrl)} size={60} shape="square" />}
          />
        </List.Item>
      )}
    />
  );
};

export default Drafts;
