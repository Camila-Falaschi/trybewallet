import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from '../App';
import rootReducer from '../redux/reducers/index';
import { renderWithRouter, renderWithRouterAndRedux } from './helpers/renderWith';

describe('Login page', () => {
  const emailId = 'email-input';
  const passwordId = 'password-input';

  it('should render the login form with the correct URL', () => {
    const store = createStore(rootReducer);

    renderWithRouter(
      <Provider store={ store }>
        <App />
      </Provider>, ['/'],
    );

    expect(screen.getByTestId(emailId)).toBeDefined();
    expect(screen.getByTestId(passwordId)).toBeDefined();
  });

  it(`should have verification for a valid e-mail and
a password bigger than six characters`, () => {
    const store = createStore(rootReducer);

    renderWithRouter(
      <Provider store={ store }>
        <App />
      </Provider>, ['/'],
    );

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(passwordInput, '123456');

    userEvent.type(emailInput, 'email-incorreto');
    expect(button).toBeDisabled();

    userEvent.type(emailInput, 'email@incorreto');
    expect(button).toBeDisabled();

    userEvent.type(emailInput, 'email.com');
    expect(button).toBeDisabled();

    userEvent.type(emailInput, 'teste@email.com');
    expect(button).not.toBeDisabled();

    userEvent.type(passwordInput, '12345');
    expect(button).toBeDisabled();

    userEvent.type(passwordInput, '1');
    expect(button).toBeDisabled();
  });

  it('should go to the wallet page when clicking the button with the correct login',
    () => {
      const page = renderWithRouterAndRedux(<App />, { initialPath: ['/'] });

      const emailInput = screen.getByTestId(emailId);
      const passwordInput = screen.getByTestId(passwordId);
      const button = screen.getByRole('button', { name: 'Entrar' });

      userEvent.type(emailInput, 'teste@email.com');
      userEvent.type(passwordInput, '123456');
      userEvent.click(button);

      expect(screen.getByText('Despesa Total: R$')).toBeDefined();

      const { pathname } = page.history.location;
      expect(pathname).toBe('/carteira');
    });
});
