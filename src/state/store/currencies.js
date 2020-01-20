import { ASYNC_LOAD_CURRENCIES, ASYNC_ADD_WATCHER, SELECT_CURRENCY, ASYNC_GET_CURRENCY_PRICE } from "State/actions"
import Data from "State/currencies.json"


const initialState = { 
  currencyList: Data
,
watchers: [{currency: "AMD"}, {currency: "USD"}],
activeCurrency: "BTC",
currencyPrice: {}};

const reducer = (state = initialState, action) => {
 
  let newState = { ...state };
 
  switch (action.type) {
    case ASYNC_LOAD_CURRENCIES:
      newState.currencyList =  [...action.value ]; 
      break;

    case SELECT_CURRENCY:
      newState.activeCurrency =  action.value; 
      break;

    case ASYNC_ADD_WATCHER:
      let endAdd = false;
      for(var i = 0; i < newState.watchers.length; i++) {
        console.log(newState.watchers[i].currency)
        console.log(action.value)
        if(newState.watchers[i].currency == action.value) {
          endAdd = true;
            break;
        }
      }
      if(endAdd)
          break;
          
      newState.watchers = [...newState.watchers, { currency: action.value}]
      console.log(newState.watchers);
      break;

    case ASYNC_GET_CURRENCY_PRICE:
      newState.currencyPrice = {...newState.currencyPrice, ...action.value }
      break;
  }
  return newState;
};

export default reducer;
