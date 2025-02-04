import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { About, Agent, Contact, Home, Property  } from './Component/Comp.js'


const root = document.getElementById("root");

const router = createBrowserRouter([
  {
    path: "/",
    element : <App/>,
    children : [
      { index : true, element : <Home/>},
      { path : "Property", element : <Property/> },
      { path : "About", element : <About/> },
      { path : "Agent", element : <Agent/> },
      { path : "Contact", element : <Contact/> },

    ],
  },
]);

createRoot(root).render(
  <RouterProvider router={router}/>
)
