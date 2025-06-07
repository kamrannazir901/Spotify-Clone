import React, { useEffect, useState } from "react";
import { spotifySongs, spotifyArtists } from "../../assets/Assets";
import PlaylistItem from "../SubComponents/PlaylistItem";
import { useParams } from "react-router-dom";
import ArtistItem from "../SubComponents/ArtistItem";
import { usePlayerContext } from "../../context/PlayerContext";
import { rankedSearch } from "../../utils/Searchutils";

function AllResults() {
  const [itemClick, setItemClick] = useState(null);
  const { term } = useParams();
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const ar = rankedSearch(spotifyArtists, term);
    const finalResults = rankedSearch(spotifySongs, term);

    if (finalResults) setSongs(finalResults);
    if (ar) setArtists(ar);
  }, [term]);
  return (
    <>
      <div className="flex gap-4 flex-wrap xl:flex-nowrap">
        <div className="xl:w-[35%] xl:max-w-[400px] overflow-hidden">
          <h2 className="s-head">Top result</h2>
          {songs && (
            <div className="cursor-pointer hover:bg-[#3d3d3d] bg-[#1d1d1d] rounded-lg px-4 pb-10 pt-6">
              <img
                src={songs[0]?.url}
                alt=""
                className="rounded-lg block w-[80px]"
              />
              <h2 className="text-2xl mt-4 !leading-[1.2]">
                {songs[0]?.title}
              </h2>
              <p className="text-sm text-gray text-ellipsis text-nowrap overflow-hidden">
                {songs[0]?.desc && <span>Song . </span>}
                <span className="!leading-[1] ">{songs[0]?.desc}</span>
              </p>
            </div>
          )}
        </div>
        <div className="w-[65%] flex-1">
          <div>
            <h2 className="s-head">Songs</h2>
            <div>
              {songs &&
                songs.slice(0, 4).map((p, i) => (
                  <PlaylistItem
                    key={i}
                    {...p}
                    albumshow={false}
                    dateadded={false}
                    showcount={false}
                    isActive={itemClick === i}
                    onClick={() => {
                      setItemClick((prev) => (prev === i ? null : i));
                    }}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      {/* artist */}
      <h2 className="s-head">Popular artists</h2>
      <div className="flex gap-6 overflow-x-auto">
        {artists.map((item, index) => (
          <ArtistItem {...item} key={index} />
        ))}
      </div>
    </>
  );
}

export default AllResults;
