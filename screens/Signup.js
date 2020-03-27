import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';
import { Button, Block, Text, Input } from '../components';
import { theme } from '../constants';

const Signup = props => {
  const { navigation } = props;
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    setLoading(true);
    Keyboard.dismiss();
    setLoading(true);
    //check with backend API or with some static data
    if (!email) errors.push('email');
    if (!username) errors.push('username');
    if (!password) errors.push('password');

    setErrors(errors);
    // console.warn(errors);
    setLoading(false);

    if (!errors.length) {
      Alert.alert(
        'Success!',
        'Your account has been created',
        [
          {
            text: 'Continue',
            onPress: () => {
              navigation.navigate('Browse');
            }
          }
        ],
        {
          cancelable: false
        }
      );
    }
  };

  const hasError = key => (errors.includes(key) ? styles.hasError : null);

  return (
    <KeyboardAvoidingView style={styles.signup} behavior="padding">
      <Block padding={[0, theme.sizes.base * 2]}>
        <Text h1 bold>
          Singn Up
        </Text>
        <Block middle>
          <Input
            email
            label="Email"
            error={hasError('email')}
            style={[styles.input, hasError('email')]}
            defaultValue={email}
            onChangeText={text => setEmail(text)}
          />
          <Input
            label="Username"
            error={hasError('username')}
            style={[styles.input, hasError('username')]}
            defaultValue={username}
            onChangeText={text => setUsername(text)}
          />
          <Input
            secure
            label="Password"
            error={hasError('password')}
            style={[styles.input, hasError('password')]}
            defaultValue={password}
            onChangeText={text => setPassword(text)}
          />

          <Button gradient onPress={() => handleSignup()}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text bold white center>
                Sign up
              </Text>
            )}
          </Button>
          <Button onPress={() => navigation.navigate('Login')}>
            <Text
              gray
              caption
              center
              style={{ textDecorationLine: 'underline' }}
            >
              Back to Login
            </Text>
          </Button>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasError: {
    color: theme.colors.accent,
    borderBottomColor: theme.colors.accent
  }
});
