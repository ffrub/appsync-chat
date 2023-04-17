interface ChatMessageProps {
  message: string;
  isUser: boolean;
  avatarUrl: string;
  createdAt: number;
}

export default function ChatMessage(props: ChatMessageProps) {

  const createdAt = new Date(props.createdAt * 1000);
  const createdAtString = createdAt.toLocaleTimeString("de-DE", { timeZone: "CET", hour: '2-digit', minute: '2-digit' });

  if (props.isUser) {
    return (
      <div class="flex items-end justify-end">
        <div class="bg-gray-300 rounded-lg py-2 px-4 max-w-xs">
          <p>{ props.message }</p>
          <small class="float-right text-gray-600 text-xs text-opacity-60">{ createdAtString }</small>
        </div>
        <img src={`${props.avatarUrl}`} alt="User Avatar" class="w-8 h-8 rounded-full ml-2" />
      </div>
    )
  }

  return (
    <div class="flex items-end">
      <img src={`${props.avatarUrl}`} alt="User Avatar" class="w-8 h-8 rounded-full mr-2" />
      <div class="bg-blue-500 text-white rounded-lg py-2 px-4 max-w-xs">
        <p>{ props.message }</p>
        <small class="float-right text-gray-300 text-xs text-opacity-60">{ createdAtString }</small>
      </div>
    </div>
  )
}
