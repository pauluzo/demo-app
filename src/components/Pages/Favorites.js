import React from 'react';
import { Link } from 'react-router-dom';
import BlocBuilder from '../Blocs/Bloc_Builder';
import movieBloc from '../Blocs/Movie_bloc';
import './Favorites.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons'

const Favorites = () => {
  const subject = movieBloc.getFavSubject();
  return(
    <div className='favList_container' >
      <div style={{margin: '20px 0px'}}>
        <h3><b style={{fontStyle: 'italic', color: 'blue'}}>Your Favorite movies!!</b></h3>
      </div>
      <div className='bloc_style'>
        <BlocBuilder 
          subject={subject}
          builder={(snapshot) => {
            let favList = snapshot.data; 
            if(!favList || favList.length < 1) {
              return(
                <div>
                  <p>You have not selected any movie(s) as your favorite.</p>
                </div>
              );
            }
            else {
              let list = favList.map((movie) => {
                return(
                  <div key={movie.id} className='favorite_container' >
                    <div className='favorite_image' >
                      <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={`No movie poster - ${movie.title}`} 
                      />
                    </div>
                    <div>
                      <p>
                        {`${movie.title.length > 40 ? 
                          (movie.title.substring(0, 37) + '...') : movie.title}`
                        }
                      </p>
                    </div>
                    <div>
                      <p>
                        {movie.release_date}
                      </p>
                    </div>
                    <div>
                      <p>
                        {movie.overview.substring(0, 60) + '...'}
                      </p>
                    </div>
                    <div>
                      <Link to='/view' onClick={() => {
                        movieBloc.viewMovie(movie);
                      }}>
                        <FontAwesomeIcon icon={faEye} className='view_icon' style={{width: '25px'}} />
                      </Link>
                      <FontAwesomeIcon icon={faTrash} className='delete_icon' style={{width: '25px'}}
                        onClick={() => {
                          movieBloc.deleteFavorite(movie);
                        }}
                      />
                    </div>
                  </div>
                );  
              });
              return(
                <div>
                  {list}
                </div>
              );
            }
          }}
        />
      </div>
    </div>
  ); 
}

export  default Favorites;