import React from "react";
import { useMyContext } from "../../context/MyContext";
import { usePlayerContext } from "../../context/PlayerContext";

function SongItem({ id, title, desc, url, onclick }) {
  const { showMenu } = useMyContext();

  const handleMenu = (e) => {
    e.preventDefault();
    showMenu(e, "song", { title });
  };
  return (
    <>
      <div
        onClick={onclick}
        className="smallcard cursor-pointer"
        onContextMenu={handleMenu}
      >
        <div className="cardimgbox rounded">
          <img src={url} className="" alt="" />
        </div>
        <p className="!font-semibold">{title}</p>
        <p className="text-[#656565] !leading-[1.1] text-sm">{desc}</p>
      </div>
    </>
  );
}

export default SongItem;
