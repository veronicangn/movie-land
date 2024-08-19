import { useState, useEffect } from 'react';

import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg'
const API_URL = 'http://www.omdbapi.com?apikey=b9f5780c'

const App = () => {
    const [movies, setMovies] = useState([]);  // empty array for default val of movies
    const [searchTerm, setSearchTerm] = useState(''); // sets initial search time to empty string
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();  // gets data from API

        // console.log(data.Search)
        setMovies(data.Search);  // sets the movies to data.Search (movie data)
    }

    // useEffect to fetch data from API as soon as component loads
    useEffect(() => {
        searchMovies('Spiderman');
    }, []);

    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}  // sets the value in search bar to the search term
                    onChange={(e) => setSearchTerm(e.target.value)}  // allows changing of search term in search bar
                />
                <img 
                    src={SearchIcon}
                    alt="search"
                    onClick = {() => searchMovies(searchTerm)}  // passes in searchTerm as title for searchMovies function
                />
            </div>

            {movies?.length > 0
                ? (
                    <div className="container">
                        {/* looping over movies array & takes each movie to pass it as a prop to
                        MovieCard*/}
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )}        
        </div>
    );
}

export default App;