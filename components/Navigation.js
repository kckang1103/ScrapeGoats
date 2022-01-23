import React from 'react';
import { View } from 'react-native'

// Navigation components
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//import IonicIcon from 'react-native-vector-icons/Ionicons'

import { Dimensions } from 'react-native';

//Import screens
import HomeScreen from '../screens/Home';
import HistoryScreen from '../screens/History';
import SearchScreen from '../screens/Search';
import CameraScreen from '../screens/CameraSearch';
import ProfileScreen from '../screens/Profile';

const fullScreenWidth = Dimensions.get('window').width;
const Tab = createBottomTabNavigator();

export default function Navigation(props) {


  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator>
        {/* <Tab.Screen name="Home" options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          )
        }} component={HomeScreen} /> */}
        {/* <Tab.Screen name="History" options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" color={color} size={size} />
          )
        }} component={HistoryScreen} /> */}
        <Tab.Screen name="Search" options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          )
        }} component={SearchScreen} />
        <Tab.Screen name="Camera Search" options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="camera" color={color} size={size} />
          )
        }} component={CameraScreen} />
        <Tab.Screen name="Profile" options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={size} />
          )
        }} component={ProfileScreen} />
      </Tab.Navigator>
    </View>
  )
}
