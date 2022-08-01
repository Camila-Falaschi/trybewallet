import economiaAPI from '../../services/economiaAPI';

// Coloque aqui suas actions .
export const USER_EMAIL = 'USER_EMAIL';

export const REQUEST_BEGIN = 'REQUEST_BEGIN';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';

export const userAction = (email) => ({
  type: USER_EMAIL,
  email,
});

export const requestCurrenciesSuccess = (currencies) => ({
  type: REQUEST_CURRENCIES_SUCCESS,
  currencies,
});

export function getCurrenciesDataThunk() {
  return async (dispatch) => {
    try {
      const response = await economiaAPI();
      const data = Object.keys(response);
      const currencies = data.filter((item) => item !== 'USDT');
      dispatch(requestCurrenciesSuccess(currencies));
    } catch (error) {
      console.log(error);
    }
  };
}
