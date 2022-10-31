import React from 'react';
import { gql, useQuery } from '@apollo/client';
import A1 from './a1';
import A2 from './a2';
import A3 from './a3';
import A4 from './a4';
import { Skeleton } from 'antd';

const BANNER = gql`
  query GetBanner($position: String!) {
    banner: randomBanner(position: $position) {
      id
      title
      url
      bannerType
      bannerLocation
      fileUrl
      mobileFileUrl
      data
    }
  }
`;

function Banner({ position }) {
  const { data, loading } = useQuery(BANNER, { variables: { position } });

  if (loading) return <Skeleton />;
  if (position === 'a1') return <A1 banner={data?.banner} />;
  if (position === 'a2') return <A2 banner={data?.banner} />;
  if (position === 'a3') return <A3 banner={data?.banner} />;
  if (position === 'a4') return <A4 banner={data?.banner} />;
}

export default Banner;
