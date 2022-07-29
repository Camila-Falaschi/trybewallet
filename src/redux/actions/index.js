// Coloque aqui suas actions .
export const USER_EMAIL = 'USER_EMAIL';

const API_URL = 'https://economia.awesomeapi.com.br/json/all';
export const REQUEST_BEGIN = 'REQUEST_BEGIN';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_ERROR = 'REQUEST_ERROR';

export const userAction = (email) => ({
  type: USER_EMAIL,
  email,
});

export const requestCurrenciesSuccess = (currencies) => ({
  type: REQUEST_SUCCESS,
  currencies,
});

export const requestFailure = (error) => ({
  type: REQUEST_ERROR,
  error,
});

export function getCurrenciesDataThunk() {
  return async (dispatch) => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const currencies = data.filter((item) => item !== 'USDT');
      dispatch(requestCurrenciesSuccess(currencies));
    } catch (error) {
      dispatch(requestFailure(error));
    }
  };
}
