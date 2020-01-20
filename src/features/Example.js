// App.js
import React, {useState, useEffect} from 'react';
import { View, FlatList, TextInput, Text, StyleSheet } from 'react-native';
import IconButton from 'Components/IconButton'
import { getCoinPrice, getSupportedCurrencies } from 'Utils/coindesk'
import { useDispatch, useSelector } from "react-redux";
import { LOAD_CURRENCIES, ADD_WATCHER, SELECT_CURRENCY, GET_CURRENCY_PRICE } from "State/actions"
import {Autocomplete, withKeyboardAwareScrollView} from "react-native-dropdown-autocomplete";

function Item(props) {
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
  
  return ( <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', margin: 20, padding: 10, borderColor: '#434343', borderWidth: 4, borderRadius: 10, alignItems: "center", backgroundColor: '#000'}}>
  <Text style={{color: '#6ACA25', fontSize: 48, fontWeight: 'bold'}}>{props.currency}</Text>
  <View style={{flex: 1, flexDirection: 'column'}}>
     <Text style={{color: '#6ACA25', fontWeight: 'bold', textAlign: 'right'}}>{"BTC " + rate}</Text>
     <Text style={{color: '#6ACA25', fontWeight: 'bold', textAlign: 'right'}}>{"$" + dollar}</Text>
 </View>
 </View>)
}


function App() {
  const [toggleAll, setToggleAll] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const currencyList = useSelector(state => state.currencies.currencyList);
  const watchers = useSelector(state => state.currencies.watchers);
  const activeCurrency = useSelector(state => state.currencies.activeCurrency);

  const dispatch = useDispatch();

  

  async function addWatcher() {
    dispatch({ type: ADD_WATCHER, value: activeCurrency });
  }


  useEffect(() => {
    dispatch({ type: LOAD_CURRENCIES });
    
  }, [])

  function handleSelectItem(item, index) {
    setToggleSearch(false);
    dispatch({ type: SELECT_CURRENCY, value: item.currency })
  }
  
  return (
    <View style={{flex: 1}}>
      <Item currency={activeCurrency} />
      <View style={{width: "100%", padding: 5,paddingTop: 0,
    zIndex: 1,
    paddingHorizontal: 8}} >
         <Autocomplete containerStyle={styles.autocompletesContainer} inputStyle={{width: "100%" }} inputContainerStyle={{width: "100%", padding: 5, display: toggleSearch ? 'flex' : 'none'}} style={{width: "100%", padding: 5}} handleSelectItem={handleSelectItem} minimumCharactersCount={0}  data={currencyList} valueExtractor={item => {  return item.currency }} />
      </View>
      <View style={{flexDirection: 'row', margin: 20, justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'column', justifyContent: 'space-between', minWidth: 65}}>
                <IconButton name="plus-circle" onButtonPress={addWatcher} />
                <IconButton name={toggleAll ? "check-circle" : "circle"} onButtonPress={() => setToggleAll(!toggleAll)} />
          </View>
          <View style={{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={{color: '#6ACA25', fontWeight: 'bold',fontSize: 48, fontWeight: 'bold', textAlign: 'center'}}>Watchers</Text>
          </View>
          <IconButton name="search-dollar" onButtonPress={() => setToggleSearch(!toggleSearch)} />
      </View>

      <FlatList
        data={toggleAll ? currencyList : watchers}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={item => item.currency}
      />
    </View>)

  ;
}

const styles = StyleSheet.create({
  autocompletesContainer: {
    paddingTop: 0,
    position: "absolute",
    top: 58,
    zIndex: 1,
    width: "100%",
    paddingHorizontal: 8
  },
  input: {maxHeight: 40},
  inputContainer: {
    display: "flex",
    flexShrink: 0,
    flexGrow: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#c7c6c1",
    paddingVertical: 13,
    paddingLeft: 12,
    paddingRight: "5%",
    width: "100%",
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  plus: {
    position: "absolute",
    left: 15,
    top: 10,
  },
});




export default withKeyboardAwareScrollView(App)
