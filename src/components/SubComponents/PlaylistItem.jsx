import React, { useState } from "react";
import { icons } from "../../assets/Assets";

function PlaylistItem({
  title,
  desc,
  url,
  albumName,
  id,
  showheader,
  albumshow,
  dateadded,
  showcount,
  onClick,
  isActive,
  itemindex,
}) {
  return (
    <>
      {showheader && (
        <div className="flex items-center py-2 px-4 text-gray border-b-1 border-[#333]">
          <div className="flex gap-4 max-w-[40%]">
            <p>#</p>
            <p>Title</p>
          </div>

          {/* second column */}
          <div className=" w-[60%] ml-auto flex items-center justify-between">
            {albumshow && <p className="hidden xl:block">Album</p>}
            {dateadded && <p className="hidden xl:block ml-auto">Date added</p>}
            <p className="ml-auto">
              <span className="relative right-8">{icons.clock_icon}</span>
            </p>
          </div>
        </div>
      )}
      <div
        className="group hover:bg-[#323337] py-2 px-4 cursor-pointer"
        style={{ backgroundColor: isActive ? "rgb(50,51,55)" : "" }}
        onClick={onClick}
      >
        <div className="flex items-center">
          {/* first column */}
          <div
            className={`flex gap-4 max-w-[80%] ${
              albumshow ? "xl:max-w-[40%]" : "xl:max-w-[80%]"
            }  pr-4`}
          >
            {showcount && (
              <div className="relative text-right">
                <div
                  className={`w-4 relative top-[50%] -translate-y-1/2 ${
                    isActive ? "opacity-0" : "group-hover:opacity-0"
                  }`}
                >
                  {id}
                </div>
                <div
                  className={`absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-white text-lg ${
                    isActive
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {isActive ? icons.pause_icon : icons.play_icon}
                </div>
              </div>
            )}
            <div className="relative w-10 rounded-sm overflow-hidden shrink-0">
              <img src={url} alt="" />
              {!showcount && (
                <>
                  <div
                    className={`absolute inset-0 w-full h-full ${
                      isActive ? "bg-black" : ""
                    } opacity-50 group-hover:bg-black`}
                  ></div>
                  <span
                    className={`text-2xl  ${
                      isActive ? "block" : "hidden group-hover:block"
                    }  absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 `}
                  >
                    {isActive ? icons.pause_icon : icons.play_icon}
                  </span>
                </>
              )}
            </div>
            <div className="flex flex-col justify-between min-w-0">
              <p className="!leading-[1.2] text-white text-ellipsis whitespace-nowrap overflow-hidden">
                {title}
              </p>
              <p className="!leading-[1.3] text-[.8rem] text-ellipsis whitespace-nowrap overflow-hidden">
                {desc}
              </p>
            </div>
          </div>

          {/* second column */}
          <div className="w-[20%] xl:w-[60%] ml-auto flex items-center justify-between">
            {albumshow && (
              <div className="hidden xl:block text-sm text-gray">
                {albumName}
              </div>
            )}
            {dateadded && <div className="hidden xl:block ml-auto">asd</div>}
            <div className="flex items-center gap-4 ml-auto text-gray text-sm">
              <span className="opacity-0 group-hover:opacity-100">
                {icons.addplus_icon}
              </span>
              <span>3:03</span>
              <span className="opacity-0 group-hover:opacity-100">
                {icons.add_icon}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlaylistItem;
