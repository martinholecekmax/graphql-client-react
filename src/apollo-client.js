import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'x-access-token': 'ae86OfQigu8yUoPcrHxFbWHxzDm91ZJxp0lSlm2I',
      'Apollo-Require-Preflight': true,
    },
  };
});

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  headers: {
    'x-access-token': 'ae86OfQigu8yUoPcrHxFbWHxzDm91ZJxp0lSlm2I',
    'Apollo-Require-Preflight': true,
  },
  link: from([authLink, uploadLink]),
});
