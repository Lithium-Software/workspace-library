import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  DefaultTheme,
  Provider as PaperProvider,
  Theme,
} from "react-native-paper";
import { StatusBar } from "react-native";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import AppNavigator from "./navigation/AppNavigator";

const theme: Theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#ffb900",
    accent: "#f1c40f",
  },
};

const link = new HttpLink({
  uri: "https://workspace-library.now.sh/api/graphql", // Server URL (must be absolute)
});
const cache = new InMemoryCache();

const client = new ApolloClient({
  link: link,
  cache: cache,
});

const MyApp = () => (
  <PaperProvider theme={theme}>
    <ApolloProvider client={client}>
      <NavigationContainer>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <AppNavigator />
      </NavigationContainer>
    </ApolloProvider>
  </PaperProvider>
);

export default MyApp;
