import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';

import client from "./services/server";
import Header from './components/Header';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
        <div className="min-h-full container mx-auto max-w-screen-lg m-4">
        <Header />
        <main className="border border-1 p-4 rounded-b-md">
          <Component {...pageProps} />
        </main>
      </div>

    </ApolloProvider>
  );
}

export default MyApp;
