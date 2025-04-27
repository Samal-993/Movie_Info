import React, { useEffect, useState } from 'react';

import axios from '../utils/axios';
import Header from '../utils/Header';
import HorizontalCard from '../utils/HorizontalCard';
import Dropdown from '../utils/Dropdown';

import Sidenav from '../utils/Sidenav';
import Topnav from '../utils/Topnav';
import Loading from './Loading';

const Home = () => {
  document.title = 'MovieHub | Homepage';
  const [wallpaper, setWallpaper] = useState(null);

  const [trending , setTrending] = useState(null)

   
   const [category , setcategory] = useState('all')

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      // Select a random item from the results
      let randomdata = data.results[Math.floor(Math.random() * data.results.length)];
      setWallpaper(randomdata);
    } catch (error) {
      console.log('error', error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
     setTrending(data.results);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    GetTrending();
    !wallpaper && GetHeaderWallpaper();
  }, [category]); 
   // Ensure the effect runs only once when wallpaper is null

  // console.log(wallpaper); // Check what wallpaper is being set

  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav/>
        {/* Pass the random wallpaper directly to Header */}
        <Header data={wallpaper} />



         <div className=" flex justify-between p-5">
                <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>
        
                <Dropdown title='Filter' options={['tv' , "movie", "all"]} func={(e)=> setcategory(e.target.value)} />
              </div>
        
        <HorizontalCard data={trending}/>

      </div>
    </>
  ) : (
    <h1><Loading/></h1>
  );
};

export default Home;
