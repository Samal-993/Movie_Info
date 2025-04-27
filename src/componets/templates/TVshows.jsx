import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Topnav from "../../utils/Topnav";
import Dropdown from "../../utils/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../Loading";
import Cards from "./Cards"; // Assuming Cards component is responsible for rendering the data

const TVshows = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("top_rated"); // Default to TVshows or tv
  const [TVshows, setTVshows] = useState([]); // Tracks TVshows results
  const [page, setPage] = useState(1); // Pagination
  const [hasMore, setHasMore] = useState(true); // Checks if more data is available

  document.title = "MovieHub || TVshows";

  // Fetch TVshows items
  const GetTVshows = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);

      if (data.results.length > 0) {
        setTVshows((prevState) => [...prevState, ...data.results]);
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
    setTVshows([]);
    setHasMore(true);
    GetTVshows();
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return TVshows.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className="text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556cd] pr-2 ri-arrow-left-line"
          ></i>
          TVshows
          <small className=" ml-3 text-zinc-600">({category})</small>
        </h1>

        <div className="flex items-center w-[100%]">
          <Topnav/>
          <Dropdown
            title="Category"
            options={["on_the_air", "airing_today", "popular", "top_rated"]}
            func={(e) => setCategory(e.target.value)} // Update the category
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={TVshows.length}
        next={GetTVshows}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={TVshows} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default TVshows;
