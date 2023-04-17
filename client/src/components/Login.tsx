import { useStore } from '../store';

export default function Login() {
  const [_, { setToken }] = useStore();

  const login = (event: Event) => {
    event.preventDefault();
    const inp = document.getElementById('jwt') as HTMLInputElement;
    const jwt = inp.value;
    setToken(jwt);
  };


  return (
    <div class="flex justify-center items-center h-screen">
          <div class="w-full max-w-lg">
            <form
              onsubmit={login}
              class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  PASTE A TOKEN HERE
                </label>
                <textarea
                  id="jwt"
                  name="jwt"
                  class="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
                  rows={20}
                ></textarea>
              </div>
              <div class="flex items-center justify-between">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  style={{ width: '100%' }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
  )
}
