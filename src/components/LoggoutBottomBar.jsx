import React from "react";
import { Link } from "react-router-dom";

function LoggoutBottomBar() {
  return (
    <div className="flex w-full items-center justify-between bg-[linear-gradient(90deg,_#af2896,_#509bf5)] py-2 px-4">
      <div>
        <p>Preview of Spotify</p>
        <p>
          Sign up to get unlimited songs and podcasts with occasional ads. No
          credit card needed.
        </p>
      </div>
      <div>
        <Link
          to="signup"
          className="text-black font-bold bg-white text-nowrap py-3 px-8 rounded-full hover:!text-black hover:bg-[#eee]"
        >
          Sign up free
        </Link>
      </div>
    </div>
  );
}

export default LoggoutBottomBar;
