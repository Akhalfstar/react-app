import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { About, Agent, Contact, Home, Property , Login , ForgotPassword , Register, PropertyDetails, AddProperty
  } from './Component/Comp.js'
import 'leaflet/dist/leaflet.css';


const root = document.getElementById("root");

const router = createBrowserRouter([
  {
    path: "/",
    element : <App/>,
    children : [
      { index : true, element : <Home/>},
      { path : "Property", element : <Property/>},
      { path : "About", element : <About/> },
      { path : "Agent", element : <Agent/> },
      { path : "Contact", element : <Contact/> },
      {path: "Details" , element : <PropertyDetails/>},
      {path: "Addproperty" , element : <AddProperty/>},


    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> }
]);

createRoot(root).render(
  <RouterProvider router={router}/>
)
