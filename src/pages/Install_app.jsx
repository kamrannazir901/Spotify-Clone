import React from "react";
import { images } from "../assets/Assets";

function Install_app() {
  return (
    <section className="bg-gradient-to-b w-full from-[#66AF9B] to-[#EE9CCD] p-4 lg:p-8 rounded">
      <div className="w-full [@media(max-width:1200px)]:max-w-[500px] m-auto bg-gradient-to-b from-[#EE9CCD] to-[rgb(102,175,155)] p-2 lg:p-8 text-black flex items-center flex-wrap [@media(min-width:1200px)]:flex-nowrap">
        {/* left */}
        <div className="flex  flex-col gap-6 py-4 lg:py-12 ">
          <img
            src={images.spotify_black_logo_with_text}
            className="w-25"
            alt=""
          />

          <h2 className="text-[2rem] !leading-[1.1]">
            Download Spotify for Windows
          </h2>
          <p className="!font-semibold text-[1.2rem] !leading-tight">
            Enjoy high-quality audio and offline playback, plus Windows Game Bar
            integration and a friend activity feed that lets you see what your
            friends are listening to in real time.
          </p>

          <a href="#" className="relative w-fit h-[50px]">
            <img src={images.install_app_button} alt="" />
          </a>

          <a href="#" className="text-sm hover:underline font-semibold">
            Download directly from spotify
          </a>
        </div>
        {/* right */}
        <div className=" pb-4 lg:pb-0">
          <img src={images.install_app} className="object-contain" />
        </div>
      </div>
    </section>
  );
}

export default Install_app;
