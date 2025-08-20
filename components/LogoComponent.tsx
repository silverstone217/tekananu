import React from "react";

const LogoComponent = () => {
  return (
    <div
      className="
        flex flex-col items-center 
        font-extrabold tracking-tight
        select-none
        w-fit
        h-16
        justify-center
      "
      style={{ transform: "skewY(-12deg)" }}
    >
      <span
        className="
          bg-gradient-to-r from-yellow-400 to-yellow-600 
          text-white shadow-md 
          lg:px-3 px-2 py-0.5 rounded-sm 
          lg:text-base
          drop-shadow-sm
          transition-colors duration-300 ease-in-out
          cursor-default
          select-text
          leading-none
        "
      >
        Teka
      </span>
      <span
        className="
          bg-gradient-to-r from-yellow-700 to-yellow-900
          text-white shadow-md 
          lg:px-3 px-2 py-0.5 rounded-sm 
          lg:text-base
          drop-shadow-sm
          transition-colors duration-300 ease-in-out
          cursor-default
          select-text
          leading-none
        "
      >
        Nanu
      </span>
    </div>
  );
};

export default LogoComponent;
