// App.js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import ConvertedCurrency from "Components/ConvertedCurrency"


export default function TouchableCurrency(props) {
    const {onButtonPress, ...newProps} = props;
    return ( <TouchableOpacity style={{backgroundColor: 'rgba(0,0,0,0)'}} onPress={onButtonPress}>
                <ConvertedCurrency {...newProps} />
    </TouchableOpacity>)
  }