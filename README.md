# Code Explaination

## Code

### src/services/pokemon.tsx

    //Need to use the React-specific entry point to import create API
    import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

    // Define a service using a base URL and expected endpoints
    export const pokemonApi = createApi({
    reducerPath: "pokemonApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
    endpoints: (builder) => ({
        getPokemonByName: builder.query({
        query: (name) => `pokemon/${name}`,
        }),
    }),
    });

    // Export hooks for usage in fuctional components
    export const { useGetPokemonByNameQuery } = pokemonApi;

## **Explained**

1.  Import Dependencies:

    - The code imports necessary functions from `@reduxjs/toolkit/query/react` for creating the API service.

2.  Create Pokemon API Service:

    - The `pokemonApi` object is created using the `createApi` function.
    - It specifies a base URL (`https://pokeapi.co/api/v2/`) for making requests to the Pokemon API.

3.  Define Endpoint:

    - An endpoint named `getPokemonByName` is defined using the builder.query method.
    - This endpoint allows fetching Pokemon data by name, and the API request is formed as `pokemon/{name}`.

4.  Export Hooks:

    - The generated API service provides a hook for each defined endpoint.
