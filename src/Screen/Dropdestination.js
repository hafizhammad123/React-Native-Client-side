import { View,Text,StyleSheet,TextInput,TouchableOpacity,Button } from "react-native";
import { useState,useEffect } from "react";
import MapView, {Marker}from 'react-native-maps';


function Dropdestination ({navigation , route}) {
   
    const {pickup} = route.params
    const [location, setLocation] = useState(null);
    const [place, setPlace] =useState([])
    const [destination , setdestination] = useState()
    

    console.log(pickup)

    useEffect(() => {
      (async () => {
        
        
        Location.watchPositionAsync(
        {
          accuracy: 0,
          distanceInterval: 1,
          
        }
        ,
        (location) =>{
          // console.log('Location', location)
          setLocation(location)
        } 
        )
        
      })();
    }, []);

    function searchPlaces (text) {
    
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'fsq3jBZE6H0q4Ze7FGej5zg96cLQ//tP/CCB5ek7NfR2sD8='
        }
      };
      
   
  
      fetch(`https://api.foursquare.com/v3/places/search?query=${text}&ll=${pickup.geocodes.main.latitude},${pickup.geocodes.main.longitude}&radius=10000`, options)
        .then(response => response.json())
        .then(response =>
        { 
        
        setPlace(response.results)
        console.log(place)
        
        
        })
        .catch(err => console.error(err));
     }

     function onPlace (item) {
       setdestination(item)
     }
  
    
    return<View>

         <TextInput  placeholder="Search Destination location" onChangeText={searchPlaces}/>
         {!destination && <View>
         {place.map(function(item){
          return<TouchableOpacity onPress={()=> onPlace (item)}>
            <Text>{item.name},{item.location.address}</Text>
          </TouchableOpacity>
         })} 
        </View>}

        {destination && <View>
          <View style={styles.design}>
          <Text style={styles.designText}>Your Selected Destination Location Is</Text>
          <Text style={styles.designTextTow}>{destination.name},{destination.location.address}</Text>
          </View>
          <Button
            title="RIDE SELECTION"
            onPress={() => navigation.navigate('Vehicle',{pickup , destination})}
        />
          {place.map(function(item){
          return<TouchableOpacity onPress={()=> onPlace (item)}>
            <Text>{item.name},{item.location.address}</Text>
          </TouchableOpacity>
         })}    
        </View>}
        
        
        <MapView style={styles.map}
          initialRegion={{
            latitude: pickup.geocodes.main.latitude,
            longitude:  pickup.geocodes.main.longitude,
            latitudeDelta: 0.0001,
            longitudeDelta: 0.0001,
          }}
         >
          <Marker 
           coordinate={
            {
              latitude: pickup.geocodes.main.latitude,
              longitude:  pickup.geocodes.main.longitude,
            }
          }
          title={"your location " + pickup.name}
          pinColor={"red"}
          />
        </MapView>

    </View>
}

const styles =StyleSheet.create({
    design:{
        backgroundColor: "red",
        
      },
      designText: {
        padding: 10,
        color : "white",
        fontWeight: "bold",
        backgroundColor: "green"
      },
      designTextTow:{
        padding: 10,
        backgroundColor: "white",
        borderBottomColor: 'black',
        borderBottomWidth: 3,
      },
      map: {
        width: '100%',
        height: '100%',
      },
})
export default Dropdestination;