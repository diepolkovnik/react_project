import React, { Component, Fragment } from 'react';



class MovieForm extends Component {

    state = {
        editedMovie: this.props.movie
    }
    cancelClicked = () => {
        this.props.cancelForm();
    }

    inputChange = e => {
        let movie = this.state.editedMovie;
        movie[e.target.name] = e.target.value;
        this.setState({editedMovie: movie});
    }
    saveClicked = () => {
        fetch(`http://127.0.0.1:8000/api/movies/`,{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${this.props.token}`,
            }, 
            body: JSON.stringify(this.state.editedMovie)           
        }).then(resp => resp.json())
        .then(res => this.props.newMovie(res))
        .catch(error => console.log(error))
    }
    updateClicked = () => {
        fetch(`http://127.0.0.1:8000/api/movies/${this.props.movie.id}/`,{
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${this.props.token}`,
            }, 
            body: JSON.stringify(this.state.editedMovie)           
        }).then(resp => resp.json())
        .then(res => this.props.editedMovie(res))
        .catch(error => console.log(error))
    }
    
    render(){

        const isDisable = this.state.editedMovie.title.length === 0 || this.state.editedMovie.desctipsion.length === 0; 
        return (
            <Fragment>
                <span>Title</span><br/>
                <input type="text" name="title" value={this.props.movie.title} onChange={this.inputChange}/><br/>
                <span>desctipsion</span><br/>
                <br/>
                <textarea name="desctipsion" value={this.props.movie.desctipsion} onChange={this.inputChange}/><br/>
                { this.props.movie.id ?  <button disabled={isDisable} onClick={this.saveClicked}>update</button> : <button disabled={isDisable} onClick={this.saveClicked}>save</button>}
               
                <button  onClick={this.cancelClicked}>cancel</button>
                
        </Fragment>
        )
    }
}


export default MovieForm;