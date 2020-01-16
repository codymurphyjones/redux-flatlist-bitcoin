// App.js
import React from 'react';

import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import Example from "Features/Example"


export default function App() {
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
    <Example />
    </SafeAreaView>
  );
}



