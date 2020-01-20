// App.js
import React, {useState, useEffect, useRef} from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import IconButton from 'Components/IconButton'
import { useDispatch, useSelector } from "react-redux";
import { LOAD_CURRENCIES, ADD_WATCHER, SELECT_CURRENCY, REMOVE_WATCHER } from "State/actions"
import {Autocomplete, withKeyboardAwareScrollView} from "react-native-dropdown-autocomplete";
import ConvertedCurrency from "Components/ConvertedCurrency"
import TouchableCurrency from "Components/TouchableCurrency"


function App() {
  const [toggleAll, setToggleAll] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const currencyList = useSelector(state => state.currencies.currencyList);
  const watchers = useSelector(state => state.currencies.watchers);
  const activeCurrency = useSelector(state => state.currencies.activeCurrency);
  const autoCompleteRef = useRef();

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch({ type: LOAD_CURRENCIES });
    
  }, [])

  function handleSelectItem(item, index) {
    setToggleSearch(false);
    dispatch({ type: SELECT_CURRENCY, value: item.currency })

    try {
    autoCompleteRef.current.clearInput();
    } catch (e) {}
  }
  
  return (
    <View style={{flex: 1}}>
      <ConvertedCurrency currency={activeCurrency} />
      <View style={{width: "100%", padding: 5,paddingTop: 0,
    zIndex: 1,
    paddingHorizontal: 8}} >
         <Autocomplete ref={autoCompleteRef} containerStyle={styles.autocompletesContainer} inputStyle={{width: "100%", textTransform: "uppercase" }} inputContainerStyle={{width: "100%", padding: 5, display: toggleSearch ? 'flex' : 'none'}} style={{width: "100%", padding: 5}} handleSelectItem={handleSelectItem} minimumCharactersCount={0}  data={currencyList} valueExtractor={item => {  return item.currency }} rightContent rightTextExtractor={item => {  return item.country }} rightContentItemStyle={{color: "#000"}} />
      </View>
      <View style={{flexDirection: 'row', margin: 20, justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'column'}}>
                <IconButton name="plus-circle" onButtonPress={() => {dispatch({ type: ADD_WATCHER, value: activeCurrency}); dispatch({ type: SELECT_CURRENCY, value: "BTC" })}} />
                <IconButton name={toggleAll ? "check-circle" : "circle"} onButtonPress={() => setToggleAll(!toggleAll)} />
          </View>
          <View style={{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={{color: '#6ACA25', fontWeight: 'bold',fontSize: 48, fontWeight: 'bold', textAlign: 'center'}}>Watchers</Text>
          </View>
          <IconButton name="search-dollar" onButtonPress={() => setToggleSearch(!toggleSearch)} />
      </View>

      <FlatList
        data={toggleAll ? currencyList : watchers}
        renderItem={({ item }) => <TouchableCurrency {...item} onButtonPress={() => dispatch({ type: REMOVE_WATCHER, value: item.currency })} />}
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
