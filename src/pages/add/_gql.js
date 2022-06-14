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
    $blocks: [JSON!]
    $categoryIds: [ID!]
    $tagIds: [ID!]
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
        tagIds: $tagIds
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
    $blocks: [JSON!]
    $categoryIds: [ID!]
    $tagIds: [ID!]
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
        tagIds: $tagIds
      }
    ) {
      id
    }
  }
`;
