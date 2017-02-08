/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Animation from 'lottie-react-native'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableHighlight
} from 'react-native';

export default class Anim extends Component {
  constructor(props) {
   super(props)

   this.state = {
     progress: new Animated.Value(0),
     config: {
       duration: 3000,
       imperative: true
     }
   }

   this.play = this.play.bind(this);
   this.reset = this.reset.bind(this);
   this.setAnim = this.setAnim.bind(this);
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 3000
    }).start(({ finished }) => {
      if (finished) this.forceUpdate();
    })
  }

  render() {
    return (
      <View style = {{ flex: 1}}>
        <Animation
          ref = { this.setAnim }
          style = {{ flex: 8 }}
          source = { require('./assets/lottie/LottieWalkthrough.json') }
          progress = { this.state.progress }/>
        <View style = { styles.buttonsContainer }>
          <TouchableHighlight 
            style = { styles.button }
            onPress = { this.play }>
            <Text style = { styles.instructions }>Animate me!</Text>
          </TouchableHighlight>
          <TouchableHighlight 
            style = { styles.button }
            onPress = { this.reset }>
            <Text style = { styles.instructions }>Reset me!</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  setAnim(anim) {
    this.anim = anim;
  }

  play() {
    if (this.state.config.imperative) {
      this.anim.play();
    } else {
      this.state.progress.setValue(0);
      Animated.timing(this.state.progress, {
        toValue: 1,
        duration: this.state.config.duration
      }).start(({ finished}) => {
        if (finished) this.forceUpdate();
      })
    }
  }

  reset() {
    if (this.state.config.imperative) {
      this.anim.reset();
    } else {
      this.state.progress.setValue(1);
      Animated.timing(this.state.progress, {
        toValue: 0,
        duration: this.state.config.duration,
      }).start(({ finished }) => {
        if (finished) this.forceUpdate();
      })
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttonsContainer: { 
    flex: 2,
    flexDirection: 'row' 
  },
  button: { 
    flex: 1, 
    height: 50, 
    margin: 20, 
    backgroundColor: 'yellow',
    justifyContent: 'center'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Anim', () => Anim);
