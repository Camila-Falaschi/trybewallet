import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class TableRow extends Component {
  constructor(props) {
    super(props);
    const { expenses, expensesIndex } = props;
    const { currency, description, exchangeRates,
      method, tag, value } = expenses[expensesIndex];
    const exchangeRateData = Object.entries(exchangeRates)
      .find((item) => item[0] === currency);
    const exchangeRateValue = Number(exchangeRateData[1].ask);
    this.state = {
      description,
      tag,
      method,
      value: Number(value).toFixed(2),
      currencyName: exchangeRateData[1].name,
      exchangeRate: exchangeRateValue.toFixed(2),
      totalValue: (value * exchangeRateValue).toFixed(2),
    };
  }

  render() {
    const { description, tag, method, value, currencyName, exchangeRate,
      totalValue } = this.state;
    return (
      <>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{value}</td>
        <td>{currencyName}</td>
        <td>{exchangeRate}</td>
        <td>{totalValue}</td>
        <td>Real</td>
      </>
    );
  }
}

const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
});

TableRow.propTypes = {
  expensesIndex: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(TableRow);
