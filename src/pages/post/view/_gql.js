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
  query GetComment($articleId: ID!, $sort: SortFilter, $after: String) {
    article(id: $articleId) {
      commentsCount
      comments(first: 10, sort: $sort, after: $after) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            comment
            likesCount
            dislikesCount
            repliesCount
            data
            status
            parentId
            targetId
            createdAt
            user {
              id
              email
              firstName
              lastName
            }
            childs(sort: { direction: asc, field: "createdAt" }) {
              totalCount
              pageInfo {
                hasNextPage
                endCursor
              }
              edges {
                node {
                  id
                  comment
                  likesCount
                  dislikesCount
                  data
                  status
                  parentId
                  targetId
                  createdAt
                  parent {
                    id
                  }
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
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($articleId: ID!, $name: String, $comment: String, $parentId: ID) {
    addComment(
      input: { targetType: "article", targetId: $articleId, name: $name, comment: $comment, parentId: $parentId }
    ) {
      id
      comment
      status
      parent {
        id
      }
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

export const REACT_COMMENT = gql`
  mutation ReactComment($commentId: ID!, $action: String!) {
    reactComment(input: { id: $commentId, action: $action }) {
      id
      likesCount
      dislikesCount
    }
  }
`;

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
      following
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
