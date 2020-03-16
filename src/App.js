import React, { Component } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import Axios from 'axios';
import MovieDetails from './components/movies-details';
import MovieForm from './components/movie-form';
import FontAwesome from 'react-fontawesome';
import {withCookies } from 'react-cookie';



class App extends Component {
  state = {
    movies: [],
    selectedMovie: null,
    editedMovie: null,
    token: this.props.cookies.get('mr-token')
  }

  componentDidMount(){
    // fetch data
    if (this.state.token) {
      Axios.get('http://127.0.0.1:8000/api/movies/', {
        headers: {
         'Authorization': `Token ${this.state.token}`
        }
      })    
      .then((response) => {
        console.log(response.data);
        this.setState({movies:response.data});      
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });  
    }      
     else {
      window.location.href = '/';
    }
  }
   
  

  loadMovie = movie => {
    this.setState({selectedMovie: movie, editedMovie: null});
  }

  movieDeleted = selmovie => {
    const movies = this.state.movies.filter(movie => movie.id !== selmovie.id);
    this.setState({movies: movies, selectedMovie: null})
  }

  editClicked = selMovie => {
    this.setState({editedMovie: selMovie})
   
  }
  newMovie = () => {
    this.setState({editedMovie: {title: '', desctipsion: ''}})
   
  }
  cancelForm = () => {
    this.setState({editedMovie: null})
   
  }
  addMovie = movie => {
    this.setState({movies: [...this.state.movies, movie]})
   
  }

  render(){
    return (
      <div className="App">     
          <h1>
            <FontAwesome name="film"/>
            <span>Movie rater</span></h1>
          <div className="layout">
            <MovieList movieClicked={this.loadMovie} movies={this.state.movies} movieDeleted={this.movieDeleted} editClicked={this.editClicked} newMovie={this.newMovie} token={this.state.token}></MovieList>
            <div>
              {!this.state.editedMovie ? 
                  <MovieDetails token={this.state.token} movie={this.state.selectedMovie} updateMovie={this.loadMovie}/>  
               : <MovieForm token={this.state.token} editedMovie={this.loadMovie} newMovie={this.addMovie} movie={this.state.editedMovie} cancelForm={this.cancelForm}/>}
              
              
            </div>            
            
          </div>
          
       
      </div>
    );
  }
  
}

export default withCookies(App);
