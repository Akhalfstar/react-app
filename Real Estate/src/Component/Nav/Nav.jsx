import React from "react";
import { Btn } from "../Comp";
import { NavLink } from "react-router";

function Nav() {
  return (
    <nav className=" h-20 w-full px-8 py-4 ">
      <div className=" h-full mx-auto flex items-center justify-between">
        <NavLink to="">
        <div className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Logo" className="h-8 w-8" />
          <span className="text-lg font-bold">MNNIT</span>
        </div>
        </NavLink>
        <div className="flex items-center gap-4">
          <Btn lable="About us" lnk="About"></Btn>
          <Btn lable="Property" lnk="Property"></Btn>
          <Btn lable="Agents" lnk="Agent"></Btn>
          <Btn lable="Contact Us" lnk="Contact"></Btn>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
