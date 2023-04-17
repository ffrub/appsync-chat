import { Component, Show } from 'solid-js';
import { useStore } from "./store";
import ChatContainer from "./components/ChatContainer";
import ChatHeader from "./components/ChatHeader";
import Login from "./components/Login";

const App: Component = () => {
  const [state] = useStore()

  return (
    <>
      <ChatHeader />
      <Show when={state.token} fallback={<div></div>}>
        <ChatContainer />
      </Show>
      <Show when={!state.token} fallback={<div></div>}>
        <Login />
      </Show>
    </>
  );
};

export default App;
