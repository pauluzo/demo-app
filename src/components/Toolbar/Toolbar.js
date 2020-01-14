import React from 'react';
import{ Link} from 'react-router-dom';
import './Toolbar.css';
import movieBloc from '../Blocs/Movie_bloc';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import BlocBuilder from '../Blocs/Bloc_Builder';

const Toolbar = props => {
  return(
    <header className='toolbar_header'>
      <div className='toolbar_container' >
        <div><h2>Movie Search</h2></div>
        <div className='spacer' />
        <div className='toolbar_link'>
        
          <div className='circle'>
            <BlocBuilder 
              subject={movieBloc.getFavSubject()}
              builder={(snapshot) => {
                return snapshot.data ? snapshot.data.length : 0;
              }}
            />
          </div>
          <Link to='/favorites'><FontAwesomeIcon icon={faHeart} style={{margin: '10px',width: '90%', height: 'auto', color: 'red'}} ></FontAwesomeIcon></Link>
        </div>
      </div>
    </header>
  );
}

export default Toolbar;