import React, { useEffect, useRef, useState } from "react";
import { icons, images } from "../assets/Assets";
import PricePlanCard from "../components/SubComponents/PricePlanCard";
import Accordian from "../components/SubComponents/Accordian";

const plans = [
  {
    id: 1,
    name: "Individual",
    trial: "Free for 1 month",
    afterTrialPrice: "PKR 349 / month after",
    features: [
      "1 Premium account",
      "Cancel anytime",
      "Subscribe or one-time payment",
    ],
    buttonText: "Try free for 1 month",
    bottomText:
      "Free for 1 month, then PKR 349 per month after. Offer only available if you haven't tried Premium before.",
    color: "#FFD2D7",
    hoverColor: "#FFE5E8", // very slightly lighter
  },
  {
    id: 2,
    name: "Student",
    trial: "Free for 1 month",
    afterTrialPrice: "PKR 175 / month after",
    features: [
      "1 verified Premium account",
      "Discount for eligible students",
      "Cancel anytime",
      "Subscribe or one-time payment",
    ],
    buttonText: "Get Pro Plan",
    bottomText:
      "Free for 1 month, then PKR 175 per month after. Offer available only to students at an accredited higher education institution and if you haven't tried Premium before.",
    color: "#C4B1D4",
    hoverColor: "#DCD0E6",
  },
  {
    id: 3,
    name: "Duo",
    // trial: "",

    afterTrialPrice: "PKR 449 / month",
    features: [
      "2 Premium accounts",
      "Cancel anytime",
      "Subscribe or one-time payment",
    ],
    buttonText: "Get Premium Duo",
    bottomText: "For couples who reside at the same address.",
    color: "#FFC862",
    hoverColor: "#FFDB92",
  },
  {
    id: 4,
    name: "Family",
    // trial: "",
    afterTrialPrice: "PKR 579 / month",
    features: [
      "Up to 6 Premium accounts",
      "Control content marked as explicit",
      "Cancel anytime",
      "Subscribe or one-time payment",
    ],
    buttonText: "Get Premium Family",
    bottomText: "For up to 6 family members residing at the same address.",
    color: "#A5BBD1",
    hoverColor: "#C1D4E5",
  },
];

const faqs = [
  {
    question: "How does the Spotify Premium trial work?",
    answer:
      "If you’ve never had Premium before, you may be eligible for a free (or reduced rate) trial.\n\n" +
      "For trials, you’ll still need to enter a valid payment method to sign up. We’ll use this to confirm your country or region and take payments if you want to keep Premium after the offer ends.\n\n" +
      "We’ll send you a reminder 7 days before your trial ends. Country restrictions and Terms apply.",
  },
  {
    question: "How do I cancel my Premium plan?",
    answer:
      "You can easily cancel your Premium plan online at any time on your account page.\n\n" +
      "Premium paid subscriptions when cancelled will run until your next billing date, after which your account will switch over to our free service.\n\n" +
      "If you cancel during a zero-priced free trial period, you will lose access to your Premium benefits immediately and your account will switch over to our free service. Zero-priced free trials cannot be reactivated.\n\n" +
      "You’ll still keep all your playlists and saved music, and be able to listen with ads on our free service.",
  },
  {
    question: "How does the Premium Duo plan work?",
    answer:
      "Premium Duo is a plan for a couple who live together. Compared with having two full-price Premium Individual accounts, it’s also cheaper. We’ll ask for your address to ensure you live at the same address. You can invite a member to the plan right after the purchase.\n\n" +
      "Each member has their own separate Premium account and can listen at the same time with their own account. All saved music and playlists are their own. The other account holder cannot see what you are listening to.\n\n" +
      "Read more info about Premium Duo.",
  },
  {
    question: "How does the Premium Family plan work?",
    answer:
      "Premium Family is a plan for up to 6 family members who live together. Compared to everyone having their own full-price Premium Individual account, it’s also cheaper. We will ask for your address to ensure you live at the same address. You can invite members to the plan right after the purchase.\n\n" +
      "Each member has their own separate Premium account and can listen at the same time with their own account. All saved music and playlists are their own. Other account holders cannot see what you are listening to.\n\n" +
      "Read more info about Premium Family.",
  },
  {
    question: "How does the Premium Student Plan work?",
    answer:
      "If you are a student enrolled at an accredited college or university, and above the age of 18, then yes. You can get Premium Student for up to 4 years.\n\n" +
      "Read more info about Premium Student.",
  },
  {
    question: "How much is Spotify Premium in Pakistan?",
    answer:
      "The Spotify Premium prices in Pakistan are different depending on which Premium plan you choose:\n\n" +
      "The Spotify Premium Individual plan costs PKR 349 per month,\n" +
      "the Premium Duo plan costs PKR 449 per month,\n" +
      "the Premium Family plan costs PKR 579 per month,\n" +
      "the Premium Student plan costs PKR 175 per month.\n\n" +
      "If you’ve never had a Premium plan before, you may be eligible for a free (or reduced rate) trial. Country restrictions and terms apply.",
  },
];

