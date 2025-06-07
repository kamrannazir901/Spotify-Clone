import React, { useEffect, useState } from "react";
import {
  playlists,
  spotifySongs,
  images,
  icons,
  spotifyAlbums,
} from "../assets/Assets";
import PlaylistItem from "./SubComponents/PlaylistItem";
import { useParams } from "react-router-dom";

function Playlist() {
  const [itemClick, setItemClick] = useState(null);
  const [albumItem, setAlbumItem] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const a = spotifyAlbums.find((p) => p.id === Number(id));
    if (a) setAlbumItem(a);
  }, [id]);

  return (
    <div className="playlist relative">
      <div
        className="w-full absolute top-0 h-[40vh]"
        style={{
          background: `linear-gradient(to bottom, ${
            albumItem?.color || "#000"
          }, transparent)`,
        }}
      ></div>
      <div className="px-5 lg:px-10 relative z-10 lg:mt-20 max-w-[1800px] mx-auto">
        <div className="flex  flex-col lg:flex-row rounded lg:items-end gap-8 ">
          {albumItem && (
            <img
              src={albumItem.url}
              alt={albumItem.title}
              className="w-[250px] sm:w-[200px] xs:w-[150px]"
            />
          )}

          <div className="">
            <p className="lg:mb-[-15px] text-sm !font-bold text-[#ddd]">
              Public Playlist
            </p>
            <h2 className="text-[clamp(1.5rem,3vw,6rem)] !font-extrabold ">
              {albumItem && albumItem.title}
            </h2>
            <p className="text-[#B8A9BF] text-sm mb-1 !font-bold">
              Your weekly update of the most played tracks right now - Global
            </p>
            <p className="flex flex-wrap items-center gap-3  text-sm !font-bold">
              <img src={images.spotify_green_logo} className="w-5" alt="" />
              <span className="ml-[-10px] text-sm font-bold ">Spotify</span>
              <span className="text-[#B8A9BF]">
                • 1,615,916 saves • about 2 hr 45 min • 4 new entries
              </span>{" "}
              <span className="w-2 h-2 inline-block rounded-full bg-blue-500"></span>
            </p>
          </div>
        </div>
        <div className="max-w-[1800px] mx-auto flex items-center justify-between my-10">
          <div className="flex items-center gap-4">
            <span className="w-15 h-15 flex-center text-2xl bg-green text-black rounded-full">
              {icons.play_icon}
            </span>
            <span className="w-8 h-8 p-2 flex-center text-2xl bg-green text-black rounded-full">
              {icons.tick_icon}
            </span>
            <span className="text-3xl text-[#B8A9BF]">
              {icons.threedot_icon}
            </span>
          </div>
          <div className="flex items-center gap-2 my-4">
            <span className="text-[#B8A9BF] font-bold text-sm">List</span>
            <span className="text-lg text-[#B8A9BF]">{icons.list_icon}</span>
          </div>
        </div>

        <div className="py-2 max-w-[1800px] mx-auto flex flex-col text-gray border-b-1 border-[#333]">
          {spotifySongs.map((p, i) => (
            <PlaylistItem
              key={i}
              {...p}
              showheader={i === 0}
              albumshow={true}
              dateadded={true}
              showcount={true}
              isActive={itemClick === i}
              onClick={() => {
                setItemClick((prev) => (prev === i ? null : i));
              }}
              itemindex={itemClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Playlist;
