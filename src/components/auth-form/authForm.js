import React from 'react';
import PropTypes from 'prop-types';


const defaultState = {
  username: '',
  email: '',
  password: '', // Naked password
};


class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({[name]: value});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState(defaultState);
  };

  render() {
    let { type } = this.props;
    type = type === 'login' ? 'login' : 'signup';

    const signupJSX = <input
        name='email'
        placeholder='Email'
        type='email'
        value={this.state.email}
        onChange={this.handleChange}
      />;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name='username'
          placeholder='Username'
          type='text'
          value={this.state.username}
          onChange={this.handleChange}
        />
        { type !== 'login' ? signupJSX : undefined }
        <input
          name='password'
          placeholder='Password'
          type='password'
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button type='submit'>{type}</button>
      </form>
    );
  }
}

AuthForm.propTypes = {
  onComplete: PropTypes.func,
};

export default AuthForm;
