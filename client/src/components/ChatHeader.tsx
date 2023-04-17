import { Show } from 'solid-js';
import { useStore } from "../store";

export default function ChatHeader() {
  const [_, { getChatroom }] = useStore();

  return (
    <div class="fixed top-0 left-0 w-full bg-gray-800 text-white py-4 px-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <Show when={getChatroom()}>
            <img src={`${getChatroom()?.avatarUrl}`} alt="Group Avatar" class="w-10 h-10 rounded-full mr-2" />
            <h1 class="text-lg font-medium">{ getChatroom()?.name }</h1>
          </Show>
          <Show when={!getChatroom()}>
            <div class="w-10 h-10 rounded-full mr-2 bg-gray-600 animate-pulse" />
            <div class="w-32 h-4 rounded bg-gray-600 animate-pulse" />
          </Show>
        </div>
      </div>
    </div>
  )
}
