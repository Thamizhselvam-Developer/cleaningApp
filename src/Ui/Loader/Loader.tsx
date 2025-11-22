import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const Loader = () => {
  return (
    <View className="flex-1 bg-background justify-center">
      <View className="flex-col gap-4 w-full  items-center justify-center">
        <View className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
          <View className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></View>
        </View>
      </View>
    </View>
  );
};

export default Loader;
