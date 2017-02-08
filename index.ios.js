/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import _ from 'lodash'
import Animation from 'lottie-react-native'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableHighlight,
  ScrollView,
  Dimensions,
} from 'react-native';

const makeExample = (name, getJson) => ({ name, getJson });
const EXAMPLES = [
  makeExample('Hamburger Arrow', () => require('./assets/animations/HamburgerArrow.json')),
  makeExample('Line Animation', () => require('./assets/animations/LineAnimation.json')),
  makeExample('Lottie Logo 1', () => require('./assets/animations/LottieLogo1.json')),
  makeExample('Lottie Logo 2', () => require('./assets/animations/LottieLogo2.json')),
  makeExample('Lottie Walkthrough', () => require('./assets/animations/LottieWalkthrough.json')),
  makeExample('Pin Jump', () => require('./assets/animations/PinJump.json')),
  makeExample('Twitter Heart', () => require('./assets/animations/TwitterHeart.json')),
  makeExample('Watermelon', () => require('./assets/animations/Watermelon.json')),
  makeExample('Motion Corpse', () => require('./assets/animations/MotionCorpse-Jrcanest.json')),
].reduce((acc, e) => {
  // eslint-disable-next-line no-param-reassign
  acc[e.name] = e;
  return acc;
}, {});

export default class Anim extends Component {
  constructor(props) {
    super(props)

    this.state = {
      progress: new Animated.Value(0),
      config: {
        duration: 3000,
        imperative: true
      },
      animation : Object.keys(EXAMPLES)[0],
    }

    this.play = this.play.bind(this);
    this.reset = this.reset.bind(this);
    this.setAnim = this.setAnim.bind(this);
  }

  componentDidMount() {
    // Animated.timing(this.state.progress, {
    //   toValue: 1,
    //   duration: 3000
    // }).start(({ finished }) => {
    //   if (finished) this.forceUpdate();
    // })
  }

  render() {
    return (
      <View style = { { flex: 1, flexDirection: 'column' } }>
        <ScrollView
          style = {{ }}
          horizontal = { true }
          pagingEnabled = { true }
          contentContainerStyle = {{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          {(() => {
            return _.map(EXAMPLES, (example) => {
              const size = Dimensions.get('window').width
              const sizeStyle = { width: size, height: size }

              return (
                <Animation
                  key = { _.uniqueId() }
                  ref = { (anim) => this.setAnim(anim, example.name) }
                  style = { [styles.animation, sizeStyle] }
                  source = { EXAMPLES[example.name].getJson() }
                  progress = { this.state.progress }/>
              )
            })
          })()}
        </ScrollView>
        <View style= {{flex: 4 }}/>
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

  setAnim(anim, name) {
    if (anim == undefined || anim == null) { return }

    if (this.state.animation == name) {
      this.anim = anim;
    }

    if (_.isEmpty(this.props.animationRefs)) {
      this.props = {
        ...this.props,
        animationRefs : new Array(anim)
      }
    } else {
      const _animationRefs = this.props.animationRefs.slice()
      const _props = _.omit(this.props, 'animationRefs')

      this.props = {
        ..._props,
        animationRefs: _.concat(_animationRefs, anim)
      }
    }
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
  animation: { 
    alignSelf: 'center',
  },
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
