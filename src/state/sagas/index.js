
import { takeLatest, takeEvery, put, delay, all } from "redux-saga/effects";
import {ASYNC_LOAD_CURRENCIES, LOAD_CURRENCIES, ASYNC_ADD_WATCHER, ADD_WATCHER, ASYNC_GET_CURRENCY_PRICE, GET_CURRENCY_PRICE} from "State/actions"
import {getSupportedCurrencies, getCoinPrice} from "Utils/coindesk"

function* AsyncLoadCurrencies() {
  try {
  let data = yield getSupportedCurrencies();
  yield put({ type: ASYNC_LOAD_CURRENCIES, value: data, });
  }
  catch(e) {
    console.log(e)
  }
}

export function* watchLoadCurrencies() {
  yield takeLatest(LOAD_CURRENCIES, AsyncLoadCurrencies);
}

function* AsyncAddWatcher(action) {
  console.log(action);
  yield put({ type: ASYNC_ADD_WATCHER, value: action.value});
}

export function* watchAddWatcher() {
  yield takeLatest(ADD_WATCHER, AsyncAddWatcher);
}


function* AsyncGetCurrencyPrice(action) {

  const {currency} = action;
  async function loadCurrency() {
    let rate;
    
    let dollar;
    await getCoinPrice(currency, (val) => { 
 
    rate = parseFloat(val[currency].rate.replace(/,/g, ""));
    let usd = parseFloat(val["USD"].rate.replace(/,/g, ""));
    
    dollar =  usd / rate;
    rate = (1.0 / rate).toFixed(9);
    
    if(dollar < 0.01)
        dollar = dollar.toFixed(5);
    else
        dollar = dollar.toFixed(2);

    rate = rate.toString().replace(/(0*)$/, "0")
    dollar = dollar.toString().replace(/(0*)$/, "00")
    }, (e) => console.log(e));
    return {dollar, rate}
  }
  
  let {dollar, rate} = yield loadCurrency();
  
  let currencyObj = {};
  currencyObj[currency] = {
    currency,
    dollar,
    rate
   }


  yield put({ type: ASYNC_GET_CURRENCY_PRICE, value: currencyObj, });
}

export function* watchGetCurrencyPrice() {
  yield takeEvery(GET_CURRENCY_PRICE, AsyncGetCurrencyPrice);
}


export default function* rootSaga() {
  yield all([
    watchLoadCurrencies(),
    watchAddWatcher(),
    watchGetCurrencyPrice()
  ])
}