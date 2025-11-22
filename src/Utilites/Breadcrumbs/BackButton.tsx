import { StackNavigationProp } from "@react-navigation/stack";
import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
interface BackButtonProps{
 TouchablityOpacityclassName : string
 className: string;
 name: string
}
const BackButton  =({TouchablityOpacityclassName,className,name}:BackButtonProps,)=>{
      const navigation = useNavigation();
    return(
        <>
        <TouchableOpacity  className={TouchablityOpacityclassName}  onPress={() => navigation.goBack()}
            >
                       <Text className={className}>←</Text>
                       <Text className={className}> {name}</Text>
          </TouchableOpacity>
        </>
    )
}
export default BackButton