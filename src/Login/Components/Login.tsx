
import React, { useState, useContext, useEffect } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Switch,
  Image,
  Alert,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { AuthContext } from '../../Services/Authentication/AuthContext/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AxiosError } from 'axios';
import { KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Loader from '../../Ui/Loader/Loader';
import { RootStackParamList } from '../../Utilites/Types/Types';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

type LoginPayload = {
  accessToken: string;
  refreshToken: string;
};

interface newError {
  username: string;
  password: string;
}

export default function Login({ navigation }: Props) {
  const Auth = useContext(AuthContext);
  const Api_Url = Config.API_URL;
  const insets = useSafeAreaInsets();

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('CLEANER');
  const [errors, setErrors] = useState<newError>({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors: newError = {
      username: '',
      password: '',
    };
    if (username === '') {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username Must Contain 3 Letters Above';
    }
    if (password === '') {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password Must Contain 6 Character';
    }

    setErrors(newErrors);

    return (
      Object.values(newErrors).filter(item => item.length != '').length == 0
    );
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert(
        'Validation Error',
        'Please fill in all required fields correctly',
      );
      return;
    }
    setLoading(true);
    const userData = {
      userName: username.trim().toLowerCase(),
      password: password.toLowerCase(),
    };

    try {
      const response = await axios.post(
        `${Api_Url}/v1/cleaner/loginCheck`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        },
      );

      console.log('Login response received', response);

      const { data } = response.data;
      const userDatas = response.data.data.cleaner;
      const role = response.data.data.cleaner.role;

      if (response.data.message === 'Login successful' && data) {
        const loginPayload = {
          accessToken: data.__as_secure,
          refreshToken: data.__rs_secure,
          role: role,
        };

        const LoginAuth = Auth?.login(loginPayload, userDatas);

        console.log(LoginAuth, 'asdf');
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.error('Login error:', error);
      console.log(error.response?.data);
      if (error.response) {
        Alert.alert(
          'Login Error',
          error.response.data?.message || 'Server error occurred',
        );
      } else if (error.request) {
        Alert.alert('Network Error', 'Please check your internet connection');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View className="flex-1">
        <Loader />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" backgroundColor="#3B82F6" />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View
              className="relative bg-primary flex items-center justify-center"
              style={{
                paddingTop: insets.top + 20,
                height: 280 + insets.top,
              }}
            >
              <View className="w-[100px] h-[100px] rounded-full overflow-hidden mb-4">
                <Image
                  source={require('../../assets/Login/logo.png')}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
              </View>

              <View className="items-center -mt-4">
                <Text className="text-white text-[36px] font-outfit-bold text-center">
                  Kleenmatic
                </Text>
                <Text className="text-white/90 text-base text-center -mt-1 font-outfit-medium">
                  Services
                </Text>
              </View>
            </View>

            <View className="flex-1 bg-white rounded-t-3xl -mt-10">
              <View className="px-6 pt-8">
                <View className="mb-8">
                  <Text className="text-3xl font-outfit-semibold text-gray-900 text-center mb-2">
                    Welcome Back
                  </Text>
                  <Text className="text-gray-500 text-center font-outfit-medium">
                    Sign in to continue your cleaning journey
                  </Text>
                </View>

                <View className="mb-5">
                  <Text className="text-lg font-outfit-medium text-gray-700 mb-3">
                    Username
                  </Text>
                  <View className="relative">
                    <TextInput
                      value={username}
                      onChangeText={setUserName}
                      placeholder="Enter your username"
                      placeholderTextColor="#9CA3AF"
                      className={`bg-gray-50 border ${
                        errors.username ? 'border-red-400' : 'border-gray-200'
                      } rounded-xl px-4 py-4 pl-12 text-gray-900 text-base font-outfit-medium`}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <Icon
                      name="person-outline"
                      size={20}
                      color="#9CA3AF"
                      style={{ position: 'absolute', left: 16, top: 16 }}
                    />
                  </View>
                  {errors.username && (
                    <Text className="text-red-500 text-sm mt-2 font-outfit-medium">
                      {errors.username}
                    </Text>
                  )}
                </View>

                <View className="mb-6">
                  <Text className="text-lg font-outfit-medium text-gray-700 mb-3">
                    Password
                  </Text>
                  <View className="relative">
                    <TextInput
                      value={password}
                      onChangeText={setPassword}
                      placeholder="Enter your password"
                      placeholderTextColor="#9CA3AF"
                      secureTextEntry={!showPassword}
                      className={`bg-gray-50 border ${
                        errors.password ? 'border-red-400' : 'border-gray-200'
                      } rounded-xl px-4 py-4 pl-12 pr-12 text-gray-900 text-base font-outfit-medium`}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <Icon
                      name="lock-outline"
                      size={20}
                      color="#9CA3AF"
                      style={{ position: 'absolute', left: 16, top: 16 }}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: 16, top: 16 }}
                      activeOpacity={0.7}
                    >
                      <Icon
                        name={showPassword ? 'visibility-off' : 'visibility'}
                        size={20}
                        color="#9CA3AF"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && (
                    <Text className="text-red-500 text-sm mt-2 font-outfit-medium">
                      {errors.password}
                    </Text>
                  )}
                </View>

                {/* Login Button */}
                <TouchableOpacity
                  className={`w-full h-14 rounded-xl ${
                    loading ? 'bg-blue-300' : 'bg-primary'
                  } shadow-lg mb-6`}
                  onPress={handleSubmit}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  {loading ? (
                    <View className="flex-row justify-center items-center flex-1">
                      <ActivityIndicator color="#fff" size="small" />
                      <Text className="text-white font-outfit-semibold text-lg ml-2">
                        Signing In...
                      </Text>
                    </View>
                  ) : (
                    <View className="flex-1 justify-center">
                      <Text className="text-white text-center font-outfit-semibold text-lg">
                        Sign In
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>

                <View className="pt-4 pb-8">
                  <View className="flex-row justify-center items-center">
                    <Icon name="help-outline" size={16} color="#9CA3AF" />
                    <Text className="text-gray-400 text-sm ml-2 font-outfit-medium">
                      Need help?{' '}
                    </Text>
                    <TouchableOpacity activeOpacity={0.7}>
                      <Text className="text-primary text-sm font-outfit-semibold">
                        Contact Support
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}
