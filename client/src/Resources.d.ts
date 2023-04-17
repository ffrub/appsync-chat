interface User {
  id: string;
  displayName: string;
  avatarUrl?: string;
  isOwner: boolean;
}

interface UserMap {
  [key: string]: User;
}

interface Message {
  id: string;
  chatroomId: string;
  text: string;
  createdAt: number;
  createdBy: string;
}

interface Chatroom<T extends "I" | "O"> {
  id: string;
  name: string;
  avatarUrl?: string;
  users: T extends "I" ? User[] : UserMap;
  messages: Message[];
}

interface ParsedToken {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  rid: string;
}
