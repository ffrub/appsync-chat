import gql from 'graphql-tag';

export const getChatroom = gql`
  query ($id: String!) {
    chatroom(id: $id) {
      id
      name
      avatarUrl
      users {
        id
        displayName
        avatarUrl
        isOwner
      }
      messages {
        id
        text
        createdAt
        createdBy
      }
    }
  }
`;
