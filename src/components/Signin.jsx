import React, {Component} from 'react';

export default class Signin extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.signIn = this.signIn.bind(this); 
    }

    handleEmailChange(e){
        this.setState({
            email: e.target.value
        })
    }

    handlePasswordChange(e){
        this.setState({
            password: e.target.value
        })
    }

    signIn(){
        alert(`Email address is ${this.state.email} Password is ${this.state.password}`);
    }

    render(){
        return (
            <form className='form-signin'>
                <h2 className='form-signin-heading'>Please sign in</h2>
                <label htmlFor="inputEmail" className='sr-only'>Email adress</label>
                <input type="email" onChange={this.handleEmailChange} id="inputEmail" className='form-control' placeholder='Email adress'/>
                <label htmlFor="inputPassword" className='sr-only'>Password</label>
                <input type="password" onChange={this.handlePasswordChange} id='inputPassword' className='form-control' placeholder='Password'/>
                <button onClick={this.signIn} className='btn btn-lg btn-primary btn-block' type='button'>Sign in</button>
            </form>
        )
    }
}