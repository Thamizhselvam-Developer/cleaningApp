import React, { useContext, useEffect, useState } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    SafeAreaView,
    Image,
    ScrollView,
    Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../../../Services/Authentication/AuthContext/AuthContext';
import BackButton from '../../../Utilites/Breadcrumbs/BackButton';
import { Email, Map, Phone } from '../../../Ui/icons';

type Cleaner = {
    cleanerId: string;
    name: string;
    cleanerImg: any;
    phone: string;
    email: string;
    DOB: string;
    address: string;
};

const dummyCleaners: Cleaner[] = [
    {
        cleanerId: 'CL2025101',
        name: 'Lee',
        cleanerImg: require('../../../assets/OperationLead/User/user.png'),
        phone: '1234567890',
        email: 'abcd@gamil.com',
        DOB: '0000/00/00',
        address: 'xxxx xxxx xxxx'

    },
    {
        cleanerId: 'CL2025102',
        name: 'Adrian',
        cleanerImg: require('../../../assets/OperationLead/User/user.png'),
        phone: '0987654321',
        email: 'abcd@gamil.com',
        DOB: '0000/00/00',
        address: 'xxxx xxxx xxxx'
    },
    {
        cleanerId: 'CL2025103',
        name: 'Jenith',
        cleanerImg: require('../../../assets/OperationLead/User/user.png'),
        phone: '1122334455',
        email: 'abcd@gamil.com',
        DOB: '0000/00/00',
        address: 'xxxx xxxx xxxx'
    },
];

