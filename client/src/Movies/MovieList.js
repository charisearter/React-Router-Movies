import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MovieList = props => {
  const [movies, setMovies] = useState([]); //[] add so it will map over array. useState can't map over objects. JSON is usually objects.
  useEffect(() => {
    axios
    .get('http://localhost:5000/api/movies/')
    .then(response => {
      let movies = response.data
      setMovies(movies);
    })
    .catch(error => {
      console.log('error in movie list');
    })
  }, []);
  return (
    <div className="movie-list">
      {/* // was props.movies.map ...deleted props. because don't need props since axios call is in side same page */}
      {movies.map(movie => ( 
        <MovieDetails key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

function MovieDetails({ movie }) {
  const { title, director, metascore, stars, id } = movie;
  return (
    <div className="movie-card">
      <Link to={`/movies/${id}`}>
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      </Link>
    </div>
  );
}

export default MovieList;
