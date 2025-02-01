import React from "react";
import Btn from "../Btn";

function Nav() {
  return (
    <div className=" px-5 md:px-30  py-1 h-15 w-screen flex justify-between items-center border-1 mb-2 border-gray-500 ">
      <div className=" w-30 h-full flex justify-items-start items-center gap-1">
        <img src="/images/logo.png" className="h-full" />
        <div className="flex flex-col text-xl ">
        <span className=" text-orange-400 font-bold -mb-2.5  "  >Your</span>
        <span className="font-bold  "  >Logo</span>
        </div>
      </div>
      <div className=" flex w-70 justify-between  ">
        <Btn lable="Home" lnk="hi" />
        <Btn lable="About Us" lnk="hi" />
        <Btn lable="Github" lnk="hi" />
        <Btn lable="Login" lnk="hi" />
      </div>
    </div>
  );
}

export default Nav;
