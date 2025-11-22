
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image
} from 'react-native';
import BackButton from '../../../Utilites/Breadcrumbs/BackButton';
import Completed from '../../../Utilites/Completed/Completed';

interface ReportData {
  title: string;
  data1: string;
  data2: string;
  data3: string;
  data4: string;
}

export default function SurveyManagment({ navigation }: { navigation: any }) {
  const tableHead: ReportData = {
    title: 'Metrics',
    data1: 'Poor',
    data2: 'Average',
    data3: 'Good',
    data4: 'Excellent',
  };

  const tableData: ReportData[] = [
    {
      title: 'Main entrance & Reception area',
      data1: '0',
      data2: '1',
      data3: '2',
      data4: '3'
    },
    {
      title: 'Main waiting area',
      data1: '0',
      data2: '1',
      data3: '2',
      data4: '3'
    },
    {
      title: 'Pantry area',
      data1: '0',
      data2: '1',
      data3: '2',
      data4: '3'
    },
    {
      title: 'Stationary area',
      data1: '0',
      data2: '1',
      data3: '2',
      data4: '3'
    },
    {
      title: 'Restroom',
      data1: '0',
      data2: '1',
      data3: '2',
      data4: '3'
    }
  ];

  const [selectedValues, setSelectedValues] = useState<{ [key: number]: string }>({});

  const handleSelect = (rowIndex: number, key: keyof ReportData) => {
    setSelectedValues((prev) => ({
      ...prev,
      [rowIndex]: key,
    }));
  };

const [completedVisible, setCompletedVisible] = useState(false);

  const handleSubmit = () => {
    setCompletedVisible(true);
  };

  const closeModal = () => {
    setCompletedVisible(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackButton
        TouchablityOpacityclassName="flex-row gap-5 mt-12 p-5 bg-white"
        className="text-[20px] font-outfit-semibold text-black"
        name="Survey Management"
      />

      <View className='p-5'>
        {tableData.map((item, rowIndex) => (
          <View
            key={rowIndex}
            className={`h-[50px] flex-row items-center p-2 ${rowIndex % 2 === 1 ? 'bg-blue-50' : 'bg-blue-100'}`}>
            <View className='flex-1 px-2'>
              <Text className='font-outfit-bold text-gray-600'>{item.title}</Text>
            </View>

            {(['data1', 'data2', 'data3', 'data4'] as (keyof ReportData)[]).map((key) => (
              <TouchableOpacity
                key={key}
                className={`w-10  items-center ${selectedValues[rowIndex] === key ? '  bg-primary p-3 rounded-full ' : ''}`}
                onPress={() => handleSelect(rowIndex, key)}>
                <Text className={`font-outfit text-primary ${selectedValues[rowIndex] === key ? 'text-textWhite' : ''}`} >{item[key]}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      <View className='border-b border-gray-200 mb-5 mx-5' />

      <View className='flex-row justify-around opacity-50 '>
        <View className='justify-center items-center'>
          <Text>Poor</Text>
          <Text>0</Text>
        </View>
        <View className='justify-center items-center'>
          <Text>Avg</Text>
          <Text>1</Text>
        </View>
        <View className='justify-center items-center'>
          <Text>Good</Text>
          <Text>2</Text>
        </View>
        <View className='justify-center items-center'>
          <Text>Super</Text>
          <Text>3</Text>
        </View>
      </View>

      <Modal
        visible={completedVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCompletedVisible(false)}
      >
        <Completed
          title="Thank You!"
          message="Your quality report has been submitted successfully."
          icon={require("../../../assets/Conformation/conformation2.png")}
          buttonText="OK"
          onPress={() => setCompletedVisible(false)}
        />
      </Modal>



      <View className='items-center p-5'>
        <TouchableOpacity
          className='h-14 w-full bg-primary rounded-xl items-center justify-center'
          onPress={handleSubmit}>
          <Text className='text-[20px] text-textWhite font-outfit-extrabold'>Submit</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}
