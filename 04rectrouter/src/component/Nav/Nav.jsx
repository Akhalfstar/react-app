import React from "react";
import Btn from "../Btn/Btn";

function Nav() {
  return (
    <div className=" px-5 md:px-30  py-1 h-15 w-screen flex justify-between items-center border-1 mb-2 border-gray-500 ">
      <div className=" w-1/3 h-full flex justify-items-start items-center gap-1">
        <img src="/images/logo.png" className="h-full" />
        <div className="flex flex-col text-xl ">
          <span className=" text-orange-400 font-bold -mb-2.5  ">Your</span>
          <span className="font-bold  ">Logo</span>
        </div>
      </div>
      <div className=" flex w-1/3  justify-evenly  ">
        <Btn lable="Home" lnk="/" />
        <Btn lable="About Us" lnk="/About" />
        <Btn lable="Contact" lnk="/Contact" />
        <Btn lable="Github" lnk="/Github" />
      </div>

      <div className=" flex w-1/3 justify-end gap-10 items-center  ">
        <Btn lable="Get started" lnk="Get started" />
        <div className=" bg-gray-100 p-2 px-6  font-medium rounded-md shadow shadow-gray-300 hover:bg-amber-400 ">
          <Btn lable="Login" lnk="Login" /> 
        </div>
      </div>
    </div>
  );
}

export default Nav;
