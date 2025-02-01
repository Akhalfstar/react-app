import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route , Routes } from "react-router";
import App from "./App.jsx";
import "./index.css"; 
import { About, Contact, Home } from "./component/Comp.js";


const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element = {<App/>} >
        <Route index element = {<Home/>} />
        <Route path="/About" element = {<About/>} />
        <Route path="/Contact" element = {<Contact/>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
