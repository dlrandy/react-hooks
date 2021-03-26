// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(key, value) {
  const [item, setItem] = React.useState(()=> (window.localStorage.getItem(key) || value))
  React.useEffect(() => {
    window.localStorage.setItem(key, item);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, key])
 return [item , setItem]
}


function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  const [name, setName] = useLocalStorageState('name',initialName)

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  function handleChange(event) {
    setName(event.target.value);
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
