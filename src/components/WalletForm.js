import React, { Component } from 'react';
import SelectInput from './SelectIntput';

export default class WalletForm extends Component {
  render() {
    return (
      <form>
        <input type="number" min="0" data-testid="value-input" />
        <SelectInput
          testid="currency-input"
          labelName="Moeda"
          dataArray={ ['moeda'] }
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
