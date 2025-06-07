import React from "react";
import { icons } from "../../assets/Assets";
function LefrSidebarLoginData({ url, title, name }) {
  return (
    <div className="group/i flex gap-2 w-full p-2 hover:bg-[#2d2d2d] rounded-lg cursor-pointer">
      <div className="relative w-11 rounded-sm overflow-hidden shrink-0">
        <img src={url} alt="" className="w-full h-full object-cover" />

        {/* Black overlay appears on hover */}
        <div className="absolute inset-0 w-full h-full bg-black opacity-0 group-hover/i:opacity-50 transition-opacity duration-200"></div>

        {/* Play icon appears on hover */}
        <span className="text-2xl text-white hover:text-red-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover/i:opacity-100 transition-opacity duration-200">
          {icons.play_icon}
        </span>
      </div>

      <div className="flex flex-col justify-between min-w-0">
        <p className="!leading-[1.2] !font-semibold text-white whitespace-nowrap">
          {title}
        </p>
        <p className="!leading-[1.3] text-gray text-[.9rem]  whitespace-nowrap">
          Playlist . <span>{name}</span>
        </p>
      </div>
    </div>
  );
}

export default LefrSidebarLoginData;
