import { gql } from '@apollo/client';

export const CATEGORIES = gql`
  query GetCategories {
    categories {
      nodes {
        id
        name
        fullName
        slug
        status
        parent {
          id
        }
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
      featuredDays
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
  mutation AddPost($input: addArticleInput!) {
    article: addArticle(input: $input) {
      id
    }
  }
`;

export const UPDATE = gql`
  mutation UpdatePost($input: updateArticleInput!) {
    article: updateArticle(input: $input) {
      id
    }
  }
`;

export const TAGS = gql`
  query Tags($filter: String) {
    tags(filter: { nameOrSlug: { cont: $filter } }) {
      nodes {
        id
        name
        slug
        following
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
    sources(sort: { field: "id", direction: asc }) {
      nodes {
        id
        name
        icon
        domain
        following
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
