import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Components/Home/Home';
import Task from '../Components/Task/Task';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Services/Authentication/AuthContext/AuthContext';
import Training from '../Components/Training/Training';
import Location from '../Components/Locations/Location';
import AlterScreen from '../../Utilites/AlertScreen/AlertScreen';
import { RootStackParamList } from '../../Utilites/Types/Types';
// export type RootStackParamList = {
//   Home: undefined ;
//   Login: undefined;
//   Location :undefined;
//   Task: undefined;
//   Training: undefined
//   navigate: undefined;
// };

const CleanerRoutes = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Location"
        component={Location}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Task"
        component={Task}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Training"
        component={Training}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default CleanerRoutes;
