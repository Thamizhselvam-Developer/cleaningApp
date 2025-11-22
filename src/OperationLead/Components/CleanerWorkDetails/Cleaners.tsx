import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackButton from '../../../Utilites/Breadcrumbs/BackButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type RootStackParamList = {
  CleanerList: undefined;
  CleanerWorkDetails: { 
    cleaner: { 
      userId: string; 
      name: string; 
      userImg: ImageSourcePropType; 
      phone: string } };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CleanerList'>;

const workersList = [
  {
    userId: 'CL2025101',
    name: 'Lee',
    userImg: require('../../../assets/OperationLead/User/user.png'),
    phone: '1234567890',
  },
  {
    userId: 'CL2025102',
    name: 'Adrian',
    userImg: require('../../../assets/OperationLead/User/user.png'),
    phone: '1234567890',
  },

];

export default function Cleaners() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      className="flex-1 bg-primary"
      style={{
        paddingTop: insets.top + 10,
      }}
    >
      <BackButton
        TouchablityOpacityclassName="flex-row gap-3  p-5 "
        className=" text-[20px] font-outfit-semibold text-textWhite"
        name="Cleaner Details"
      />

      <View className="bg-background h-full rounded-t-3xl pt-3">
        {workersList.map((worker, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('CleanerWorkDetails', { cleaner: worker })}
            className="px-5 py-3 "
          >
            <View
              className=" bg-white border border-gray-100 rounded-2xl overflow-hidden h-[100px] justify-center "
              style={{ boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)' }}
            >
              <View className="p-5 flex-row items-center gap-5">
                <View
                  className="w-[70px] h-[70px] rounded-full  bg-blue-100 flex items-center justify-center"
                  style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.2)' }}
                >
                  <Image
                    source={worker.userImg}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'cover',
                    }}
                    className="rounded-full"
                  />
                </View>
                <View className=" justify-center">
                  <Text className="text-lg  text-gray-800 font-outfit-semibold">
                    {worker.name.slice(0, 25)}
                  </Text>
                  <Text className="text-[15px] text-gray-500 font-outfit text-start">
                    ID: {worker.userId}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
