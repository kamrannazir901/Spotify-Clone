import React from "react";
import { useParams } from "react-router-dom";
import { profiles } from "../../assets/Assets";
import ArtistItem from "../SubComponents/ArtistItem";
import { rankedSearch } from "../../utils/Searchutils";

function ProfilesResult() {
  const { term } = useParams();

  return (
    <div>
      <div className="flex gap-6 flex-wrap overflow-x-auto ">
        {profiles &&
          profiles.map((item, index) => <ArtistItem {...item} key={index} />)}
      </div>
    </div>
  );
}

export default ProfilesResult;
