export default function ChatInput(props: { addMessage: (event: Event) => void }) {
  return (
    <div class="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4 px-6">
      <form onsubmit={props.addMessage} class="flex items-center">
        <input type="text" placeholder="Type your message here..." class="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="submit" class="ml-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Send</button>
      </form>
    </div>
  )
}
