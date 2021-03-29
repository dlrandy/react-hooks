// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
} from '../pokemon'
import type {PokemonData} from '../types'

function PokemonInfo({pokemonName}: {pokemonName: string}) {

  const [status, setStatus] = React.useState<string>('idle')
  const [pokemon, setPokemon] = React.useState<PokemonData | null>(null);
  const [error, setError] = React.useState<null | Error>(null);

  React.useEffect(() => {
    if(!pokemonName){
      return ;
    }
    setPokemon(null);
    setError(null);
    setStatus('pending');

    fetchPokemon(pokemonName).then(pokemon => {
      setPokemon(pokemon);
      setStatus('resolved');
    }, error => {
      setError(error)
      setStatus('rejected')
    })
  }, [pokemonName])

  if (status === 'rejected' && error != null) {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  } else if (status === 'idle') {
    return <span>Submit a pokemon</span>
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if(status === 'resolved' && pokemon !== null) {
    return <PokemonDataView pokemon={pokemon} />
  }

  throw new Error('this should be possible');
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName: string) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
