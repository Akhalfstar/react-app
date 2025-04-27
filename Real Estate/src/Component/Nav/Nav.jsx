import React, { useEffect, useRef, useState } from "react";
import { Btn } from "../Comp";
import { NavLink, useNavigate } from "react-router";
import UserAvatar from "./userlogo";

function Nav({ user }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/users/logout", {
        method: "POST",
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
    
  };

  const handleClick = () => {
    if (user) {
      navigate("/Agent");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className=" h-20 w-full px-8 py-4 ">
      <div className=" h-full mx-auto flex items-center justify-between">
        <NavLink to="">
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Logo" className="h-8 w-8" />
            <span className="text-lg font-bold">EstateHub</span>
          </div>
        </NavLink>
        <div className="flex items-center gap-4">
          <Btn lable="Home" lnk=""></Btn>
          {/* <Btn lable="About us" lnk="About"></Btn> */}
          <Btn lable="Property" lnk="Property"></Btn>
          {/* <Btn lable="Agents" lnk="Agent"></Btn> */}
          {/* <Btn lable="Contact Us" lnk="Contact"></Btn> */}

          {/* <Btn lable="Agents" lnk="Agent"></Btn> */}


          <div className="relative">
            <div ref={menuRef} className="relative inline-block text-left">
              <div onClick={() => setOpen(!open)} className="cursor-pointer">
                <UserAvatar user={user} />
              </div>

              {open && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white z-50 animate-fadeIn">
                  <button
                    onClick={handleClick}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition font-medium rounded-t-xl"
                  >
                    🧑 My Profile
                  </button>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition font-medium rounded-b-xl"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
