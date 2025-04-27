import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Topnav from "../../utils/Topnav";
import Dropdown from "../../utils/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../Loading";
import Cards from "./Cards"; // Assuming Cards component is responsible for rendering the data

const People = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("popular"); // Default to People or tv
  const [People, setPeople] = useState([]); // Tracks People results
  const [page, setPage] = useState(1); // Pagination
  const [hasMore, setHasMore] = useState(true); // Checks if more data is available

  document.title = "MovieHub || People";

  // Fetch People items
  const GetPeople = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);

      if (data.results.length > 0) {
        setPeople((prevState) => [...prevState, ...data.results]);
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
    setPeople([]);
    setHasMore(true);
    GetPeople();
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return People.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className="text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556cd] pr-2 ri-arrow-left-line"
          ></i>
          People
          <small className=" ml-3 text-zinc-600">({category})</small>
        </h1>

        <div className="flex items-center w-[100%]">
          <Topnav/>
          {/* <Dropdown
            title="Category"
            options={[ "popular"]}
            func={(e) => setCategory(e.target.value)} // Update the category
          /> */}
        </div>
      </div>

      <InfiniteScroll
        dataLength={People.length}
        next={GetPeople}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={People} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
