// App.js
import React, {useState, useEffect} from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import IconButton from 'Components/IconButton'
import { getCoinPrice, getSupportedCurrencies } from 'Utils/coindesk'


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    currency: 'USD',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    currency: 'NOK',
  },
  {
    id: '58694a0f-3da1-471f-bd96-545571e29d72',
    currency: 'STD',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e23d72',
    currency: 'PYG',
  },
  {
    id: '58694a0f-3da1-471f-bd96-141571e29d72',
    currency: 'PEN',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d7m',
    currency: 'LTL',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    currency: 'GMD',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e21d72',
    currency: 'EEK',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29h72',
    currency: 'CNY',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d32',
    currency: 'AED',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d71',
    currency: 'AMD',
  },
];

function Item(props) {
  const [price,setPrice] = useState(0.0);
  const [dollar,setDollar] = useState(0.0);
  useEffect(() => {
      getCoinPrice(props.currency, (val) => { 
        setPrice(val[props.currency].rate); 
        let rate = parseFloat(val[props.currency].rate.replace(/,/g, ""));
        let usd = parseFloat(val["USD"].rate.replace(/,/g, ""));
        let dollar = rate / usd;
       
        setDollar((dollar).toFixed(2));
        });
       
  }, [])
  
  return ( <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', margin: 20, padding: 10, borderColor: '#434343', borderWidth: 4, borderRadius: 10, alignItems: "center", backgroundColor: '#000'}}>
  <Text style={{color: '#6ACA25', fontSize: 48, fontWeight: 'bold'}}>{props.currency}</Text>
  <View style={{flex: 1, flexDirection: 'column'}}>
     <Text style={{color: '#6ACA25', fontWeight: 'bold', textAlign: 'right'}}>{price}</Text>
     <Text style={{color: '#6ACA25', fontWeight: 'bold', textAlign: 'right'}}>{price}</Text>
     <Text style={{color: '#6ACA25', fontWeight: 'bold', textAlign: 'right'}}>{"$" + dollar}</Text>
 </View>
 </View>)
}


export default function App() {
  const [appData, setAppData] = useState(DATA);
  const [activeAppData, setActiveAppData] = useState([]);
  const [toggleAll, setToggleAll] = useState(false);

  

  async function addWatcher() {
    let newArray = [...appData];
    let newWatcher = newArray.pop();
    await setAppData(newArray);


    let newData = [...activeAppData];
    if(newWatcher) {
        newData.push(newWatcher)

    await setActiveAppData(newData);

    }

  }

  async function test() {

  }


  useEffect(() => {
    async function fetch() {
      let tokens = await getSupportedCurrencies()
      await setAppData(tokens);
      
    }
    fetch();
    
  }, [])
  
  return (
    <View style={{flex: 1}}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderColor: '#434343', borderWidth: 4, borderRadius: 10, alignItems: "center", backgroundColor: '#000', height: 80}}>
        <Text style={{color: '#6ACA25', fontSize: 48, fontWeight: 'bold'}}>BTC</Text>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={{color: '#6ACA25', fontWeight: 'bold', textAlign: 'right'}}>$72,294.20</Text>
            <Text style={{color: '#6ACA25', fontWeight: 'bold', textAlign: 'right'}}>$72,294.20</Text>
            <Text style={{color: '#6ACA25', fontWeight: 'bold', textAlign: 'right'}}>$72,294.20</Text>
          </View>
      </View>
      <View style={{flexDirection: 'row', margin: 20, justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'column', justifyContent: 'space-between', minWidth: 65}}>
                <IconButton name="plus-circle" onButtonPress={addWatcher} />
                <IconButton name={toggleAll ? "check-circle" : "circle"} onButtonPress={() => setToggleAll(!toggleAll)} />
          </View>
          <View style={{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={{color: '#6ACA25', fontWeight: 'bold',fontSize: 48, fontWeight: 'bold', textAlign: 'center'}}>Watchers</Text>
          </View>
          <IconButton name="search-dollar" onButtonPress={test} />
      </View>

      <FlatList
        data={toggleAll ? appData : activeAppData}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={item => item.currency}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  }
});

