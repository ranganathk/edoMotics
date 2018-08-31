/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Slider, NetInfo } from 'react-native';
import axios from 'axios';

const RASPBERRY_PI_URL = 'http://192.168.31.9:3000';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  setLightValue = async val => {
    let brightness;
    if (val === 0) {
      brightness = 0;
    } else if (val > 0 && val < 20) {
      brightness = 2;
    } else {
      brightness = Math.floor(val / 10);
    }

    try {
      const resp = await axios.post(RASPBERRY_PI_URL, {
        brightness: `${brightness}`
      });
      console.log(resp);
    } catch (error) {
      console.log(
        'There has been a problem with your fetch operation: ' + error.message
      );
      // ADD THIS THROW error
      throw error;
    }
  };

  componentWillMount() {
    NetInfo.getConnectionInfo().then(connectionInfo => {
      console.warn(
        'Initial, type: ' +
          connectionInfo.type +
          ', effectiveType: ' +
          connectionInfo.effectiveType
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Slider
          style={{ width: 300 }}
          step={1}
          minimumValue={0}
          maximumValue={100}
          value={this.state.value}
          onValueChange={val => this.setState({ value: val })}
          onSlidingComplete={val => this.setLightValue(val)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
