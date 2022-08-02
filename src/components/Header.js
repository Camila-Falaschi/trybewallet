import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  totalExpenses = () => {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, info) => {
      const { value, exchangeRates, currency } = info;
      const exchange = Object.entries(exchangeRates)
        .find((item) => item[0] === currency);

      const result = value * exchange[1].ask;

      return acc + result;
    }, 0);
    console.log(total);
    return total.toFixed(2);
  }

  render() {
    const { email, expenses } = this.props;
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
            <p>Despesa Total: R$ </p>
            <p data-testid="total-field">
              {(expenses.length === 0) ? '0,00' : this.totalExpenses() }
            </p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
  expenses: store.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Header);
