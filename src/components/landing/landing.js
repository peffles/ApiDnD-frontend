import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AuthForm from '../auth-form/authForm';
import * as routes from '../../routes';
import * as authActions from '../../actions/auth';

class Landing extends React.Component {
  handleLogin(user) {
    return this.props.pDoLogin(user)
      .then(() => {
        this.props.history.push(routes.DASHBOARD); //eslint-disable-line
      })
      .catch(console.error);
  }

  handleSignup(user) {
    return this.props.pDoSignUp(user)
      .then(() => {
        this.props.history.push(routes.DASHBOARD);
      })
      .catch(console.error);
  }

  render() {
    const rootJSX = <div>
      <h2> Welcome to the Tomb of Horrors!</h2>
      <Link to='/signup'>Sign up</Link>
      <Link to='/signin'>Sign In</Link>
    </div>;

    const signUpJSX = <div>
      <h2> Sign up to Dungeons and Dragons</h2>
      <AuthForm type='signup' onComplete={this.handleSignup}/>
      <p> Already have an account? </p>
      <Link to='/login'>Sign in</Link>
    </div>;

    const loginJSX = <div>
      <h2> Login to the Tomb of Horrors</h2>
      <AuthForm type='login' onComplete={this.handleLogin}/>
      <p> Do not have an account? </p>
      <Link to='/signup'>Sign up for Dungeons and Dragons!</Link>
    </div>;

    const { location } = this.props;

    return (
      <nav>
        { location.pathname === routes.ROOT ? rootJSX : undefined }
        { location.pathname === routes.SIGNUP_FRONTEND ? signUpJSX : undefined }
        { location.pathname === routes.LOGIN ? loginJSX : undefined }
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
});

const mapDispatchToProps = dispatch => ({
  pDoSignUp: user => dispatch(authActions.signupRequest(user)),
  pDoLogin: user => dispatch(authActions.loginRequest(user)),
});

Landing.propTypes = {
  location: PropTypes.object,
  pDoSignUp: PropTypes.func,
  pDoLogin: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
