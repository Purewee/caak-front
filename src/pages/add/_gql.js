import { gql } from '@apollo/client';

export const CATEGORIES = gql`
  query GetCategories {
    categories {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

export const POST = gql`
  query getArticle($id: ID!) {
    article(id: $id) {
      id
      title
      description
      imageUrl
      author {
        id
      }
      blocks {
        id
        kind
        position
        title
        content
        imageUrl
      }
      tags {
        id
        name
        slug
      }
      categoryIds
      categories {
        nodes {
          id
          name
          slug
        }
      }
    }
  }
`;

export const CREATE = gql`
  mutation AddPost(
    $title: String!
    $description: String
    $publishDate: ISO8601DateTime
    $acceptComment: Boolean
    $featured: Boolean
    $blocks: [BlockInput!]
    $categoryIds: [ID!]
    $tags: [String!]
  ) {
    addArticle(
      input: {
        title: $title
        description: $description
        publishDate: $publishDate
        acceptComment: $acceptComment
        featured: $featured
        blocks: $blocks
        categoryIds: $categoryIds
        tags: $tags
      }
    ) {
      id
    }
  }
`;

export const UPDATE = gql`
  mutation UpdatePost(
    $id: ID!
    $title: String!
    $description: String
    $publishDate: ISO8601DateTime
    $acceptComment: Boolean
    $featured: Boolean
    $blocks: [BlockInput!]
    $categoryIds: [ID!]
    $tags: [String!]
  ) {
    updateArticle(
      input: {
        id: $id
        title: $title
        description: $description
        publishDate: $publishDate
        acceptComment: $acceptComment
        featured: $featured
        blocks: $blocks
        categoryIds: $categoryIds
        tags: $tags
      }
    ) {
      id
    }
  }
`;

export const TAGS = gql`
  query Tags($filter: String) {
    tags(first: 20, filter: { nameOrSlug: { cont: $filter } }) {
      nodes {
        id
        name
        slug
      }
    }
  }
`;