const musicFeatures = [
  "Ad-free music listening",
  "Download songs",
  "Play songs in any order",
  "High quality audio",
  "Listen with friends in real time",
  "Organize listening queue",
];

function Premium() {
  const [isOpen, setisOpen] = useState(false);
  const hoverLink = useRef();
  let checkclicked = useRef(false);

  useEffect(() => {
    const a = hoverLink.current;
    const handleMouseEnter = () =>
      !checkclicked.current ? setisOpen(true) : "";
    const handleMouseLeave = () =>
      !checkclicked.current ? setisOpen(false) : "";
    const handleBodyCLick = () => {
      checkclicked.current ? setisOpen(false) : "";
      checkclicked.current = false;
    };

    const handleMouseClick = (e) => {
      e.stopPropagation();
      checkclicked.current = !checkclicked.current;
      setisOpen(checkclicked.current);
    };

    a.addEventListener("mouseenter", handleMouseEnter);
    a.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("click", handleBodyCLick);
    a.addEventListener("click", handleMouseClick);

    return () => {
      a.removeEventListener("mouseenter", handleMouseEnter);
      a.removeEventListener("mouseleave", handleMouseLeave);
      a.removeEventListener("click", handleMouseClick);
      document.body.removeEventListener("click", handleBodyCLick);
    };
  });

  return (
    <>
      <section className="rounded !rounded-bl-none !rounded-br-none bg-gradient-to-l from-[#14377F] to-[#700D4E] py-6">
        <div className="p-4 max-w-[700px] w-full m-auto flex flex-col text-center gap-4">
          <h2 className="text-[1.8rem] !leading-[1]">
            Listen without limits. Try 1 month <br /> of Premium Individual for
            free.
          </h2>
          <p className="!font-semibold text-lg">
            Only PKR 349/month after. Cancel anytime.
          </p>
          <div className="flex justify-center gap-4 my-3 ">
            <a
              href="#"
              className="rounded-full hover:scale-[1.05] transition-transform bg-white hover:bg-[#eee] text-black font-bold px-8 py-3"
            >
              Get started
            </a>
            <a
              href="#"
              className="rounded-full bg-transparent hover:scale-[1.05] transition-transform border font-bold px-8 py-3"
            >
              View all plans
            </a>
          </div>
          <p className="text-[.8rem]">
            Free for 1 month, then PKR 349 per month after. Offer only available
            if you haven't tried Premium before.{" "}
            <a href="#" className="underline">
              Terms apply.
            </a>
          </p>
        </div>
      </section>

      <section className=" flex flex-col gap-10">
        <div className="p-4 max-w-[700px] w-full m-auto flex flex-col text-center gap-4">
          <h2 className="text-[1.8rem] !leading-[1]">
            Affordable plans for any situation
          </h2>
          <p className=" text-lg !leading-[1.3]">
            Choose a Premium plan and listen to ad-free music without limits on
            your phone, speaker, and other devices. Pay in various ways. Cancel
            anytime.
          </p>

          <div className="flex gap-2 m-auto mt-10">
            <div className="w-13 p-1 bg-white rounded-[5px]">
              <img src={images.visa} alt="" />
            </div>
            <div className="w-13 p-1 bg-white rounded-[5px]">
              <img src={images.mastercard} alt="" />
            </div>
            <div className="w-13 p-1 bg-white rounded-[5px]">
              <img src={images.amex} alt="" />
            </div>
            <div className="w-13 p-1 bg-white rounded-[5px]">
              <img src={images.jcb} alt="" />
            </div>
          </div>

          <a
            ref={hoverLink}
            className="underline w-fit m-auto mt-[-8px] font-semibold"
          >
            +6 more
          </a>

          <div
            className="m-auto group-hover:opacity-[1s] mt-[-2px] relative w-[40%]"
            style={{ opacity: isOpen ? "1" : "0" }}
          >
            <div className="bg-white rounded p-2 w-full absolute">
              <div className="grid grid-cols-4 items-center gap-4  flex-wrap">
                <div className="w-13 p-1 bg-white rounded-[5px]">
                  <img src={images.cup} alt="" />
                </div>
                <div className="w-13 p-1 bg-white rounded-[5px]">
                  <img src={images.easypaisa} alt="" />
                </div>
                <div className="w-13 p-1 bg-white rounded-[5px]">
                  <img src={images.jazzcash} alt="" />
                </div>
                <div className="w-13 p-1 bg-white rounded-[5px]">
                  <img src={images.zong} alt="" />
                </div>
                <div className="w-13 p-1 bg-white rounded-[5px]">
                  <img src={images.ufone} alt="" />
                </div>
                <div className="w-13 p-1 bg-white rounded-[5px]">
                  <img src={images.jazz} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 max-w-[700px] w-full m-auto flex items-center justify-between text-center gap-6">
          <h2 className="text-[1.8rem] !leading-[1]">
            All Premium plans include
          </h2>
          <ul className="flex flex-col text-left text-[#eee] font-semibold">
            <li className="flex items-center gap-1">
              <span className="text-[1.3rem]">{icons.tick_icon}</span>
              Ad-free music listening
            </li>
            <li className="flex items-center gap-1">
              <span className="text-[1.3rem]">{icons.tick_icon}</span>
              Download to listen offline
            </li>
            <li className="flex items-center gap-1">
              <span className="text-[1.3rem]">{icons.tick_icon}</span>
              Play songs in any order
            </li>
            <li className="flex items-center gap-1">
              <span className="text-[1.3rem]">{icons.tick_icon}</span>
              High audio quality
            </li>
            <li className="flex items-center gap-1">
              <span className="text-[1.3rem]">{icons.tick_icon}</span>
              Listen with friends in real time
            </li>
            <li className="flex items-center gap-1">
              <span className="text-[1.3rem]">{icons.tick_icon}</span>
              Organize listening queue
            </li>
          </ul>
        </div>

        <div className="p-4 lg:p-0 max-w-[700px] w-full m-auto grid grid-cols-1 place-items-center lg:grid-cols-2 gap-12 flex-wrap">
          {plans.map((plan) => (
            <div key={plan.id} className="w-[330px]">
              <PricePlanCard plan={plan} />
            </div>
          ))}
        </div>
        <div className="p-4 lg:p-0 max-w-[700px] w-full m-auto ">
          <div className="text-center flex flex-col gap-6 my-8">
            <h2 className="text-[1.8rem] !leading-[1]">Questions?</h2>
            <p className="!leading-[1.3]">We’ve got answers.</p>
            <p className="!leading-[1.3]">
              Find more answers on our{" "}
              <a href="#" className="underline">
                Support site.
              </a>
            </p>
          </div>

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-[#4f4f4f] last:border-b-0"
            >
              <Accordian faq={faq} />
            </div>
          ))}
        </div>

        <div className="p-4 lg:p-0 max-w-[700px] w-full m-auto mt-8 ">
          <div className="text-center">
            <h2 className="text-[1.8rem] !leading-[1] mb-4">
              Experience the difference
            </h2>
            <p className="!leading-[1.3] text-lg !font-semibold">
              Go Premium and enjoy full control of your listening. Cancel
              anytime.
            </p>
          </div>

          <div className=" max-w-[500px] w-full m-auto mt-8 overflow-auto">
            <div className=" flex items-center justify-between h-[120px] border-b py-2">
              <h3 className="w-[40%] self-end">What you'll get</h3>
              <h3 className="w-[30%] flex-center">
                Spotify's <br /> Free plan
              </h3>
              <div className=" w-[30%] flex-center bg-gradient-to-b from-[#242424] from-40% to-[#121212] h-full font-semibold">
                <h3 className="flex items-center gap-1 w-full h-full px-4 ">
                  <img src={images.spotify_logo} alt="" className="w-6" />
                  Premium
                </h3>
              </div>
            </div>

            {musicFeatures.map((f, i) => {
              return (
                <div
                  key={i}
                  className="group hover:bg-[#454545] flex items-center justify-between h-[75px] border-b"
                >
                  <p className="w-[40%] ">
                    <span className="border-b border-dashed border-gray">
                      {f}
                    </span>
                  </p>
                  <h3 className="w-[30%] flex-center text-[.8rem]">—</h3>
                  <h3 className="w-[30%] flex-center bg-[#211E1E] h-full items-center gap-1 font-semibold">
                    <span className="p-1.5 rounded-full bg-white text-lg text-black">
                      {icons.tick_icon}
                    </span>
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default Premium;
