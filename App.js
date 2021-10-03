import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import './app.css'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { TextInput } from 'react-native-gesture-handler';
import { DataContext, ProviderDataContext } from './Context/dataContext';

function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>UVGSunshine</Text>
    </View>
  )
}

function CustomDrawerContent(props) {
  const {data, setData} = useContext(DataContext)

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <div class="container-drawer">
        <div class="parameters-drawer">
          <Text>Parameters</Text>
        </div>
        <div class="l-l-container">
          <div class="whole-container">
            <Text>Latitude</Text>
            <TextInput style={styles.input}/>
          </div>
          <div class="whole-container">
            <Text>Longitude</Text>
            <TextInput style={styles.input}/>
          </div>
          <Button
            title="Use my location"
            onPress={() => {
              console.log('do something')
              console.log(data, 'data')
            }}
          />
          <div class="whole-container">
            <Text>Start</Text>
            <TextInput style={styles.input} placeholder="Year"/>
          </div>
          <div class="whole-container">
            <Text>End</Text>
            <TextInput style={styles.input} placeholder="Year"/>
          </div>
          <Button
            title="Show Data"
            onPress={() => {
              props.navigation.closeDrawer()
              // do all to show graph
              console.log("graph")
            }}
          />
        </div>
      </div>
      {/* <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      /> */}
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="UVGSunshine" component={Feed} />
    </Drawer.Navigator>
  );
}
export default function App() {
  return (
    <ProviderDataContext>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </ProviderDataContext>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your Heo!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

});
