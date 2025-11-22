import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CompletedProps {
    title?: string;
    message?: string;
    icon?: any;
    buttonText?: string;
    onPress?: () => void;
}

const Completed = ({title ,message ,icon,buttonText ,onPress}: CompletedProps) => {
    return (
        // <SafeAreaView className="flex-1 justify-center items-center bg-black/50">
        
        //     <View className="bg-white rounded-2xl w-80 p-6 items-center relative gap-4">
       
        //         <View className="absolute -top-12 bg-green-500 rounded-full ">
        //             <Image
        //                 source={icon}
        //                 className="w-[70px] h-[70px] rounded-full"
        //             />
        //         </View>

          
        //         <Text className="text-xl font-outfit-semibold text-center mt-4">{title}</Text>

            
        //         <Text className="text-gray-500 font-outfit text-center ">{message}</Text>

              
        //         <TouchableOpacity
        //             className="bg-green-500 rounded-lg w-full py-3  "
        //             onPress={onPress}
        //         >
        //             <Text className="text-white text-center font-outfit-semibold">{buttonText}</Text>
        //         </TouchableOpacity>
        //     </View>
        // </SafeAreaView>

        <SafeAreaView className="flex-1 justify-center items-center bg-primary">

            <View className="   items-center  gap-4">

                <View className=" ">
                    <Image
                        source={icon}
                        className="w-[120px] h-[120px] rounded-full"
                    />
                </View>


                <Text className="text-[30px] font-outfit-semibold text-center text-textWhite">{title}</Text>


                <Text className="text-textWhite/70 font-outfit text-center ">{message}</Text>


                <TouchableOpacity
                    className="bg-background/30 rounded-lg w-[200px] py-3  "
                    onPress={onPress}
                >
                    <Text className="text-white text-center font-outfit-semibold text-[20px]">{buttonText}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Completed;
