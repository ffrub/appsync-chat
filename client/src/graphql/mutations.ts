import gqp from 'graphql-tag';

export const createChatroom = gqp`
  mutation ($text: String!, $chatroomId: String!) {
    addMessage(
      chatroomId: $chatroomId
      text: $text
    ) {
      id,
      chatroomId,
      text,
      createdAt,
      createdBy,
    }
  }
`;

