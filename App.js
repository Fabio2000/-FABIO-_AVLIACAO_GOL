import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView from 'react-native-maps'
import { FlatList } from 'react-native'


export default class App extends Component {
  state = {
    region: null,
  }
  async componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      ({ coords: {latitude, longitude }}) => {
        this.setState({region: { latitude,
           longitude,
           latitudeDelta: 0.0005,
          longitudeDelta: 0.0005,
          forecast: [],
          error:'' }})
        }, //sucesso
      (error) => this.setState({ forecast: error.message }),
      () => {}, //erro
      () => { this.getWeather(); },
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      }
    )
  }
  getWeather(){
		let url = 'https://samples.openweathermap.org/data/2.5/forecast?q=M%C3%BCnchen,DE&appid=b6907d289e10d714a6e88b30761fae22'

		fetch(url)
		.then(response => response.json())
		.then(data => {
			this.setState((prevState, props) => ({
				forecast: data
			}));
		})
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
    <FlatList data={this.state.forecast.list} style={{marginTop:20}} 
      keyExtractor={item => item.dt_txt} renderItem={({item}) =>
     <ForecastCard detail={item} location={this.state.forecast.city.name} />} />
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