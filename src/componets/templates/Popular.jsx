import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Topnav from "../../utils/Topnav";
import Dropdown from "../../utils/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../Loading";
import Cards from "./Cards"; // Assuming Cards component is responsible for rendering the data

const Popular = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie"); // Default to movie or tv
  const [popular, setPopular] = useState([]); // Tracks popular results
  const [page, setPage] = useState(1); // Pagination
  const [hasMore, setHasMore] = useState(true); // Checks if more data is available

  
    document.title = 'MovieHub || Popular'

  // Fetch popular items
  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);

      // Append new results to the existing state
      if (data.results.length > 0) {
        setPopular((prevState) => [...prevState, ...data.results]);
        setPage(page + 1); // Move to the next page
      } else {
        setHasMore(false); // No more data available
      }
    } catch (error) {
      console.log("Error:", error);
      setHasMore(false);
    }
  };

  // Refresh data when category changes or on initial load
  const refreshHandler = () => {
    setPage(1); // Reset page number
    setPopular([]); // Clear the popular state
    setHasMore(true); // Reset hasMore flag
    GetPopular(); // Fetch the data again for the first page
  };

  // Effect runs when category changes
  useEffect(() => {
    refreshHandler(); // Reset and fetch new data
  }, [category]);

  return popular.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className="text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556cd] pr-2 ri-arrow-left-line"
          ></i>
          Popular
        </h1>

        <div className="flex items-center w-[100%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["movie", "tv"]}
            func={(e) => setCategory(e.target.value)} // Update the category
          />
        </div>
      </div>

      {/* Infinite Scroll Component */}
      <InfiniteScroll
        dataLength={popular.length} // Number of items currently loaded
        next={GetPopular} // Function to fetch the next set of data
        hasMore={hasMore} // Whether there are more items to load
        loader={<h1>Loading...</h1>} // Loader while fetching new data
      >
        <Cards data={popular} title={category} /> {/* Render popular data */}
      </InfiniteScroll>
    </div>
  ) : (
    <Loading /> // Show loading screen while the data is being fetched
  );
};

export default Popular;
