import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';

import Home from './components/Pages/Home';
import Toolbar from './components/Toolbar/Toolbar';
import MovieDetails from './components/Pages/Movie_details';
import Favorites from './components/Pages/Favorites'


function App () {
  return (
    <div>
      <Toolbar/>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/view' component={MovieDetails} />
        <Route path='/favorites' component={Favorites} />
      </Switch>
    </div>
  );
}
export default App;