import React from "react";
import { browseCategories } from "../assets/Assets";

function Browse() {
  return (
    <div className="contentarea">
      <h2 className="text-2xl mt-12 mb-4">Browse all</h2>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-6">
        {/* main card */}
        {browseCategories.map(({ title, color, image }, i) => (
          <div
            key={i}
            className="relative cursor-pointer pl-4 rounded-lg h-[130px] overflow-hidden"
            style={{ backgroundColor: color }}
          >
            <h3 className="text-2xl pt-2">{title}</h3>
            <div className="relative">
              <img
                src={image}
                alt=""
                className="absolute top-[-10px] right-[-20px] rotate-30 w-[110px]"
              />
            </div>
          </div>
        ))}

        {/* main card */}
      </div>
    </div>
  );
}

export default Browse;
