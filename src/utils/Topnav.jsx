




import axios from "./axios";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
function Topnav() {
  const [query, setquery] = useState("");
  const [searches, setSearches] = useState([]);

  const GetSerches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      // console.log(data);
      setSearches(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    GetSerches();
  }, [query]);
  return (
    <div className="w-[1200px] h-[10vh] relative flex justify-start items-center ml-[15%]">
      <i className="ri-search-2-line text-zinc-400 text-3xl"></i>

      <input
        className="w-[50%] text-zinc-200 mx-10 p-5  text-xl outline-none border-none "
        onChange={(e) => setquery(e.target.value)}
        value={query}
        type="text"
        placeholder="search anything"
      />

      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          className="ri-close-line  text-zinc-400 text-3xl"
        ></i>
      )}

      <div className=" z-[100] absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[100%] left-[5%] overflow-auto">
        {searches.map((s, i) => (
          <Link 
          to={`/${s.media_type}/details/${s.id}`}
          key={i}
          className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100]">
          <img 
          className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg"
          src={s.backdrop_path|| s.profile_path ? `https://image.tmdb.org/t/p/original/${s. backdrop_path|| s.profile_path } `
        : 'https://static3.depositphotos.com/1006009/206/i/600/depositphotos_2061693-stock-photo-no-image-available-text-on.jpg'} alt="" />
            <span>
              {s.name || s.title || s.original_name || s.original_title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Topnav;