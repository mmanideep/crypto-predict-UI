import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import HomePageComponent from './homePage/homePage.jsx';
import LoginComponent from './login/login.jsx';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={HomePageComponent} />
      <Route exact path="/login" component={LoginComponent} />
      <Route exact path="/home" component={HomePageComponent} />
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

