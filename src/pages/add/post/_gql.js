import { gql } from '@apollo/client';

export const CATEGORIES = gql`
  query GetCategories {
    categories {
      nodes {
        id
        name
        fullName
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
      status
      publishDate
      description
      imageUrl
      data
      featured
      featuredFrom
      featuredTo
      acceptComment
      author {
        id
      }
      source {
        id
      }
      blocks {
        id
        kind
        position
        title
        content
        imageUrl
        videoUrl
        data
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
    $status: String
    $description: String
    $publishDate: ISO8601DateTime
    $image: Upload
    $acceptComment: Boolean
    $featured: Boolean
    $featuredFrom: ISO8601DateTime
    $featuredTo: ISO8601DateTime
    $blocks: [BlockInput!]
    $categoryIds: [ID!]
    $tags: [String!]
    $data: JSON
    $sourceId: ID
    $imageUrl: String
    $kind: String
  ) {
    article: addArticle(
      input: {
        title: $title
        status: $status
        description: $description
        image: $image
        publishDate: $publishDate
        acceptComment: $acceptComment
        featured: $featured
        featuredFrom: $featuredFrom
        featuredTo: $featuredTo
        blocks: $blocks
        categoryIds: $categoryIds
        tags: $tags
        data: $data
        sourceId: $sourceId
        imageUrl: $imageUrl
        kind: $kind
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
    $status: String
    $description: String
    $image: Upload
    $publishDate: ISO8601DateTime
    $acceptComment: Boolean
    $featured: Boolean
    $featuredFrom: ISO8601DateTime
    $featuredTo: ISO8601DateTime
    $blocks: [BlockInput!]
    $categoryIds: [ID!]
    $tags: [String!]
    $data: JSON
    $sourceId: ID
    $imageUrl: String
    $kind: String
  ) {
    article: updateArticle(
      input: {
        id: $id
        title: $title
        status: $status
        description: $description
        image: $image
        publishDate: $publishDate
        acceptComment: $acceptComment
        featured: $featured
        featuredFrom: $featuredFrom
        featuredTo: $featuredTo
        blocks: $blocks
        categoryIds: $categoryIds
        tags: $tags
        data: $data
        sourceId: $sourceId
        imageUrl: $imageUrl
        kind: $kind
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

export const CONVERT_LINK = gql`
  mutation ConvertLink($link: String!) {
    convertLink(input: { link: $link })
  }
`;

export const SOURCES = gql`
  query GetSources {
    sources {
      nodes {
        id
        name
        icon
        domain
        articlesCount
        slug
      }
    }
  }
`;

export const UPLOAD = gql`
  mutation UploadFile($blob: Upload!) {
    directUpload(input: { blob: $blob })
  }
`;
