import React from 'react'
import { NavLink } from "react-router-dom";

function Btn({
    lable,
    lnk,
}) {
  return (
    <NavLink to={lnk} className={({isActive})=> isActive? " text-orange-500" : ""}  >
        {lable}
    </NavLink>
  )
}

export default Btn