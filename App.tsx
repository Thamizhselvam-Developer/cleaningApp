import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/Services/Authentication/AuthContext/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './src/Services/Authentication/AuthContext/AuthContext';
import CleanerRoutes from './src/Cleaner/Routes/CleanerRoutes';
import LoginRoutes from './src/Login/Routes/LoginRoutes';
import OperatorRoutes from './src/OperationLead/Routes/OperatorRoutes';
import AlterScreen from './src/Utilites/AlertScreen/AlertScreen';
import InternetChecker from './src/Utilites/InternetChecker/InternetChecker';
import { Role } from './src/Utilites/enums/EnumsRole';
import Loader from './src/Ui/Loader/Loader';

type user = {
  id: string;
  role: string;
  userName: string;
  dateOfBirth: string;
  email: string;
  fullName: string;
  isFullTime: number;
  mobileNo: string;
  userPicturePath: string;
};

function Main() {
  const Auth = useContext(AuthContext);

  const roles = Auth?.UserRole;

  if (Auth?.loading) {
    return <Loader />;
  }
  console.log(!Auth?.Token == null || !roles == null, 'ASDFASDFASDFAS');
  if (Auth?.Token == null || roles == null) {
    return (
      <NavigationContainer>
        <LoginRoutes />
        {/* <OperatorRoutes /> */}
      </NavigationContainer>
    );
  }

  if (roles == Role.ADMIN) return <AlterScreen />;

  return (
    <NavigationContainer>
      {roles == Role.CLEANER ? (
        <CleanerRoutes />
      ) : (
        roles == Role.OPERATIONAL_LEAD && <OperatorRoutes />
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <InternetChecker />
        <Main />
      </SafeAreaProvider>
    </AuthProvider>
  );
}