import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Images } from '../../../assets';

import { useLoginMutation } from '../../../features/auth/authApi';

import { setTokens } from '../../../features/auth/authSlice';

import { useAppDispatch } from '../../../app/hooks';

import { useLoginScreenStyles } from './LoginScreen.styles';
import { useState } from 'react';
import { ApiErrorResponse } from '../../../features/auth/types';

const LoginScreen = () => {
  const styles = useLoginScreenStyles();

  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (text: string) => {
    setError(null);
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setError(null);
    setPassword(text);
  };

  const [error, setError] = useState<ApiErrorResponse | null>(null);

  const onLogin = async () => {
    try {
      const response = await login({
        username: email,
        password: password,
      }).unwrap();
      dispatch(setTokens(response));
    } catch (err: any) {
      setError(err?.data || { message: 'An unexpected error occurred' });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        <Image source={Images.logoBanner} style={styles.bannerImage} />
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.text}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={email}
            onChangeText={handleEmailChange}
            style={[styles.inputStyles, styles.roundedBorder]}
            placeholder="Email"
            placeholderTextColor={styles.placeHolderTextColor.color}
          />
          <TextInput
            value={password}
            onChangeText={handlePasswordChange}
            style={[styles.inputStyles, styles.roundedBorder]}
            placeholder="Password"
            placeholderTextColor={styles.placeHolderTextColor.color}
            secureTextEntry={false}
          />

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error.message}</Text>
            </View>
          )}
          <TouchableOpacity
            disabled={isLoading}
            style={[styles.button, styles.roundedBorder]}
            onPress={() => {
              onLogin();
            }}
          >
            <Text style={styles.buttonTxt}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.signUpBtnTxt}>
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
