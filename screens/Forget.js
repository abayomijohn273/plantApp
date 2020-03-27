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

const Forget = props => {
  const { navigation } = props;
  const VALID_EMAIL = 'contact@abayomi.com';
  const [email, setEmail] = useState(VALID_EMAIL);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleForgot = () => {
    setLoading(true);
    Keyboard.dismiss();
    setLoading(true);
    //check with backend API or with some static data
    if (email !== VALID_EMAIL) {
      errors.push('email');
    }

    setErrors(errors);
    // console.warn(errors);
    setLoading(false);

    if (!errors.length) {
      Alert.alert(
        'Password sent!',
        'Please check your email',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Login');
            }
          }
        ],
        {
          cancelable: false
        }
      );
    } else {
      Alert.alert(
        'Error!',
        'Please check your email address',
        [{ text: 'Try again' }],
        { cancelable: false }
      );
    }
  };

  const hasError = key => (errors.includes(key) ? styles.hasError : null);

  return (
    <KeyboardAvoidingView style={styles.forgot} behavior="padding">
      <Block padding={[0, theme.sizes.base * 2]}>
        <Text h1 bold>
          Forgot
        </Text>
        <Block middle>
          <Input
            label="Email"
            error={hasError('email')}
            style={[styles.input, hasError('email')]}
            defaultValue={email}
            onChangeText={text => setEmail(text)}
          />

          <Button gradient onPress={() => handleForgot()}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text bold white center>
                Forgot
              </Text>
            )}
          </Button>
          <Button onPress={() => navigation.goBack()}>
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

export default Forget;

const styles = StyleSheet.create({
  forgot: {
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
