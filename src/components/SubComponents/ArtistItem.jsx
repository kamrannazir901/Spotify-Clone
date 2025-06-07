import React from "react";
import { useMyContext } from "../../context/MyContext";

function ArtistItem({ id, title, description, url, type }) {
  const { showMenu } = useMyContext();

  const handleMenu = (e) => {
    e.preventDefault();
    showMenu(e, "artist", { title });
  };
  return (
    <div className="smallcard cursor-pointer" onContextMenu={handleMenu}>
      <div className="cardimgbox ">
        <img src={url} className="rounded-full" alt="" />
      </div>
      <p className="!font-semibold">{title}</p>
      <p className="text-[#656565] !leading-[1.1] text-sm">{description}</p>
    </div>
  );
}

export default ArtistItem;
