import React from 'react';
import { useQuery, gql } from '@apollo/client';

const ME = gql`
  query Me {
    me {
      id
      mobile
      email
      firstName
      lastName
    }
  }
`;
export default function UserInfo() {
  const { data, loading } = useQuery(ME);
  if (loading) return <span>Loading ...</span>;
  return <button>{data?.me?.email}</button>;
}
