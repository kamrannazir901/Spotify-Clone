import React, { useState } from "react";
import SidebarFront from "./SidebarFront";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Player from "./Player";
import ContextMenu from "../components/SubComponents/ContextMenu";
import PlayviewSidebar from "./PlayviewSidebar";
import { useMyContext } from "../context/MyContext";
import { usePlayerContext } from "../context/PlayerContext";
import { useDB } from "../context/DBoperations";
import LoggoutBottomBar from "./LoggoutBottomBar";

function LayoutFront() {
  const { isLogin } = useDB();
  const [expandPlayView, setexpandPlayView] = useState(false);
  const { contextMenuData, contextMenuRef } = useMyContext();
  const { audioRef, track } = usePlayerContext();
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {contextMenuData.visible && (
        <div
          className="w-fit rounded absolute"
          style={{
            top: `${contextMenuData.y}px`,
            left: `${contextMenuData.x}px`,
            position: "absolute",
            zIndex: 1000,
          }}
          ref={contextMenuRef}
        >
          <ContextMenu {...contextMenuData} />
        </div>
      )}
      <div className={`shrink-0 ${isLogin ? "" : "my-2"}`}>
        <Header />
      </div>
      <div className="flex flex-1 min-h-0 relative">
        <div className="w-[22%] overflow-y-auto max-w-[450px] hidden lg:block">
          <SidebarFront />
        </div>
        <div className="flex-1 overflow-y-auto w-full bgcontentarea flex flex-col gap-6 justify-between  ">
          <Outlet />
          <Footer />
        </div>
        {isLogin && (
          <div
            className={`${
              expandPlayView
                ? "absolute right-0 w-full h-full bg-black"
                : "w-[22%] max-w-[450px] hidden lg:block"
            } transition-all duration-300`}
          >
            <PlayviewSidebar
              toggleExpand={() => setexpandPlayView(!expandPlayView)}
              expandPlayView={expandPlayView}
            />
          </div>
        )}
      </div>
      <div className="shrink-0 px-4 py-2 overflow-hidden">
        {isLogin ? (
          <>
            <Player />
            <audio ref={audioRef} src={track.file} preload="auto"></audio>
          </>
        ) : (
          <LoggoutBottomBar />
        )}
      </div>
    </div>
  );
}

export default LayoutFront;
