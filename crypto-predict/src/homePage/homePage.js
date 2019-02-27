import React from 'react';
import './homePage.css';
import { checkSession } from './../apiUtils/loginUtils';


class HomePageComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    componentWillMount() {
        if (checkSession() === false){
            console.log("Session Not found");
            // this.props.history.push('/login');
        }
    }

    render() {
        return(
            <div className=" container">
                This is Home Page
            </div>
        );
    }
}

export default HomePageComponent;
