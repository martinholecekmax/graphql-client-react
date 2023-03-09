import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductsPage from './pages/products';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Product from './pages/product';
import Navbar from './layout/navbar';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home';
import { createUploadLink } from 'apollo-upload-client';

const link = createUploadLink({
  uri: 'http://localhost:4000/graphql',
  headers: {
    'Apollo-Require-Preflight': true,
    'x-access-token': 'ae86OfQigu8yUoPcrHxFbWHxzDm91ZJxp0lSlm2I',
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  headers: {
    'x-access-token': 'ae86OfQigu8yUoPcrHxFbWHxzDm91ZJxp0lSlm2I',
    'Apollo-Require-Preflight': true,
  },
  link,
});

const router = new createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/products',
        element: <ProductsPage />,
      },
      {
        path: '/products/:id',
        element: <Product />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);

