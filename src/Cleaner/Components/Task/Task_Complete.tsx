import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Brush } from "../../../Ui/icons";

interface CompletedProps {
    title: string;
    message: string;
    isCompleteFunction:() => void ;
    closeFunction: () => void ;
}

const Task_Complete=({title,message,isCompleteFunction,closeFunction}:CompletedProps)=>{
    return(
  <View className="flex-1 justify-center items-center bg-black/60 px-4">
          <View className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4">
            <View className="px-6 pt-6 pb-4">
              <View className="w-14 h-14 bg-blue-100 rounded-full items-center justify-center mx-auto mb-4">
                <Brush stroke={'#0187fd'} />
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
                className="bg-primary  py-4 rounded-xl shadow-sm"
                onPress={() =>isCompleteFunction()}
              >
                <Text className="text-white font-outfit-semibold text-base text-center ">
                  Yes, Complete
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-background/20  py-4 rounded-xl border border-gray-200"
                onPress={() =>closeFunction()}
              >
                <Text className="text-gray-700 font-outfit-semibold text-base text-center">
                  No
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              className="absolute top-4 right-4 w-8 h-8 items-center justify-center"
              onPress={() => closeFunction()}
            >
              <View className="w-6 h-6 items-center justify-center">
                <Text className="text-gray-400 font-outfit-medium text-lg">
                  ×
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
    )
}
export default Task_Complete