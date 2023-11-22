import React from "react";
import "./App.css";
import { useGetPokemonByNameQuery } from "./services/pokemon";

function App() {
  // Using a query hook automatically fetches data and returns query value
  const { data, error, isLoading } = useGetPokemonByNameQuery("mew");
  // Indvidual hooks are also accessible under the generate endpoints:
  // const { data, error, isLoading} = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  return (
    <div className="App">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.species.name}</h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null}
    </div>
  );
}

export default App;
