import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';

import LoginScreen from './screens/Login'
import Navigation from './components/Navigation'
import ForgotPassword from './screens/ForgotPassword';
import Register from './screens/Register';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" >
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
          <Stack.Screen options={{ headerShown: false }} name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen options={{ headerShown: false }} name="Navigation" component={Navigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}