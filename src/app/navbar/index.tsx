
import React, { useEffect } from "react";
import Link from "next/link";
import Logo from "./logo";
import Button from "./button";
import Register from "../register/page"
import axios from 'axios';


const Navbar = () => {




  return (
    
    <>
    
      <div className="w-full h-20 bg-gray-700 sticky top-0">
        <div className="mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full font-montserrat font-bold">
            <Logo />
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link href="/">
                  <p>Home</p>
                </Link>
              </li>
              <li>
                <Link href="/crimePage">
                  <p>Summary</p>
                </Link>
              </li>
            </ul>
            <Button/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;