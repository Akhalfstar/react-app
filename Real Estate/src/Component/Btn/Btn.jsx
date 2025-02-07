import React from "react";
import { NavLink } from "react-router";

function Btn({ lable, lnk }) {
  return (
    <div className=" flex justify-center rounded-2xl items-center text-lg hover:bg-gray-200  " >
      <NavLink
        to={lnk}
        className={({ isActive }) => (isActive ? " bg-black rounded-2xl py-1.5 px-4 text-white " : "py-1.5 px-4")}
      >
        {lable}
      </NavLink>
    </div>
  );
}

export default Btn;
