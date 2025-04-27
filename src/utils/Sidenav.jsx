import React from "react";
import 'remixicon/fonts/remixicon.css';
import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <div className="w-[20%] h-full border-r-2 border-zinc-500 p-10">
      <h1 className="text-2xl text-white font-bold">
        <i className="text-[#6556cd] ri-tv-fill mr-2"></i>
        <span className="text-2xl">MovieHub.</span>
      </h1>
      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5">
          New Feeds
        </h1>

        <Link  to="/trending" className="hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg p-5">
          <i className="ri-fire-fill mr-2"></i> Trending
        </Link>
        <Link to="/popular" className="hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg p-5">
          <i className="ri-bar-chart-fill mr-2"></i> Popular
        </Link>
        <Link to="/movie" className="hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg p-5">
          <i className="ri-movie-2-line mr-2"></i> Movies
        </Link>
        <Link to="/tv" className="hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg p-5">
          <i className="ri-slideshow-3-fill mr-2"></i> TV Shows
        </Link>
        <Link to="/person" className="hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg p-5">
          <i className="ri-user-heart-fill mr-2"></i> People
        </Link>
      </nav>

      <hr className="border-none h-[1px] bg-zinc-400" />

      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5">
          Website Information
        </h1>

        <Link to="/trending" className="hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg p-5">
        <i className="ri-information-2-fill mr-2"></i>About
        </Link>
        <Link to="/contact" className="hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg p-5">
        <i className="ri-chat-smile-ai-fill mr-2"></i> Contact
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;