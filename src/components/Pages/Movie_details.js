import React from 'react';
import './Movie_details.css';
import movieBloc from '../Blocs/Movie_bloc';
import BlocBuilder from '../Blocs/Bloc_Builder';
import {withRouter} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const MovieDetails = (props) => {
  const subject = movieBloc.getSubject();

  return(
    <div className='details_component_container' style={{marginTop: '60px'}} >
      <BlocBuilder subject={subject} 
        builder={(snapshot) => {
          let movie = snapshot.data
          return(
            <div className='details_container' >
              { !movie ? 
                <div>
                  <p>No movie details to show.</p>
                </div> :
                <div className='view_container'>
                  <div className='view_poster'><img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt='no movie poster' /></div>
                  <div className='view_details'>
                    <div><span style={{color: 'black'}}><b>Title: </b> </span> 
                      {`${movie.title}`}
                    </div>
                    <div><b>Date of Release: </b> {movie.release_date}</div>
                    <div><b>Vote Average: </b> {movie.vote_average}</div>
                    <div>
                      <p><b>Overview: </b>{movie.overview}</p>
                    </div>
                    <div className='buttons_container'>
                      <button style={{color: '#007bff', cursor: 'pointer'}} onClick={() => {
                        const {history} = props;
                        if(history) history.push('/');
                      }}>
                        <b>Go Home</b>
                      </button>
                      <BlocBuilder 
                        subject={movieBloc.favSubject}
                        builder={(snapshot) => {
                          if(snapshot.data) {
                            for(var i=0; i < snapshot.data.length; i++) {
                              if(snapshot.data[i].id === movie.id) {
                                return(
                                  <button style={{backgroundColor: 'red', color: 'white', border: '0px'}} onClick={() => {
                                    movieBloc.deleteFavorite(movie);
                                    }} ><FontAwesomeIcon icon={faHeart} style={{color: 'white'}}/><b> Unlike</b>
                                  </button>
                                );
                              }
                            }
                            return(
                              <button  onClick={() => {
                                movieBloc.addToFavorite(movie);
                              }} >
                                <FontAwesomeIcon icon={faHeart} style={{color: 'red'}}/><b> Like</b>
                              </button>
                            );
                          }
                          else {
                            return(
                              <button onClick={() => {
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
              }
            </div>
          );
        }}
      />
    </div>
  );
}

export default withRouter(MovieDetails);