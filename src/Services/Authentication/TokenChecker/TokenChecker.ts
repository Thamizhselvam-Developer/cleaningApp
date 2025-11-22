import * as Keychain from 'react-native-keychain';
import { User } from '../../../Ui/icons';
export type userData = {
  id: number;
  role: string;
  userName: string;
  mobileNo: string;
  email: string;
  dateOfBirth: string;
  isFullTime: number;
  fullName: string;
};
interface TokenCheckerResult {
  token: string | null;
  userObject: userData | null;
  roleData: string | null 
}
export const TokenChecker = async (): Promise<TokenCheckerResult> => {
  try {
    const accessToken = await Keychain.getGenericPassword({ service: 'accessToken' });
    const userData = await Keychain.getGenericPassword({ service: 'userData' });
 const role = await Keychain.getGenericPassword({ service: 'role' });
 console.log(role,"ASDFASDFASDFASDFASDF")
    const token = accessToken ? accessToken.password : null;
    const userObject: userData | null = userData ? JSON.parse(userData.password) : null;
    const roleData = role ? role.password :null
    console.log(token,userObject,roleData)
    return { token, userObject,roleData };
  } catch (error) {
    return { token: null, userObject: null, roleData :null};
  }
};
