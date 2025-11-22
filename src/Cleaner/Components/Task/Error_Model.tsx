
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { CanceledError } from "axios";
import { Warning } from "../../../Ui/icons";

interface ErrorProps{
    title:string;
    message: string;
    closeFunction: ()=> void;

}

const Error_Model=({title,message,closeFunction}:ErrorProps)=>{
    console.log(closeFunction,"ASDf")
return(
    <View className="flex-1 justify-center items-center bg-black/60 px-4">
          <View className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4">
            <View className="px-6 pt-6 pb-4">
              <View className="w-14 h-14 bg-red-100 rounded-full items-center justify-center mx-auto mb-4">
                <Warning stroke={'red'} />
              </View>

              <Text className="text-xl font-outfit-bold text-gray-900 text-center mb-2">
                {title}
              </Text>

              <Text className="text-base font-outfit-medium text-gray-600 text-center leading-6">
          {message}
              </Text>
            </View>

            <View className="p-6 mb-4 -mt-5 flex gap-6 space-y-3">
              <TouchableOpacity
                className="bg-red-500  py-4 rounded-xl shadow-sm"
                onPress={() => closeFunction()}
              >
                <Text className="text-white font-outfit-semibold text-base text-center ">
                  OK
                </Text>
              </TouchableOpacity>

             
            </View>

            <TouchableOpacity
              className="absolute top-4 right-4 w-8 h-8 items-center justify-center"
              onPress={() => closeFunction()}
            >
              <View className="w-6 h-6 items-center justify-center">
                <Text className="text-gray-400 font-outfit-medium text-2xl">
                  ×
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
)
}
export default Error_Model;