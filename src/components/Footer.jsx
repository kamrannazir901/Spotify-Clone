import React from "react";
import { icons } from "../assets/Assets";

function Footer() {
  return (
    <div className="footer flex flex-col gap-4 mx-3 px-8 py-4">
      <div className="flex justify-between">
        <div className="">
          <h3>Company</h3>
          <a className="">About</a>
          <a className="">Jobs</a>
          <a className="">For the Record</a>
        </div>
        <div className="">
          <h3>Communities</h3>
          <a className="">For Artists</a>
          <a className="">Developers</a>
          <a className="">Advertising</a>
          <a className="">Investors</a>
          <a className="">Vendors</a>
        </div>
        <div className="">
          <h3>Useful links</h3>
          <a className="">Support</a>
          <a className="">Free Mobile App</a>
          <a className="">Popular by Country</a>
        </div>
        <div className="">
          <h3>Spotify Plans</h3>
          <a className="">Premium Individual</a>
          <a className="">Premium Duo</a>
          <a className="">Premium Family</a>
          <a className="">Premium Student</a>
          <a className="">Spotify Free</a>
        </div>
        <div className="!flex-row footer-socials">
          <a href="">{icons.insta_icon}</a>
          <a href="">{icons.twitter_icon}</a>
          <a href="">{icons.fb_icon}</a>
        </div>
      </div>

      <a className="mt-4 mb-10 copyright">
        &copy;{new Date().getFullYear()} Spotify AB
      </a>
    </div>
  );
}

export default Footer;
