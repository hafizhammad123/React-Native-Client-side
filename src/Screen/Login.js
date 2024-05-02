import { useState } from "react";
import { View,Text,TextInput,Button,TouchableOpacity } from "react-native";
import { signIn } from "../Config/Firebase";

function LoginPage ( {navigation} ) {

   const [email, setemail] = useState("")
   const [password, setpassword] = useState("")

   async function login () {
      try{
       await signIn({email, password})
       setemail("")
       setpassword("")
       navigation.navigate("Dashboard")
      }catch (erorr){
          console.log(erorr)
        }
   }

    return<View>


        <TextInput placeholder="Enter email"  onChangeText={setemail} value={email}/>
        <TextInput placeholder="Enter password" onChangeText={setpassword} secureTextEntry={true} value={password} />
        



        <TouchableOpacity  onPress={() => navigation.navigate('signUp')}>
            <Text>
            Don't have an account. Click here..
            </Text>
        </TouchableOpacity>
        <Button title="Login" onPress={login} />
    </View>
}

export default LoginPage;