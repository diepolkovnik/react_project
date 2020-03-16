import React, { Component, Fragment } from 'react';
import Axios from 'axios';

var FontAwesome = require('react-fontawesome');

class MovieDetails extends Component {

    state = {
        highlighted: -1
    }

    highlighted = high => e => {
        this.setState({highlighted: high})
    }

    rateClicked = stars => e => {
        fetch(`http://127.0.0.1:8000/api/movies/${this.props.movie.id}/rate_movie/`,{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token fbe3be2568a5c09456e82404546b1bb4da689e36',
            },
            body: JSON.stringify({stars: stars +1})
        }).then(resp => resp.json())
        .then(res => this.getDetails())
        .catch(error => console.log(error))
        
    //   Axios.post(`http://127.0.0.1:8000/api/movies/${this.props.movie.id}/rate_movie/`, {
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'Authorization': 'Token fbe3be2568a5c09456e82404546b1bb4da689e36',
    //     },
    //     data:{
    //         stars: stars + 1,
    //     },
        
    //     })    
    //         .then((response) => {
    //         console.log(response);           
    //         })
    //         .catch(function (error) {
    //         console.log(error);
    //         })
    //         .then(function () {
    //         // always executed
    //         });  
    //         //  разобраться почему не работает через axios
    }

    getDetails = () => {
        fetch(`http://127.0.0.1:8000/api/movies/${this.props.movie.id}/`,{
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${this.props.token}`,
            },            
        }).then(resp => resp.json())
        .then(res => this.props.updateMovie(res))
        .catch(error => console.log(error))
    }
    render(){
        return (
            <Fragment>
        {
            this.props.movie ? (
                <div>
                    <h3>{this.props.movie.title}</h3>
                    <FontAwesome name="star" className={this.props.movie.avg_rating > 0 ? 'orange': ''}/>
                    <FontAwesome name="star" className={this.props.movie.avg_rating > 1 ? 'orange': ''}/>
                    <FontAwesome name="star" className={this.props.movie.avg_rating > 2 ? 'orange': ''}/>
                    <FontAwesome name="star" className={this.props.movie.avg_rating > 3 ? 'orange': ''}/>
                    <FontAwesome name="star" className={this.props.movie.avg_rating > 4 ? 'orange': ''}/>
                    <p>{this.props.movie.desctipsion}</p>

                    <div className="rate-container">
                        <h2>Rate it!!!</h2>
                        {
                            [...Array(5)].map((e, i)=>{
                                return <FontAwesome key={i} name="star" className={this.state.highlighted > i - 1 ? 'purpule': ''} onMouseEnter={this.highlighted(i)} onMouseLeave={this.highlighted(-1)} onClick={this.rateClicked(i)}/>
                            })
                        }

                    </div>
                </div>
            ) : null
        }
        </Fragment>
        )
    }
}


export default MovieDetails;