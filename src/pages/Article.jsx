import React, { useEffect, useRef, useState } from "react";
import { icons } from "../assets/Assets";
import SupportAccordian, {
  items,
} from "../components/SubComponents/SupportAccordian";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SupportSearchField from "../components/SubComponents/SupportSearchField";
function Article() {
  const [isFocused, setIsFocused] = useState(false);
  const [showmsg, setShowmsg] = useState(null);
  const [formData, setFormData] = useState({
    feedback: "",
    radioInput: "",
  });
  const [navTitle, setNavTitle] = useState("");

  const [showNav, setshowNav] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setshowNav(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <>
      <section>
        {/* header start */}

        <div
          style={{
            background: `linear-gradient(98.85deg, rgba(18, 18, 18, 0.3) 0%, #121212 100%), 
                 linear-gradient(180deg, rgba(18, 18, 18, 0) 0%, #000 100%), 
                 #1ed760`,
          }}
          className={`${showNav ? "h-[130px]" : "h-[160px]"} md:h-[200px]`}
        >
          {/* searchbox */}

          <div className="flex items-center gap-10 lg:gap-20 h-full max-w-[1000px] m-auto px-4 lg:px-0">
            <section className="flex-1">
              {showNav && (
                <div
                  className="flex items-center gap-4 cursor-pointer w-fit hover:scale-[1.05] p-4 pl-0"
                  onClick={() => {
                    setshowNav(!showNav);
                  }}
                >
                  <div className="flex-center">
                    <span className="rounded-full bg-[#2A2A2A] p-[5px] text-[1.5rem]">
                      {icons.backarrow_icon}
                    </span>
                  </div>
                  <h3 className="text-sm">Back to article</h3>
                </div>
              )}
              {!showNav && (
                <SupportSearchField
                  crumbs={true}
                  navTitle={navTitle}
                  setNavTitle={setNavTitle}
                />
              )}
            </section>

            <section className="basis-[300px] hidden md:block"></section>
          </div>
        </div>

        {/* header end */}

        <div className="flex justify-between gap-10 lg:gap-20 max-w-[1000px] m-auto px-4 lg:px-0">
          {!showNav && (
            <section className=" flex-1 flex flex-col gap-8">
              {/* go to account */}
              <div className="bg-[#2A2A2A] group p-5 rounded-[5px] flex items-center justify-between gap-4 flex-wrap lg:flex-nowrap">
                <div className="flex items-center gap-3 basis-[400px] max-w-[400px] flex-1">
                  {/* icon before start */}

                  <div className="relative z-0 before:absolute before:p-[1.2rem] before:rounded-[5px]  before:bg-green before:top-[-4.5px] before:left-0  rounded-[5px]  before:rotate-[5deg] group-hover:before:rotate-[15deg] before:bottom-[2rem] text-[1.4rem] ">
                    <div className="relative p-[.6rem] top-[3.5px] left-[-6px] text-green rounded-[5px] bg-[#2A2A2A] group-hover:rotate-[-10deg]">
                      {icons.user_icon}
                    </div>
                  </div>

                  {/* icon before end */}
                  <div>
                    <h3>Manage your Spotify Account easily</h3>
                    <p className="text-sm !leading-[1.4]">
                      Your info, payment and privacy all in one place.
                    </p>
                  </div>
                </div>
                <a
                  href="#"
                  className="bg-green text-black font-bold px-4 py-2 text-nowrap text-sm rounded-full text-center min-w-[150px] flex-1 hover:scale-[1.05] hover:bg-green-hover"
                >
                  Go to your account
                </a>
              </div>

              {/* link title block */}

              <div
                onClick={() => {
                  setshowNav(!showNav);
                }}
                className="bg-[#2A2A2A] group p-3 border border-[#2A2A2A] hover:border-white rounded-[5px] flex items-center justify-between gap-2 flex-wrap cursor-pointer md:hidden"
              >
                <h3>{navTitle?.[0] || "Article not found"}</h3>
                <div className="rotate-[-90deg] text-2xl">
                  {icons.downarrow_icon}
                </div>
              </div>
              {/* post content */}

              {navTitle?.[0] && (
                <div className="bg-[#2A2A2A] group p-5 rounded-[5px] flex flex-col gap-4">
                  <h1 className="text-3xl lg:text-5xl">{navTitle[0]}</h1>
                  <h1 className="text-xl lg:text-xl !text-green">
                    {navTitle[1]}
                  </h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Cumque maiores ab amet adipisci minus neque voluptas nam
                    nobis maxime eius! Dolor est nemo debitis asperiores ducimus
                    tenetur. Saepe
                  </p>
                  <ul className="list-disc ml-5 font-semibold">
                    <li>Playing music track issue</li>
                    <li>Playing music order issue</li>
                  </ul>
                </div>
              )}
              {/* related */}
              <div className="bg-[#2A2A2A] group p-5 rounded-[5px] flex flex-col">
                <h3 className="text-lg mb-2">Related Articles</h3>
                <a href="#" className="text-green underline">
                  Getting started on Spotify
                </a>
                <a href="#" className="text-green underline">
                  Shuffle play
                </a>
                <a href="#" className="text-green underline">
                  Play Queue
                </a>
                <a href="#" className="text-green underline">
                  Spotify Connect
                </a>
                <a href="#" className="text-green underline">
                  Spotify keyboard shortcuts{" "}
                </a>
                <a href="#" className="text-green underline">
                  How to hide and unhide songs
                </a>
              </div>
              {/* like dislike */}
              <div className="bg-[#2A2A2A] group p-5 rounded-[5px]">
                {showmsg !== "yes" && showmsg !== "no" && (
                  <div className="flex items-center justify-between gap-1 flex-wrap">
                    <h3 className="text-lg shrink-0">
                      Was this article helpful?
                    </h3>

                    <div className="flex items-center gap-4">
                      <button
                        className="flex items-center justify-center gap-2 font-bold py-1 text-nowrap text-[1rem] rounded-full text-center min-w-[150px] border border-gray hover:border-white cursor-pointer"
                        onClick={() => setShowmsg("yes")}
                      >
                        <span className="text-[1.1rem]">
                          {icons.thumb_up_icon}
                        </span>{" "}
                        Yes
                      </button>
                      <button
                        className="flex items-center justify-center gap-2 font-bold px-4 py-1 text-nowrap text-[1rem] rounded-full text-center min-w-[150px] border border-gray hover:border-white cursor-pointer"
                        onClick={() => setShowmsg("no")}
                      >
                        <span className="text-[1.1rem]">
                          {icons.thumb_down_icon}
                        </span>
                        No
                      </button>
                    </div>
                  </div>
                )}
                {/* form */}
                {showmsg !== "yes" && showmsg === "no" && (
                  <div>
                    <h4 className="text-sm font-semibold mb-4">
                      How can we improve this article?
                    </h4>
                    <form className="flex flex-col gap-2">
                      <label
                        htmlFor="notanswer"
                        className="flex items-center gap-2 text-sm"
                      >
                        <input
                          type="radio"
                          id="notanswer"
                          name="improve"
                          value="notanswer"
                          className="border-gray border-21 accent-green w-[15px] h-[15px] bg-white"
                          checked={formData.radioInput === "notanswer"}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              radioInput: e.target.value,
                            });
                          }}
                        />
                        This article didn't answer my question
                      </label>
                      <label
                        htmlFor="dif"
                        className="flex items-center gap-2 text-sm "
                      >
                        <input
                          type="radio"
                          id="dif"
                          name="improve"
                          value="difficult"
                          checked={formData.radioInput === "difficult"}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              radioInput: e.target.value,
                            });
                          }}
                        />
                        The steps in the article were difficult to understand
                      </label>
                      <label
                        htmlFor="conf"
                        className="flex items-center gap-2 text-sm "
                      >
                        <input
                          type="radio"
                          id="conf"
                          name="improve"
                          value="confuse"
                          checked={formData.radioInput === "confuse"}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              radioInput: e.target.value,
                            });
                          }}
                        />
                        The wording used in this article made it confusing
                      </label>
                      <label
                        htmlFor="borken"
                        className="flex items-center gap-2 text-sm "
                      >
                        <input
                          type="radio"
                          id="borken"
                          name="improve"
                          value="broken"
                          checked={formData.radioInput === "broken"}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              radioInput: e.target.value,
                            });
                          }}
                        />
                        There was a broken link, graphic, or video
                      </label>
                      <label
                        htmlFor="other"
                        className="flex items-center gap-2 text-sm "
                      >
                        <input
                          type="radio"
                          id="other"
                          name="improve"
                          value="other"
                          checked={formData.radioInput === "other"}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              radioInput: e.target.value,
                            });
                          }}
                        />
                        Other
                      </label>

                      {formData.radioInput === "other" && (
                        <div className="flex flex-col">
                          <textarea
                            type="text"
                            placeholder="Your feedback matters to us. Please tell us more (optional)."
                            value={formData.feedback}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                feedback: e.target.value,
                              });
                            }}
                            className="border-[1px] border-gray hover:border-white text-white px-2 py-3 rounded-[5px] focus:border-[2px] focus:border-white outline-none placeholder:text-gray min-h-[50px] mt-4"
                          />
                          <button
                            role="submit"
                            type="submit"
                            className=" w-fit text-black bg-green items-center justify-center gap-2 font-bold px-3 py-1 mt-4 text-nowrap text-sm rounded-full text-center border border-gray  hover:border-white cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowmsg("yes");
                            }}
                          >
                            Submit
                          </button>
                        </div>
                      )}
                    </form>
                  </div>
                )}
                {/* message */}
                {showmsg === "yes" && (
                  <div>
                    <h3 className="font-black">Thank you for your feedback!</h3>
                  </div>
                )}
              </div>
            </section>
          )}

          <section
            className="bg-[#2A2A2A] lg:basis-[300px] rounded h-fit hidden md:block"
            style={{
              display: showNav ? "block" : "",
              flexBasis: showNav ? "100%" : "300px",
              marginTop: showNav ? "-20px" : "",
            }}
          >
            <SupportAccordian iconshow={false} />
          </section>
        </div>
      </section>
      <div className="lg:px-15 px-5 mt-20">
        <Footer />
      </div>
    </>
  );
}

export default Article;
