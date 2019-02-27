import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import HomePageComponent from './homePage/homePage';
import LoginComponent from './login/login';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={LoginComponent} />
      <Route path="/login" component={LoginComponent} />
      <Route path="/home" component={HomePageComponent} />
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

