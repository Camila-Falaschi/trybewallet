import economiaAPI from '../../services/economiaAPI';

// Coloque aqui suas actions .
export const USER_EMAIL = 'USER_EMAIL';
export const ADD_NEW_EXPENSE = 'ADD_NEW_EXPENSE';

export const EDIT_WALLETINFO_ROW = 'EDIT_WALLETINFO_ROW';
export const EDITED_EXPENSE_ROW = 'EDITED_EXPENSE_ROW';
export const DELETE_WALLETINFO_ROW = 'DELETE_WALLETINFO_ROW';

export const WALLETFORM_STATUS = 'WALLETFORM_STATUS';
export const CLEAR_WALLETFORM = 'CLEAR_WALLETFORM';

export const REQUEST_BEGIN = 'REQUEST_BEGIN';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';

export const userAction = (email) => ({
  type: USER_EMAIL,
  email,
});

export const addNewExpenseAction = (expenses) => ({
  type: ADD_NEW_EXPENSE,
  expenses,
});

export const editExpenseRowActon = (expenseId) => ({
  type: EDIT_WALLETINFO_ROW,
  expenseId,
});

export const saveEditedExpenseAction = (editedExpenses) => ({
  type: EDITED_EXPENSE_ROW,
  editedExpenses,
});

export const deleteExpenseRowAction = (updateExpenses) => ({
  type: DELETE_WALLETINFO_ROW,
  updateExpenses,
});

export const WalletFormAction = (name, value) => ({
  type: WALLETFORM_STATUS,
  name,
  value,
});

export const clearWalletFormAction = () => ({
  type: CLEAR_WALLETFORM,
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
