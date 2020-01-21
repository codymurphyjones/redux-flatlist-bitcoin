// App.js
import React from 'react';

import { SafeAreaView } from 'react-native';

import CurrencyConverter from "Features/CurrencyConverter"


export default function App() {
  
  return (
    <SafeAreaView style={{flex: 1}}>
    <CurrencyConverter />
    </SafeAreaView>
  );
}



