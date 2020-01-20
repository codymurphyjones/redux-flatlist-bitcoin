// App.js
import React, {useState, useEffect} from 'react';
import { View, FlatList, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import IconButton from 'Components/IconButton'
import { getCoinPrice, getSupportedCurrencies } from 'Utils/coindesk'
import { useDispatch, useSelector } from "react-redux";
import { LOAD_CURRENCIES, ADD_WATCHER, SELECT_CURRENCY, GET_CURRENCY_PRICE } from "State/actions"
import {Autocomplete, withKeyboardAwareScrollView} from "react-native-dropdown-autocomplete";


function withTouch(Component, onButtonPress) {
    return (<TouchableOpacity style={{backgroundColor: 'rgba(0,0,0,0)'}} onPress={onButtonPress}>

    </TouchableOpacity>);
}


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