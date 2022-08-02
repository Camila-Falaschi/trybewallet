import { ADD_NEW_EXPENSE, REQUEST_CURRENCIES_SUCCESS } from '../actions';

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

  default:
    return state;
  }
};

export default wallet;
