import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrenciesDataThunk } from '../redux/actions';
import SelectInput from './SelectIntput';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrenciesDataThunk());
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <input type="number" min="0" data-testid="value-input" />
        <SelectInput
          testid="currency-input"
          labelName="Moeda"
          dataArray={ currencies }
        />
        <SelectInput
          testid="method-input"
          labelName="Método de Pagamento"
          dataArray={ ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'] }
        />
        <SelectInput
          testid="tag-input"
          labelName="Tag:"
          dataArray={ ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'] }
        />
        <input type="text" data-testid="description-input" />
        <button type="button">Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
