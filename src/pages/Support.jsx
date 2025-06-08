import React, { useEffect, useRef, useState } from "react";
import { icons } from "../assets/Assets";

import SupportAccordian, {
  items,
} from "../components/SubComponents/SupportAccordian";
import { Link, useNavigate } from "react-router-dom";
import SupportSearchField from "../components/SubComponents/SupportSearchField";

const quickHelpItems = [
  "Can’t log in to Spotify",
  "Failed payment help",
  "Charged too much",
  "Invite or remove Family plan members",
  "How to change your payment details",
];
function Support() {
  const [navTitle, setNavTitle] = useState("");

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
        <SupportSearchField
          crumbs={false}
          navTitle={navTitle}
          setNavTitle={setNavTitle}
        />

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
