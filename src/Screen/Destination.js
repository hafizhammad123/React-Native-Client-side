import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, Image, TouchableHighlight } from "react-native"
import MapView, { Marker } from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';




function Destination({ navigation }) {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [Place, setPlace] = useState([])
  const [desPlace, setdesPlace] = useState([])
  const [pickup, setpickup] = useState()
  const [destination, setdestination] = useState()
  const [exKiraya, setexKiraya] = useState()


  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      Location.watchPositionAsync(
        // option //
        {
          accuracy: 6,
          distanceInterval: 1,
          timeInterval: 500,
          mayShowUserSettingsDialog: true
        }
        ,
        // callback //
        (location) => {
          // console.log('Location', location)
          setLocation(location)
        })

    })();
  }, []);

  //_____________Today work __________________________:

  function searchPlaces(text) {

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'fsq3jBZE6H0q4Ze7FGej5zg96cLQ//tP/CCB5ek7NfR2sD8='
      }
    };

    const { latitude, longitude } = location.coords

    fetch(`https://api.foursquare.com/v3/places/search?query=${text}&ll=${latitude},${longitude}&radius=10000`, options)
      .then(response => response.json())
      .then(response => {


        setPlace(response.results)
        console.log(Place)


      })




      .catch(err => console.error(err));
  }

  // ----------destination ke map wala code hai-------//

  function DestinationWork(text) {

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'fsq3jBZE6H0q4Ze7FGej5zg96cLQ//tP/CCB5ek7NfR2sD8='
      }
    };

    const { latitude, longitude } = location.coords

    fetch(`https://api.foursquare.com/v3/places/search?query=${text}&ll=${latitude},${longitude}&radius=10000`, options)
      .then(response => response.json())
      .then(response => {


        setdesPlace(response.results)
        console.log(Place)


      })
      .catch(err => console.error(err));
  }

  // ----------destination ke map wala code hai-------//

  // ------ye state me add karne ke liya work karte hai ______________________//
  const onPlace = (item) => {
    setpickup(item)

  }

  const locDesti = (item) => {

    setdestination(item)
  }




  
  // ------ye state me add karne ke liya work karte hai ______________________//





  if (errorMsg) {
    return <Text>{errorMsg}</Text>
  }
  if (!location) {
    return <>

      <Image source={{ uri: 'https://cdn.dribbble.com/users/288708/screenshots/1271026/loader_peeek.gif' }} style={{ width: "auto", height: 675 }} />

    </>
  }

 

  // render --------------------------------------------------///

  return <View style={styles.container}>


    <View style={styles.work}>
      <TextInput style={styles.input} placeholder="Search Pickup location" onChangeText={searchPlaces} />

      <TextInput style={styles.input} placeholder="Search Destination location" onChangeText={DestinationWork}/>
      
      
      
        
     
      
   
     
      
      
      
     
        </View>

   { /* ------------------------------------------------------------------------------- */}


   <View style={styles.marr}>
    {!pickup && <View>

      {Place.map(function (item) {
        return <TouchableOpacity onPress={() => onPlace(item)}>
          <Text>{item.name},{item.location.address}</Text>

        </TouchableOpacity>
      })}

    </View>}
    </View>

    {/* destination_____________________________________- */}



    {!destination && <View>
      {desPlace.map(function (item) {
        return <TouchableOpacity onPress={() => locDesti(item)}>
          <Text>{item.name},{item.location.address}</Text>
        </TouchableOpacity>
      })}
    </View>}





    {/* destination Complete_____________________________________- */}



    <MapView style={styles.map}
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0001,
        longitudeDelta: 0.0001,
      }}

      showsMyLocationButton 
      showsUserLocation
        >
      <Marker
        coordinate={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }}
        title={"your location " + location.coords.latitude}
        pinColor={"#A7E82F"}
      />
    </MapView>
    {/* ------------------------------------------------------------------------------- */}

    {pickup && <View>
        <View style={styles.design}>
          <Text style={styles.designTextTow}>

            <MaterialIcons style={styles.icons} name="wheelchair-pickup" size={24} color="#06BCEE" /> - {pickup.name},{pickup.location.address}

          </Text>
        </View>
        </View>}


        {destination && <View>
          <View style={styles.design}>

            <Text style={styles.designTextTow}>
              <Entypo style={styles.icons} name="location" size={24} color="red" /> -
              {destination.name},{destination.location.address}</Text>
          </View>
          <TouchableHighlight
            style={{
              padding: 30,



            }}>
            <Button
              title="FIND CAR & RIDER"
              color={"#A7E82F"}

              onPress={() => navigation.navigate('Vehicle', { pickup, destination })}
            />
          </TouchableHighlight>


        </View>}
      


  </View>


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    padding: 5,
    paddingLeft: 10,
    marginTop: 10,
    fontSize: 15,
    borderBottomColor: 'black',
    borderBottomWidth: 3,
  },
  marr:{
    marginTop: 10
  },




 
  map: {
    width: '100%',
    height: '50%',
  },
  design: {
    backgroundColor: "red",

  },
  designText: {
    padding: 10,
    color: "white",
    fontWeight: "bold",
    backgroundColor: "green"
  },
  designTextTow: {
    padding: 10,
    backgroundColor: "white",
    borderBottomColor: '#A7E82F',
    borderBottomWidth: 3,
  }
});

export default Destination;