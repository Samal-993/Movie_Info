import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../../store/actions/movieAction";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";
import HorizontalCard from "../../utils/HorizontalCard";

function Moviedetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id, dispatch]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className=" relative w-screen h-[140vh] px-[10%]"
    >
      {/* Part 1: Navigation */}
      <nav className="h-[10vh] items-center w-full text-zinc-100 flex gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556cd] pr-2 ri-arrow-left-line"
        ></Link>
        <a
          className="hover:text-amber-900"
          target="_blank"
          rel="noreferrer"
          href={info.detail.homepage}
        >
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          className="hover:text-teal-800"
          target="_blank"
          rel="noreferrer"
          href={`https://en.wikipedia.org/wiki/${info.externalid?.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          className="hover:text-rose-500"
          target="_blank"
          rel="noreferrer"
          href={`https://www.imdb.com/title/${info.externalid?.imdb_id}`}
        >
          <i className="ri-ghost-2-fill"></i>
        </a>
      </nav>

      {/* Part 2: Poster and Details */}
      <div className="w-full flex">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[50vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt="Movie Poster"
        />

        <div className="content ml-10 ">
          <h1 className="text-5xl font-black text-white">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}

            <small className="text-2xl font-bold text-zinc-300">
              ({info.detail.release_date?.split("-")[0]})
            </small>
          </h1>

          <div className="flex text-zinc-100 items-center gap-x-5 pt-4 ">
            <span className="text-white text-xl font-semibold bg-teal-600 rounded-full w-[5vh] h-[5vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()}
              <sup>%</sup>
            </span>
            <h1 className="font-semibold text-2xl leading-6 w-[60vh]">
              User Score
            </h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(" , ")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>

          <div className="mt-5">
            <div className="font-semibold italic text-xl mb-6 text-rose-200  w-[130vh]   ">
              <h2 className="text-stone-300">Movie Translated - </h2>
              <p>{info.translations.join(" , ")}</p>
            </div>
            <div className="font-semibold italic text-xl mb-6 text-amber-100 w-fit  ">
              <h2 className="text-stone-300">Title - </h2>
              {info.detail.tagline}
            </div>
            <div className="font-semibold  text-xl w-[130vh] text-purple-200 w-83  ">
              <h2 className="text-stone-300">Overview - </h2>
              {info.detail.overview}

              <Link
                className="hover:bg-teal-700 hover:text-white  text-stone-200 flex items-center justify-center mt-5 h-[6vh] rounded-lg w-[19vh] bg-teal-600"
                to={`${pathname}/trailer`}
              >
                <i className="text-xl ri-playri-play-fill"></i>
                Play Trailer
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Part 3: Available on Platform */}
      <div className="w-[80%] flex flex-col gap-y-5 mt-10 ">
        {info.watchproviders?.flatrate && (
          <div className="flex gap-x-10 items-center text-white ">
            <h1>Available on platforms</h1>
            {info.watchproviders.flatrate.map((e, i) => (
              <img
                title={e.provider_name}
                key={i}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${e.logo_path}`}
                alt={e.provider_name}
              />
            ))}
          </div>
        )}

        {info.watchproviders?.buy && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on buy</h1>
            {info.watchproviders.buy.map((e, i) => (
              <img
                title={e.provider_name}
                key={i}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${e.logo_path}`}
                alt={e.provider_name}
              />
            ))}
          </div>
        )}

        {info.watchproviders?.rent && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on rent</h1>
            {info.watchproviders.rent.map((e, i) => (
              <img
                title={e.provider_name}
                key={i}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${e.logo_path}`}
                alt={e.provider_name}
              />
            ))}
          </div>
        )}
      </div>

      {/* Part 4 recommendation and Similar Stuff */}
      <hr  className="text-zinc-400 mt-5"/>
      <h1 className="text-3xl mt-5 font-semibold text-white">Recommendation & similar stuff</h1>
      <HorizontalCard
        data={info.recommendations.length > 0 ? info.recommendations : info.similar}
      />
         <Outlet/>


    </div>
  ) : (
    <Loading />
  );
}

export default Moviedetails;
