import React from 'react';
import { Link } from 'react-router';

const Header = ({ data }) => {
  // const backgroundImageUrl = data?.backdrop_path || data?.profile_path
  //   ? `https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path}`
  //   : 'https://via.placeholder.com/1500x500?text=No+Image+Available'; // Placeholder or fallback image

  return (
    <div
      style={{
        background: ` linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition:'center',
        backgroundSize:'cover',
        backgroundRepeat:'no-repeat'
      }}
      className="w-full h-[50vh] bg-cover bg-center flex flex-col justify-end items-start p-[4%]"
    >
      <h1 className='text-5xl font-black text-white'> {data.name || data.title || data.original_name || data.original_title}</h1>

      <p className='w-[70%] mt-3 mb-3  text-white'>{data.overview.slice(0,200)}..
        <Link 
        to={`/${data.media_type}/details/${data.id}`}
         className='text-blue-400'>more</Link>
      </p>
      <p className='text-white flex '>

        <i className="text-teal-500 ri-ghost-smile-fill"></i>{data.release_date ||' No info'}
        <i className=" ml-5 text-yellow-500  ri-thunderstorms-fill"></i>{data.media_type.toUpperCase( )}
        
        </p>

        <Link className='bg-[#6556cd] p-4 rounded text-white font-semibold mt-5'>Watch trailer</Link>
    </div>
  );
};

export default Header;
