import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {  createBrowserRouter,  RouterProvider,  } from 'react-router'
import { Home, User } from './Componenets/Comp.js'
 
const root = document.getElementById("root");

const router = createBrowserRouter([
  {
    path :'/',
    element : <App/>,
    children : [
      { index : true, element : <Home/>},
      { path : '/:Id' , element : <User/>},

    ],
  },
])

createRoot(root).render(
  <RouterProvider router={router}/>
);