import { View,Text, Button,ImageBackground,StyleSheet,Image,TouchableHighlight } from "react-native"

function Dashboard ({navigation}) {
    
  
    return(
       <ImageBackground source={{ uri: "https://github.com/hafizhammad123/savewrite/blob/main/hhhhhaa.jpg?raw=true" ,}} style={styles.container} >
        
        <View>
        
       <TouchableHighlight
        style ={{
         padding:30,
      
      }}>
        
        <Button 
        title="Let's Go..."
        color="black"
        onPress={() => navigation.navigate('Pickup')}
        />
        </TouchableHighlight>
      </View>
      
     </ImageBackground>   
    )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
      backgroundColor: '#fff',
     
      justifyContent:"flex-end",
      width:"100%",
      
  },
  mar:{
     backgroundColor:"green"
  }
})


export default Dashboard;