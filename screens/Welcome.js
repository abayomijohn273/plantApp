import React, { useState } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Modal,
  FlatList,
  Image,
  ScrollView
} from 'react-native';

import { Block, Button, Text } from '../components';
import { theme } from '../constants';
import navigation from '../navigation';

const { width, height } = Dimensions.get('window');

const Welcome = props => {
  const { illustrations } = props;
  const navigationOptions = {
    header: null
  };
  const { navigation } = props;
  const [showTerm, setShowTerm] = useState(false);

  const scrollX = new Animated.Value(0);

  const renderTermsService = () => {
    return (
      <Modal animationType="slide" visible={showTerm}>
        <Block
          padding={[theme.sizes.padding * 2, theme.sizes.padding]}
          space="between"
        >
          <Text h2 light>
            Terms of Service
          </Text>
          <ScrollView style={{ marginVertical: 10 }}>
            <Text caption gray height={18}>
              Internal state is not preserved when content scrolls out of the
              render window. Make sure all your data is captured in the item
              data or external stores like Flux, Redux, or Relay. This is a
              PureComponent which means that it will not re-render if props
              remain shallow-equal. Make sure that everything your renderItem
              function depends on is passed as a prop (e.g. extraData) that is
              not === after updates, otherwise your UI may not update on
              changes. This includes the data prop and parent component state.
              In order to constrain memory and enable smooth scrolling, content
              is rendered asynchronously offscreen. This means it's possible to
              scroll faster than the fill rate and momentarily see blank
              content. This is a tradeoff that can be adjusted to suit the needs
              of each application, and we are working on improving it behind the
              scenes.
            </Text>
            <Text caption gray height={18}>
              By default, the list looks for a key prop on each item and uses
              that for the React key. Alternatively, you can provide a custom
              keyExtractor prop. Internal state is not preserved when content
              scrolls out of the render window. Make sure all your data is
              captured in the item data or external stores like Flux, Redux, or
              Relay. This is a PureComponent which means that it will not
              re-render if props remain shallow-equal. Make sure that everything
              your renderItem function depends on is passed as a prop (e.g.
              extraData) that is not === after updates, otherwise your UI may
              not update on changes. This includes the data prop and parent
              component state. In order to constrain memory and enable smooth
              scrolling, content is rendered asynchronously offscreen. This
              means it's possible to scroll faster than the fill rate and
              momentarily see blank content. This is a tradeoff that can be
              adjusted to suit the needs of each application, and we are working
              on improving it behind the scenes. By default, the list looks for
              a key prop on each item and uses that for the React key.
              Alternatively, you can provide a custom keyExtractor prop.
            </Text>
          </ScrollView>
          <Button gradient onPress={() => setShowTerm(false)}>
            <Text center white>
              I understand
            </Text>
          </Button>
        </Block>
      </Modal>
    );
  };

  const renderIllustrations = () => {
    return (
      <FlatList
        scrollEnabled
        pagingEnabled
        snapToAlignment="center"
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        data={illustrations}
        renderItem={({ item }) => (
          <Image
            key={item.id}
            resizeMode="contain"
            source={item.source}
            style={{ width, height: height / 2, overflow: 'visible' }}
          />
        )}
        keyExtractor={item => item.id}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: { x: scrollX }
            }
          }
        ])}
      />
    );
  };

  const renderSteps = () => {
    const stepPosition = Animated.divide(scrollX, width);
    return (
      <Block row center middle style={styles.stepContainer}>
        {illustrations.map((item, index) => {
          const opacity = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp'
          });
          return (
            <Block
              animated
              flex={false}
              key={`step-${index}`}
              color="gray"
              style={[styles.steps, { opacity }]}
            />
          );
        })}
      </Block>
    );
  };
  return (
    <Block>
      <Block center middle flex={0.4}>
        <Text h1 center bold>
          Your Home.
          <Text h1 primary>
            &nbsp;Greener.
          </Text>
        </Text>
        <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
          Enjoy the experience.
        </Text>
      </Block>
      <Block center middle>
        {renderIllustrations()}
        {renderSteps()}
      </Block>
      <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
        <Button gradient onPress={() => navigation.navigate('Login')}>
          <Text center semibold white>
            Login
          </Text>
        </Button>
        <Button shadow onPress={() => navigation.navigate('Signup')}>
          <Text center semibold>
            Signup
          </Text>
        </Button>
        <Button onPress={() => setShowTerm(true)}>
          <Text center caption gray>
            Terms of services
          </Text>
        </Button>
      </Block>
      {renderTermsService()}
    </Block>
  );
};

Welcome.defaultProps = {
  illustrations: [
    { id: 1, source: require('../assets/images/illustration_1.png') },
    { id: 2, source: require('../assets/images/illustration_2.png') },
    { id: 3, source: require('../assets/images/illustration_3.png') }
  ]
};

export default Welcome;

const styles = StyleSheet.create({
  stepContainer: {
    position: 'absolute',
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0,
    right: 0
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5
  }
});
