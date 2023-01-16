import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { LinkOutlined, PlaySquareOutlined, SaveOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { ME } from '../post/view/_gql';
import { isAdmin } from '../../utility/Util';

const AddTabs = ({ ...rest }) => {
  const { data, loading } = useQuery(ME);
  const items = [
    {
      label: (
        <Link to="/add/post" className="flex items-center">
          <SaveOutlined />
          <span className="uppercase font-merri font-bold">Үндсэн мэдээ</span>
        </Link>
      ),
      key: 'post',
    },
  ];
  const me = data?.me;

  useEffect(() => {
    if (isAdmin(me)) {
      items.push({
        label: (
          <Link to="/add/story" className="flex items-center">
            <PlaySquareOutlined />
            <span className="uppercase font-merri font-bold">Стори мэдээ</span>
          </Link>
        ),
        key: 'story',
      });
      items.push({
        label: (
          <Link to="/add/linked" className="flex items-center">
            <LinkOutlined />
            <span className="uppercase font-merri font-bold">Линктэй мэдээ</span>
          </Link>
        ),
        key: 'linked',
      });
    }
  }, [me]);
  return <Tabs className="max-w-[880px] mx-auto mt-[20px] border-b" size="large" items={items} {...rest} />;
};

export default AddTabs;
