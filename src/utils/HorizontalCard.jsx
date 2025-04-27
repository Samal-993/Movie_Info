import React from "react";
import { Link } from "react-router";
import Dropdown from "./Dropdown";

const HorizontalCard = ({ data }) => {
  return (
    <div className="w-[100%] flex overflow-y-hidden mb-5 p-5">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type}/details/${c.id}`}
          key={i}
          className="min-w-[15%] h-[35vh] bg-zinc-900 mr-5 mb-5 "
        >
          <img
            className="w-full h-[55%] object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              c.backdrop_path || c.poster_path
            })`}
            alt=""
          />

          <div className="text-white p-3 h-[45%] overflow-y-auto">
            <h1 className="text-xl mt-3 font-semibold">
              {" "}
              {c.name || c.title || c.original_name || c.original_title}
            </h1>

            <p className=" ">
              {c.overview.slice(0, 50)}..
              <span className="text-zinc-400">more</span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HorizontalCard;
