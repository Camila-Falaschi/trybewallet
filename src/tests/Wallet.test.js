import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

const expensesExample = {
  id: 0,
  value: '10',
  description: 'Reunião',
  currency: 'ILS',
  method: 'Cartão de crédito',
  tag: 'Trabalho',
  exchangeRates: {
    ILS: {
      code: 'ILS',
      codein: 'BRL',
      name: 'Novo Shekel Israelense/Real Brasileiro',
      high: '1.5433',
      low: '1.5389',
      varBid: '0.001',
      pctChange: '0.06',
      bid: '1.5419',
      ask: '1.5421',
      timestamp: '1659935403',
      create_date: '2022-08-08 02:10:03',
    } },
};

describe('Wallet page', () => {
  const testIDValueInput = 'value-input';
  const testIDDescriptionInput = 'description-input';

  it('should render the e-mail value in the correct field', () => {
    renderWithRouterAndRedux(<App />, { initialPath: ['/'] });

    const loginEmail = screen.getByTestId('email-input');
    const loginPassword = screen.getByTestId('password-input');
    const loginButton = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(loginEmail, 'teste@email.com');
    userEvent.type(loginPassword, '123456');
    userEvent.click(loginButton);

    expect(screen.getByTestId('email-field')).toBeDefined();
  });
  it('should have a table with specific headers', () => {
    renderWithRouterAndRedux(<Wallet />, { initialPath: ['/carteira'] });

    const tableHeaders = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

    tableHeaders.forEach((item) => {
      expect(screen.getByRole('columnheader', { name: item })).toBeInTheDocument();
    });
  });
  it('should be able to add new expenses', async () => {
    const initialState = {
      wallet: {
        currencies: ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR',
          'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'],
        expenses: [],
        editor: false,
        idToEdit: 0,
      } };

    renderWithRouterAndRedux(<Wallet />, { initialPath: ['/carteira'], initialState });

    const valueInput = screen.getByTestId(testIDValueInput);
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const descriptionInput = screen.getByTestId(testIDDescriptionInput);
    const addButton = screen.getByRole('button', { name: 'Adicionar despesa' });

    userEvent.type(valueInput, '20');
    userEvent.selectOptions(methodInput, 'Cartão de débito');
    userEvent.selectOptions(tagInput, 'Lazer');
    userEvent.type(descriptionInput, 'Viagem');

    await waitFor(() => {
      const currencyInput = screen.getByTestId('currency-input');
      userEvent.selectOptions(currencyInput, 'EUR');
      expect(screen.getByRole('option', { name: 'EUR' }).selected).toBe(true);
      expect(screen.getByRole('option', { name: 'USD' }).selected).toBe(false);
    });

    const number = 20;
    expect(valueInput).toHaveValue(number);
    expect(screen.getByRole('option', { name: 'Lazer' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'Alimentação' }).selected).toBe(false);
    expect(screen.getByRole('option', { name: 'Cartão de débito' }).selected)
      .toBe(true);
    expect(screen.getByRole('option', { name: 'Dinheiro' }).selected).toBe(false);
    expect(descriptionInput).toHaveValue('Viagem');

    userEvent.click(addButton);
  });
  it('should render all the expenses in the table sheet and delete button should work',
    () => {
      const initialState = {
        wallet: {
          currencies: ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR',
            'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'],
          expenses: [expensesExample],
          editor: false,
          idToEdit: 0,
        } };

      renderWithRouterAndRedux(<Wallet />, {
        initialPath: ['/carteira'],
        initialState,
      });

      expect(screen.getByRole('cell', { name: 'Reunião' })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: 'Trabalho' })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: 'Cartão de crédito' })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: '10.00' })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: 'Novo Shekel Israelense/Real Brasileiro' }))
        .toBeInTheDocument();
      expect(screen.getByRole('cell', { name: '1.54' })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: '15.42' })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: 'Real' })).toBeInTheDocument();

      const totalExpenses = screen.getByTestId('total-field');

      expect(totalExpenses).toHaveTextContent('15.42');
      expect(screen.getByTestId('header-currency-field')).toHaveTextContent('BRL');

      const deleteButton = screen.getByTestId('delete-btn');
      userEvent.click(deleteButton);
      expect(totalExpenses).toHaveTextContent('0.00');
    });
  it('should allow the user to edit his expenses', () => {
    const initialState = {
      wallet: {
        currencies: ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR',
          'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'],
        expenses: [expensesExample, { id: 1,
          value: '5',
          description: 'Lanche da tarde',
          currency: 'USD',
          method: 'Dinheiro',
          tag: 'Alimentação',
          exchangeRates: {
            USD: {
              code: 'USD',
              codein: 'BRL',
              name: 'Dólar Americano/Real Brasileiro',
              high: '5.278',
              low: '5.1559',
              varBid: '-0.0515',
              pctChange: '-0.99',
              bid: '5.1646',
              ask: '5.1653',
              timestamp: '1659733197',
              create_date: '2022-08-05 17:59:57',
            } } }],
        editor: false,
        idToEdit: 0,
      } };

    renderWithRouterAndRedux(<Wallet />, {
      initialPath: ['/carteira'],
      initialState,
    });

    const addButton = screen.getByRole('button', { name: 'Adicionar despesa' });
    expect(addButton).toBeDefined();

    expect(screen.getByRole('cell', { name: 'Lanche da tarde' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '5.00' })).toBeInTheDocument();

    const editButton = screen.getAllByTestId('edit-btn');
    userEvent.click(editButton[1]);
    const saveEditedExpense = screen.getByRole('button', { name: 'Editar despesa' });
    expect(saveEditedExpense).toBeDefined();

    userEvent.type(screen.getByTestId(testIDValueInput), '21');
    userEvent.type(screen.getByTestId(testIDDescriptionInput), 'Almoço');
    userEvent.click(saveEditedExpense);

    expect(screen.getByRole('cell', { name: 'Almoço' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '21.00' })).toBeInTheDocument();
  });
});
