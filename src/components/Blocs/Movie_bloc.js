import * as rxjs from 'rxjs';

class MovieBloc {
  favList = [];
  constructor() {
    // creating our BehaviourSubjects with initial value of null
    this.movieSubject = new rxjs.BehaviorSubject();
    this.favSubject = new rxjs.BehaviorSubject();
  }

  // BLoC method to pass movie object to the view component
  viewMovie(val) {
    this.movieSubject.next(val);
  }

  // BLoC method to add a movie to the list of favorite movies
  addToFavorite(val) {
    this.favList.push(val);
    this.favSubject.next(this.favList);
  }

  deleteFavorite(val) {
    for (var i = 0; i < this.favList.length; i++) {
      if(val.id === this.favList[i].id) {
        this.favList.splice(i, 1);
      }
    }
    this.favSubject.next(this.favList);
  }

  // the get function to return the subject. Allows a component to suscribe.
  getSubject = () => {
    return this.movieSubject;
  } 

  getFavSubject = () => {
    return this.favSubject;
  } 
}

const movieBloc = new MovieBloc();

export default movieBloc;