import React from 'react';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

describe('Login page', () => {
  it('should render the correct path', () => {
    renderWithRouter(<App />, ['/']);

    expect(screen.getByTestId);
  });
});
