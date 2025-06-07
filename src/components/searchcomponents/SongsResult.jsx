import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { spotifySongs } from "../../assets/Assets";
import SongItem from "../SubComponents/SongItem";
import { rankedSearch } from "../../utils/Searchutils";
import PlaylistItem from "../SubComponents/PlaylistItem";

function SongResults() {
  const [songs, setSongs] = useState([]);
  const { term } = useParams();
  const [itemClick, setItemClick] = useState(null);

  useEffect(() => {
    const finalResults = rankedSearch(spotifySongs, term);

    if (finalResults) setSongs(finalResults);
  }, [term]);

  return (
    <div>
      <div className="flex flex-col gap-6 overflow-x-auto ">
        {songs &&
          songs.map((p, i) => (
            <PlaylistItem
              key={i}
              {...p}
              albumshow={true}
              dateadded={false}
              showcount={false}
              showheader={i === 0}
              isActive={itemClick === i}
              onClick={() => {
                setItemClick((prev) => (prev === i ? null : i));
              }}
            />
          ))}
      </div>
    </div>
  );
}

export default SongResults;
