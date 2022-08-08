import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';
import { deleteExpenseRowAction } from '../redux/actions';

class TableRow extends Component {
  deleteInfo = (index) => {
    const { dispatch, expenses } = this.props;
    const newArray = expenses.filter((e, elementIndex) => elementIndex !== index);
    dispatch(deleteExpenseRowAction(newArray));
  }

  render() {
    const { expenses, expensesIndex } = this.props;
    const { currency, description, exchangeRates,
      method, tag, value } = expenses[expensesIndex];

    const exchangeRateData = Object.entries(exchangeRates)
      .find((item) => item[0] === currency);
    const exchangeRateValue = Number(exchangeRateData[1].ask);

    const price = Number(value).toFixed(2);
    const currencyName = exchangeRateData[1].name;
    const exchangeRate = exchangeRateValue.toFixed(2);
    const totalValue = (price * exchangeRateValue).toFixed(2);

    return (
      <>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{price}</td>
        <td>{currencyName}</td>
        <td>{exchangeRate}</td>
        <td>{totalValue}</td>
        <td>Real</td>
        <td>
          <button type="button" id="edit" data-testid="edit-btn">
            <FiEdit3 />
          </button>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => this.deleteInfo(expensesIndex) }
          >
            <FiTrash2 />
          </button>
        </td>
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
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(TableRow);
