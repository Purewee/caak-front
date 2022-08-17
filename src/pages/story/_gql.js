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
