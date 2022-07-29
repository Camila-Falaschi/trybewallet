import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      expenses: 0.00,
      exchange: 'BRL',
    };
  }

  render() {
    const { email } = this.props;
    const { expenses, exchange } = this.state;
    return (
      <header>
        <h1>TRYBE</h1>
        <div>
          <div>
            <p data-testid="email-field">
              Email:
              {' '}
              {email}
            </p>
          </div>
          <div>
            <p data-testid="total-field">
              Despesa Total: R$
              {' '}
              {expenses}
              {' '}
              <spam data-testid="header-currency-field">{exchange}</spam>
            </p>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
