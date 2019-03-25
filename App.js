import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView from 'react-native-maps';


export default class App extends Component {
  state = {
    region: null,
  }
  async componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      ({ coords: {latitude, longitude }}) => {
        this.setState({region: { latitude,
           longitude,
           latitudeDelta: 0.0055,
          longitudeDelta: 0.0055, }})
      }, //sucesso
      () => {}, //erro
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      }
    )
  }
  render() {

    const {region} = this.state
    return (
      <View style={styles.container}>

      <MapView
      style={styles.mapStyles}
      region={region}
        showsUserLocation
        loadingEnabled
        />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mapStyles: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})