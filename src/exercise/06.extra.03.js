// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null,
  });

  const {status, pokemon, error} = state;

  React.useEffect(() => {
    if(!pokemonName){
      return ;
    }
    setState({status: 'pending'})
    fetchPokemon(pokemonName).then(
      pokemonData => {
        // setStatus('resolved');
        // setPokemon(pokemonData);

        setState({
          status: 'resolved',
          pokemon: pokemonData
        })
      },
      err => {
        // setError(err);
        // setStatus('rejected');

        setState({
          status: 'rejected',
          error: err
        })
      },
    )
  }, [pokemonName])

  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />
  
  if (status === 'idle') {
    return 'Submit a pokemon'
  } else if(status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  }else if(status === 'rejected') {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  }
   else if(status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }
  

  throw new Error('This should be impossible');


  
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
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
