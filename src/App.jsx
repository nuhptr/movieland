import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";

import "./App.css";
import SearchIcon from "./search.svg";

const API_URL = "https://www.omdbapi.com?apikey=9ddd8048";

function App() {
   const [movies, setMovies] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");

   const searchMovies = async (title) => {
      const res = await fetch(`${API_URL}&s=${title}`);
      const data = await res.json();

      setMovies(data.Search);
   };

   useEffect(() => {
      searchMovies("Spiderman");
   }, []);

   return (
      <div className='app'>
         <h1>Movie Land</h1>

         <div className='search'>
            <input
               type='text'
               placeholder='Search for movies'
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               onKeyDown={(event) => {
                  if (event.key === "Enter") {
                     searchMovies(searchTerm);
                  }
               }}
            />

            <img
               src={SearchIcon}
               alt='Icon Search'
               onClick={() => searchMovies(searchTerm)}
            />
         </div>

         {movies?.length > 0 ? (
            <div className='container'>
               {movies.map((movie) => (
                  <MovieCard key={movie.imdbID} movie={movie} />
               ))}
            </div>
         ) : (
            <div className='empty'>
               <h2>No Movies found</h2>
            </div>
         )}
      </div>
   );
}

export default App;