export default function CleanerList() {
    const insets = useSafeAreaInsets();
    const Auth = useContext(AuthContext);

    const [cleaners, setCleaners] = useState<Cleaner[]>(dummyCleaners);
    const [selectedCleaner, setSelectedCleaner] = useState<Cleaner | null>(null);
    const [modalVisible, setModalVisible] = useState(false);



    const handleCleanerPress = (cleaner: Cleaner) => {
        setSelectedCleaner(cleaner);
        setModalVisible(true);
    };

    console.log(cleaners.map((item) => item.cleanerId))

    return (
        <SafeAreaView
            className="flex-1 bg-primary"
            style={{ paddingTop: insets.top + 10 }}
        >
            <BackButton
                TouchablityOpacityclassName="flex-row gap-5  p-5 "
                className="text-[20px] font-outfit-semibold text-textWhite"
                name="Cleaner Details"
            />

            <ScrollView className="bg-background h-full rounded-t-3xl pt-3">
                {cleaners.map((cleaner, index) => (
                    <TouchableOpacity
                        key={index}
                        className="px-5 py-3"
                        onPress={() => handleCleanerPress(cleaner)}
                    >
                        <View
                            className="bg-white border border-gray-100 rounded-2xl overflow-hidden h-[100px] justify-center"
                            style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.2)' }}
                        >
                            <View className="p-5 flex-row items-center gap-5">
                                <View className="w-[70px] h-[70px] rounded-full bg-blue-100 flex items-center justify-center">
                                    <Image
                                        source={cleaner.cleanerImg}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            resizeMode: 'cover',
                                        }}
                                        className="rounded-full"
                                    />
                                </View>
                                <View className="justify-center">
                                    <Text
                                        className="text-lg text-gray-800 font-outfit-semibold"
                                        ellipsizeMode="tail"
                                        numberOfLines={1}
                                    >
                                        {cleaner.name}
                                    </Text>
                                    <Text
                                        className="text-[15px] text-gray-500 font-outfit text-start"
                                        ellipsizeMode="tail"
                                        numberOfLines={1}
                                    >
                                        ID: {cleaner.cleanerId}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* <Modal
	visible={modalVisible}
	transparent
	animationType="slide"
	onRequestClose={() => setModalVisible(false)}
	>
		{selectedCleaner && (
			<View className="bg-primary h-full w-full">
				<BackButton
					TouchablityOpacityclassName="flex-row gap-5 p-5"
					className="text-[20px] font-outfit-semibold text-white"
					name="Cleaner Details"
				/>
				<View className='bg-gray-50 rounded-t-3xl h-full w-full'>


					<View className="items-center py-8 relative z-10">
						<View className="w-[130px] h-[130px] rounded-full bg-white overflow-hidden border-4 border-white relative"
							style={{
								shadowColor: '#000',
								shadowOffset: { width: 0, height: 8 },
								shadowOpacity: 0.15,
								shadowRadius: 16,
								elevation: 10
							}}>
							<Image
								source={selectedCleaner.cleanerImg}
								style={{
									width: '100%',
									height: '100%',
									resizeMode: 'cover',
								}}
							/>

						</View>

						<View className="items-center mt-4">
							<Text className="text-gray-900 text-2xl font-outfit-bold">
								{selectedCleaner.name}
							</Text>
							<View className="bg-blue-500 px-4 py-1.5 rounded-full mt-2 flex-row items-center">
								<View className="w-2 h-2 bg-white rounded-full mr-2" />
								<Text className="text-white text-sm font-outfit-semibold">
									Routine
								</Text>
							</View>
						</View>
					</View>

					<View className="px-5 mt-2">
						<View className="bg-white rounded-3xl border border-gray-200 overflow-hidden"
							>

								<View className="flex-row items-center px-6 py-5">

									<View className="flex-1">
										<Text className="text-gray-400 text-xs font-outfit-medium uppercase tracking-wider">Full Name</Text>
										<Text className="text-gray-900 text-lg font-outfit-bold mt-1">
											{selectedCleaner.name}
										</Text>
									</View>
								</View>

								<View className="flex-row items-center px-6 py-5">

									<View className="flex-1">
										<Text className="text-gray-400 text-xs font-outfit-medium uppercase tracking-wider">Employee ID</Text>
										<Text className="text-gray-900 text-lg font-outfit-bold mt-1">
											{selectedCleaner.cleanerId}
										</Text>
									</View>
								</View>

								<View className="flex-row items-center px-6 py-5">

									<View className="flex-1">
										<Text className="text-gray-400 text-xs font-outfit-medium uppercase tracking-wider">Email Address</Text>
										<Text className=" text-lg font-outfit-bold mt-1">
											{selectedCleaner.email}
										</Text>
									</View>
								</View>

								<View className="flex-row items-center px-6 py-5">

									<View className="flex-1">
										<Text className="text-gray-400 text-xs font-outfit-medium uppercase tracking-wider">Phone Number</Text>
										<Text className="text-gray-900 text-lg font-outfit-bold mt-1">
											{selectedCleaner.phone}
										</Text>
									</View>
								</View>

								<View className="flex-row items-start px-6 py-5">

									<View className="flex-1">
										<Text className="text-gray-400 text-xs font-outfit-medium uppercase tracking-wider">Address</Text>
										<Text className="text-gray-900 text-lg font-outfit-bold mt-1 leading-7">
											{selectedCleaner.address}
										</Text>
									</View>
								</View>
						</View>
					</View>

				</View>
			</View>
		)}
	</Modal> */}

            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                {selectedCleaner && (
                    <View className="bg-background h-full w-full">
                        <View className=' relative'>
                            <View className='bg-primary h-[150px] rounded-b-[80px]'>
                                <BackButton
                                    TouchablityOpacityclassName="flex-row gap-5 p-5"
                                    className="text-[20px] font-outfit-semibold text-white"
                                    name="Cleaner Details"
                                />
                            </View>

                            <View className=" absolute top-[80px] left-[140px] w-[130px] h-[130px]  bg-white  border-8 border-primary rounded-full overflow-hidden">
                                <Image
                                    source={selectedCleaner.cleanerImg}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        resizeMode: 'cover',
                                    }}
                                />
                            </View>

                        </View>
                        <View className='mt-[60px]'>
                            <View className="items-center mt-4">
                                <Text className="text-gray-900 text-2xl font-outfit-bold"
                                    numberOfLines={1}
                                    ellipsizeMode='tail'>
                                    {selectedCleaner.name}
                                </Text>
                                <View className="bg-primary px-4 py-1.5 rounded-full mt-2 flex-row items-center">
                                    <Text className="text-white text-sm font-outfit-extrabold ">
                                        {selectedCleaner.cleanerId}
                                    </Text>
                                </View>
                            </View>

                            <View className='mt-10  justify-center gap-5 pl-20'>
                                <View className="flex-row items-center px-6 py-5 gap-5 ">
                                    <View className='bg-blue-100 p-2 justify-center items-center rounded-full '>
                                        <Email stroke={'#0187fd'} />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-gray-400 text-xs font-outfit-medium uppercase tracking-wider">Email Address</Text>
                                        <Text className=" text-lg font-outfit-bold mt-1">
                                            {selectedCleaner.email}
                                        </Text>
                                    </View>
                                </View>

                                <View className="flex-row items-center px-6 py-5 gap-5">
                                    <View className='bg-blue-100 p-2 justify-center items-center rounded-full'>
                                        <Phone stroke={'#0187fd'} />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-gray-400 text-xs font-outfit-medium uppercase tracking-wider">Email Address</Text>
                                        <Text className=" text-lg font-outfit-bold mt-1">
                                            {selectedCleaner.phone}

                                        </Text>
                                    </View>
                                </View>

                                <View className="flex-row items-center px-6 py-5 gap-5">
                                    <View className='bg-blue-100 p-2 justify-center items-center rounded-full'>
                                        <Map stroke={'#0187fd'} />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-gray-400 text-xs font-outfit-medium uppercase tracking-wider">Email Address</Text>
                                        <Text className=" text-lg font-outfit-bold mt-1">
                                            {selectedCleaner.address}

                                        </Text>
                                    </View>
                                </View>

                            </View>
                        </View>
                    </View>
                )}
            </Modal>


        </SafeAreaView>
    );
}
