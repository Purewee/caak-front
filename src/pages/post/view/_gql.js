import { gql } from '@apollo/client';

export const ARTICLE = gql`
  query GetArticle($id: ID, $slug: String) {
    article(id: $id, slug: $slug, impression: true) {
      id
      kind
      title
      status
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
        avatar
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
            name
            comment
            likesCount
            dislikesCount
            repliesCount
            status
            ip
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
                  name
                  comment
                  likesCount
                  dislikesCount
                  status
                  ip
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
      follows {
        id
        __typename
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
      followersCount
      articles {
        totalCount
      }
      followers {
        totalCount
      }
      follows {
        id
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
              avatar
              id
            }
          }
        }
      }
    }
  }
`;

export const ADD_REACTION = gql`
  mutation AddReaction($articleId: ID!, $action: ActionKind!) {
    reaction: createReaction(input: { targetId: $articleId, targetType: article, action: $action }) {
      id
    }
  }
`;

export const UPDATE_REACTION = gql`
  mutation UpdateReaction($id: ID!, $action: ActionKind!) {
    reaction: updateReaction(input: { id: $id, action: $action }) {
      id
    }
  }
`;
export const REACTIONS = gql`
  query GetReactions($articleId: ID!) {
    article(id: $articleId) {
      reactionsSummary
    }
  }
`;
