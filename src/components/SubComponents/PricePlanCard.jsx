import React, { useState } from "react";
import { images } from "../../assets/Assets";

function PricePlanCard({ plan }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-box h-[450px] w-full rounded text-[#eee]">
      <div className="h-[15%] relative">
        {plan.trial && (
          <span
            style={{ backgroundColor: plan.color }}
            className="absolute text-[#000] font-semibold rounded !rounded-bl-none !rounded-tr-none py-[.4rem] px-6"
          >
            {plan.trial}
          </span>
        )}
      </div>
      <div className="h-[70%] flex flex-col justify-between  px-4">
        <div className="flex flex-col gap-3">
          <div className="font-bold flex items-center gap-1">
            <img src={images.spotify_logo} className="w-6" alt="" />
            Premium
          </div>
          <h3 className="text-[2rem] !tracking-tight">{plan.name}</h3>
          <div>
            {plan.trial && (
              <p className="!leading-[1.2] !tracking-tight !font-semibold">
                Free for 1 month
              </p>
            )}

            <p
              className={`!leading-[1.2] !tracking-tight !font-semibold ${
                plan.trial ? "text-gray" : "text-[#eee]"
              } `}
            >
              {plan.afterTrialPrice}
            </p>
          </div>
          <div className="h-[1px] bg-gray opacity-20"></div>
          <div>
            <ul className="list-disc ml-4 leading-tight font-semibold">
              {plan.features.map((v, i) => {
                return <li key={i}>{v}</li>;
              })}
            </ul>
          </div>
        </div>
        <div>
          <a
            href="#"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              backgroundColor: isHovered ? plan.hoverColor : plan.color,
            }}
            className="text-[#000] text-center font-semibold py-3 px-8 w-full block rounded-full"
          >
            {plan.buttonText}
          </a>
        </div>
      </div>
      <div className="h-[15%] px-4 py-2">
        <p className="text-[.7rem] tracking-tight text-gray text-center !leading-[1.3]">
          {plan.bottomText}&nbsp;
          <a href="#" className="underline">
            Terms apply.
          </a>
        </p>
      </div>
    </div>
  );
}

export default PricePlanCard;
