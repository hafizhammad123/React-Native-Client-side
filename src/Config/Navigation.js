import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';


import Dashboard from '../Screen/Dashboard';
import Destination from '../Screen/Destination';
import Calls from '../WhatsApp/Calls';
import Chat from '../WhatsApp/Chat';
import Rider from '../WhatsApp/Rider';
import Gurops from '../WhatsApp/Grops';
import Dropdestination from '../Screen/Dropdestination';
import SelectCar from '../Screen/SelectCar';
import LoginPage from '../Screen/Login';
import SigUp from '../Screen/Register';
import WirteHistory, { History } from '../Screen/RideHistory';


const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();


function Navigation() {
    return (
      <NavigationContainer>
      <Drawer.Navigator 
      screenOptions={{
        
        headerStyle: {
          backgroundColor: "#A7E82F",
         
        }
    }}
      >

      <Drawer.Screen name="Book write" component={DashboardNavigation}  />
      <Drawer.Screen name="Rider History" component={RiderChat} />

      </Drawer.Navigator>
      </NavigationContainer>
    );
  }


  function DashboardNavigation () {
    return(
      <Stack.Navigator
       screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="signIn" component={LoginPage} />
      <Stack.Screen name="signUp" component={SigUp} />
      <Stack.Screen name="Dashboard" component={Dashboard}/>
      <Stack.Screen name="Pickup" component={Destination} />
      <Stack.Screen name="Destination" component={Dropdestination} />
      <Stack.Screen name="Vehicle" component={SelectCar} />
     
      
      
    </Stack.Navigator>
    )
  }


  function RiderChat () {
    return(
      <Stack.Navigator
       screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="Ride History" component={WirteHistory} />

     
      
      
    </Stack.Navigator>
    )
  }

export default Navigation;

