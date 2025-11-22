import React, { useContext, useEffect, useState } from 'react';
import { Image, ImageSourcePropType, Modal, ScrollView, Text, TouchableOpacity, View, } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Bell, Close, DOB, Email, LeftArrow, Logout, Phone, Quality, Report, Role, Survey, Task, Training, Workers, } from '../../../Ui/icons';
import { AuthContext } from '../../../Services/Authentication/AuthContext/AuthContext';

type OperatorScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  'OperatorHome'
>;

type RootStackParamList = {
  OperatorHome: undefined;
  TaskManagement: undefined;
  CleanerList: undefined;
  ReportManagement: undefined;
  TrainingManagment: undefined;
  QualityManagement: undefined;
  SurveyManagment: undefined;
  Login: undefined;
};
type ScreenNames =
  | 'OperatorHome'
  | 'TaskManagement'
  | 'ReportManagement'
  | 'TrainingManagment'
  | 'QualityManagement'
  | 'SurveyManagment'
  | 'CleanerList';

type NavigationProp = {
  navigation: OperatorScreenProps;
};

interface menuItems {
  id: number;
  title: string;
  icon: any;
  navigateTo: string;
};

interface UserData {
  id: number;
  role: string;
  userName: string;
  mobileNo: string;
  email: string;
  dateOfBirth: string;
  isFullTime: number;
  fullName: string;
  userPicturePath: ImageSourcePropType;
}

const dummyUserData: UserData = {
  id: 404,
  role: 'Operator',
  userName: 'dummyuser',
  mobileNo: '9876543210',
  email: 'abcd@example.com',
  dateOfBirth: '0000-00-00',
  isFullTime: 1,
  fullName: 'DEMO',
  userPicturePath: require('../../../assets/OperationLead/User/user.png'),
};

const Message = [
  {
    id: 1,
    Message_title: '168 Trading',
    Message_content: 'Contact: Adrian | Dept: GPD | Frequency: Monthly',
  },
  {
    id: 2,
    Message_title: 'Yew Lee Metal',
    Message_content: 'Contact: Adrian | Dept: GPD | Frequency: Monthly',
  },
];

const menuItems: menuItems[] = [
  {
    id: 1,
    title: 'Task Management',
    icon: <Task stroke="#3B82F6" width={36} />,
    navigateTo: 'LocationManagment',
  },
  {
    id: 2,
    title: 'Cleaner',
    icon: <Workers stroke="#10B981" width={36} />,
    navigateTo: 'CleanerList',
  },
  {
    id: 3,
    title: 'Report Management',
    icon: <Report stroke="#EF4444" width={36} />,
    navigateTo: 'ReportManagement',
  },
  {
    id: 4,
    title: 'Training Management',
    icon: <Training stroke="#F97316" width={40} height={40} />,
    navigateTo: 'TrainingManagment',
  },
  {
    id: 5,
    title: 'Quality Management',
    icon: <Quality stroke="#8B5CF6" width={40} height={40} />,
    navigateTo: '', //QualityManagement
  },
  {
    id: 6,
    title: 'Survey Management',
    icon: <Survey stroke="#06B6D4" width={40} height={40} />,
    navigateTo: '', //SurveyManagment
  },
];

