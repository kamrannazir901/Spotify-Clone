import React, { useEffect, useRef, useState } from "react";
import { icons } from "../assets/Assets";
import { items } from "../components/SubComponents/SupportAccordian";
import Footer from "../components/Footer";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SupportSearchField from "../components/SubComponents/SupportSearchField";

const spotifyFAQs = [
  {
    question: "Audio quality",
    answer:
      "Spotify Premium offers different audio quality settings that you can change in the app’s settings to get the best experience for your device and network.",
    url: "/premium/settings",
  },
  {
    question: "Play Queue",
    answer:
      "You can view and arrange upcoming tracks in your Play Queue and control what plays next on your device easily through the Spotify app.",
    url: "/playlists/create",
  },
  {
    question: "Now Playing view",
    answer:
      "The Now Playing screen lets you control playback, save tracks, shuffle, repeat, and connect to other devices via Spotify Connect.",
    url: "/features/getting-started",
  },
  {
    question: "Spotify lock screen widget on iPhone",
    answer:
      "Add the Spotify widget to your iPhone lock screen for quick access to playback controls and song info. Requires iOS 16+ and Spotify version 8.8.26 or higher.",
    url: "/devices/watch-setup",
  },
  {
    question: "Start or join a Jam",
    answer:
      "Spotify Jams let premium users host listening sessions with friends, while free users can join and listen together with shared controls.",
    url: "/social/friends",
  },
  {
    question: "Volume normalization",
    answer:
      "Volume normalization makes sure your songs play at a consistent volume level across playlists, which helps provide a smooth listening experience.",
    url: "/settings/notifications",
  },
  {
    question: "Spotify keyboard shortcuts",
    answer:
      "Spotify desktop app supports various keyboard shortcuts to help you control playback, volume, and navigation quickly and easily.",
    url: "/charge/dispute",
  },
  {
    question: "Autoplay tracks",
    answer:
      "Autoplay automatically plays related songs once your playlist or album ends, helping you discover new music seamlessly.",
    url: "/premium/duo/invite",
  },
];

function SearchResult() {
  const [hideSearchList, setHideSearchList] = useState(false);

  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  const [navTitle, setNavTitle] = useState("");
  const [savequery, setsavequery] = useState("");
  const [searchFaqList, setsearchFaqList] = useState(spotifyFAQs);

  return (
    <section className="min-h-screen flex flex-col justify-between">
      <section>
        {/* header start */}

        <div
          style={{
            background: `linear-gradient(98.85deg, rgba(18, 18, 18, 0.3) 0%, #121212 100%), 
                     linear-gradient(180deg, rgba(18, 18, 18, 0) 0%, #000 100%), 
                     #1ed760`,
          }}
          className="h-[200px]"
        >
          {/* searchbox */}

          <div className="flex items-center gap-10 lg:gap-20 h-full max-w-[600px] m-auto px-4 lg:px-0">
            <section className="flex-1">
              <SupportSearchField
                crumbs={true}
                navTitle={navTitle}
                setNavTitle={setNavTitle}
                searchFaqList={searchFaqList}
                setsearchFaqList={setsearchFaqList}
                spotifyFAQs={spotifyFAQs}
                setsavequery={setsavequery}
                hideSearchList={hideSearchList}
                setHideSearchList={setHideSearchList}
              />
            </section>
          </div>
        </div>

        {/* header end */}

        <div className="flex items-center gap-10 lg:gap-20 h-full max-w-[600px] m-auto px-4 lg:px-0">
          {searchFaqList.length !== 0 && (
            <div>
              <h3 className="text-gray">
                {searchFaqList.length} search{" "}
                {searchFaqList.length < 2 ? "result" : "results"} for "
                {savequery}"
              </h3>

              <div className="mt-2">
                {searchFaqList.map((faq, i) => {
                  return (
                    <Link
                      to={`/article${faq.url}`}
                      key={i}
                      className="py-6 border-b last:border-none border-[#656565] cursor-pointer group"
                      // onMouseDown={(e) => {
                      //   window.location.href = `${
                      //     import.meta.env.BASE_URL
                      //   }article${faq.url}`;
                      // }}
                    >
                      <h4 className="font-bold group-hover:text-green">
                        {faq.question}
                      </h4>
                      <p className="text-gray text-sm mt-1">{faq.answer}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {searchFaqList.length === 0 && savequery !== "" && (
            <div>
              <h3 className="text-3xl">No results found for "{savequery}"</h3>
              <p className="text-gray">
                Please try another search or{" "}
                <a href="#" className="underline text-white">
                  manage your account here.
                </a>
              </p>
            </div>
          )}
        </div>
      </section>

      <div className="lg:px-15 px-5 mt-20">
        <Footer />
      </div>
    </section>
  );
}

export default SearchResult;
