import React, { useState } from "react";
import { icons } from "../../assets/Assets";
import {
  MdPayment,
  MdManageAccounts,
  MdWorkspacePremium,
  MdAppSettingsAlt,
  MdDevicesOther,
  MdSecurity,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

export const items = [
  {
    title: "Payments & billing",

    icon: <MdPayment />,
    children: [
      {
        title: "Recommended topics",
        links: [
          { title: "How billing works", url: "/billing/how-it-works" },
          { title: "Payment FAQs", url: "/billing/faqs" },
        ],
      },
      {
        title: "Manage payments",
        links: [
          { title: "Update payment info", url: "/payments/update-info" },
          { title: "View payment history", url: "/payments/history" },
        ],
        children: [
          {
            title: "Recommended topics",
            links: [
              { title: "How billing works", url: "/billing/how-it-works" },
              { title: "Payment FAQs", url: "/billing/faqs" },
            ],
          },
          {
            title: "Manage payments",
            links: [
              { title: "Update payment info", url: "/payments/update-info" },
              { title: "View payment history", url: "/payments/history" },
            ],
          },
          {
            title: "Payment methods",
            links: [
              { title: "Credit card options", url: "/payments/credit-cards" },
              { title: "PayPal setup", url: "/payments/paypal" },
            ],
          },
          {
            title: "Charge help",
            links: [
              { title: "Dispute a charge", url: "/charge/dispute" },
              { title: "Unexpected charges", url: "/charge/unexpected" },
            ],
          },
        ],
      },
      {
        title: "Payment methods",
        links: [
          { title: "Credit card options", url: "/payments/credit-cards" },
          { title: "PayPal setup", url: "/payments/paypal" },
        ],
      },
      {
        title: "Charge help",
        links: [
          { title: "Dispute a charge", url: "/charge/dispute" },
          { title: "Unexpected charges", url: "/charge/unexpected" },
        ],
      },
    ],
  },
  {
    title: "Manage your account",
    icon: <MdManageAccounts />,
    children: [
      {
        title: "Logging In",
        links: [
          { title: "Forgot password", url: "/account/forgot-password" },
          { title: "Login issues", url: "/account/login-issues" },
        ],
      },
      {
        title: "Profile Help",
        links: [
          { title: "Edit profile", url: "/account/edit-profile" },
          { title: "Profile picture", url: "/account/profile-picture" },
        ],
      },
      {
        title: "Account settings",
        links: [
          { title: "Language preferences", url: "/settings/language" },
          { title: "Notification settings", url: "/settings/notifications" },
        ],
      },
      {
        title: "Security",
        links: [
          { title: "Two-factor auth", url: "/security/2fa" },
          { title: "Suspicious activity", url: "/security/activity" },
        ],
      },
    ],
  },
  {
    title: "Premium plans",
    icon: <MdWorkspacePremium />,
    children: [
      {
        title: "Available plans",
        links: [
          { title: "Individual", url: "/premium/individual" },
          { title: "Family", url: "/premium/family" },
        ],
      },
      {
        title: "Plan settings",
        links: [
          { title: "Upgrade or downgrade", url: "/premium/settings" },
          { title: "Billing cycle", url: "/premium/billing-cycle" },
        ],
      },
      {
        title: "Premium Family",
        links: [
          { title: "Add family members", url: "/premium/family/add" },
          { title: "Manage family", url: "/premium/family/manage" },
        ],
      },
      {
        title: "Premium Duo",
        links: [
          { title: "Invite partner", url: "/premium/duo/invite" },
          { title: "Manage duo", url: "/premium/duo/manage" },
        ],
      },
      {
        title: "Premium Student",
        links: [
          { title: "Verify student status", url: "/premium/student/verify" },
          { title: "Student renewal", url: "/premium/student/renew" },
        ],
      },
    ],
  },
  {
    title: "In-app features",
    icon: <MdAppSettingsAlt />,
    children: [
      {
        title: "Getting started",
        links: [
          { title: "Beginner's guide", url: "/features/getting-started" },
          { title: "Create account", url: "/features/create-account" },
        ],
      },
      {
        title: "App settings",
        links: [
          { title: "Theme options", url: "/settings/theme" },
          { title: "Language selection", url: "/settings/language" },
        ],
      },
      {
        title: "Troubleshooting",
        links: [
          { title: "App crashing", url: "/troubleshooting/crash" },
          { title: "Not loading", url: "/troubleshooting/loading" },
        ],
      },
      {
        title: "Playlists",
        links: [
          { title: "Create playlist", url: "/playlists/create" },
          { title: "Share playlist", url: "/playlists/share" },
        ],
      },
      {
        title: "Features",
        links: [
          { title: "Lyrics view", url: "/features/lyrics" },
          { title: "Equalizer", url: "/features/equalizer" },
        ],
      },
      {
        title: "Social features",
        links: [
          { title: "Friend activity", url: "/social/friends" },
          { title: "Public profile", url: "/social/profile" },
        ],
      },
      {
        title: "Audiobooks",
        links: [
          { title: "Browse audiobooks", url: "/audiobooks/browse" },
          { title: "Saved audiobooks", url: "/audiobooks/saved" },
        ],
      },
      {
        title: "Live events",
        links: [
          { title: "Upcoming events", url: "/events/upcoming" },
          { title: "Attend live", url: "/events/attend" },
        ],
      },
      {
        title: "Listening privacy",
        links: [
          { title: "Private session", url: "/privacy/private-session" },
          { title: "History settings", url: "/privacy/history" },
        ],
      },
    ],
  },
  {
    title: "Devices & troubleshooting",
    icon: <MdDevicesOther />,
    children: [
      {
        title: "Speakers",
        links: [
          { title: "Connect speaker", url: "/devices/speaker-connect" },
          { title: "Speaker issues", url: "/devices/speaker-issues" },
        ],
      },
      {
        title: "Smart watches",
        links: [
          { title: "Watch setup", url: "/devices/watch-setup" },
          { title: "Watch controls", url: "/devices/watch-controls" },
        ],
      },
      {
        title: "TVs",
        links: [
          { title: "Smart TV setup", url: "/devices/tv-setup" },
          { title: "TV casting", url: "/devices/tv-casting" },
        ],
      },
      {
        title: "Gaming",
        links: [
          { title: "Game console setup", url: "/devices/gaming/setup" },
          { title: "In-game control", url: "/devices/gaming/control" },
        ],
      },
      {
        title: "Cars",
        links: [
          { title: "CarPlay", url: "/devices/cars/carplay" },
          { title: "Android Auto", url: "/devices/cars/android-auto" },
        ],
      },
      {
        title: "Voice assistants",
        links: [
          { title: "Alexa setup", url: "/devices/voice/alexa" },
          { title: "Google Assistant", url: "/devices/voice/google" },
        ],
      },
    ],
  },
  {
    title: "Safety & privacy",
    icon: <MdSecurity />,
    links: [
      {
        title: "Data rights and privacy choices",
        url: "/privacy/request-data",
      },
      { title: "Understanding my data", url: "/privacy/delete-account" },
    ],
  },
];

function containsUrl(item, targetUrl) {
  if (item.links && item.links.some((link) => link.url === targetUrl)) {
    return true;
  }
  if (item.children) {
    return item.children.some((child) => containsUrl(child, targetUrl));
  }
  return false;
}

const SupportAccordian = ({ iconshow }) => {
  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          item={item}
          isLast={index === items.length - 1}
          iconshow={iconshow}
        />
      ))}
    </div>
  );
};

