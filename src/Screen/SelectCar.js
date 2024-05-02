import { View, Text, StyleSheet, Button, TouchableOpacity, Image, } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { rideRequest } from "../Config/Firebase";
import { useEffect, useState } from "react";





function SelectCar({ navigation, route }) {
 

    const [Bike, setBike] = useState()
    const [RideMini, setRideMini] = useState()
 //gpt//
   

    const { pickup, destination } = route.params
    console.log(pickup)
    const kiraya = {
        Bike: 50 ,
        Auto: 70,
        MiniCar: 120 ,
        Car: 170,
    }

    async function calculateKiraya(get) {
        const { latitude: picLat, longitude: picLon } = pickup.geocodes.main
        const { latitude: desLat, longitude: desLon } = destination.geocodes.main

        const distance = calcCrow(picLat, picLon, desLat, desLon)

        const fare = kiraya[get] * distance
        setBike ( "Rs/" + fare.toFixed(1))
        
        await rideRequest({pickup , destination ,CarType : get , fare , Timestamp : Date.now() , status: "pemding"})
        
        alert("your Request sent!")
    }

    // overflow code ---------------------------------------//

    function calcCrow(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        var lat1 = toRad(lat1);
        var lat2 = toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value) {
        return Value * Math.PI / 180;
    }



return (
    <View style={styles.container}>
      
    <View style={styles.div}>
        <Text style={styles.divText}><MaterialIcons name="price-change" size={24} color="black" /> Your Price:  {Bike}</Text>
        <Text style={styles.divText}> Driver connection </Text>
        </View>

        

        <View style={styles.design}>
            <Text style={styles.designTextTow}>

                <MaterialIcons style={styles.icons} name="wheelchair-pickup" size={24} color="#06BCEE" /> - {pickup.name},{pickup.location.address}

            </Text>
        </View>


        <View style={styles.design}>

            <Text style={styles.designTextTow}>
                <Entypo style={styles.icons} name="location" size={24} color="red" /> -
                {destination.name},{destination.location.address}</Text>
        </View>

        <View >
            <TouchableOpacity style={styles.texx}>
                <Text style={styles.texx1} onPress={() => calculateKiraya('Bike')}>
                    <MaterialCommunityIcons name="bike" size={24} color="white" /> -
                    {`Bike | ${kiraya.Bike} | km`}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.texxAuto}>
                <Text style={styles.texx1A} onPress={() => calculateKiraya('Auto')} >
                    <FontAwesome5 name="car-alt" size={24} color="#A7E82F" /> -
                    {`Ride Mini| ${kiraya.MiniCar} | km`}
                </Text>

            </TouchableOpacity>

            <TouchableOpacity style={styles.texxAuto1}>
                <Text style={styles.texx1A1} onPress={() => calculateKiraya('Car')} >
                    <Ionicons name="car-sport" size={24} color="white" /> -
                    {`Ride Ac | ${kiraya.Car} | km`}
                </Text>

            </TouchableOpacity>
        </View>

    </View>
  );

       
   
}

const styles = StyleSheet.create({
    designText: {
        padding: 10,
        color: "white",
        fontWeight: "bold",
        backgroundColor: "green"
    },
    designTextTow: {
        padding: 10,
        backgroundColor: "white",
        borderBottomColor: 'black',
        borderBottomWidth: 3,
    },
    texx: {
        backgroundColor: "#A7E82F",
        padding: 10,
        alignItems: "center"

    },
    texx1: {
        fontWeight: "800",
        fontSize: 18
    },
    texxAuto: {
        backgroundColor: "black",
        padding: 10,
        alignItems: "center",

    },
    texx1A: {
        fontWeight: "800",
        fontSize: 18,
        color: "white"
    },
    texxAuto1: {
        backgroundColor: "#A7E82F",
        padding: 10,
        alignItems: "center",

    },
    texx1A1: {
        fontWeight: "800",
        fontSize: 18,
        color: "black"
    },
    designTextTow: {
        padding: 10,
        backgroundColor: "white",
        borderBottomColor: '#A7E82F',
        borderBottomWidth: 3,
      }
,
      div:{
        width:"auto",
        height: "60%",
        backgroundColor:"white",
        alignItems : "center",     
        justifyContent: "center"  
      },
      divText:{
        color: "black",
        fontSize:20,
        fontWeight:"700"
      },
})
export default SelectCar