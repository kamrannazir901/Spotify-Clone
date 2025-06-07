import React from "react";
import { FaTools } from "react-icons/fa"; // maintenance-style icon

function PodcastsResult() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-green-200 text-green-900 rounded-2xl shadow-lg p-6 mx-4 mt-10">
      <FaTools size={48} className="mb-4 text-green-700" />
      <h1 className="text-2xl font-semibold mb-2">We're Working On It!</h1>
      <p className="text-center max-w-md text-green-800">
        The Podcasts section is currently under maintenance. We're making
        improvements to give you a better experience. Check back soon!
      </p>
    </div>
  );
}

export default PodcastsResult;
