import { gql } from '@apollo/client';

export const STORY = gql`
  query getArticle($id: ID!) {
    article(id: $id, impression: true) {
      id
      title
      description
      imageUrl
      data
      featured
      featuredFrom
      featuredTo
      acceptComment
      publishDate
      categories {
        nodes {
          id
          slug
          name
        }
      }
      nextStory {
        id
        title
        categories {
          nodes {
            id
            slug
            name
          }
        }
        blocks {
          id
          title
          kind
          position
          imageUrl
          videoPreview
        }
      }
      prevStory {
        id
        title
        categories {
          nodes {
            id
            slug
            name
          }
        }
        blocks {
          id
          kind
          title
          position
          imageUrl
          videoPreview
        }
      }
      author {
        avatar
        id
        avatar
        firstName
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
        videoPreview
        videoDuration
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
