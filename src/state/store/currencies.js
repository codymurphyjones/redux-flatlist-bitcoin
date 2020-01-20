import { ASYNC_LOAD_CURRENCIES, ASYNC_ADD_WATCHER, SELECT_CURRENCY, ASYNC_GET_CURRENCY_PRICE, REMOVE_WATCHER } from "State/actions"
import Data from "State/currencies.json"

/*
Initial State Model */
const initialState = { 
  currencyList: Data
,
watchers: [],
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

    case REMOVE_WATCHER:
      let watcherPool = [];
      for(var i = 0; i < newState.watchers.length;i++) {
        
        if(newState.watchers[i].currency != action.value) {
            watcherPool = [...watcherPool, {...newState.watchers[i]}]
        }
      }
      
      newState.watchers = [...watcherPool]

    break;

    case ASYNC_ADD_WATCHER:
      let endAdd = false;
      for(var i = 0; i < newState.watchers.length; i++) {
        if(newState.watchers[i].currency == action.value) {
          endAdd = true;
            break;
        }
      }
      if(endAdd)
          break;
          
      newState.watchers = [...newState.watchers, { currency: action.value}]
      break;

    case ASYNC_GET_CURRENCY_PRICE:
      newState.currencyPrice = {...newState.currencyPrice, ...action.value }
      break;
  }
  return newState;
};

export default reducer;
