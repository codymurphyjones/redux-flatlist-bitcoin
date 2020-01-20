// App.js
import React, { useEffect} from 'react';
import { View, Text,  } from 'react-native';
import { GET_CURRENCY_PRICE } from "State/actions"
import { useDispatch, useSelector } from "react-redux";



export default function ConvertedCurrency(props) {
    const dispatch = useDispatch();
    const currencyPrice  = useSelector(state => state.currencies.currencyPrice[props.currency]);

    let rate = "";
    let dollar = "";
    
    if(currencyPrice) {
      rate = currencyPrice.rate;
      dollar = currencyPrice.dollar;
    }
      
    useEffect(() => {
      dispatch({ type: GET_CURRENCY_PRICE, currency: props.currency });
       
    }, [props.currency])


    
    
    return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', margin: 10, padding: 10, borderColor: '#434343', borderWidth: 4, borderRadius: 10, alignItems: "center", backgroundColor: '#000'}}>
    <Text style={{color: '#6ACA25', fontSize: 48, fontWeight: 'bold'}}>{props.currency}</Text>
    <View style={{flex: 1, flexDirection: 'column'}}>
       <Text style={{color: '#6ACA25', fontWeight: 'bold', textAlign: 'right'}}>{"BTC " + rate}</Text>
       <Text style={{color: '#6ACA25', fontWeight: 'bold', textAlign: 'right'}}>{"$" + dollar}</Text>
   </View>
   </View>)
  }