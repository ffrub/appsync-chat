import { createContext, createMemo, useContext, createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';
import jwtDecode from 'jwt-decode';

type Store = [
  { 
    users: User[],
    token: string | null,
    chatroom: Chatroom<'I'>,
  },
  { 
    setUsers?: (users: User[]) => void,
    getUsers?: () => UserMap,
    setToken?: (token: string) => void,
    getParsedToken?: () => ParsedToken | null,
    setChatroom?: (chatroom: Chatroom<'I'>) => void,
    getChatroom?: () => Chatroom<'I'>,
  }
]

const StoreContext = createContext<Store>();

export default function Provider(props: { children: any }) {
  let getUsers: () => UserMap;
  let getParsedToken: () => ParsedToken | null;
  const [state, setState] = createStore(
    {
      users: [],
      token: localStorage.getItem('jwt'),
      chatroom: null,
    }),
    store: Store = [
    state,
    {
      setUsers(users: User[]) {
        setState('users', users);
      },
      getUsers() {
        return getUsers();
      },
      setToken(token: string) {
        setState('token', token);
      },
      getParsedToken() {
        return getParsedToken();
      },
      setChatroom(chatroom: Chatroom<'I'>) {
        setState('chatroom', chatroom);
      },
      getChatroom() {
        return state.chatroom;
      },
    }
  ];

  createEffect(() => {
    state.token ? localStorage.setItem("jwt", state.token) : localStorage.removeItem("jwt");
  });

  getParsedToken = createMemo(() => {
    if (state.token) {
      return jwtDecode<ParsedToken>(state.token);
    }
    return null;
  });

  getUsers = createMemo(() => {
    let users: UserMap = {};
    state.users.forEach((u) => {
      users[u.id] = u;
    });

    return users;
  });

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
}

export function useStore() { return useContext(StoreContext); }
