import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { createGlobalStyle } from 'styled-components'
import * as serviceWorker from './serviceWorker';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

const client = new ApolloClient({
  uri: 'https://assessment.staging.enterprisegrade.io/graphql'
});

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <GlobalStyle/>
    <Root/>
  </ApolloProvider>
)

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
