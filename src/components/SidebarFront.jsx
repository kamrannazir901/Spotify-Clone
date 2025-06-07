import React, { useEffect, useState } from "react";
import { icons, spotifySongs } from "../assets/Assets";
import { useMyContext } from "../context/MyContext";
import { useDB } from "../context/DBoperations";
import LefrSidebarLoginData from "./SubComponents/LefrSidebarLoginData";

const playlist = [
  {
    id: 1,
    title: "Custom Playlist #1",
    url: spotifySongs[0].url,
  },
  {
    id: 2,
    title: "Playlist #2",
    url: spotifySongs[1].url,
  },
];

function SidebarFront() {
  const { showMenu } = useMyContext();
  const { isLogin, getLoggedInUserName } = useDB();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getName = async () => {
      const name = await getLoggedInUserName();
      if (name) setUsername(name);
    };
    getName();
  }, []);
  const handleMenu = (e) => {
    e.preventDefault();
    showMenu(e, "frontsidebar", { title: "ok" });
  };

  return (
    <>
      <div
        onContextMenu={handleMenu}
        className="group flex flex-col bg-layout h-full mx-3 mr-0 p-2 rounded overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-10 pt-4">
          <h3 className="cursor-pointer flex items-center gap-2 ">
            <span className="text-2xl text-gray hover:text-white relative left-[-50%] w-0 group-hover:left-0 transition-all delay-10 group-hover:w-auto">
              {icons.sidebar_right_expand}
            </span>
            Your Library
          </h3>
          <h3 className="cursor-pointer rounded-full w-8 h-8 hover:bg-box grid place-content-center">
            <span className="text-xl text-[#8B8B8B] ">{icons.plus_icon}</span>
          </h3>
        </div>

        {isLogin ? (
          <>
            <div className="flex justify-between items-center mb-4 pl-2">
              <span className="cursor-pointer text-[1.2rem] text-gray hover:text-white">
                {icons.search_icon}
              </span>
              <div className="flex items-center hover:scale-[1.05] cursor-pointer">
                <p className="text-gray text-sm !font-semibold">Recents</p>
                <h3 className=" flex items-center justify-center rounded-full w-8 h-8 bg ">
                  <span className="text-xl text-[#8B8B8B]">
                    {icons.list_icon}
                  </span>
                </h3>
              </div>
            </div>
            <div className="flex flex-col items-start mb-6 rounded">
              {playlist.map((p, i) => (
                <LefrSidebarLoginData {...p} name={username} key={i} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-start gap-1 bg-box py-4 px-4 mb-6 rounded">
              <h3>Create your first playlist</h3>
              <p className="text-sm font-bold">It's easy, we will help you</p>
              <a href="" className="btn mb-2 mt-4">
                Create playlist
              </a>
            </div>
            <div className="flex flex-col items-start gap-1 bg-box py-4 px-4 mb-6 rounded">
              <h3>Let's find some podcasts to follow</h3>
              <p className="text-sm font-bold">
                We'll keep you updated on new episodes
              </p>
              <a href="" className="btn mb-2 mt-4">
                Browse podcasts
              </a>
            </div>
          </>
        )}

        {/* bottom */}
        {!isLogin && (
          <>
            <div className="flex px-4 gap-2 gap-x-6  mt-auto flex-wrap">
              <a href="" className="lighta">
                Legal
              </a>
              <a href="" className="lighta">
                Safety & Privacy Center
              </a>
              <a href="" className="lighta">
                Privacy Policy
              </a>
              <a href="" className="lighta">
                Cookies
              </a>
              <a href="" className="lighta">
                About Ads
              </a>
              <a href="" className="lighta">
                Accessibility
              </a>
            </div>
            <a
              href=""
              className="px-4 py-2 text-[.8rem] text-white hover:underline"
            >
              Cookies
            </a>
            <a
              href=""
              className=" flex items-center self-start justify-center gap-1 mx-4 my-4 px-3 bg-black rounded-full p-1 font-bold text-[.9rem] border-1  hover:shadow-[0_0_0_1px_white] hover:scale-[1.02]"
            >
              <span className="text-white text-[1.2rem]">
                {icons.world_icon}
              </span>
              <span>English</span>
            </a>
          </>
        )}
      </div>
    </>
  );
}

export default SidebarFront;
