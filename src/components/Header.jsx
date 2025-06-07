import React, { useEffect, useRef, useState } from "react";
import { images, icons } from "../assets/Assets";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDB } from "../context/DBoperations";
import HoverMenu from "./SubComponents/HoverMenu";

const menuItems = [
  { label: "Account", icon: icons.external_link, to: "#" },
  { label: "Profile", icon: "", to: "#" },
  { label: "Upgrade to Premium", icon: icons.external_link, to: "/premium" },
  { label: "Support", icon: icons.external_link, to: "/support" },
  { label: "Download", icon: icons.external_link, to: "/download" },
  { label: "Settings", icon: "", to: "#" },
  { label: "Log out", icon: "", to: "logout" },
];

function Header() {
  const { isLogin, logout } = useDB();
  const { term } = useParams();

  const [searchValue, setSearchValue] = useState(term || "");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSearchValue(term || "");
  }, [term]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    const currentPath = location.pathname;
    const subPath = currentPath.split("/").slice(3).join("/"); // get sub-path after /search/:term/
    if (value !== "") {
      navigate(
        `/search/${encodeURIComponent(value)}${subPath ? `/${subPath}` : ""}`
      );
    } else {
      navigate(`/search/${encodeURIComponent(value)}`);
    }
  };

  return (
    <div className="px-3 md:px-6 gap-2 md:gap-10 flex items-center justify-between">
      {/* one */}
      <div className="logo xl:flex-1 shrink-0">
        <div className="w-fit">
          <Link to="/">
            <img
              src={images.spotify_logo}
              alt=""
              className="w-8 min-w-[20px] cursor-pointer"
            />
          </Link>
        </div>
      </div>

      {/* two */}
      <div className="flex xl:flex-1 max-w-[600px] items-center md:gap-3 rounded-full">
        <span className="menuicon text-gray bg-[#1f1f1f] hover:bg-[#282828] hover:text-white">
          <Link to="/">{icons.home_icon}</Link>
        </span>
        <div
          onClick={() => inputRef.current?.focus()}
          className="group flex flex-1 max-h-[50px] cursor-text items-center justify-between transition-colors bg-[#1f1f1f]  rounded-full focus-within:border-white border-2 border-transparent hover:bg-[#2f2f2f] "
        >
          <label
            htmlFor="search"
            className="menuicon text-gray group-hover:text-white"
          >
            {icons.search_icon}
          </label>
          <input
            ref={inputRef}
            autoComplete="off"
            type="search"
            id="search"
            value={searchValue}
            onChange={handleChange}
            placeholder="What do you want to play?"
            className="outline-none min-w-[100px] w-[100%] border-r-1 md:pr-2 border-[#B3B3B3]"
          />
          <span className="menuicon !text-3xl text-gray hover:text-white">
            <Link to="/search">{icons.browse_icon}</Link>
          </span>
        </div>
      </div>
      {/* three */}
      <div className="right hidden lg:flex flex-1 items-center justify-end">
        {!isLogin && (
          <div className="flex gap-3 border-r-1 pr-4">
            <Link to="premium" className="menu-right-a">
              Premium
            </Link>
            <Link to="support" className="menu-right-a">
              Support
            </Link>
            <Link to="download" className="menu-right-a">
              Download
            </Link>
          </div>
        )}

        {isLogin ? (
          <div className="flex gap-3 pl-6 items-center justify-end">
            <Link
              to="premium"
              className="text-black font-bold bg-white text-sm text-nowrap py-1 px-4 rounded-full hover:!text-black hover:bg-[#eee]"
            >
              Explore Premium
            </Link>

            <Link
              to="download"
              className="menu-right-small-a mx-2 flex items-center gap-1 rounded-full p-1 font-bold text-[.9rem]"
            >
              <span>{icons.download_icon}</span>
              <span>Install App</span>
            </Link>
            <span className="cursor-pointer mx-2 text-gray text-lg hover:text-white">
              {icons.notification_icon}
            </span>
            <HoverMenu
              triggerType="click"
              trigger={
                <span className="cursor-pointer mx-1 mr-4 text-gray text-lg hover:text-white">
                  {icons.usergroups_icon}
                </span>
              }
              menuClassName="min-w-[270px] top-16 bg-[#282828] rounded-lg shadow-lg p-2"
            >
              {({ closeMenu }) => (
                <div className="relative flex flex-col gap-9 items-center text-center pt-8 pb-4 px-6">
                  <span
                    className="absolute right-0 top-0 text-gray hover:text-white cursor-pointer p-1 text-[1.5rem]"
                    onClick={closeMenu}
                  >
                    {icons.cross_icon}
                  </span>

                  <div className="flex flex-col items-center gap-4">
                    <h3 className="text-2xl !leading-tight">
                      Check what friends are playing with the Windows app
                    </h3>
                    <p className="!leading-tight text-gray">
                      Explore the tracks your friends are spinning and get
                      inspired for your next play.
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    <a
                      href="#"
                      className="rounded-sm relative w-fit bg-amber-50 text-center"
                    >
                      <img
                        src={images.install_app_button_white}
                        className="w-full h-full px-2"
                        alt=""
                      />
                    </a>
                    <a
                      href="#"
                      className="text-sm hover:underline font-semibold"
                    >
                      Download directly from Spotify
                    </a>
                  </div>
                </div>
              )}
            </HoverMenu>

            <HoverMenu
              triggerType="click"
              trigger={
                <div className="cursor-pointer w-12 h-12 rounded-full bg-[#1f1f1f] text-gray hover:scale-[1.05] flex-center">
                  <div className="w-8 h-8 rounded-full bg-[#B097C4] text-black font-bold flex-center">
                    M
                  </div>
                </div>
              }
              menuClassName="min-w-[190px] top-16 bg-[#282828] rounded-lg shadow-lg"
            >
              <div className="relative flex flex-col items-center text-center py-2 px-1">
                {menuItems.map((item, index) =>
                  item.to === "logout" ? (
                    <span
                      key={index}
                      onClick={logout}
                      className="flex justify-between items-center w-full hover:bg-[#3f3f3f] p-2 rounded-sm cursor-pointer text-sm"
                    >
                      <span>{item.label}</span>
                      <span>{item.icon}</span>
                    </span>
                  ) : (
                    <Link
                      key={index}
                      to={item.to}
                      className="flex justify-between items-center w-full hover:bg-[#3f3f3f] p-2 rounded-sm text-sm"
                    >
                      <span>{item.label}</span>
                      <span>{item.icon}</span>
                    </Link>
                  )
                )}
              </div>
            </HoverMenu>
          </div>
        ) : (
          <div className="flex gap-3 pl-6 items-center justify-end">
            <Link
              to="download"
              className="menu-right-small-a mx-2 flex items-center gap-1 rounded-full p-1 font-bold text-[.9rem]"
            >
              <span>{icons.download_icon}</span>
              <span>Install App</span>
            </Link>

            <Link to="signup" className="menu-right-small-a text-sm">
              Sign up
            </Link>

            <Link
              to="login"
              className="text-black font-bold bg-white text-nowrap py-3 px-8 rounded-full hover:!text-black hover:bg-[#eee]"
            >
              Log in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
