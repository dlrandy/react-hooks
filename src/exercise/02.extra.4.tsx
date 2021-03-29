// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

type UseLocalStorageOptions<TState = unknown> = {
  serialize?: (data: TState) => string
  deserialize?: (str: string) => TState
}

function useLocalStorageState<TState>(
  key: string,
  initValue: TState | (() => TState),
  {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  }: UseLocalStorageOptions<TState> = {},
) {
  const [state, setState] = React.useState<TState>(
    () =>{
     const valueInLocalStorage =  window.localStorage.getItem(key);
      if(valueInLocalStorage){
        try {
          return deserialize(valueInLocalStorage);
        } catch (error) {
          window.localStorage.removeItem(key)
        }
      }

      return   initValue instanceof Function ? initValue() : initValue
    }
  )

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if(prevKey !== key){
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState] as const
}

function Greeting({initialName = ''}: {initialName?: string}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName
  const [name, setName] = useLocalStorageState<string>('name', initialName)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.currentTarget.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
