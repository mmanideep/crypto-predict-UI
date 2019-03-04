import React from 'react';
import './logoutBtn.css';
import { Redirect } from 'react-router-dom';
import { logoutUser } from './../apiUtils/loginUtils';


class LogoutBtn extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            redirect: false
        }
    }

    logutRedirect = () => {
        logoutUser();
        this.setState({redirect: true});
    }

    render() {
        let comp = this;

        if (comp.state.redirect === true){
            return(<Redirect to="/login" />);
        }

        return(
            <button type="button" className="btn btn-secondary" onClick={comp.logutRedirect}>
                Logout
            </button>
        );
    }

}

export default LogoutBtn;
