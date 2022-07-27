import { gql } from '@apollo/client';

export const ARTICLE = gql`
  query GetArticle($id: ID!) {
    article(id: $id, impression: true) {
      id
      kind
      title
      slug
      imageUrl
      data
      viewsCount
      reactionsCount
      commentsCount
      publishDate
      description
      createdAt
      acceptComment
      categories {
        nodes {
          id
          name
          slug
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
  query GetComment($articleId: ID!, $sort: SortFilter) {
    article(id: $articleId) {
      comments(first: 10, sort: $sort) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            comment
            data
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
  mutation AddComment($articleId: ID!, $name: String, $comment: String) {
    addComment(input: { targetType: "article", targetId: $articleId, name: $name, comment: $comment }) {
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
      data
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      id
      mobile
      email
      firstName
      lastName
      avatar
      data
      role
      recipes {
        articles {
          nodes {
            id
            title
            imageUrl
          }
        }
      }
    }
  }
`;

export const USER = gql`
  query GetAuthor($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
      email
      data
      avatar
      status
      articles {
        totalCount
      }
      recipes {
        articles {
          nodes {
            id
            title
            image: imageUrl
            publish_date: publishDate
            source {
              id
              icon
              name
            }
            author {
              name: firstName
            }
          }
        }
      }
    }
  }
`;

export const ADD_REACTION = gql`
  mutation AddReaction($articleId: ID!, $action: ActionKind!) {
    createReaction(input: { targetId: $articleId, targetType: article, action: $action }) {
      id
    }
  }
`;

export const REACTIONS = gql`
  query GetReactions($articleId: ID!) {
    article(id: $articleId) {
      reactions {
        totalCount
        nodes {
          id
          action
        }
      }
    }
  }
`;
