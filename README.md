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

## **Code**

### src/store.tsx

        import { configureStore } from "@reduxjs/toolkit";
        import { setupListeners } from "@reduxjs/toolkit/query";
        import { pokemonApi } from "./services/pokemon";

        export const store = configureStore({
        reducer: {
            [pokemonApi.reducerPath]: pokemonApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(pokemonApi.middleware),
        });

        setupListeners(store.dispatch);

## **Explained**

1.  Import Dependencies:

    - Imports necessary functions from Redux Toolkit for configuring the store (`configureStore`) and setting up listeners for background refetching (`setupListeners`).
    - Imports the `pokemonApi` from a specified path (`"./services/pokemon"`), which contains the configuration for a Redux Toolkit Query API service.

2.  Configure Redux Store:

    - Uses `configureStore` to create a Redux store.
    - Configures the store with a reducer that includes the generated reducer from the `pokemonApi` as a specific top-level slice. The reducerPath is used as the key for this slice.
    - Adds middleware to the store. The middleware is composed of the default middleware obtained using `getDefaultMiddleware` and the middleware from the `pokemonApi`.

      .concat function
      The `concat` function is used in the provided code to concatenate the default middleware obtained from `getDefaultMiddleware` with the middleware from the `pokemonApi`.

             Usecase
                     middleware: (getDefaultMiddleware) =>
                         getDefaultMiddleware().concat(pokemonApi.middleware),

      1. `getDefaultMiddleware`:

         - This function is provided by `@reduxjs/toolkit` and returns an array of default middleware that Redux Toolkit sets up automatically. This middleware includes common functionalities such as thunk middleware for handling asynchronous actions.

      2. `.concat(pokemonApi.middleware)`:

         The `concat` method is used to concatenate arrays. In this case, it's used to combine the default middleware array with the middleware array from the `pokemonApi`.

      3. Result:

         - The combined array of middleware is then passed to the `configureStore` function.
         - This ensures that both the default middleware and the middleware from the `pokemonApi` are applied to the Redux store.

    In summary, **`concat` is used to merge two arrays of middleware.** In this context, it's combining the default middleware with the middleware specific to the `pokemonApi`, allowing both sets of middleware to be applied to the Redux store. This is a common pattern when configuring middleware for a Redux store using Redux Toolkit.

3.  Setup Listeners for Background Refetching:

    - Calls `setupListeners` to set up listeners for background refetching of data. This is optional but required for certain features like `refetchOnFocus` and `refetchOnReconnect` in Redux Toolkit Query.
    - It takes the store's `dispatch` method as an argument to attach listeners to the store.

In summary, this code configures a Redux store for a React application using Redux Toolkit. It includes a specific top-level slice for the pokemonApi using a generated reducer. Middleware is added to enable features of Redux Toolkit Query. Additionally, listeners are set up to handle background refetching of data. The overall setup enhances the store's capabilities for managing API requests and ensures optimal performance in a Redux-powered React application.

## **Code**

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

## **Explained**

1.  Import Statements:

    - Imports necessary modules, including React, the component's styling (`"./App.css"`), and the `useGetPokemonByNameQuery` hook from the Pokemon API service.

2.  Component Function:

    - Declares a functional React component named `App`.
    - The component represents the main application.

3.  Query Hook Usage:

    - Uses the `useGetPokemonByNameQuery` hook to automatically fetch Pokemon data for the Pokemon named "mew". The hook returns an object with properties like `data`, `error`, and `isLoading`.

4.  Conditional Rendering:

    - Conditionally renders content based on the state of the query:
      - If there's an `error`, it displays an error message.
      - If it's still `isLoading`, it displays a loading message.
      - If `data` is available, it displays the Pokemon's name (`data.species.name`) and an image (`data.sprites.front_shiny`).

5.  Endpoint Variation (commented out):

    - Shows an alternative way to use the individual hooks for each endpoint by directly accessing them from the generated `pokemonApi`. This is commented out in the example.

6.  Return JSX:

    - Returns JSX with the rendered content based on the query state.
    - Uses conditional rendering to handle different states (loading, error, success).

7.  Export Default:

    - Exports the `App` component as the default export.

In summary, this component demonstrates the usage of Redux Toolkit Query to fetch Pokemon data using a query hook. It handles different states (loading, error, success) and conditionally renders content based on the query result.

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
