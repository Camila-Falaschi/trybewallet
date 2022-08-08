import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addNewExpenseAction,
  getCurrenciesDataThunk,
  WalletFormAction,
  clearWalletFormAction,
} from '../redux/actions';
import economiaAPI from '../services/economiaAPI';
import SelectInput from './SelectIntput';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrenciesDataThunk());
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    const { dispatch } = this.props;
    dispatch(WalletFormAction(name, value));
  }

  editButton = () => {

  }

  handleAddButton = async (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const { price, currency, payMethod, tag, description, expenses } = this.props;

    const apiData = await economiaAPI();

    const addingExpense = [...expenses, {
      id: expenses.length,
      value: price,
      description,
      currency,
      method: payMethod,
      tag,
      exchangeRates: { ...apiData },
    }];

    dispatch(addNewExpenseAction(addingExpense));
    dispatch(clearWalletFormAction());
  }

  render() {
    const { currencies, price, currency, payMethod, tag, description,
      editor } = this.props;
    return (
      <form>
        <label htmlFor="price">
          Valor:
          <input
            type="number"
            name="price"
            value={ price }
            min="0"
            data-testid="value-input"
            id="price"
            onChange={ this.handleInputChange }
          />
        </label>
        <SelectInput
          testid="currency-input"
          name="currency"
          value={ currency }
          labelName="Moeda"
          dataArray={ currencies }
          handleInputChange={ this.handleInputChange }
        />
        <SelectInput
          testid="method-input"
          name="payMethod"
          value={ payMethod }
          labelName="Método de Pagamento"
          dataArray={ ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'] }
          handleInputChange={ this.handleInputChange }
        />
        <SelectInput
          testid="tag-input"
          name="tag"
          value={ tag }
          labelName="Tag:"
          dataArray={ ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'] }
          handleInputChange={ this.handleInputChange }
        />
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            value={ description }
            data-testid="description-input"
            id="description"
            onChange={ this.handleInputChange }
          />
        </label>

        {(editor)
          ? (
            <button type="submit" onClick={ this.editButton }>
              Editar despesa
            </button>)
          : (
            <button type="submit" onClick={ this.handleAddButton }>
              Adicionar despesa
            </button>)}
      </form>
    );
  }
}

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
  expenses: store.wallet.expenses,
  editor: store.wallet.editor,
  idToEdit: store.wallet.idToEdit,

  price: store.walletForm.price,
  currency: store.walletForm.currency,
  payMethod: store.walletForm.payMethod,
  tag: store.walletForm.tag,
  description: store.walletForm.description,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  editor: PropTypes.bool.isRequired,
  // idToEdit: PropTypes.number.isRequired,

  price: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  payMethod: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
