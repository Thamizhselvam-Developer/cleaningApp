import React, { useEffect } from 'react';
import { Alert,View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type AlterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AlterScreen'>;


import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../Types/Types';
import { Text } from 'react-native-svg';
const AlterScreen = () => {
    const navigation = useNavigation<AlterScreenNavigationProp>();
  useEffect(() => {
    Alert.alert(
      'You are not our employee',
      'Wrong Role. Please log in with valid details.',
      [
        {
          text: 'OK',
          onPress: () => {
            // console.log('OK Pressed');
            navigation.navigate('Login'); 
          },
        },
      ]
    );
  }, []);

  return (
    <>
    <View className='flex-1 bg-background'>
        <View>
          <Text>
            Your Are  i
          </Text>
        </View>
    </View>
    </>
  ); 
};

export default AlterScreen;
