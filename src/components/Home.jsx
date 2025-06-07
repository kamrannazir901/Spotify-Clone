import React from "react";
import SongItem from "./SubComponents/SongItem";
import {
  playlists,
  spotifyAlbums,
  spotifyArtists,
  spotifySongs,
} from "../assets/Assets";
import ArtistItem from "./SubComponents/ArtistItem";
import Footer from "./Footer";
import { usePlayerContext } from "../context/PlayerContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { playWithId } = usePlayerContext();
  const navigate = useNavigate();

  return (
    <div className="contentarea">
      <h2 className="s-head">Trending songs</h2>
      <div className="flex gap-6 overflow-x-auto ">
        {spotifySongs.map((item, index) => (
          <SongItem
            {...item}
            key={index}
            onclick={() => {
              playWithId(item.id);
            }}
          />
        ))}
      </div>
      {/* albums */}
      <h2 className="s-head">Albums</h2>
      <div className="flex gap-6 overflow-x-auto ">
        {spotifyAlbums.map((item, index) => (
          <SongItem
            {...item}
            key={index}
            onclick={() => {
              navigate(`album/${item.id}`);
            }}
          />
        ))}
      </div>
      {/* artist */}
      <h2 className="s-head">Popular artists</h2>
      <div className="flex gap-6 overflow-x-auto">
        {spotifyArtists.map((item, index) => (
          <ArtistItem {...item} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Home;
