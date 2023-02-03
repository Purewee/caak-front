import { gql } from '@apollo/client';

export const ME = gql`
  query Me {
    me {
      id
      login
      mobile
      email
      firstName
      lastName
      avatar
      data
      role
      draftsCount
      recipes {
        id
        articlesCount
        articles {
          nodes {
            id
            title
            imageUrl
          }
        }
      }
      follows {
        id
        __typename
      }
    }
  }
`;
