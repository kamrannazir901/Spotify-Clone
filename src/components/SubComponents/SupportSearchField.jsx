import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { items } from "./SupportAccordian";
import { icons } from "../../assets/Assets";

function SupportSearchField({
  crumbs,
  navTitle = [],
  setNavTitle = () => {},
  searchFaqList = [],
  setsearchFaqList = () => {},
  spotifyFAQs = [],
  setsavequery = () => {},
  hideSearchList,
  setHideSearchList = () => {},
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const myurl = useLocation().pathname.replace(/^\/article/, "");

  const [searchTerm, setSearchTerm] = useState(q || "");
  const [searchList, setSearchList] = useState([]);
  const searchListDiv = useRef();

  const [isFocused, setIsFocused] = useState(false);

  const showSearchfaq = () => {
    setsearchFaqList([]);

    const findfaq = (item) => {
      if (
        item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.question.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        setsearchFaqList((pre) => [...pre, item]);
      }
    };

    spotifyFAQs.forEach(findfaq);
  };

  const checkNavTitle = (item, path = []) => {
    const currentPath = [...path, item.title];
    if (
      item?.links?.length > 0 &&
      item?.links?.some((link) => link.url === myurl)
    ) {
      return currentPath;
    }
    if (item.children?.length > 0) {
      for (const child of item.children) {
        const result = checkNavTitle(child, currentPath);
        if (result) return result;
      }
    }
  };

  useEffect(() => {
    let foundPath = null;
    for (const item of items) {
      const path = checkNavTitle(item);
      if (path) {
        foundPath = path;
        break;
      }
    }
    setNavTitle(foundPath);
  }, [items, myurl]);

  useEffect(() => {
    showSearchfaq();
    setsavequery(searchTerm);
    if (myurl === "/search-result") setHideSearchList(true);
  }, [searchTerm]);

  useEffect(() => {
    if (hideSearchList && searchListDiv.current) {
      searchListDiv.current.style.display = "none";
    }
  }, [hideSearchList]);

  useEffect(() => {
    searchListDiv.current.style.display = "none";
    showSearchfaq();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      searchListDiv.current.style.display = "none";
      setSearchList([]);

      return;
    } else {
      searchListDiv.current.style.display = "block";
    }

    const results = [];
    const findResult = (item) => {
      if (item?.links?.length > 0) {
        const matched = item.links.filter((link) =>
          link.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        results.push(...matched);
      }
      if (item.children?.length > 0) {
        item.children.forEach(findResult);
      }
    };

    items.forEach(findResult);

    setSearchList(results.slice(0, 6));
  }, [searchTerm]);

  return (
    <div className="relative">
      <div
        className={`bg-white rounded-[5px] p-3 pl-0 text-[black] flex items-center ${
          isFocused ? "border-b-2" : "border-none"
        }`}
      >
        <span className="text-2xl px-2">{icons.search_icon}</span>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            searchListDiv.current.style.display = "block";
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchTerm !== "") {
              showSearchfaq();
              navigate(`/search-result?q=${encodeURIComponent(searchTerm)}`);
            }
          }}
          className="bg-amber-50 w-full outline-none placeholder-black"
          onFocus={() => {
            if (searchTerm !== "") {
              searchListDiv.current.style.display = "block";
            }
            setIsFocused(true);
          }}
          onBlur={() => {
            searchListDiv.current.style.display = "none";

            setIsFocused(false);
          }}
        />
      </div>
      <div
        className="absolute bg-white text-black p-2 w-full z-10"
        ref={searchListDiv}
      >
        {searchList.length > 0 && (
          <div className="flex flex-col">
            {searchList.map((v, i) => (
              <div
                // to={`article${v.url}`}
                key={i}
                onMouseDown={() => {
                  window.location.href = `${import.meta.env.BASE_URL}article${
                    v.url
                  }`;
                }}
                className="flex items-center gap-2 py-2 group cursor-pointer"
              >
                <svg
                  data-encore-id="icon"
                  role="img"
                  aria-hidden="true"
                  className="Svg-sc-ytk21e-0 jrFBs sc-jIcpjO idQMvP"
                  viewBox="0 0 24 24"
                  width="25"
                  fill="#656565"
                >
                  <path d="M1.503 1.925A1 1 0 0 1 2.5 1H19a1 1 0 0 1 1 1v3h3a1 1 0 0 1 1 1v11.066l-.003.17a20.9 20.9 0 0 1-.196 2.412c-.098.653-.254 1.386-.522 1.981-.234.52-.758 1.371-1.779 1.371H4c-1.02 0-1.569-.852-1.838-1.449-.303-.673-.506-1.562-.65-2.528-.294-1.95-.387-4.511-.387-7.023 0-2.523.095-5.04.189-6.925a161.988 161.988 0 0 1 .172-2.92l.012-.17.005-.06zM3.434 3c-.034.538-.078 1.286-.123 2.175A140.726 140.726 0 0 0 3.125 12c0 2.489.094 4.928.364 6.727.136.91.308 1.582.497 2.003.064.141.114.224.147.27h14.662a7.014 7.014 0 0 1-.378-1.041C18.047 18.649 18 17.297 18 17V3H3.434zm17.93 17.986c.023-.039.054-.096.091-.178.154-.342.279-.86.369-1.456.087-.581.131-1.17.154-1.62a19.13 19.13 0 0 0 .022-.686V7h-2v10c0 .203.042 1.352.342 2.416.15.535.345.968.569 1.249.157.197.3.29.452.321zM16 9H5V7h11v2zm0 4H5v-2h11v2zm0 4H5v-2h11v2z"></path>
                </svg>
                <p className="!font-bold text-sm text-[#656565] group-hover:text-[#2E8D50]">
                  {v.title}
                </p>
              </div>
            ))}
          </div>
        )}

        {searchTerm !== "" && (
          <div className="flex flex-col gap-2 group">
            <Link
              onMouseDown={() => {
                navigate(`/search-result?q=${encodeURIComponent(searchTerm)}`);
              }}
              href="#"
              className="flex items-center gap-2 py-2"
            >
              <span className="text-2xl">{icons.search_icon}</span>
              <p className="!font-bold text-sm group-hover:text-[#2E8D50]">
                {searchTerm}
              </p>
            </Link>
          </div>
        )}
      </div>

      {/* bread crumbs links */}

      {crumbs && (
        <div className="mt-3 flex items-center gap-1">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center text-gray font-bold hover:underline"
            >
              Home
            </Link>
            <span className="mt-[2px] text-[1.2rem] text-gray rotate-270">
              {icons.downarrow_icon}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="#"
              className="flex items-center text-gray font-bold hover:underline"
            >
              {navTitle?.[0] || "Search Result"}
            </a>
            <span className="mt-[2px] text-[1.2rem] text-gray rotate-270">
              {icons.downarrow_icon}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default SupportSearchField;
