import React, {Component} from 'react';
import {withCookies } from 'react-cookie';


class Login extends Component {

    state = {
        credentials: {
            username: '',
            password: '',
        },
        isLoginView: true
    }
    inputChange = e => {
        let cred = this.state.credentials;
        cred[e.target.name] = e.target.value;
        this.setState({credentials: cred});
    }
    Login = e => {
        if (this.state.isLoginView) {
            fetch(`http://127.0.0.1:8000/auth/`,{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',            
            }, 
                body: JSON.stringify(this.state.credentials)           
            }).then(resp => resp.json())
            .then(res => {
                console.log(res.token);
                this.props.cookies.set('mr-token', res.token)
                window.location.href = "/movies";
            })
            .catch(error => console.log(error))    
        } else {
            fetch(`http://127.0.0.1:8000/api/users`,{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',            
            }, 
                body: JSON.stringify(this.state.credentials)           
            }).then(resp => resp.json())
            .then(res => {
                this.setState({isLoginView: true});
            })
            .catch(error => console.log(error))   
        }
        console.log(this.state.credentials);
        
    toggleView = () => {
        this.setState({isLoginView: !this.state.isLoginView});
    }
    render(){
        return <div className="login-container">
            <h1>
                {this.state.isLoginView ? 'Login' : 'Register'}
            </h1>
                <span>username</span><br/>
                <input type="text" name="username" value={this.state.credentials.username} onChange={this.inputChange}/><br/>
                <span>password</span><br/>
                <input type="password" name="password" value={this.state.credentials.password} onChange={this.inputChange}/><br/>
                <button  onClick={this.Login}>{this.state.isLoginView ? 'Login' : 'Register'}</button>
                <p onClick={this.toggleView}>{this.state.isLoginView ? 'Create Account' : 'back to login '}</p>
        </div>
    }
}


export default withCookies(Login);