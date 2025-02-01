import React from 'react'
// import {NavLink} from 'react-router-dom';
import { NavLink } from "react-router-dom";

function Btn({
    lable,
    lnk,
}) {
  return (
    // <NavLink to={lnk} >
    //     {lable}
    // </NavLink>
    <div className=' font-medium'>
        {lable}
    </div>
  )
}

export default Btn