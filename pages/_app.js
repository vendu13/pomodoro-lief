import "../styles/globals.css";
import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Navbar from "../components/Navbar/Navbar";
import { ContextProvider, client } from "@context/Context.js";
import { ApolloProvider } from "@apollo/client";
function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <ContextProvider>
          <Navbar />
          <Component {...pageProps} />
        </ContextProvider>
      </UserProvider>
    </ApolloProvider>
  );
}

export default MyApp;
