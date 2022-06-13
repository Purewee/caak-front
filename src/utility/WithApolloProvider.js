import React from 'react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  from as ApolloFrom,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import Configure from '../component/configure';
import { JSOAuth2, CredentialsFlow, OwnerFlow, AssertionFLow } from '@shoppymn/js-oauth2';
import { relayStylePagination } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';

const oauth = new JSOAuth2({
  clientId: Configure.cid,
  clientSecret: Configure.cs,
  accessTokenUri: `${Configure.host}/oauth/token`,
  authorizationUri: `${Configure.host}/oauth/authorize`,
});

const credentialsFlow = new CredentialsFlow(oauth);
const ownerFlow = new OwnerFlow(oauth);
const assertionFlow = new AssertionFLow(oauth);

let token = null;
const CLIENT_TOKEN_KEY = 'cs.t';
const USER_TOKEN_KEY = Configure.userTokenField;
const tokenString = localStorage.getItem(USER_TOKEN_KEY) || localStorage.getItem(CLIENT_TOKEN_KEY);

if (tokenString) {
  const parsed = JSON.parse(tokenString);
  token = oauth.createToken({
    access_token: parsed.accessToken,
    token_type: parsed.tokenType,
    refresh_token: parsed.refreshToken,
    expires: parsed.expires,
  });
}

function saveToken(newToken) {
  if (!newToken) return;
  token = newToken;
  localStorage.setItem(
    typeof newToken.refreshToken === 'undefined' ? CLIENT_TOKEN_KEY : USER_TOKEN_KEY,
    JSON.stringify({
      accessToken: newToken.accessToken,
      refreshToken: newToken.refreshToken,
      tokenType: newToken.tokenType,
      expires: newToken.expires,
    }),
  );
  return newToken;
}

async function rotateToken() {
  if (!token) return credentialsFlow.getToken().then(saveToken);
  if (!token.expired()) return token;
  if (token.refreshToken) return token.refresh().then(saveToken);
  return credentialsFlow.getToken().then(saveToken);
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message: msg }) => {
      // message.error(`error: ${msg}`);
      // eslint-disable-next-line no-console
      console.log(`error: ${msg}`);
    });
  if (networkError) {
    // message.error(`[Network error]: ${networkError}`);
    // eslint-disable-next-line no-console
    console.log(`Network error]: ${networkError}`);
  }
});

const authLink = setContext((_, { headers }) =>
  rotateToken()
    .then((t) => ({
      headers: { ...headers, authorization: `Bearer ${t?.accessToken}` },
    }))
    .catch(),
);

const cache = new InMemoryCache({
  typePolicies: {
    Article: {
      fields: {
        comments: relayStylePagination(['filter', 'sort']),
        reactions: relayStylePagination(['filter', 'sort']),
      },
    },
  },
});

function generateLinks() {
  const httpLink = ApolloLink.split(
    (operation) => operation.getContext().upload,
    createUploadLink({ uri: `${Configure.host}/graphql` }),
    createHttpLink({ uri: `${Configure.host}/graphql` }),
  );

  return ApolloFrom([errorLink, authLink.concat(httpLink)]);
}

export const apolloClient = new ApolloClient({ cache, link: generateLinks() });

apolloClient.onResetStore(async () => {
  apolloClient.setLink(generateLinks());
});

export function loginWithPassword(username, password) {
  return ownerFlow.getToken(username, password).then((tkn) => {
    apolloClient.resetStore();
    return saveToken(tkn);
  });
}

export function loginWithAssertion(assertion, provider) {
  return assertionFlow.getToken(assertion, provider).then((tkn) => saveToken(tkn));
}

export default function WithApolloProvider({ children }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
