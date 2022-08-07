import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableRow from './TableRow';

class Table extends Component {
  render() {
    const tableHeaders = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

    const { expenses } = this.props;
    return (
      // Para os elementos dentro de '<table>' foi consultado a documentação no MDN (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table?retiredLocale=it)
      <table>
        <thead>
          <tr>
            {tableHeaders.map((item, index) => <th key={ index }>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          {(expenses.length > 0) && expenses.map((e, index) => (
            <tr key={ index }><TableRow expensesIndex={ index } /></tr>))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Table);
