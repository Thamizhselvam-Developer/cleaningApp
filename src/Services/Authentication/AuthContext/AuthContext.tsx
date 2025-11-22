import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import * as Keychain from 'react-native-keychain';
import { StackNavigationProp } from '@react-navigation/stack';
import { TokenChecker } from '../TokenChecker/TokenChecker';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import InternetChecker from '../../../Utilites/InternetChecker/InternetChecker';
import { RootStackParamList } from '../../../Utilites/Types/Types';
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type navigationProps = {
  navigation: LoginScreenNavigationProp;
};

type UserData = {
  Token: string | null | undefined;
  text: string;
  UserRole: string | null;
  Role: Object | null;
  login: (tokens: LoginPayload, userData: UserData) => void;
  logout: () => void;
  loading: boolean;
};
type LoginPayload = {
  accessToken: string;
  refreshToken: string;
  role: string;
};

export type isConnectData = {
  isConnected: boolean;
};

type Propss = {
  children: ReactNode;
};

export const AuthContext = createContext<UserData | null>(null);

export const AuthProvider = ({ children }: Propss) => {
  const [userToken, setUserToken] = useState<string | null>('');
  const [responseUserData, setresponseUserData] = useState<object | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    setLoading(true);

    Token();
  }, []);

  const Token = async () => {
    const { token, userObject, roleData } = await TokenChecker();
    setUserToken(token);
    setresponseUserData(userObject);
    // console.log(roleData);
    setRole(roleData);
    setLoading(false);
  };

  const login = async (tokens: LoginPayload, userData: UserData) => {
    setLoading(true);
    setresponseUserData(userData);
    console.log(tokens.role);
    setRole(tokens.role);
    await Keychain.setGenericPassword('access', tokens.accessToken, {
      service: 'accessToken',
    });
    await Keychain.setGenericPassword('refresh', tokens.refreshToken, {
      service: 'refreshToken',
    });
    await Keychain.setGenericPassword('user', JSON.stringify(userData), {
      service: 'userData',
    });
    await Keychain.setGenericPassword('role', tokens.role, {
      service: 'role',
    });

    setUserToken(tokens.accessToken);
    setLoading(false);
  };
  const storageClear = async (): Promise<string | null> => {
    try {
      await Keychain.resetGenericPassword({ service: 'accessToken' });
      await Keychain.resetGenericPassword({ service: 'refreshToken' });
      await Keychain.resetGenericPassword({ service: 'userData' });
      await Keychain.resetGenericPassword({ service: 'role' });
      return 'storageCleared';
    } catch (err) {
      return null;
    }
  };
  const logout = async () => {
    setLoading(true);

    const result = await storageClear();
    if (result !== null) {
      console.log();
      console.log('LOGOUT');
      setresponseUserData(null);
      setUserToken(null);
      setRole(null);
      setLoading(false);
      const navigation = useNavigation<NavigationProp<RootStackParamList>>();
      navigation.navigate('Login');
    }
  };
  console.log(role, 'ROLEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEe');
  const value: UserData = {
    Token: userToken,
    text: 'Welcome!',
    UserRole: role,
    Role: responseUserData,
    login,
    logout,
    loading: loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
