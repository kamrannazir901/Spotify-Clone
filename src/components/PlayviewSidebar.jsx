import React from "react";
import { icons } from "../assets/Assets";
import { playlists } from "../assets/Assets";
import { usePlayerContext } from "../context/PlayerContext";

function PlayviewSidebar({ toggleExpand, expandPlayView }) {
  const { track } = usePlayerContext();

  return (
    <div
      className={`group flex flex-col bg-layout h-full ${
        expandPlayView ? "ml-3" : ""
      } mr-3 p-2 rounded overflow-y-auto`}
    >
      <div className="flex justify-between items-center py-4">
        <h3 className="flex items-center gap-2 cursor-pointer">
          <span className="text-2xl text-gray hover:text-white relative left-[-50%] w-0 group-hover:left-0 transition-all delay-10 group-hover:w-auto">
            {icons.sidebar_left_expand}
          </span>
          Your Library
        </h3>
        <h3
          onClick={toggleExpand}
          className="cursor-pointer rounded-full w-8 h-8 hover:bg-box grid place-content-center"
        >
          <span className="text-xl text-[#8B8B8B]">{icons.expand_icon}</span>
        </h3>
      </div>
      <div className=" flex flex-col">
        <div className="image m-auto">
          <img src={track.url} className="w-[500px]" alt="" />
        </div>

        <div className="flex items-center justify-between gap-1 py-4 px-4 mb-6 rounded">
          <div className="">
            <h3 className="text-[1.5rem]">{track.title}</h3>
            <p className="text-sm !leading-[1.1] text-gray mt-[-2px] !font-semibold">
              {track.desc}
            </p>
          </div>
          <h3 className="rounded-full w-8 h-8 hover:bg-box grid place-content-center">
            <span className="text-xl text-[#8B8B8B]">{icons.addplus_icon}</span>
          </h3>
        </div>
      </div>
      <div className=" flex flex-col gap-4 bg-box py-4 px-4 mb-6 rounded">
        <div className="flex items-center justify-between gap-1">
          <div className="">
            <h3>Credits</h3>
          </div>
          <a href="" className="text-gray font-bold text-sm">
            Show all
          </a>
        </div>
        <div className="flex items-center justify-between gap-1">
          <div className="">
            <h3>Create your first playlist</h3>
            <p className="text-sm font-bold">It's easy, we will help you</p>
          </div>{" "}
          <a href="" className="borderbtn mb-2 mt-4">
            Follow
          </a>
        </div>
        <div className="flex items-center justify-between gap-1">
          <div className="">
            <h3>Create your first playlist</h3>
            <p className="text-sm font-bold">It's easy, we will help you</p>
          </div>{" "}
          <a href="" className="borderbtn mb-2 mt-4">
            Follow
          </a>
        </div>
        <div className="flex items-center justify-between gap-1">
          <div className="">
            <h3>Create your first playlist</h3>
            <p className="text-sm font-bold">It's easy, we will help you</p>
          </div>{" "}
          <a href="" className="borderbtn mb-2 mt-4">
            Follow
          </a>
        </div>
      </div>
      {/* bottom */}
      <div className="flex px-4 gap-2 gap-x-6  mt-auto flex-wrap">
        <a href="" className="lighta">
          Legal
        </a>
        <a href="" className="lighta">
          Safety & Privacy Center
        </a>
        <a href="" className="lighta">
          Privacy Policy
        </a>
        <a href="" className="lighta">
          Cookies
        </a>
        <a href="" className="lighta">
          About Ads
        </a>
        <a href="" className="lighta">
          Accessibility
        </a>
      </div>
      <a href="" className="px-4 py-2 text-[.8rem] text-white hover:underline">
        Cookies
      </a>
      <a
        href=""
        className=" flex items-center self-start justify-center gap-1 mx-4 my-4 px-3 bg-black rounded-full p-1 font-bold text-[.9rem] border-1  hover:shadow-[0_0_0_1px_white] hover:scale-[1.02]"
      >
        <span className="text-white text-[1.2rem]">{icons.world_icon}</span>
        <span>English</span>
      </a>
    </div>
  );
}

export default PlayviewSidebar;
