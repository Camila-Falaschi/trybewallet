import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <main>
          <section>
            <WalletForm />
          </section>
        </main>
      </>
    );
  }
}

export default Wallet;
