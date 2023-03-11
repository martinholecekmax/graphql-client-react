import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductsPage from './pages/products';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo-client';

import Product from './pages/product';
import Navbar from './layout/navbar';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home';
import Categories from './pages/categories';
import Category from './pages/category';

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
      {
        path: '/categories',
        element: <Categories />,
      },
      {
        path: '/categories/:id',
        element: <Category />,
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

