import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { spotifySongs } from "../../assets/Assets";
import { rankedSearch } from "../../utils/Searchutils";
import SongItem from "../SubComponents/SongItem";

function PlaylistsResult() {
  const [songs, setSongs] = useState([]);
  const { term } = useParams();

  useEffect(() => {
    const finalResults = rankedSearch(spotifySongs, term);

    if (finalResults) setSongs(finalResults);
  }, [term]);

  return (
    <div>
      <div className="flex gap-6 flex-wrap overflow-x-auto ">
        {songs &&
          songs.map((item, index) => <SongItem {...item} key={index} />)}
      </div>
    </div>
  );
}

export default PlaylistsResult;
