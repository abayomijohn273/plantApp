import React, { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';
import { Button, Block, Text, Input } from '../components';
import { theme } from '../constants';

const VALID_EMAIL = 'contact@abayomi.com';
const VALID_PASSWORD = 'subscribe';

const Login = props => {
  const { navigation } = props;

  const [email, setEmail] = useState(VALID_EMAIL);
  const [password, setPassword] = useState(VALID_PASSWORD);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const hasError = key => (errors.includes(key) ? styles.hasError : null);

  const handleLogin = () => {
    setLoading(true);
    const { navigation } = props;

    Keyboard.dismiss();
    setLoading(true);

    //only for demonstration it breaks the keyboard event

    //check with backend API or with some static data
    if (email !== VALID_EMAIL) {
      errors.push('email');
    }
    if (password !== VALID_PASSWORD) {
      errors.push('password');
    }

    setErrors(errors);
    // console.warn(errors);
    setLoading(false);

    if (!errors.length) {
      navigation.navigate('Browse');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.login} behavior="padding">
      <Block padding={[0, theme.sizes.base * 2]}>
        <Text h1 bold>
          Login
        </Text>
        <Block middle>
          <Input
            label="Email"
            error={hasError('email')}
            style={[styles.input, hasError('email')]}
            defaultValue={email}
            onChangeText={text => setEmail(text)}
          />
          <Input
            secure
            label="Password"
            error={hasError('password')}
            style={[styles.input, hasError('email')]}
            defaultValue={password}
            onChangeText={text => setPassword(text)}
          />

          <Button gradient onPress={() => handleLogin()}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text bold white center>
                Login
              </Text>
            )}
          </Button>

          <Button onPress={() => navigation.navigate('Forgot')}>
            <Text
              gray
              caption
              center
              style={{ textDecorationLine: 'underline' }}
            >
              Forget your password?
            </Text>
          </Button>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  login: {
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
