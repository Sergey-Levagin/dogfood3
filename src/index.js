import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Signin } from './components/Signin/Signin'
import { User } from './components/User/User'
import { Products } from './components/Products/Products'
import { Signup } from './components/Signup/Signup'
import { Cart } from './components/Cart/Cart'
import { Product } from './components/Product/Product'
import { store } from './redux'
import { Favourite } from './components/Favourite/Favourite'
import { AddNewProduct } from './components/AddNewProduct/AddNewProduct'
import { EditProduct } from './components/EditProduct/EditProduct'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{
      path: 'signin',
      element: <Signin />,
    },
    {
      path: 'user',
      element: <User />,
    },
    {
      path: 'products',
      element: <Products />,
    },
    {
      path: 'signup',
      element: <Signup />,
    },
    {
      path: 'cart',
      element: <Cart />,
    },
    {
      path: 'product_id::id',
      element: <Product />,
    },
    {
      path: 'favourite',
      element: <Favourite />,
    },
    {
      path: 'addNewProduct',
      element: <AddNewProduct />,
    },
    {
      path: 'edit_product_id::id',
      element: <EditProduct />,
    },
    ],
  },
])
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
