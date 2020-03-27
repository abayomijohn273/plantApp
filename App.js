import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, YellowBox } from 'react-native';

import { AppLoading, Asset } from 'expo';

import Navigation from './navigation';
import { Block } from './components';
import * as constants from './constants';

//import all used images
const images = [
  require('./assets/icons/back.png'),
  require('./assets/icons/seeds.png'),
  require('./assets/icons/sprayers.png'),
  require('./assets/icons/flowers.png'),
  require('./assets/icons/pots.png'),
  require('./assets/icons/fertilizers.png'),
  require('./assets/images/plants_1.png'),
  require('./assets/images/plants_2.png'),
  require('./assets/images/plants_3.png'),
  require('./assets/images/explore_1.png'),
  require('./assets/images/explore_2.png'),
  require('./assets/images/explore_3.png'),
  require('./assets/images/explore_4.png'),
  require('./assets/images/explore_5.png'),
  require('./assets/images/explore_6.png'),
  require('./assets/images/avatar.png')
];

// ignore specific yellowbox warnings
YellowBox.ignoreWarnings(['Require cycle:', 'Remote debugger']);

export default function App(props) {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const handleResourceAsync = async () => {
    //we;re caching all the images for better performance
    const cacheImages = images.map(img => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  };

  if (!isLoadingComplete && props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={handleResourceAsync}
        onError={error => console.warn(error)}
        onFinish={() => setIsLoadingComplete(true)}
      />
    );
  }

  return (
    <Block>
      <Navigation />
    </Block>
  );
}

const styles = StyleSheet.create({});
