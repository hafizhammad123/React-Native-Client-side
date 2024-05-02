import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Button } from "react-native"
import { SignUpPage } from "../Config/Firebase"

function SigUp({ navigation }) {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [first, setfirst] = useState("")
    const [last, setlast] = useState("")
    const [country, setcountry] = useState("")

    async function RegisterPage() {
        if (!first.trim() || !last.trim() || !email.trim() || !password.trim() || !country.trim()) {
            alert("Barah-e-karam, saare fields bharein");
            return;
            
            
        }
        try {
            await SignUpPage({ first, last, country, email, password })
            setfirst("")
            setlast("")
            setcountry("")
            setemail("")
            setpassword("")
            navigation.navigate("signIn")
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <View>
            <TextInput placeholder="First Name" onChangeText={setfirst} value={first} />
            <TextInput placeholder="Last Name" onChangeText={setlast} value={last} />
            <TextInput placeholder="Country" onChangeText={setcountry} value={country} />
            <TextInput placeholder="Enter email" onChangeText={setemail} value={email} />
            <TextInput placeholder="Enter password" onChangeText={setpassword} value={password} secureTextEntry={true} />

            <TouchableOpacity onPress={() => navigation.navigate("signIn")}>
                <Text>Agar account hai to Click here..</Text>
            </TouchableOpacity>
            <Button title="Register" onPress={RegisterPage} />
        </View>
    );
}

export default SigUp;