export default function OperatorHome({ navigation }: NavigationProp) {
  // const insets = useSafeAreaInsets();
  const Auth = useContext(AuthContext);
  const [userData, setUserData] = useState<UserData>(dummyUserData);
  // const [userData, setUserData] = useState<userData | null>(null);
  const [Profile, setProfile] = useState(false);
  const toggleProfile = () => setProfile(!Profile);
  const [Notification, setNotification] = useState(false);
  const toggleNotification = () => setNotification(!Notification);

  const handleNavigation = (id: number) => {
    const navigateById: menuItems[] = menuItems.filter(item => item.id == id);
    const navigationByName: string = navigateById[0].navigateTo;
    navigation.navigate(navigationByName as ScreenNames);
  };

  const handleLogout = () => { Auth?.logout(); };

  useEffect(() => {
    const dataToUse = Auth?.Role ? (Auth.Role as UserData) : dummyUserData;
    setUserData(dataToUse);
  }, [Auth]);

  return (
    <SafeAreaView className="bg-primary"
    // style={{ paddingTop: insets.top + 0, }}
    >
      <View className="flex-row justify-between items-center px-5 ">
        <TouchableOpacity onPress={toggleProfile}>
          {userData && (
            <View
              className=" z-30 w-[50px] h-[50px] rounded-full  flex items-center justify-center"
              style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.2)' }}
            >
              <Image
                // source={userData.userPicturePath}
                source={require('../../../assets/OperationLead/User/user.png')}

                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                }}
                className="rounded-full"
              />

            </View>
          )}
        </TouchableOpacity>
        <View className="flex items-center">

          <Text className="text-textWhite text-[30px] font-outfit-extrabold">
            Kleenmatic
          </Text>
          <Text className="text-center text-textWhite outfi">Service</Text>
        </View>
        <TouchableOpacity onPress={toggleNotification}>
          <Bell width={30} height={28} stroke="white" />
        </TouchableOpacity>
      </View>

      <View className="bg-white h-full w-full  rounded-t-3xl px-6 py-8 mt-4">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View className="flex-row flex-wrap justify-between gap-y-6">
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleNavigation(item.id)}
                className="  rounded-full p-4 shadow-lg shadow-gray-200 "
              >
                <View className="items-center w-[70px] h-[80px]">
                  <View
                    className="w-20 h-20 bg-background mb-3 justify-center items-center rounded-3xl"
                    style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.2)' }}
                  >
                    {item.icon}
                  </View>

                  <Text className="text-[12px] font-extrabold text-textDark text-center leading-4"
                    numberOfLines={1}
                    ellipsizeMode='tail'>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <Modal
        visible={Profile}
        animationType="slide"
        transparent
        onRequestClose={toggleProfile}
      >
        {userData && (
          <View className="bg-background h-full ">
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
                  <LeftArrow stroke={'white'} width={30} height={30} />
                  <Text className="text-textWhite font-outfit-bold text-[20px]">
                    Home
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="  p-2 z-30 w-[150px] h-[150px] rounded-full border-t border-l border-r border-b-0 border-gray-300   flex items-center justify-center">
                <Image
                  // source={userData.userPicturePath}
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
                  {userData?.fullName}
                </Text>
                <Text className="text-textWhite/80 text-[16px] font-outfit-extrabold  ">
                  {userData.id}
                </Text>
              </View>
            </View>
            <View className="  items-center bg-background w-full h-[60%] p-10 ">
              <View
                style={{ boxShadow: '0 1px 8px rgba(0, 0, 0, 0.2)' }}
                className="bg-background  w-full h-[400px] absolute -top-16 rounded-3xl justify-start items-center gap-5 p-5"
              >
                <View className="flex-row justify-between w-full p-5 bg-blue-100/30 rounded-2xl ">
                  <View className="flex-row items-center gap-2">
                    <Role stroke={'#0187fd'} width={22} />
                    <Text className="font-outfit ">Role</Text>
                  </View>
                  <Text className="font-outfit">{userData.role}</Text>
                </View>

                <View className="flex-row justify-between w-full p-5 bg-blue-100/30 rounded-2xl ">
                  <View className="flex-row items-center gap-2">
                    <DOB stroke={'#0187fd'} width={20} />
                    <Text className="font-outfit">DOB</Text>
                  </View>
                  <Text className=" font-outfit">
                    {userData.dateOfBirth.slice(0, 10)}
                  </Text>
                </View>

                <View className="flex-row justify-between w-full p-5 bg-blue-100/30 rounded-2xl ">
                  <View className="flex-row items-center gap-2">
                    <Phone stroke={'#0187fd'} width={20} />
                    <Text className="font-outfit">Phone</Text>
                  </View>
                  <Text className="font-outfit">{userData.mobileNo}</Text>
                </View>

                <View className="flex-row justify-between w-full p-5 bg-blue-100/30 rounded-2xl ">
                  <View className="flex-row items-center gap-2">
                    <Email stroke={'#0187fd'} width={20} />
                    <Text className="font-outfit">Email</Text>
                  </View>
                  <Text className="font-outfit">{userData.email}</Text>
                </View>
                <View className="flex-row justify-between w-full p-5 bg-blue-100/30 rounded-2xl ">
                  <View className="flex-row items-center gap-2">
                    <Text className="font-outfit">Category</Text>
                  </View>
                  <Text className="font-outfit">
                    {userData.isFullTime == 1 && 'FULL TIME'}
                  </Text>
                </View>
              </View>
              <View className=" absolute bottom-10">
                <TouchableOpacity
                  onPress={() => handleLogout()}

                  className="bg-red-50 border border-red-200 rounded-2xl p-4 px-40 "
                >
                  <View className="flex-row items-center justify-center">
                    <Logout stroke={'#dc2626'} />
                    <Text className="text-red-600 font-outfit-semibold text-base ml-2">
                      Logout
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Modal>

      <Modal
        visible={Notification}
        animationType="slide"
        transparent
        onRequestClose={toggleNotification}
      >
        <View className="bg-black/80 flex-1 justify-end">
          <View className="bg-background p-6 h-[80%] rounded-t-2xl">
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-bold mb-4 text-textDark">
                Notifications
              </Text>
              <TouchableOpacity onPress={toggleNotification}>
                <Close color="red" />
              </TouchableOpacity>
            </View>

            <ScrollView
              className="space-y-4"
              showsVerticalScrollIndicator={false}
            >
              {Message.length > 0 ? (
                Message.map((notification, i) => (
                  <View
                    key={i}
                    className="bg-backgroundLight rounded-lg p-4 border border-backgroundDark mb-3"
                  >
                    <Text className="text-sm font-semibold text-textDark">
                      {notification.Message_title}
                    </Text>
                    <Text className="text-xs text-textLight mt-1">
                      {notification.Message_content}
                    </Text>
                  </View>
                ))
              ) : (
                <Text className="text-textLight">No notifications</Text>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}
