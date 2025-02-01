import React from "react";

function Footer() {
  return (
    <>
      <div>

        <div className="flex px-5 md:px-30 justify-between  h-40 border-1 border-gray-500 ">
          <div className=" w-30 h-full flex justify-items-start items-center gap-1">
            <img src="/images/logo.png" className="h-fit" />
            <div className="flex flex-col text-xl ">
              <span className=" text-orange-400 font-bold -mb-2.5  ">Your</span>
              <span className="font-bold  ">Logo</span>
            </div>
          </div>

          <div className=" w-1/2 h-full flex justify-between items-center">
            <ul className="flex flex-col gap-3.5">
                <li className=" uppercase mb-2 font-bold text-xs">
                    Resources
                </li>
                <li className="text-sm font-medium">
                    Home
                </li>
                <li className="text-sm font-medium">
                    About
                </li>
            </ul>
            <ul className="flex flex-col gap-3.5">
                <li className=" uppercase mb-2 font-bold text-xs">
                    Follow Us
                </li>
                <li className="text-sm font-medium">
                    Github
                </li>
                <li className="text-sm font-medium">
                    Discord
                </li>
            </ul>
            <ul className="flex flex-col gap-3.5">
                <li className=" uppercase mb-2 font-bold text-xs">
                    Legel
                </li>
                <li className="text-sm font-medium">
                    Privacy Policy
                </li>
                <li className="text-sm font-medium">
                    Term & Conditions
                </li>
            </ul>
          </div>
        </div>

        <div className="px-30 h-15 flex justify-between items-center">
            <span>
                To chalo start karte h cahi pina
            </span>
            <div className="flex gap-1">
                <img alt="pq" />
                <img alt="pq" />
                <img alt="pq" />
                <img alt="pq" />
                
            </div>
        </div>

      </div>
    </>
  );
}

export default Footer;
