import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <nav>
        <div className="">
          <div className=" bg-gray-500 flex justify-between h-16 px-10 shadow items-center ">
            <div className="flex items-center space-x-8"></div>
            <div className="flex space-x-4 items-center">
            <Link className=" text-white" to={'/dashboard'}> Dashboard </Link>
              <Link className=" text-white" to={'/'}> Login </Link>
              <Link className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm" to={'/register'}> Register </Link>
            </div>
          </div>
        </div>
       
      </nav>
    </header>
  );
};
export default NavBar;
