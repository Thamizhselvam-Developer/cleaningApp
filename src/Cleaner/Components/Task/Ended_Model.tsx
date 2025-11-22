import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "../../../Utilites/Types/Types";
import { Check } from "../../../Ui/icons";
interface CompletedProps {
    title: string;
    message: string;
    
    onPress: () => void ;
}



const EndTaskModel = ({title,message,onPress}:CompletedProps) => {
const navigation = useNavigation<RootStackParamList>();
    
    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-black/50">
        
            <View className="bg-white rounded-2xl w-80 p-6 items-center relative gap-4">
       
               <View className="absolute top-2 bg-green-500 w-12 h-12 rounded-full">
                <View className="flex justify-center items-center my-auto">
                   <Check stroke={"white"}/>


                </View>
               </View>

          
                <Text className="text-xl font-outfit-semibold text-center mt-10">{title}</Text>

            
                <Text className="text-gray-500 font-outfit text-center ">{message}</Text>

              
                <TouchableOpacity
                    className="bg-primary rounded-lg w-full py-3  "
                    onPress={()=>{
                       
                        if(onPress){
                             onPress()
                            navigation.navigate('Home')
                        }
                    }}
                >
                    <Text className="text-white text-center font-outfit-semibold">OK</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

       
    );
};

export default EndTaskModel;