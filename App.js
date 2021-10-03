import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
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
  const [geoLoc, setGeoloc] = useState({
    ready: false,
    where: {
      latitud: null,
      longitude: null,
    },
    err: null,
  })

  const geoSuccess = (position) => {
    
    setGeoloc({
      ready:true,
      where: {lat: position.coords.latitude,lng:position.coords.longitude }
    })
    setData({
      ...data,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    })
  }
  const geoFailure = (err) => {
      setGeoloc({error: err.message});
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={styles.containerDrawer}>
        <View style={styles.parametersDrawer}>
          <Text>Parameters</Text>
        </View>
        <View className="l-l-container">
          <View style={styles.wholeContainer}>
            <Text>Latitude</Text>
            <TextInput
              style={styles.input}
              nativeID="latitude"
              onChange={text => setData({...data, latitude: text.target.value})}
            />
          </View>
          <View style={styles.wholeContainer}>
            <Text>Longitude</Text>
            <TextInput
              style={styles.input}
              nativeID="longitude"
              onChange={text => setData({...data, longitude: text.target.value})}
            />
          </View>
          <Button
            title="Use my location"
            onPress={() => {
              let geoOptions = {
                enableHighAccuracy: true,
                timeOut: 20000,
                maximumAge: 60 * 60 * 24
              }
              setGeoloc({ready:false, error: null });
              navigator.geolocation.getCurrentPosition( geoSuccess, geoFailure, geoOptions)
            }}
          />
          <View style={styles.wholeContainer}>
            <Text>Start</Text>
            <TextInput
              style={styles.input}
              placeholder="Year"
              onChange={text => setData({...data, start: text.target.value})}
            />
          </View>
          <View style={styles.wholeContainer}>
            <Text>End</Text>
            <TextInput
              style={styles.input}
              placeholder="Year"
              onChange={text => setData({...data, end: text.target.value})}
            />
          </View>
          <Button
            title="Show Data"
            onPress={() => {
              props.navigation.closeDrawer()
              // do all to show graph
              console.log("graph", data)
            }}
          />
        </View>
      </View>
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
  containerDrawer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  parametersDrawer: {
    width: '90%',
    margin: '5vh',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '0px',
    paddingRight: '0px',
    borderColor: 'black',
    borderBottomWidth: '3px',
    borderStyle: 'solid',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wholeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

});
