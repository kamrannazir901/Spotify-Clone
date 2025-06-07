import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { spotifyArtists } from "../../assets/Assets";
import ArtistItem from "../SubComponents/ArtistItem";
import { rankedSearch } from "../../utils/Searchutils";

function ArtistsResults() {
  const [songs, setSongs] = useState([]);
  const { term } = useParams();

  useEffect(() => {
    const finalResults = rankedSearch(spotifyArtists, term);

    if (finalResults) setSongs(finalResults);
  }, [term]);

  return (
    <div>
      <div className="flex gap-6 flex-wrap overflow-x-auto ">
        {songs &&
          songs.map((item, index) => <ArtistItem {...item} key={index} />)}
      </div>
    </div>
  );
}

export default ArtistsResults;
