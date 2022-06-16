import { gql } from '@apollo/client';

export const ARTICLE = gql`
  query GetArticle($id: ID!) {
    article(id: $id, impression: true) {
      id
      title
      slug
      imageUrl
      data
      viewCount
      publishDate
      description
      createdAt
      categories {
        nodes {
          id
          name
        }
      }
      tags {
        id
        name
        slug
      }
      source {
        id
        slug
        icon
        name
      }
      author {
        id
        firstName
        lastName
      }
      blocks {
        id
        kind
        title
        content
        imageUrl
        data
        position
        status
      }
    }
  }
`;

export const COMMENTS = gql`
  query GetComment($articleId: ID!) {
    article(id: $articleId) {
      comments {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            comment
            status
            createdAt
            user {
              id
              email
              firstName
              lastName
            }
          }
        }
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($articleId: ID!, $comment: String) {
    addComment(input: { targetType: "article", targetId: $articleId, comment: $comment }) {
      id
      comment
      status
      createdAt
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;
