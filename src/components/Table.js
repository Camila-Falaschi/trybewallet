import React, { Component } from 'react';

export default class Table extends Component {
  render() {
    const tableHeaders = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <table>
        <tr>
          {tableHeaders.map((item, index) => <th key={ index }>{item}</th>)}
        </tr>
      </table>
    );
  }
}
