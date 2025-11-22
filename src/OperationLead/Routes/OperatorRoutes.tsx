import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OperatorHome from '../Components/Home/OperatorHome';
import LocationManagment from '../Components/LocationManagments/LocationManagment';
import Cleaners from '../Components/CleanerWorkDetails/Cleaners';
import ReportManagement from '../Components/ReportManagments/ReportManagement';
import TrainingManagment from '../Components/TrainingManagments/TrainingManagment';
import QualityManagement from '../Components/QualityManagments/QualitManagment';
import SurveyManagment from '../Components/SurveyManagments/SurveyManagment';
import Login from '../../Login/Components/Login';
import { RootStackParamList } from '../../Utilites/Types/Types';
import CleanerWorkDetails from '../Components/CleanerWorkDetails/CleanerWorkDetails';
import CleanerList from '../Components/Cleaners/CleanerList';



const OperatorRoutes = () => {
const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OperatorHome" component={OperatorHome} />
      <Stack.Screen name="LocationManagment" component={LocationManagment} />
      <Stack.Screen name="Cleaners" component={Cleaners} />
      <Stack.Screen name="CleanerList" component={CleanerList} />
      <Stack.Screen name="CleanerWorkDetails" component={CleanerWorkDetails} />
      <Stack.Screen name="ReportManagement" component={ReportManagement} />
      <Stack.Screen name="TrainingManagment" component={TrainingManagment} />
      <Stack.Screen name="QualityManagement" component={QualityManagement} />
      <Stack.Screen name='SurveyManagment' component={SurveyManagment} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};
export default OperatorRoutes;
