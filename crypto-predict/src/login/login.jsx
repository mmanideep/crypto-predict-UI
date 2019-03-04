import React from 'react';
import './login.css';
import { loginUser } from './../apiUtils/loginUtils';


class LoginComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            redirectHome: false
        }
    }

    onClickLogin = () => {
        loginUser(this.state.username, this.state.password, this.redirectToHome);
    }

    redirectToHome = () => {
        this.props.history.push('/home');
    }

    render() {
        let comp = this;

        return(
            <div className="LoginBody container">
                <div className="row">
                    <div className="col-10">
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input 
                            className="form-control m-3" 
                            placeholder="Email address" 
                            value={comp.state.username}
                            onChange = {(event) => comp.setState({username:event.target.value})}
                            required autoFocus 
                        />
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input 
                            type="password" className="form-control m-3" 
                            placeholder="Password" required 
                            value={comp.state.password}
                            onChange = {(event) => comp.setState({password:event.target.value})}
                        />
                        <button className="btn btn-lg btn-primary btn-block w-50" onClick={comp.onClickLogin}>
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginComponent;
