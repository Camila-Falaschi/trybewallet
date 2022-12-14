import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { userAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  infoValidation = () => {
    const { email, password } = this.state;
    const minLength = 6;
    // para a validação do email usando RegExp foi consultado o blog bobbyhadz (https://bobbyhadz.com/blog/react-check-if-email-is-valid#:~:text=To%20validate%20an%20email%20in,is%20valid%20and%20false%20otherwise)
    // e as documentações no MDN (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Cheatsheet) e (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
    return ((/\S+@\S+\.\S+/.test(email)) && (password.length >= minLength));
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => (
      (this.infoValidation())
        ? (this.setState({
          isDisabled: false,
        }))
        : (this.setState({
          isDisabled: true,
        }))
    ));
  };

  handleSubmit = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(userAction(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <input
          type="email"
          name="email"
          placeholder="e-mail"
          data-testid="email-input"
          value={ email }
          onChange={ this.handleChange }
          required
        />
        <input
          type="password"
          name="password"
          placeholder="senha"
          data-testid="password-input"
          value={ password }
          onChange={ this.handleChange }
          required
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
