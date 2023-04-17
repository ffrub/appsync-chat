import gql from 'graphql-tag';

export const onAddMessage = gql`
  subscription($chatroomId: String!) {
    onAddMessage(chatroomId: $chatroomId) {
      id
      chatroomId
      text
      createdAt
      createdBy
    }
  }
`
