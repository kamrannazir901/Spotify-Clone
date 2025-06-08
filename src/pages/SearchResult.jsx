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
      "Spotify offers different audio quality options based on your device, plan, and preferences. Music quality varies for free and premium users, with podcasts at 96kbit/s (128kbit/s on web).",
    url: "/billing/how-it-works",
  },
  {
    question: "Play Queue",
    answer:
      "View and arrange upcoming tracks using the Play Queue. Select your device to learn how to find and modify your queue.",
    url: "/payments/history",
  },
  {
    question: "Now Playing view",
    answer:
      "The Now Playing view lets you control music playback with options to save tracks, shuffle, repeat, and view the play queue. You can also use Spotify Connect to play on other devices.",
    url: "/payments/update-info",
  },
  {
    question: "Spotify lock screen widget on iPhone",
    answer:
      "Add the Spotify widget to your iPhone lock screen for quick access. Requires iOS 16+ and Spotify 8.8.26+. Follow these steps to add the widget.",
    url: "/payments/paypal",
  },
  {
    question: "Start or join a Jam",
    answer:
      "Spotify Jams allow users to listen and add songs together. Premium users can host, while free users can join. Features include adding/removing users, leaving a Jam, controlling volume, and playback, with troubleshooting tips.",
    url: "/billing/faqs",
  },
  {
    question: "Volume normalization",
    answer:
      "Volume normalization evens out the loudness of songs, making for a consistent listening experience, and is a feature of Premium.",
    url: "/charge/unexpected",
  },
  {
    question: "Spotify keyboard shortcuts",
    answer:
      "The article lists essential keyboard shortcuts for using Spotify on desktop, enhancing user navigation and control.",
    url: "/payments/credit-cards",
  },
  {
    question: "Autoplay tracks",
    answer:
      "Spotify's Autoplay feature continues playing music by automatically playing similar songs. This article explains how to turn Autoplay on and off for different devices.",
    url: "/charge/dispute",
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
                      key={i}
                      className="py-6 border-b last:border-none border-[#656565] cursor-pointer group"
                      onMouseDown={(e) => {
                        window.location.href = `${
                          import.meta.env.BASE_URL
                        }article${faq.url}`;
                      }}
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
