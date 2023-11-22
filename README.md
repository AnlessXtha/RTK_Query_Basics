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

# New Concepts

## createApi function

1.  Purpose"

    - `createApi` is used to define an API service for data fetching in a Redux application.

2.  Parameters:

    - It takes an object as an argument with configuration properties.

      - `reducerPath`(string):

        - Specifies the name under which the API's state will be stored in the Redux store.
        - In the provided example, the state will be stored under the key "pokemonApi" in the Redux store.

      - `baseQuery`(object):

        - Configures the base query function for making API requests.
        - `fetchBaseQuery` is a helper function provided by Redux Toolkit Query to create a base query function.
        - It takes an object with properties such as baseUrl, which defines the base URL for API requests.

      - `endpoints`(function):

        - A function that defines the specific endpoints (queries, mutations, or subscriptions) of the API.

        - It receives a `builder` object as an argument, which is used to define endpoints.

          - `builder`(object):

            - The `builder` object passed to the `endpoints` function provides methods for defining different types of endpoints (queries, mutations, or subscriptions).

          - `getPokemonByName`(object):

            - An example endpoint defined as a query using builder.query.
            - It takes an object with a query property, where the query function is specified.
            - The query function takes parameters related to the specific API endpoint, such as name for the Pokemon name.

        - In the example, there's one endpoint called `getPokemonByName` defined as a query using `builder.query`.

3.  Usage:

    - The returned object (in this case, `pokemonApi`) contains hooks for each defined endpoint, making it easy to use in React components.

4.  Example Code:

            import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

            export const pokemonApi = createApi({
                reducerPath: "pokemonApi",
                baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
                endpoints: (builder) => ({
                    getPokemonByName: builder.query({
                    query: (name) => `pokemon/${name}`,
                    }),
                }),
            });

5.  Generated Hooks

    - The generated hooks, like `useGetPokemonByNameQuery`, can be used in React components to initiate API requests and access the fetched data.

In summary, `createApi` is a powerful utility that simplifies the creation of an API service in Redux Toolkit Query, providing a clean and convenient way to manage data fetching in a Redux application.
