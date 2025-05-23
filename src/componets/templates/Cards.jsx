import React from 'react'
import { Link } from 'react-router'

function Cards({data , title}) {

   console.log(data);
   
  return (
    <div className='flex flex-wrap w-full h-full px-[5%] bg-[#1f1e24]'>
      {data.map((c,i) =>(
        
        
         <Link 
         to={`/${c.media_type || title}/details/${c.id}`}
         className='relative w-[25vh] mr-[5%] mb-[5%] ml-6' key={i}>
            <img className='shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[40vh]' src={`https://image.tmdb.org/t/p/original/${c.poster_path || c.backdrop_path || c.profile_path}`} alt="" />
            <h1 className='text-2xl text-zinc-400 mt-4 font-semibold'>

            {c.name||
            c.title ||
            c.original_name ||
            c.original_title
            } 
           
          
            </h1>
             {c.vote_average && ( <div className='absolute right-[-10%] bottom-[25%] text-white text-xl font-semibold bg-teal-600 rounded-full w-[5vh] h-[5vh] flex justify-center items-center'>
              {(c.vote_average * 10).toFixed()}<sup>%</sup>
              
              </div>)}
           
         </Link>) 
         )} 
    </div>
  )
}

export default Cards    
