import React from "react";
import { Btn } from "../Comp";

function Nav() {
  return (
    <nav className=" h-15 w-full bg-white px-4 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Logo" className="h-8 w-8" />
          <span className="text-lg font-bold">MNNIT</span>
        </div>
        <div className="flex gap-4">
          <Btn lable="About us" lnk="About"></Btn>
          <Btn lable="Property" lnk="Property"></Btn>
          <Btn lable="Agent" lnk="Agent"></Btn>
          <Btn lable="Contact Us" lnk="Contact"></Btn>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
