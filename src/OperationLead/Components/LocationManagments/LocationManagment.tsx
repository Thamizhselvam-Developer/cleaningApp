import React, { useState } from 'react';
import { TouchableOpacity, ScrollView, Text, View, SafeAreaView, ImageSourcePropType, Image, TouchableWithoutFeedback, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackButton from '../../../Utilites/Breadcrumbs/BackButton';
import { Map, Member } from '../../../Ui/icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


type RootStackParamList = {
    OperatorHome: undefined;
    LocationManagment: undefined;
    Cleaners: { task: TaskType };
    ReportManagement: undefined;
};

type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'LocationManagment'
>;

export type TaskType = {
    id: number;
    name: string;
    Location: string;
    member: number;
    img: ImageSourcePropType;
};

const routineTasks: TaskType[] = [
    {
        id: 1,
        name: 'Bayshore Global 28 Duxton Hill',
        Location: 'Cleaning facility available',
        member: 2,
        img: require('../../../assets/OperationLead/Loaction_img1.jpg')
    },
    {
        id: 2,
        name: ' Yew Lee Metal',
        Location: 'Cleaning facility available',
        member: 1,
        img: require('../../../assets/OperationLead/Loaction_img2.jpg')
    },
    {
        id: 3,
        name: 'Milestone #12-03 (Singpost)',
        Location: 'Cleaning facility available',
        member: 10,
        img: require('../../../assets/OperationLead/Loaction_img3.jpg')
    },
];

// const categories = ['Routine Cleaning', 'Periodic Cleaning', 'Ad-hoc Cleaning'];

export default function LocationManagment() {
      const insets = useSafeAreaInsets();
    
    const navigation = useNavigation<NavigationProp>();
    // const [selectedCategory, setSelectedCategory] = useState<string>('Routine Cleaning');

    // const getFilteredTasks = () => {
    //     switch (selectedCategory) {
    //         case 'Routine Cleaning':
    //             return routineTasks;
    //         case 'Periodic Cleaning':
    //             return periodicTasks;
    //         case 'Ad-hoc Cleaning':
    //             return adHocTasks;
    //         default:
    //             return [];
    //     }
    // };

    return (
        <SafeAreaView className="flex-1 bg-primary"  
         style={{paddingTop: insets.top + 10}}
         >
            <BackButton TouchablityOpacityclassName='flex-row gap-3  p-5 ' className='text-[20px] font-outfit-semibold text-textWhite ' name='Working Locations' />
            <View className="flex-1 px-4 py-2  bg-background rounded-t-3xl">

                {/* <View className="flex-row justify-between mb-4 mt-4">
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category}
                            onPress={() => setSelectedCategory(category)}
                            className={`flex-1 mx-1 py-4 rounded-xl font-outfit ${selectedCategory === category ? 'bg-blue-600' : 'bg-background'}`}
                        >
                            <Text
                                className={`text-center text-sm font-semibold ${selectedCategory === category ? 'text-white' : 'text-textDark'}`}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View> */}

                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 30 }}
                    
                >
                    {routineTasks.map((item) => (
                        <View key={item.id} className="p-5">
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('Cleaners', { task: item })}>
                                <View
                                    className="bg-white rounded-3xl overflow-hidden border border-gray-100"
                                    style={{ boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)' }}>

                                    <View className="relative">
                                        <View className="h-[200px] overflow-hidden p-4 rounded-t-3xl">
                                            <Image
                                                source={item.img}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    resizeMode: 'cover',
                                                }}
                                                className='rounded-t-3xl'
                                            />

                                        </View>

                                        <View className="p-6">
                                            <View className="mb-5">
                                                <Text className="text-xl font-outfit-bold text-gray-800 mb-2">
                                                    {item.name}
                                                </Text>
                                                <View className="flex-row items-center gap-1">
                                                    <Map stroke={'gray'} width={14} />
                                                    <Text className="text-sm font-outfit text-gray-500">
                                                        {item.Location}
                                                    </Text>
                                                </View>
                                            </View>

                                            <View
                                                className='bg-primary rounded-2xl h-12 flex-row justify-center items-center gap-2'>
                                                <Member stroke={'white'} width={17} height={16} />
                                                <Text className="text-xl font-outfit-semibold text-background" >
                                                    {item.member} {item.member === 1 ? 'Member' : 'Members'}
                                                </Text>
                                            </View>

                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>

                        </View>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
