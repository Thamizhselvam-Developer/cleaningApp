
import React, { useState } from 'react';
import {
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  SafeAreaView,
  ImageSourcePropType,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BackButton from '../../../Utilites/Breadcrumbs/BackButton';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { blue } from 'react-native-reanimated/lib/typescript/Colors';
import { TouchableWithoutFeedback } from 'react-native';
import { RootStackParamList } from '../../../Utilites/Types/Types';

type LocationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Location'
>;

type Props = {
  navigation: LocationScreenNavigationProp;
};
type TaskType = {
  id: number;
  Location: string;
  place: string;
  member: string;
  img: ImageSourcePropType;
};

const routineTasks: TaskType[] = [
  {
    id: 1,
    Location: 'Yew Lee Metal',
    place: 'GPD',
    member: '10',
    img: require('../../../assets/OperationLead/Loaction_img2.jpg'),
  },
  {
    id: 2,
    Location: 'Bayshore Global 28 Duxton Hill',
    place: 'GPD / GW / CC',
    member: '2',
    img: require('../../../assets/OperationLead/Loaction_img1.jpg'),
  },
  {
    id: 3,
    Location: 'Milestone #12-03 (Singpost)',
    place: 'GPD/ GW',
    member: '12',
    img: require('../../../assets/OperationLead/Loaction_img3.jpg'),
  },
];

const periodicTasks: TaskType[] = [
  {
    id: 1,
    Location: 'Milestone #12-03 (Singpost)',
    place: 'GPD/ GW',
    member: '12',
    img: require('../../../assets/OperationLead/Loaction_img3.jpg'),
  },
  {
    id: 2,
    Location: 'Bayshore Global 28 Duxton Hill',
    place: 'GPD / GW / CC',
    member: '2',
    img: require('../../../assets/OperationLead/Loaction_img1.jpg'),
  },
  {
    id: 3,
    Location: 'Yew Lee Metal',
    place: 'GPD',
    member: '10',
    img: require('../../../assets/OperationLead/Loaction_img2.jpg'),
  },
];

const adHocTasks: TaskType[] = [
  {
    id: 1,
    Location: 'Bayshore Global 28 Duxton Hill',
    place: ' 112 Depot Road 01-997  Singapore - 110112',
    member: '2',
    img: require('../../../assets/OperationLead/Loaction_img1.jpg'),
  },
  {
    id: 2,
    Location: 'Yew Lee Metal',
    place: '17 Tai Seng Dr, Singapore 535221',
    member: '10',
    img: require('../../../assets/OperationLead/Loaction_img2.jpg'),
  },
  {
    id: 3,
    Location: 'Milestone #12-03 (Singpost)',
    place: 'North Lobby. Singapore Post Centre. 408600',
    member: '12',
    img: require('../../../assets/OperationLead/Loaction_img3.jpg'),
  },
];

const categories = ['Routine Cleaning', 'Periodic Cleaning', 'Ad-hoc Cleaning'];

export default function Location({navigation}:Props) {

  const insets = useSafeAreaInsets();


  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-primary" >

         <View className=' ' style={{
         
           paddingTop: insets.top+5 ,
            paddingBottom: 10,
            borderBottomLeftRadius: 28,
            borderBottomRightRadius: 28}}>
  <TouchableOpacity>
            <BackButton 
              TouchablityOpacityclassName='flex-row gap-2 px-6 py-4' 
              className='text-[22px] font-outfit-semibold text-white' 
              name='Locations'
            />
          </TouchableOpacity>
        
         </View>
        

        <View className="flex-1 justify-center bg-background rounded-t-[20px] px-5 pt-8" >
          <View className="mb-6 ">
            <Text className="text-gray-800 font-outfit-bold text-center text-xl mb-2">
              Today Working Locations
            </Text>
            <Text className="text-gray-600 font-outfit-medium text-center text-sm">
              Select a location to check your cleaning tasks
            </Text>
          </View>

          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
          >
            {adHocTasks.map((item) => (
              <View key={item.id} className="mb-5">
                <TouchableWithoutFeedback  onPress={() => navigation.navigate('Task')}>
<View
                  className="bg-white rounded-3xl overflow-hidden"
                    style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                
                  <View className="relative">
                    <View className="h-[200px] overflow-hidden">
                      <Image
                        source={item.img}
                        style={{
                          width: '100%',
                          height: '100%',
                          resizeMode: 'cover',
                        }}
                      />
                     
                      
                   
                     
                    </View>
                    
                    <View className="p-6">
                      <View className="mb-1">
                        <Text className="text-xl text-center font-outfit-bold text-gray-800 mb-2">
                          {item.Location}
                        </Text>
                        <View className="flex-row items-center mx-auto">
                          <Icon name="location-on" size={16} color="#9ca3af" style={{marginRight: 4}} />
                          <Text className="text-[14px]  font-outfit text-gray-500">
                           {item.place}
                          </Text>
                        </View>
                      </View>
                      
                      {/* <TouchableOpacity
                       
                      className='bg-primary rounded-2xl h-12 flex-row justify-center items-center'
                      >
                        
                            <View className=' flex-row items-center '>
                        <Text className="text-xl font-outfit-semibold text-background" >
                            {item.Location}
                        </Text>
                      </View>

                      </TouchableOpacity> */}
                    </View>
                  </View>
                </View>
                </TouchableWithoutFeedback>
                
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaProvider>
  );
}