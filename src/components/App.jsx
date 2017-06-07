import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import FrontPage from '../containers/Front.jsx';
import TopMenu from '../containers/Top.jsx';
import ProfilePage from '../containers/Profile.jsx';
import Page404 from './UnknownPage.jsx';
import MyBooksPage from '../containers/MyBooksPage.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const token = Cookies.get('token');
    if (token && !this.props.auth) {
        this.props.githubLogin(token);
    }
    
  }
  componentDidUpdate() {
    if (this.props.user.name) {
        this.props.serverLogin(this.props.user);
    }
  }
  render() {
    return (
        <div>
            
            <Router>
                <div>
                <Route component={TopMenu} />
            <Switch>
            <Route exact path="/" component={FrontPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/my" component={MyBooksPage}/>
            <Route component={Page404}/> 
            </Switch>
            </div>
            </Router>
          </div>
      );
  }
}

App.propTypes = {
  auth: PropTypes.bool.isRequired,
  githubLogin: PropTypes.func.isRequired,
  serverLogin: PropTypes.func.isRequired,
};

export default App;
