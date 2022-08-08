import {
  ADD_NEW_EXPENSE, DELETE_WALLETINFO_ROW,
  REQUEST_CURRENCIES_SUCCESS, EDIT_WALLETINFO_ROW,
  EDITED_EXPENSE_ROW,
} from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
    };

  case ADD_NEW_EXPENSE:
    return {
      ...state,
      expenses: action.expenses,
    };

  case EDIT_WALLETINFO_ROW:
    return {
      ...state,
      editor: true,
      idToEdit: action.expenseId,
    };

  case EDITED_EXPENSE_ROW:
    return {
      ...state,
      editor: false,
      expenses: action.editedExpenses,
    };

  case DELETE_WALLETINFO_ROW:
    return {
      ...state,
      expenses: action.updateExpenses,
    };

  default:
    return state;
  }
};

export default wallet;
