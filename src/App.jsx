import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./componets/Home";
import Trending from "./componets/templates/Trending";
import Popular from "./componets/templates/Popular";
import Movie from "./componets/templates/Movie";
import TVshows from "./componets/templates/TVshows";
import People from "./componets/templates/People";
import Moviedetails from "./componets/templates/Moviedetails";
import TVDetails from "./componets/TVDetails";
import PersonDetails from "./componets/PersonDetails";
import Trailer from "./componets/templates/Trailer";
import Contact from "./componets/templates/Contact";

function App() {
  return (
    <div className="bg-[#1f1e24] w-screen h-screen flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular/>} />
        <Route path="/movie" element={<Movie/>} />
        <Route path="/movie/details/:id" element={<Moviedetails />}>
        <Route path="/movie/details/:id/trailer" element={<Trailer/>}/>
        </Route>

        <Route path="/tv" element={<TVshows />}/>
        <Route path="/tv/details/:id" element={<TVDetails />} />
   
        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<PersonDetails />} />

        <Route path="/contact" element={<Contact/>} />

     </Routes>
    </div>
  );
}

export default App;
