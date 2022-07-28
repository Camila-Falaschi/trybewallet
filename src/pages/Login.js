import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { userAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state({
      email: '',
      passsword: '',
      isDisabled: true,
    });
  }

  handleChange = ({ target }) => {
    const { type, value } = target;
    this.setState({
      [type]: value,
    });
  };

  handleSubmit = () => {
    const { email } = this.state;
    const { dispatch } = this.props;
    dispatch(userAction(email));
  };

  render() {
    const { email, passsword, isDisabled } = this.state;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <input
          type="email"
          placeholder="e-mail"
          data-testid="email-input"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          type="password"
          placeholder="senha"
          data-testid="password-input"
          value={ passsword }
          onChange={ this.handleChange }
        />
        <button type="submit" disabled={ isDisabled } onClick={ this.handleSubmit }>
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
