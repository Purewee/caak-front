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
      nextStoryId
      prevStoryId
      categories {
        nodes {
          id
          slug
          name
        }
      }
      nextStories {
        id
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
      prevStories {
        id
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
