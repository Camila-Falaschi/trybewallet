import { WALLETFORM_STATUS, CLEAR_WALLETFORM } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  price: '',
  currency: 'USD',
  payMethod: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
};

const walletForm = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLETFORM_STATUS:
    return {
      ...state,
      [action.name]: action.value,
    };

  case CLEAR_WALLETFORM:
    return {
      price: '',
      currency: 'USD',
      payMethod: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };

  default:
    return state;
  }
};

export default walletForm;
