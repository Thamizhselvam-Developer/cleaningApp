import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground,
  ScrollView,
  Dimensions,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ImageSourcePropType } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useState, useEffect, useRef, useContext, ReactNode } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {
  Bell,
  Close,
  Grid,
  Homeicon,
  Logout,
  Phone,
  ProfileSvg,
  Task,
  Training,
  User,
} from '../../../Ui/icons';
import { AuthContext } from '../../../Services/Authentication/AuthContext/AuthContext';
import { BlurView } from '@react-native-community/blur';
import { userData } from '../../../Services/Authentication/TokenChecker/TokenChecker';
import { RootStackParamList } from '../../../Utilites/Types/Types';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Modal from 'react-native-modal';
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

interface CardData {
  id: number;
  color: string;
  title: string;
  completed: boolean;
  img: ImageSourcePropType;
  icon: any;
}

const { width, height } = Dimensions.get('window');

const details = [
  {
    User_name: 'User_Name',
    User_Id: 'OP2025101',
    User_Email: 'user123@gmail.come',
    User_Phone: '9876543210',
    User_Address: '123 address ',
    User_Img: require('../../../assets/OperationLead/User/user.png'),
  },
];

const menuData: CardData[] = [
  {
    id: 1,
    color: '#3B82F6',
    title: 'Tasks',
    completed: false,
    img: require('../../../assets/Cleaner/Hom_Screen/CardImg_1.png'),
    icon: <Task stroke={'blue'} width={30} />,
  },
  {
    id: 2,
    color: '#10B981',
    title: 'Training',
    completed: false,
    img: require('../../../assets/Cleaner/Hom_Screen/CardImg_2.png'),
    icon: <Training stroke={'green'} />,
  },
];

