import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter , createBrowserRouter, Route , RouterProvider, Routes } from 'react-router'
import { Home, User } from './Componenets/Comp.js'
 
const root = document.getElementById("root");

const router = createBrowserRouter([
  {
    path :'/',
    element : <App/>,
    children : [
      { index : true, path: '/Home' , element : <Home/>},
      { path : '/:Id' , element : <User/>},
      
    ],
  },
])

createRoot(root).render(
  <RouterProvider router={router}/>
);