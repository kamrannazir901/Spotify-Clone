import React from "react";
import SidebarFront from "./SidebarFront";
import Header from "./Header";
import {
  Outlet,
  Link,
  NavLink,
  useLocation,
  useParams,
} from "react-router-dom";

function SearchResultLayout() {
  const location = useLocation();
  const { term } = useParams();

  const validTabs = [
    "",
    "songs",
    "artists",
    "playlists",
    "albums",
    "podcasts",
    "profiles",
  ];

  const pathParts = location.pathname.split("/");
  const currentTab = pathParts[2] || "";

  const isInvalidTab = !validTabs.includes(currentTab);

  return (
    <div className="contentarea">
      <ul className="flex flex-wrap gap-3 items-center mb-6">
        <NavLink
          to=""
          end
          className={({ isInvalidTab }) =>
            `menulinks ${isInvalidTab ? "!bg-white text-black active" : ""}`
          }
        >
          All
        </NavLink>
        <NavLink to="songs" className="menulinks">
          Songs
        </NavLink>
        <NavLink to="artists" className="menulinks">
          Artists
        </NavLink>
        <NavLink to="playlists" className="menulinks">
          Playlists
        </NavLink>
        <NavLink to="albums" className="menulinks">
          Albums
        </NavLink>
        <NavLink to="podcasts" className="menulinks">
          Podcasts and Shows
        </NavLink>
        <NavLink to="profiles" className="menulinks">
          Profiles
        </NavLink>
      </ul>

      <div className="result">
        <Outlet />
      </div>
    </div>
  );
}

export default SearchResultLayout;
