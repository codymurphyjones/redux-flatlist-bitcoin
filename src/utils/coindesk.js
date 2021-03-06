import axios from 'axios'

export const getCoinPrice = async (coin, func, fail=()=>null) => {

  const response = await axios.get(
    'https://api.coindesk.com/v1/bpi/currentprice/'+ coin + '.json'
  ).then((value) => func(value.data.bpi)).catch((e) => {
    fail();
  })
}
/*
Appears to have issues with CORS when using on Web, works fine on mobile */
export const getSupportedCurrencies = async () => {
  const response = await axios.get(
    'https://api.coindesk.com/v1/bpi/supported-currencies.json', { headers: {
        'Access-Control-Allow-Origin': '*',
      }}
  )

  return response.data;
}


export const getAll = async (coin) => {
    var currencies = await getSupportedCurrencies();
    for(var i = 0; i < currencies.length;i++) {
        getCoinPrice(currencies[i].currency)
    }
  }
