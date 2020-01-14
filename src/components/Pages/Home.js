import React from 'react';
import './Home.css';
import {Link} from 'react-router-dom'
import movieBloc from '../Blocs/Movie_bloc';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import BlocBuilder from '../Blocs/Bloc_Builder';

export default class Home extends React.Component {
  state = {
    movies: [],
    input: '',
    type: 'movie',
  }

  handleInput = (e) => {
    const value = e.target.value;
    this.setState({
      input: value,
    })
  } 

  handleSelect = (e) => {
    this.setState({
      type: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const api_key = 'f4c84bec1d4d2bffdfc01648692ff93f';
    fetch(`https://api.themoviedb.org/3/search/movie?query=${this.state.input}&api_key=${api_key}&language=en-US&page=1&include_adult=false`)
    .then((data) => {
      return data.json();
    })
    .then((newData) => {
      if(newData.results) {
        this.setState({
          movies: newData.results
        });
      }
      else {
        alert('There are no results for these search parameters.');
      }
      console.log(this.state.movies);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  componentDidUpdate() {
    const movies = JSON.stringify(this.state.movies);
    localStorage.setItem('movies', movies);
  }

  componentDidMount() {
    const json = localStorage.getItem('movies');
    if(json) {
      const movies = JSON.parse(json);
      this.setState({movies});
    }
  }

  render() {
    return(
      <div className='home_container'>
        <div className='search_form'>
          <form onSubmit={this.handleSubmit}>
            <input type='text' value={this.state.input} 
              onChange={this.handleInput} className='search_input'
            />
            <input type='submit' value='Search' className='search_button' />
          </form>
        </div>
        <MovieCard movies={this.state.movies} />
      </div>
    );
  }
}

const MovieCard = (props) => {
  let movieList = props.movies.length < 1 ? null :  props.movies.map((movie) => {
    return(
      <div key={movie.id} className='card_container'>
        <div className='movie_container'>
          <div className='movie_poster'><img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt='no movie poster' /></div>
          <div className='movie_details'>
            <div className='movie_title'><span>
              {`${movie.title.length > 25 ?  (movie.title.substring(0, 22) + '...') : movie.title}`}</span> 
            </div>
            <div className='movie_year'><span></span> {movie.release_date}</div>
            <div className='buttons_container'>
              <button onClick={() => {
                movieBloc.viewMovie(movie);
              }} ><Link style={{textDecoration: 'none', color: 'rgb(0, 123, 255)'}} to='/view'><b>View Movie</b></Link></button>
              <BlocBuilder 
                subject={movieBloc.favSubject}
                builder={(snapshot) => {
                  if(snapshot.data) {
                    for(var i=0; i < snapshot.data.length; i++) {
                      if(snapshot.data[i].id === movie.id) {
                        return(
                          <button style={{backgroundColor: 'red', color: 'white', cursor: 'pointer', border: '0px'}} onClick={() => {
                            movieBloc.deleteFavorite(movie);
                            }} ><FontAwesomeIcon icon={faHeart} style={{color: 'white'}}/><b> Unlike</b>
                          </button>
                        );
                      }
                    }
                    return(
                      <button style={{cursor: 'pointer'}} onClick={() => {
                        movieBloc.addToFavorite(movie);
                        }} ><FontAwesomeIcon icon={faHeart} style={{color: 'red'}}/><b> Like</b>
                      </button>
                    );
                  }
                  else {
                    return(
                      <button style={{cursor: 'pointer'}} onClick={() => {
                        movieBloc.addToFavorite(movie);
                        }} ><FontAwesomeIcon icon={faHeart} style={{color: 'red'}}/><b> Like</b>
                      </button>
                    );
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  })

  return(
    <div className='component_container'>
      <div className='center_component'>
        {movieList}
      </div>
    </div>
  );
}