import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './context/store.js'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { AuthWrapper } from './components'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from './pages/Signup'
import MyPost from './pages/MyPost.jsx'
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound"



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthWrapper authentication={false}>
            <Login />
          </AuthWrapper>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthWrapper authentication={false}>
            <Signup />
          </AuthWrapper>
        ),
      },
      {
        path: "/my-posts",
        element: (
          <AuthWrapper authentication>
            {" "}
            <MyPost />
          </AuthWrapper>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthWrapper authentication>
            {" "}
            <AddPost />
          </AuthWrapper>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthWrapper authentication>
            {" "}
            <EditPost />
          </AuthWrapper>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
      {
        path: '*',
        element: <NotFound />, // Handling 404 errors
      },
    ],
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
