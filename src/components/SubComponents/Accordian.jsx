import React, { useState } from "react";
import { icons } from "../../assets/Assets";

function Accordian({ faq }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <div
        onClick={(e) => {
          setOpen((p) => !p);
        }}
        className={`flex group items-center justify-between ${
          isOpen ? "bg-[#2A2A2A]" : ""
        } p-4`}
      >
        <p className="!font-bold group-hover:underline">{faq.question}</p>
        <span
          className={`text-2xl transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          {icons.downarrow_icon}
        </span>{" "}
      </div>
      <div
        className={`bg-[#1F1F1F] overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <p className="px-6 pt-3 pb-6 whitespace-pre-line !leading-[1.2]">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export default Accordian;
