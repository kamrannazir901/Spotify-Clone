import React from "react";
import { spotifySongs, icons } from "../assets/Assets";
import { usePlayerContext } from "../context/PlayerContext";

function Player() {
  const {
    timebarRef,
    barRef,
    playStatus,
    track,
    play,
    pause,
    nextSong,
    prevSong,
    time,
    jumpTime,
  } = usePlayerContext();

  return (
    <div className="flex items-center justify-center lg:justify-between h-full w-full">
      <div className="hidden lg:flex items-center gap-4">
        <img src={track.url} className="w-16 h-16 rounded" alt="" />
        <div className="flex flex-col">
          <span className="text-sm">{track.title}</span>
          <p className="text-[.8rem] text-gray">{track.desc.slice(0, 15)}</p>
        </div>
        <span className="ml-3 text-gray cursor-pointer">
          {icons.addplus_icon}
        </span>
      </div>
      <div className=" basis-[40%] flex items-center flex-col gap-2">
        <div className="flex items-center gap-4">
          <span className=" text-gray text-[1rem] hover:text-white cursor-pointer">
            {icons.shuffle_icon}
          </span>
          <span
            onClick={prevSong}
            className=" text-gray text-[2rem] hover:text-white cursor-pointer"
          >
            {icons.prev_icon}
          </span>
          <span className="bg-white text-black rounded-full p-1 text-[1rem] cursor-pointer">
            {playStatus ? (
              <span onClick={pause}>{icons.pause_icon}</span>
            ) : (
              <span onClick={play}>{icons.play_icon}</span>
            )}
          </span>
          <span
            onClick={nextSong}
            className=" text-gray text-[2rem] hover:text-white cursor-pointer"
          >
            {icons.next_icon}
          </span>
          <span className=" text-gray text-[1.1rem] hover:text-white cursor-pointer">
            {icons.repeat_icon}
          </span>
        </div>

        <div
          ref={barRef}
          className="flex flex-1/2 min-w-[350px] w-full items-center gap-2"
        >
          <p className="text-[.8rem] text-gray">
            {time.currentTime.minute || 0}:{time.currentTime.second || 0}
          </p>
          <div
            onClick={jumpTime}
            className="w-full cursor-pointer  h-1 bg-[#656565] rounded"
          >
            <div
              ref={timebarRef}
              className="w-0 h-1 overflow-hidden bg-white rounded"
            ></div>
          </div>
          <p className="text-[.8rem] text-gray">
            {time.totalTime.minute || 0}:{time.totalTime.second || 0}
          </p>
        </div>
      </div>
      <div className=" hidden lg:flex gap-3 items-center">
        <span className="cursor-pointer text-gray text-[1rem] hover:text-white">
          {icons.play_view_icon}
        </span>{" "}
        <span className="cursor-pointer text-gray text-[1.2rem] hover:text-white">
          {icons.lyrics_icon}
        </span>{" "}
        <span className="cursor-pointer text-gray text-[1.2rem] hover:text-white">
          {icons.queue_icon}
        </span>{" "}
        <span className="cursor-pointer text-gray text-[1.2rem] hover:text-white">
          {icons.connect_device_icon}
        </span>{" "}
        <div className="group flex items-center gap-2">
          <span className="cursor-pointer text-gray text-[1.3rem] hover:text-white">
            {" "}
            {icons.volume_icon}
          </span>
          <div className=" cursor-pointer relative w-[100px] h-1 bg-[#656565] rounded">
            <div className="group-hover:bg-green w-[50px] h-1 bg-white rounded relative">
              <div className="hidden group-hover:block absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
        <span className="cursor-pointer text-gray text-[1.2rem] hover:text-white">
          {icons.miniplayer_icon}
        </span>{" "}
        <span className="cursor-pointer text-gray text-[1.2rem] hover:text-white">
          {icons.fullscreen_icon}
        </span>
      </div>
    </div>
  );
}

export default Player;
