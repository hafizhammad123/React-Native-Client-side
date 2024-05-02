import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { getRideHistory } from "../Config/Firebase";
import { useState } from "react";

function WirteHistory() {

    const [kaam, setkaam] = useState([])

    async function historyRender() {
        const RIDE = await getRideHistory()

        console.log("Data from Firebase:", RIDE)
        setkaam(RIDE)

    }

    console.log(kaam)




    return <View style={styles.contanir}>
        <ScrollView>
            {kaam.map((item,) => (
                <View style={styles.itemContainer}>
                    <Text style={styles.text1}>Pickup</Text>
                    <Text style={styles.text}>{item.ride.pickup.name}</Text>
                    <Text style={styles.text}>{item.ride.pickup.location.address}</Text>
                    <Text style={styles.text}>{item.ride.CarType}</Text>
                    <Text style={styles.text1}>Destination</Text>
                    <Text style={styles.text}>{item.ride.destination.name}</Text>
                    <Text style={styles.text}>{item.ride.fare}</Text>
                </View>
            ))}
        </ScrollView>

        <Button color={"#A7E82F"} title="Check Ride History"
            onPress={historyRender}

        />
    </View>
}

const styles = StyleSheet.create({
    contanir: {
        flex: 1,
        backgroundColor: '#fff',

    },
    itemContainer: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 20,
    },
    text: {
        color: "black"
    }
    ,
    text1: {
        backgroundColor: "#A7E82F",
        color: "black",
        padding: 5
    }



})

export default WirteHistory;