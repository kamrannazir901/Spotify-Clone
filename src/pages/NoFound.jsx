import React from "react";
import { useNavigate } from "react-router-dom";
import { icons } from "../assets/Assets";

function NoFound() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center h-[100vh] text-white text-center px-4"
      style={{
        background: `linear-gradient(98.85deg, rgba(18, 18, 18, 0.3) 0%, #121212 100%), 
                     linear-gradient(180deg, rgba(18, 18, 18, 0) 0%, #000 100%), 
                     #1ed760`,
      }}
    >
      <div className="text-6xl font-bold mb-4">404</div>
      <h1 className="text-2xl md:text-4xl font-semibold mb-2">
        Page Not Found
      </h1>
      <p className="text-sm md:text-base text-gray-300 mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <button
        onClick={() => navigate(-1)}
        className="bg-white cursor-pointer text-black px-6 py-3 rounded-full text-sm font-bold hover:scale-105 transition-transform"
      >
        Go Back
      </button>
    </div>
  );
}

export default NoFound;
