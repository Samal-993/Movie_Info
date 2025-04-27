import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Topnav from "../../utils/Topnav";
import Dropdown from "../../utils/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../Loading";
import Cards from "./Cards"; // Assuming Cards component is responsible for rendering the data

const Movie = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("now_playing"); // Default to movie or tv
  const [Movie, setMovie] = useState([]); // Tracks Movie results
  const [page, setPage] = useState(1); // Pagination
  const [hasMore, setHasMore] = useState(true); // Checks if more data is available

  document.title = "MovieHub || Movie";

  // Fetch Movie items
  const GetMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);

      if (data.results.length > 0) {
        setMovie((prevState) => [...prevState, ...data.results]);
        setPage(page + 1); // Move to the next page
        
      } else {
        setHasMore(false); // No more data available
      }
    } catch (error) {
      console.log("Error:", error);
      setHasMore(false);
    }
  };

  const refreshHandler = () => {
    setPage(1);
    setMovie([]);
    setHasMore(true);
    GetMovie();
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return Movie.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className="text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556cd] pr-2 ri-arrow-left-line"
          ></i>
          Movie
          <small className=" ml-3 text-zinc-600">({category})</small>
        </h1>

        <div className="flex items-center w-[100%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["popular", "top_rated", "Upcoming", "now_playing"]}
            func={(e) => setCategory(e.target.value)} // Update the category
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={Movie.length}
        next={GetMovie}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={Movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Movie;
