import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import App from '../../../App';
import {
  AuthContext,
  isConnectData,
} from '../../Services/Authentication/AuthContext/AuthContext';

const InternetChecker = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleRetry = () => {
    setRetryCount(retryCount + 1);
  };
  const Auth = useContext(AuthContext);
  if (!isConnected) {
    return (
      <View className="absolute z-30 bg-background w-full h-screen m-0">
        <View className="bg-white w-full h-full justify-center items-center p-5 gap-5 ">
          <View className="w-[300px] h-[300px] ">
            <Image
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
              }}
              source={require('../../assets/noInternet/noInternet.png')}
            />
          </View>

          <View className=" justify-center items-center">
            <Text className="font-outfit-extrabold text-[50px] text-gray-500">
              No Internet
            </Text>
            <Text className="font-outfit-light text-[15px] text-center text-gray-500">
              Please Check Your Internet Settings
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleRetry}
            className=" w-[130px] h-[40px]  bg-primary rounded-lg items-center justify-center"
          >
            <Text className="font-outfit-extrabold text-textWhite text-[15px]">
              TRY AGAIN
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default InternetChecker;
