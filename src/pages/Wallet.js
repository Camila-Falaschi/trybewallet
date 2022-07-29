import React from 'react';
import Header from '../components/Header';
import SelectInput from '../components/SelectIntput';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <main>
          <section>
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
          </section>
        </main>
      </>
    );
  }
}

export default Wallet;
