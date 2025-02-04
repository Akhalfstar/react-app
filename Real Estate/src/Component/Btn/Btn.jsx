import React from "react";
import { NavLink } from "react-router";

function Btn({ lable, lnk }) {
  return (
    <div className=" flex justify-center items-center " >
      <NavLink
        to={lnk}
        className={({ isActive }) => (isActive ? " bg-black rounded-4xl py-1.5 px-4 text-white " : "py-1.5 px-4")}
      >
        {lable}
      </NavLink>
    </div>
  );
}

export default Btn;
