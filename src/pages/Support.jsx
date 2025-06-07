import React, { useEffect, useRef, useState } from "react";
import { icons } from "../assets/Assets";

import SupportAccordian, {
  items,
} from "../components/SubComponents/SupportAccordian";
import { useNavigate } from "react-router-dom";

const quickHelpItems = [
  "Can’t log in to Spotify",
  "Failed payment help",
  "Charged too much",
  "Invite or remove Family plan members",
  "How to change your payment details",
];
function Support() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchList, setSearchList] = useState([]);
  const searchListDiv = useRef();

  const [isFocused, setIsFocused] = useState(false);

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
    <section className="p-4 lg:p-0">
      {/* header */}
      <div
        style={{
          background: `linear-gradient(98.85deg, rgba(18, 18, 18, 0.3) 0%, #121212 100%), 
                 linear-gradient(180deg, rgba(18, 18, 18, 0) 0%, #121212 100%), 
                 #1ed760`,
        }}
        className="h-[150px] pl-2"
      >
        <div className="m-auto w-full max-w-[600px] flex flex-col py-6">
          <p className="text-gray">Spotify Support</p>
          <h3 className="text-2xl lg:text-5xl !leading-[1]">
            How can we help you?
          </h3>
        </div>
      </div>
      <section className="relative m-auto w-full max-w-[600px] flex flex-col gap-4 mt-8">
        {/* searchbox */}
        <div
          className={`bg-white rounded-[5px] p-2 pl-0 text-black flex items-center`}
        >
          <span className="text-2xl px-2">{icons.search_icon}</span>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          className="absolute top-[45px] bg-white text-black p-2 w-full z-10"
          ref={searchListDiv}
        >
          {searchList.length > 0 && (
            <div className="flex flex-col">
              {searchList.map((v, i) => (
                <a
                  key={i}
                  onMouseDown={() => {
                    window.location.href = `/Spotify-Clone/article${v.url}`;
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
                </a>
              ))}
            </div>
          )}

          {searchTerm !== "" && (
            <div className="flex flex-col gap-2 group">
              <a
                onMouseDown={() => {
                  navigate(
                    `/search-result?q=${encodeURIComponent(searchTerm)}`
                  );
                }}
                className="flex items-center gap-2 py-2 cursor-pointer"
              >
                <span className="text-2xl">{icons.search_icon}</span>
                <p className="!font-bold text-sm group-hover:text-[#2E8D50]">
                  {searchTerm}
                </p>
              </a>
            </div>
          )}
        </div>
        {/* manage account */}

        <div className="bg-[#1D2B3A] p-3 rounded-[5px] flex items-center justify-between gap-4 flex-wrap lg:flex-nowrap">
          <div className="flex items-center gap-2 basis-[400px] max-w-[400px] flex-1">
            <div className="text-[#CFF56A] rounded-[5px] bg-[#34404E] text-[1.3rem] p-4">
              {icons.profile_icon}
            </div>
            <p className="text-sm !leading-[1.4]">
              Manage your profile, payments, and more on your Account page.
            </p>
          </div>
          <a
            href="#"
            className="bg-green text-black font-bold px-4 py-2 text-nowrap text-sm rounded-full text-center min-w-[150px] flex-1 hover:bg-green-hover hover:scale-[1.05]"
          >
            Go to your account
          </a>
        </div>

        {/* accordian */}
        <SupportAccordian iconshow={true} />
      </section>

      <div className="mt-8 px-2 w-full py-8 bg-[#2A2A2A]">
        <div className="max-w-[600px] m-auto flex flex-col ">
          <h3 className="text-2xl !leading-[1] text-left bg">Quick help</h3>
          <div className="mt-10 flex flex-col">
            {quickHelpItems.map((item, index) => (
              <div
                key={index}
                className="flex group py-4 items-center justify-between cursor-pointer"
              >
                <a
                  href="#"
                  className="text-white group-hover:underline font-semibold"
                >
                  {item}
                </a>
                <span className="text-lg transform rotate-270 text-gray">
                  {icons.downarrow_icon}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-5 lg:my-10 m-auto w-full max-w-[600px] flex flex-col gap-6 text-center">
        <h3 className="text-2xl lg:text-5xl !leading-[1]">
          Visit our Community
        </h3>
        <p>
          Have questions? Find answers from our worldwide Community of expert
          fans!
        </p>
        <a
          href="#"
          className="bg-green mt-[-6px] text-black w-fit m-auto font-bold px-4 py-2 text-nowrap rounded-full text-center hover:scale-[1.05] hover:bg-green-hover"
        >
          Go to community
        </a>
      </div>
    </section>
  );
}

export default Support;
