import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { About, Contact, Github, Home, User } from "./component/Comp.js";
import { githubInfoLoader } from "./component/Github/Github.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "/:Id" , element: <User/> },
      { path: "github", element: <Github />, loader: githubInfoLoader },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);


// const root = document.getElementById("root");

// ReactDOM.createRoot(root).render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element = {<App/>} >
//         <Route index element = {<Home/>} />
//         <Route path="/About" element = {<About/>} />
//         <Route path="/Contact" element = {<Contact/>} />
//         <Route loader={githubInfoLoader}
//         path="/Github" element = {<Github/>} />
//       </Route>
//     </Routes>
//   </BrowserRouter>
// );