const AccordionItem = ({ item, level = 0, links, isLast, iconshow }) => {
  const targetUrl = useLocation().pathname.replace(/^\/article/, "");

  const [isOpen, setOpen] = useState(() => containsUrl(item, targetUrl));

  const childs = item?.children?.length > 0;
  const showArrow = childs || item?.links?.length > 0;
  const currentLinks = level === 0 ? item?.links : links;

  return (
    <div className={`bg-[#2A2A2A] first:rounded-t last:rounded-b`}>
      {/* question title */}
      <button
        aria-expanded={isOpen}
        onClick={() => setOpen(!isOpen)}
        className={`${level === 0 && !isLast ? "border-b " : ""} ${
          level === 0 ? "py-5" : ""
        } border-[#656565] flex items-center justify-between w-full cursor-pointer`}
      >
        <div className="flex pl-6 items-center gap-2">
          {level === 0 && iconshow && (
            <span className="text-green text-lg">{item.icon}</span>
          )}
          <p className={`text-white !font-bold`}>{item.title}</p>
        </div>
        <div
          className={`mr-6 text-lg transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          {showArrow && icons.downarrow_icon}
        </div>
      </button>
      {/* question title end */}

      {/* links */}

      {isOpen && currentLinks?.length > 0 && (
        <div
          className={`pl-8 py-3 space-y-1.5 ${
            level === 0 ? "border-t border-[#656565]" : ""
          }`}
        >
          {(level === 0 ? item.links : links).map((v, i) => {
            return (
              <a
                href={`/article/${v.url.replace(/^\/+/, "")}`}
                className="hover:text-green block w-fit"
                key={i}
              >
                {v.title}
              </a>
            );
          })}
        </div>
      )}
      {/* links end */}

      {/* sub title */}

      {isOpen && childs && (
        <div className="space-y-2 py-2 border-b border-[#656565]">
          {item.children.map((v, i) => (
            <React.Fragment key={i}>
              <AccordionItem item={v} level={level + 1} links={v.links} />
            </React.Fragment>
          ))}
        </div>
      )}
      {/* sub title end*/}
    </div>
  );
};

const checkNestedMatch = (item, currentPath) => {
  if (item.links?.some((link) => currentPath.includes(link.url))) {
    return true;
  }
  if (item.children) {
    return item.children.some((child) => checkNestedMatch(child, currentPath));
  }
  return false;
};

export default SupportAccordian;
