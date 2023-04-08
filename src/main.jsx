import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ApolloProvider } from '@apollo/client';

import { client } from './apollo-client';
import Notification from './components/notification/notification';
import Navbar from './layout/navbar';
import Categories from './pages/categories';
import Category from './pages/category';
import Home from './pages/home';
import Product from './pages/product';
import ProductsPage from './pages/products';
import {
  PRODUCT_CREATE_SUBSCRIPTION,
  PRODUCT_REMOVE_SUBSCRIPTION,
  PRODUCT_UPDATE_SUBSCRIPTION,
} from './queries/subscription';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications-component/dist/theme.css';
import ProductObserver from './hooks/product-observer';

import { ToastProvider } from 'react-toast-notifications';

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
      <ToastProvider>
        <RouterProvider router={router} />
        <ProductObserver
          titleProperty='title'
          messageProperty='description'
          subscription={PRODUCT_CREATE_SUBSCRIPTION}
        />
        <ProductObserver
          titleProperty='title'
          messageProperty='description'
          subscription={PRODUCT_REMOVE_SUBSCRIPTION}
          messageType='error'
        />
        <ProductObserver
          titleProperty='title'
          messageProperty='description'
          subscription={PRODUCT_UPDATE_SUBSCRIPTION}
          messageType='warning'
        />
      </ToastProvider>
    </ApolloProvider>
  </React.StrictMode>
);

