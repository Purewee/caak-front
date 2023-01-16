import React from 'react';
import { useLazyQuery, gql } from '@apollo/client';

const BANNER = gql`
  query ImpressBanner($id: ID!) {
    banner(id: $id, impression: true) {
      id
    }
  }
`;

const ImpressedLink = ({ id, children, ...rest }) => {
  const [impress] = useLazyQuery(BANNER, { variables: { id }, skip: !id });
  return (
    <a onClick={() => impress()} {...rest}>
      {children}
    </a>
  );
};

export default ImpressedLink;
