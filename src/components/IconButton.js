// App.js
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { TouchableOpacity } from 'react-native';




export default function IconButton(props) {
  
  return (
    <TouchableOpacity onPress={props.onButtonPress}>
		    <Icon name={props.name} size={30} color="#A9A9A9" />
   </TouchableOpacity>
  );
}