const Home = ({ navigation }: Props) => {
  const Auth = useContext(AuthContext);
  const [userData, setUserData] = useState<userData | null>(null);
  const [hoursChange, setHouursChange] = useState<string>('');
  useEffect(() => {
    var today = new Date();
    var curHr = today.getHours();

    if (curHr < 12) {
      setHouursChange('☀️ Good Morning');
    } else if (curHr < 18) {
      setHouursChange('🌤️ Good Afternoon');
    } else {
      setHouursChange('🌥️ Good Evening');
    }

    if (Auth?.Role) {
      setUserData(Auth.Role as userData);
    }
  }, []);

  const [cardData, setCardData] = useState(menuData);
  const [Profile, setProfile] = useState(false);
  const [isCompleted, setCompleted] = useState<boolean>(false);
  const toggleProfile = () => setProfile(!Profile);

  const handleNavigation = async (index: number, id: number) => {
 
    if (cardData[index].id == 1 ) {
      console.log('asdf');

      navigation.navigate('Location');
    } else if (cardData[index].id == 2) {
      navigation.navigate('Training');
    }
  };

  const [Notification, setNotification] = useState(false);
  const toggleNotification = () => setNotification(!Notification);

  return (
    <SafeAreaView className="flex-1  bg-primary">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <View className="px-6 pt-16 ">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-white/70 text-sm font-outfit-medium">
              Welcome back
            </Text>
            <Text className="text-white font-outfit-bold text-3xl">
              {hoursChange || 'Good Morning'}{' '}
            </Text>
          </View>
          <TouchableOpacity
            onPress={toggleProfile}
            className="bg-white/20 p-4 rounded-full shadow-lg"
          >
            <User width={28} height={28} />
          </TouchableOpacity>
        </View>

        <View className="bg-background drop-shadow-lg rounded-3xl p-6 mb-8 shadow-xl">
          <TouchableWithoutFeedback>
            <View className="flex-row items-center mb-4">
              <View className="bg-blue-100 p-4 rounded-2xl mr-4">
                <Icon name="cleaning-services" size={32} color="#3b82f6" />
              </View>
              <View className="flex-1">
                {userData ? (
                  <Text className="text-gray-800 font-outfit-bold text-xl">
                    Hello, {userData?.userName}
                  </Text>
                ) : (
                  <Text className="text-gray-800 font-outfit-bold text-xl">
                    Hello, Guest
                  </Text>
                )}
                <Text className="text-gray-600 text-sm font-outfit-medium mt-1">
                  Ready to make a difference today?
                </Text>
                <View className="flex-row gap-2 h-7 items-center mt-2 ">
                  <View className=" flex-row justify-center mt-2 items-center gap-2 bg-blue-200 w-[70px] h-[25px] rounded-lg border border-blue-400">
                    <View className="bg-primary w-2 h-2 rounded-full" />
                    <Text className="text-[10px] font-outfit-extrabold text-primary">
                      Full Time
                    </Text>
                  </View>
                  <View className="flex-row justify-start items-center px-2 mt-2 bg-blue-200 w-[120px] h-[25px] rounded-lg border border-blue-400 ">
                    <View className="bg-primary w-2 h-2 rounded-full mr-1" />
                    <Text
                      className="text-[10px] font-outfit-extrabold text-primary flex-shrink"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {userData?.jobTitle || 'General Cleaner'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>

      <View className="flex-1 bg-gray-50 rounded-t-[32px] px-6 pt-8">
        <Text className="text-gray-800 font-outfit-bold text-lg mb-6">
          Quick Actions
        </Text>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {cardData.map((item, index) => (
            <TouchableOpacity
              key={index}
              className={`${
                item.completed ? `bg-gray-200 ` : `bg-white `
              }border rounded-3xl p-6 mb-4 shadow-sm  border-gray-100`}
              onPress={() => handleNavigation(index, item.id)}
              style={{
                shadowColor: item.color,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <View className="flex-row items-center">
                <View
                  className="w-16 h-16 rounded-2xl items-center justify-center mr-4 border"
                  style={{
                    backgroundColor: item.color + '15',
                    borderColor: item.color + '30',
                  }}
                >
                  {item.icon}
                </View>

                <View className="flex-1">
                  <Text className="text-gray-900 font-outfit-semibold text-lg mb-1">
                    {item.title}
                  </Text>

                  <Text className="text-gray-500 font-outfit-medium text-sm">
                    Tap to continue
                  </Text>
                </View>

                <View className="flex-row items-center">
                  {/* <View 
                      className="w-20 h-16 rounded-xl overflow-hidden items-center justify-center mr-3"
                      style={{ backgroundColor: item.color + '08' }}
                    >
                      <Image
                        source={item.img}
                        style={{ width: 50, height: 50 }}
                        resizeMode="contain"
                      />
                    </View> */}
                  <View
                    className="w-10 h-10 rounded-full items-center justify-center"
                    style={{ backgroundColor: item.color + '20' }}
                  >
                    <Icon name="arrow-forward" size={18} color={item.color} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          <View className="h-20" />
        </ScrollView>
      </View>
      <Modal
        className="border-2 border-red-700 "
        visible={Profile}
        transparent={true}
        animationType="slide"
      >
        {userData || details ? (
          <View className="bg-background h-screen ">
            <View className="  items-center bg-primary w-full h-[40%] rounded-b-3xl justify-center gap-3 ">
              <View className="bg-blue-300 opacity-45 w-[120px] h-[120px] rounded-full absolute -top-6 -left-8 " />
              <View className="bg-blue-300 opacity-35 w-[60px] h-[60px] rounded-full absolute top-40 left-8 " />
              <View className="bg-blue-300 opacity-45 w-[100px] h-[100px] rounded-full absolute -top-8 right-12 " />
              <View className="bg-blue-300 opacity-25 w-[60px] h-[60px] rounded-full absolute bottom-20 right-2 " />

              <View className=" absolute top-4 left-4">
                <TouchableOpacity
                  onPress={toggleProfile}
                  className=" flex-row justify-center items-center "
                >
                  <Close stroke={'white'} width={30} height={30} />
                  <Text className="text-textWhite font-outfit-bold text-[20px]">
                    Home
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="  p-2 z-30 w-[150px] h-[150px] rounded-full border-t border-l border-r border-b-0 border-gray-300   flex items-center justify-center">
                <Image
                  source={require('../../../assets/OperationLead/User/user.png')}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                  }}
                  className="rounded-full"
                />
              </View>
              <View className=" justify-center items-center">
                <Text className="text-textWhite text-[20px] font-outfit-extrabold   ">
                  {userData?.fullName || 'Cleaner'}
                </Text>
                <Text className="text-textWhite/80 text-[16px] font-outfit-extrabold  ">
                  ID: {userData?.id || '652458524647'}
                </Text>
              </View>
            </View>
            <View className="  items-center bg-background w-full h-[55%] p-10 ">
              <View
                style={{ boxShadow: '0 1px 8px rgba(0, 0, 0, 0.2)' }}
                className="bg-background  w-full h-[400px] absolute -top-16 rounded-3xl justify-around items-center gap-5 p-5"
              >
                <View className="flex-row justify-between w-full p-5 bg-blue-100/30 rounded-2xl ">
                  <Text className="font-outfit">Phone</Text>

                  <Text className=" font-outfit">
                    {userData?.mobileNo || '+65 62702175'}
                  </Text>
                </View>
                <View className="flex-row justify-between w-full p-5 bg-blue-100/30 rounded-2xl ">
                  <Text className="font-outfit">Email</Text>
                  <Text className="font-outfit">
                    {userData?.email || 'example@gmail.com'}
                  </Text>
                </View>
                <View className="flex-row justify-between w-full p-5 bg-blue-100/30 rounded-2xl ">
                  <Text className="font-outfit">DOB</Text>
                  <Text className="font-outfit">
                    {userData?.dateOfBirth.slice(0, 10) || '1989-05-22'}
                  </Text>
                </View>
                <View className="flex-row justify-between w-full p-5 bg-blue-100/30 rounded-2xl ">
                  <Text className="font-outfit">Category</Text>
                  <Text className="font-outfit">
                    {(userData?.isFullTime == 1 && 'FULL TIME') || 'FULL TIME'}
                  </Text>
                </View>
                <View className="flex-row justify-between w-full p-5 bg-blue-100/30 rounded-2xl ">
                  <Text className="font-outfit">Role</Text>
                  <Text className="font-outfit">
                    {userData?.role || 'Cleaner'}
                  </Text>
                </View>
              </View>
            </View>
            <View className=" absolute bottom-20 right-5 left-5 mx-auto ">
              <TouchableOpacity
                onPress={() => Auth?.logout()}
                className="bg-red-50 border border-red-200 rounded-2xl p-4 px-40 "
              >
                <View className="flex-row gap-2">
                  <Logout stroke={'#dc2626'} />
                  <Text className="text-red-600 font-outfit-semibold text-base ">
                    Logout
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </Modal>
    </SafeAreaView>
  );
};

export default Home;
