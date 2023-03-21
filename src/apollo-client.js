import { ApolloClient, InMemoryCache, from, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';
import { createClient } from 'graphql-ws';

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/graphql',
  })
);

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
  // link: from([authLink, uploadLink]),
  link: split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    from([authLink, uploadLink])
  ),
});
