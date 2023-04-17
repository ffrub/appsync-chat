import { createResource, createSignal, createEffect, For } from "solid-js";
import { Queries, Mutations, Subscriptions } from '../graphql';
import { useStore } from "../store";
import getClient from "../services/appsync";

import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";


export default function ChatContainer() {
  const [store, { setUsers, setChatroom, getParsedToken }] = useStore();

  const [messages, setMessages] = createSignal<Message[]>([]);

  const client = getClient(store.token);

  let createObservable = client.subscribe({
    query: Subscriptions.onAddMessage,
    variables: { chatroomId: "0dc94c94-a36e-420e-9d6f-eeeaacbe87e1" },
  })

  createObservable.subscribe({
    next: ({ data }) => setMessages(msgs => [...msgs, data.onAddMessage]),
  })

  const [chatroom] = createResource(async () => {
    const { data } = await client.query<{ chatroom: Chatroom<'I'> }>({
      query: Queries.getChatroom,
      variables: { id: "0dc94c94-a36e-420e-9d6f-eeeaacbe87e1" },
    })

    setChatroom(data.chatroom);
    setUsers(data.chatroom.users);

    let users: UserMap = {};
    data.chatroom.users.forEach((u) => {
      users[u.id] = u;
    });

    return { ...data.chatroom, users };
  });


  async function addMessage(event: Event) {
    event.preventDefault();
    const input = event.target[0] as HTMLInputElement;
    const text = input.value;

    if (!text) return;

    await client.mutate<{ addMessage: Message }>({
      mutation: Mutations.createChatroom,
      variables: { text, chatroomId: chatroom().id },
    })

    input.value = "";
  }

  createEffect(() => {
    setMessages(chatroom()?.messages);
  });

  return (
     <div class="flex flex-col h-screen">
      <div class="flex-1 overflow-y-scroll px-8 py-20">
        <div class="flex flex-col gap-4">
          <For each={messages()}>
            {message => (
              <ChatMessage
                message={message.text}
                isUser={chatroom()?.users[message.createdBy].id === getParsedToken().sub}
                avatarUrl={chatroom()?.users[message.createdBy].avatarUrl}
                createdAt={message.createdAt}
              />
            )}
          </For>
        </div>
      </div>
      <ChatInput addMessage={addMessage} />
    </div>
  )
}
