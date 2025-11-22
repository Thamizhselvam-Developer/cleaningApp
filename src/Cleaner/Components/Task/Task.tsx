import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Alert,
  StyleSheet,
  Modal,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButton from '../../../Utilites/Breadcrumbs/BackButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../Utilites/Types/Types';
import { Brush } from '../../../Ui/icons';
import EndTaskModel from './Ended_Model';
import Error_Model from './Error_Model';
import Task_Complete from './Task_Complete';

const { width } = Dimensions.get('window');
type TaskScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Task'>;

type Props = {
  navigation: TaskScreenNavigationProp;
};

interface task {
  id: number;
  title: string;
  completed: boolean;
}

const taskList: task[] = [
  {
    id: 1,
    title: 'Main entrance & Reception area',
    completed: false,
  },
  {
    id: 2,
    title: 'Main waiting area',
    completed: false,
  },
  {
    id: 3,
    title: 'Pantry area',
    completed: false,
  },
  {
    id: 4,
    title: 'Stationary area',
    completed: false,
  },
  {
    id: 5,
    title: 'Restroom',
    completed: false,
  },
  {
    id: 6,
    title: 'Meeting rooms',
    completed: false,
  },
  {
    id: 7,
    title: 'All room',
    completed: false,
  },
];

export default function Task({ navigation }: Props) {
  const [data, setData] = useState([]);
  const [tasks, setTasks] = useState(taskList);
  const [isSelected, setSelection] = useState(false);
  const [isEnded, setEnded] = useState(false);
  const [isAllCompleted, setAllCompleted] = useState(false);
  const [completedTask,setcompletedTask] = useState<number | null>(null)
  const insets = useSafeAreaInsets();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isStarted, setStarted] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [numberofCompleted,setnumberofCompleted] =useState(false)
  const [isError, setError] = useState(false);
  const taskPopup = (isCompleted: boolean, id: number) => {
    if (isDisabled) {
      if (!isCompleted) {
        setSelectedTaskId(id);
        setSelection(true);
      }
    } else {
      return setStarted(true);
    }
  };
  const handleTaskPress = (id: number) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, completed: true } : task)),
    );
  };

  const storedISCompleted = async () => {
    try {
      await AsyncStorage.setItem('isCompleted', 'true');
      setEnded(!isEnded);
    } catch (error) {
      console.log('Error saving data');
    }
  };
  // useEffect(()=>{
  // const clearAll = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //     console.log('Done');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // clearAll()
  // },[])

  useEffect(() => {
    const loadButtonState = async () => {
      const savedState = await AsyncStorage.getItem('startButtonDisabled');
      if (savedState !== null) {
        setIsDisabled(JSON.parse(savedState));
      }
    };
    const endButton = async () => {
      const savedEndButton = await AsyncStorage.getItem('isCompleted');
      if (savedEndButton == 'true') {
        setAllCompleted(true);
      }
    };
    loadButtonState();
    endButton();
  }, []);

  const handleStartButton = async () => {
    console.log('Button pressed!');
    const newState = !isDisabled;
    setIsDisabled(newState);
    await AsyncStorage.setItem('startButtonDisabled', JSON.stringify(newState));
  };

  const handleEndTask = () => {
    if (!isAllCompleted && !isStarted) {
      const completedCheck = tasks.filter(item => item.completed != false);
        setcompletedTask(completedCheck.length);
      if (completedCheck.length >0) {
          setnumberofCompleted(!numberofCompleted)
        setEnded(!isEnded);
      } else {
        return setError(!isError);
      }
    }
    return null;
  };
  return (
    <SafeAreaProvider>
      <View
        className="flex-1 bg-primary "
        style={{
          paddingTop: insets.top + 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate('Location')}>
          <BackButton
            TouchablityOpacityclassName="flex-row gap-1  p-3"
            className="text-[23px] font-outfit-semibold text-background "
            name="Task"
          />
        </TouchableOpacity>

        <View className="flex-row items-center justify-center bg-background mt-4 rounded-t-3xl">
          <TouchableOpacity
            onPress={() => handleStartButton()}
            disabled={isDisabled}
            className={` justify-center ${
              isDisabled ? `bg-gray-400` : `bg-primary`
            } flex-row items-center  mb-4 mt-4 gap-4 w-40 h-16 rounded-2xl`}
          >
            <Text className="text-[30px]  text-center font-outfit-semibold text-white flex-1">
              {!isDisabled ? 'Start' : 'Started'}
            </Text>
          </TouchableOpacity>
        </View>

        <SafeAreaView className="flex-1">
          <LinearGradient
            colors={['#3B82F6', '#1E40AF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="relative flex-1"
          >
            <ScrollView
              className="flex-1 px-4  bg-background "
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}
            >
              <View className="mt-5">
                {tasks.map(task => (
                  <TouchableOpacity
                    key={task.id}
                    onPress={() => taskPopup(task.completed, task.id)}
                    className={` w-full  h-16 ${
                      task.completed ? `bg-gray-600` : `bg-white`
                    }  border-[0.5px] rounded-2xl mb-4 `}
                  >
                    <View className="flex-row justify-center  my-auto">
                      <View className="flex-1 items-center justify-center ">
                        <Text
                          className={`text-xl font-outfit-medium text-center mb-1 ${
                            task.completed ? `text-background` : `text-black`
                          }`}
                        >
                          {task.title}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </LinearGradient>
        </SafeAreaView>
        <View className="bg-background border-3 border-red-600 absolute top-20"></View>
        <View className=" flex items-center justify-center bg-background">
          <TouchableOpacity
            disabled={isAllCompleted}
            onPress={() => handleEndTask()}
            className={`${
              isAllCompleted ? `bg-gray-400` : `bg-red-500 `
            }  flex-row items-center  mb-6 mt-4 gap-4 w-40 h-16 rounded-2xl`}
          >
            <Text className="text-[30px]  text-center text-background font-outfit-semibold  flex-1">
              {isAllCompleted ? 'Ended' : 'End'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal animationType="slide" transparent={true} visible={isSelected}>
        <Task_Complete
          title=" Task Completion"
          message=" Have you completed this task?"
          isCompleteFunction={() => {
            if (selectedTaskId !== null) {
              handleTaskPress(selectedTaskId);
              setSelection(false);
              setSelectedTaskId(null);
            }
          }}
          closeFunction={() => setSelection(!isSelected)}
        />
      </Modal>
      <Modal visible={isEnded} transparent animationType="fade">
        <EndTaskModel
          title="Thank You!"
          message={`Your ${completedTask} Work As Been Submitted To Operational Lead`}
          onPress={() => storedISCompleted()}
        />
      </Modal>
      <Modal animationType="slide" transparent={true} visible={isError}>
        <Error_Model
          title="End Task"
          message=" Please Complete All The Above to End task?"
          closeFunction={() => setError(!isError)}
        />
      </Modal>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={numberofCompleted}
      >
        <Error_Model
          title="End Task"
          message={` You Have Completed a ${completedTask} End task?`}
          closeFunction={() => setnumberofCompleted(!numberofCompleted)}
        />
      </Modal> */}

      <Modal animationType="slide" transparent={true} visible={isStarted}>
        <Error_Model
          title="  Alert"
          message=" Plsease Click Start Button Before You Start !"
          closeFunction={() => setStarted(!isStarted)}
        />
      </Modal>
    </SafeAreaProvider>
  );
}

// import React, { useEffect, useState } from 'react';
// import LinearGradient from 'react-native-linear-gradient';
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   Pressable,
//   Alert,
//   StyleSheet,
//   Modal,
//   Dimensions,
//   SafeAreaView,
//   Animated,
// } from 'react-native';
// import { StackActions, useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import axios from 'axios';
// import CheckBox from '@react-native-community/checkbox';
// import {
//   SafeAreaProvider,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import BackButton from '../../../Utilites/Breadcrumbs/BackButton';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../../../Utilites/Types/Types';
// import { Brush } from '../../../Ui/icons';
// import EndTaskModel from './Ended_Model';
// import Error_Model from './Error_Model';
// import Task_Complete from './Task_Complete';

// const { width, height } = Dimensions.get('window');
// type TaskScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Task'>;

// type Props = {
//   navigation: TaskScreenNavigationProp;
// };

// interface task {
//   id: number;
//   title: string;
//   completed: boolean;
// }

// const taskList: task[] = [
//   {
//     id: 1,
//     title: 'Main entrance & Reception area',
//     completed: false,
//   },
//   {
//     id: 2,
//     title: 'Main waiting area',
//     completed: false,
//   },
//   {
//     id: 3,
//     title: 'Pantry area',
//     completed: false,
//   },
//   {
//     id: 4,
//     title: 'Stationary area',
//     completed: false,
//   },
//   {
//     id: 5,
//     title: 'Restroom',
//     completed: false,
//   },
//   {
//     id: 6,
//     title: 'Meeting rooms',
//     completed: false,
//   },
//   {
//     id: 7,
//     title: 'All room',
//     completed: false,
//   },
// ];

// export default function Task({ navigation }: Props) {
//   const [data, setData] = useState([]);
//   const [tasks, setTasks] = useState(taskList);
//   const [isSelected, setSelection] = useState(false);
//   const [isEnded, setEnded] = useState(false);
//   const [isAllCompleted, setAllCompleted] = useState(false);
//   const insets = useSafeAreaInsets();
//   const [isDisabled, setIsDisabled] = useState(false);
//   const [isStarted, setStarted] = useState(false);
//   const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
//   const [isError, setError] = useState(false);
//   const [fadeAnim] = useState(new Animated.Value(0));
//   const [slideAnim] = useState(new Animated.Value(50));

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 800,
//         useNativeDriver: true,
//       }),
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 600,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, []);

//   const taskPopup = (isCompleted: boolean, id: number) => {
//     if (isDisabled) {
//       if (!isCompleted) {
//         setSelectedTaskId(id);
//         setSelection(true);
//       }
//     } else {
//       return setStarted(true);
//     }
//   };

//   const handleTaskPress = (id: number) => {
//     setTasks(prev =>
//       prev.map(task => (task.id === id ? { ...task, completed: true } : task)),
//     );
//   };

//   const storedISCompleted = async () => {
//     try {
//       await AsyncStorage.setItem('isCompleted', 'true');
//       setEnded(!isEnded);
//     } catch (error) {
//       console.log('Error saving data');
//     }
//   };

//   useEffect(() => {
//     const loadButtonState = async () => {
//       const savedState = await AsyncStorage.getItem('startButtonDisabled');
//       if (savedState !== null) {
//         setIsDisabled(JSON.parse(savedState));
//       }
//     };
//     const endButton = async () => {
//       const savedEndButton = await AsyncStorage.getItem('isCompleted');
//       if (savedEndButton == 'true') {
//         setAllCompleted(true);
//       }
//     };
//     loadButtonState();
//     endButton();
//   }, []);

//   const handleStartButton = async () => {
//     console.log('Button pressed!');
//     const newState = !isDisabled;
//     setIsDisabled(newState);
//     await AsyncStorage.setItem('startButtonDisabled', JSON.stringify(newState));
//   };

//   const handleEndTask = () => {
//     if (!isAllCompleted && !isStarted) {
//       const completedCheck = tasks.filter(item => item.completed != true);
//       if (completedCheck.length == 0) {
//         setEnded(!isEnded);
//       } else {
//         return setError(!isError);
//       }
//     }
//     return null;
//   };

//   const getCompletionProgress = () => {
//     const completedTasks = tasks.filter(task => task.completed).length;
//     return (completedTasks / tasks.length) * 100;
//   };

//   const TaskItem = ({ task, index }: { task: task; index: number }) => {
//     const [itemFadeAnim] = useState(new Animated.Value(0));

//     useEffect(() => {
//       Animated.timing(itemFadeAnim, {
//         toValue: 1,
//         duration: 400,
//         delay: index * 100,
//         useNativeDriver: true,
//       }).start();
//     }, []);

//     return (

//         <TouchableOpacity
//           key={task.id}
//           onPress={() => taskPopup(task.completed, task.id)}
//           className={`w-full h-20 mb-4 rounded-3xl shadow-lg ${
//             task.completed
//               ? 'bg-emerald-100 border-2 border-emerald-300'
//               : 'bg-white border border-gray-100'
//           }`}
//           style={{
//             elevation: task.completed ? 8 : 4,
//             shadowColor: task.completed ? '#10B981' : '#000',
//             shadowOffset: { width: 0, height: 4 },
//             shadowOpacity: task.completed ? 0.3 : 0.1,
//             shadowRadius: task.completed ? 8 : 4,
//           }}
//         >
//           <View className="flex-row items-center px-6 h-full">
//             <View
//               className={`w-6 h-6 rounded-full mr-4 ${
//                 task.completed
//                   ? 'bg-emerald-500'
//                   : 'bg-gray-200 border-2 border-gray-300'
//               } items-center justify-center`}
//             >
//               {task.completed && (
//                 <MaterialIcons name="check" size={16} color="white" />
//               )}
//             </View>

//             <View className="flex-1">
//               <Text
//                 className={`text-lg font-outfit-semibold ${
//                   task.completed ? 'text-emerald-800' : 'text-gray-800'
//                 }`}
//               >
//                 {task.title}
//               </Text>
//               <Text
//                 className={`text-sm font-outfit-regular mt-1 ${
//                   task.completed ? 'text-emerald-600' : 'text-gray-500'
//                 }`}
//               >
//                 {task.completed ? 'Completed ✓' : 'Tap to complete'}
//               </Text>
//             </View>

//             <View
//               className={`w-3 h-3 rounded-full ${
//                 task.completed ? 'bg-emerald-500' : 'bg-orange-400'
//               }`}
//             />
//           </View>
//         </TouchableOpacity>

//     );
//   };

//   return (
//     <SafeAreaProvider>
//       <LinearGradient
//         colors={['#667eea', '#764ba2']}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         className="flex-1"
//         style={{ paddingTop: insets.top + 10 }}
//       >
//         <TouchableOpacity onPress={() => navigation.navigate('Location')}>
//           <BackButton
//             TouchablityOpacityclassName="flex-row gap-1 p-3"
//             className="text-[23px] font-outfit-semibold text-white"
//             name="Task"
//           />
//         </TouchableOpacity>

//           <LinearGradient
//             colors={['#ffffff', '#f8fafc']}
//             className="px-6 py-6 rounded-t-[30px]"
//           >
//             <View className="items-center mb-6">
//               <Text className="text-2xl font-outfit-bold text-gray-800 mb-2">
//                 Daily Tasks
//               </Text>

//               <View className="w-full bg-gray-200 h-3 rounded-full mb-4">
//                 <View
//                   className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-3 rounded-full"
//                   style={{ width: `${getCompletionProgress()}%` }}
//                 />
//               </View>

//               <Text className="text-sm font-outfit-medium text-gray-600">
//                 {tasks.filter(t => t.completed).length} of {tasks.length} tasks
//                 completed
//               </Text>
//             </View>

//             <TouchableOpacity
//               onPress={() => handleStartButton()}
//               disabled={isDisabled}
//               className={`justify-center items-center h-16 rounded-2xl mb-4 ${
//                 isDisabled
//                   ? 'bg-gray-400'
//                   : 'bg-gradient-to-r from-blue-500 to-blue-600'
//               }`}
//               style={{
//                 elevation: isDisabled ? 2 : 8,
//                 shadowColor: isDisabled ? '#9CA3AF' : '#3B82F6',
//                 shadowOffset: { width: 0, height: 4 },
//                 shadowOpacity: 0.3,
//                 shadowRadius: 8,
//               }}
//             >
//               <LinearGradient
//                 colors={
//                   isDisabled ? ['#9CA3AF', '#9CA3AF'] : ['#3B82F6', '#1D4ED8']
//                 }
//                 className="w-full h-full rounded-2xl justify-center items-center"
//               >
//                 <View className="flex-row items-center">
//                   <MaterialIcons
//                     name={isDisabled ? 'check-circle' : 'play-arrow'}
//                     size={28}
//                     color="white"
//                   />
//                   <Text className="text-xl font-outfit-bold text-white ml-2">
//                     {!isDisabled ? 'Start Tasks' : 'In Progress'}
//                   </Text>
//                 </View>
//               </LinearGradient>
//             </TouchableOpacity>
//           </LinearGradient>

//           <SafeAreaView className="flex-1">
//             <ScrollView
//               className="flex-1 px-6 bg-gray-50"
//               showsVerticalScrollIndicator={false}
//               contentContainerStyle={{ paddingBottom: 120 }}
//             >
//               <View className="mt-4">
//                 {tasks.map((task, index) => (
//                   <TaskItem key={task.id} task={task} index={index} />
//                 ))}
//               </View>
//             </ScrollView>
//           </SafeAreaView>

//           <LinearGradient
//             colors={['#f8fafc', '#ffffff']}
//             className="px-6 py-6 border-t border-gray-100"
//           >
//             <TouchableOpacity
//               disabled={isAllCompleted}
//               onPress={() => handleEndTask()}
//               className={`h-16 rounded-2xl items-center justify-center ${
//                 isAllCompleted
//                   ? 'bg-gray-400'
//                   : 'bg-gradient-to-r from-red-500 to-red-600'
//               }`}
//               style={{
//                 elevation: isAllCompleted ? 2 : 8,
//                 shadowColor: isAllCompleted ? '#9CA3AF' : '#EF4444',
//                 shadowOffset: { width: 0, height: 4 },
//                 shadowOpacity: 0.3,
//                 shadowRadius: 8,
//               }}
//             >
//               <LinearGradient
//                 colors={
//                   isAllCompleted
//                     ? ['#9CA3AF', '#9CA3AF']
//                     : ['#EF4444', '#DC2626']
//                 }
//                 className="w-full h-full rounded-2xl justify-center items-center"
//               >
//                 <View className="flex-row items-center">
//                   <MaterialIcons
//                     name={isAllCompleted ? 'done-all' : 'stop'}
//                     size={24}
//                     color="white"
//                   />
//                   <Text className="text-xl font-outfit-bold text-white ml-2">
//                     {isAllCompleted ? 'Task Ended' : 'End Tasks'}
//                   </Text>
//                 </View>
//               </LinearGradient>
//             </TouchableOpacity>
//           </LinearGradient>

//       </LinearGradient>

//       <Modal animationType="slide" transparent={true} visible={isSelected}>
//         <Task_Complete
//           title=" Task Completion"
//           message=" Have you completed this task?"
//           isCompleteFunction={() => {
//             if (selectedTaskId !== null) {
//               handleTaskPress(selectedTaskId);
//               setSelection(false);
//               setSelectedTaskId(null);
//             }
//           }}
//           closeFunction={() => setSelection(!isSelected)}
//         />
//       </Modal>

//       <Modal visible={isEnded} transparent animationType="fade">
//         <EndTaskModel
//           title="Thank You!"
//           message="Your Work As Been Submitted To Operational Lead"
//           onPress={() => storedISCompleted()}
//         />
//       </Modal>

//       <Modal animationType="slide" transparent={true} visible={isError}>
//         <Error_Model
//           title="End Task"
//           message=" Please Complete All The Above to End task?"
//           closeFunction={() => setError(!isError)}
//         />
//       </Modal>

//       <Modal animationType="slide" transparent={true} visible={isStarted}>
//         <Error_Model
//           title="  Alert"
//           message=" Plsease Click Start Button Before You Start !"
//           closeFunction={() => setStarted(!isStarted)}
//         />
//       </Modal>
//     </SafeAreaProvider>
//   );
// }
