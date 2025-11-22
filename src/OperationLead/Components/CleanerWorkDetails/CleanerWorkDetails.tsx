import React, { useRef, useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, ScrollView, Image, Modal, ImageSourcePropType, } from 'react-native';
import Signature from 'react-native-signature-canvas';
import BackButton from '../../../Utilites/Breadcrumbs/BackButton';
import { Close, Pencil } from '../../../Ui/icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { configureReanimatedLogger } from 'react-native-reanimated';
import Completed from '../../../Utilites/Completed/Completed';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import axios from 'axios';
import Loader from '../../../Ui/Loader/Loader';
import Config from 'react-native-config';

type RootStackParamList = {
    CleanerDetails: {
        cleaner: {
            userId: string;
            name: string;
            userImg: ImageSourcePropType;
        };
    };
};

interface contractorDetails {
    id: String;
    ownerName: String;
    locationName: String;
    ownerPhone: String;
    ownerEmail: String;
}
interface cleanerDetails {
    userId: string;
    name: string;
}
interface workDetails {
    id: number;
    area: string;
    status: string;
    assignedTo: string;
}

export default function CleanerWorkDetails({ navigation }: { navigation: any }) {
    const route = useRoute<RouteProp<RootStackParamList, 'CleanerDetails'>>();
    const { cleaner } = route.params;
    configureReanimatedLogger({ strict: false });
    const signatureRef = useRef<any>(null);
    const [signatureVisible, setSignatureVisible] = useState(false);
    const [signatureData, setSignatureData] = useState<string | null>(null);
    const [signatureError, setSignatureError] = useState<string | null>(null);
    const [verifyVisible, setVerifyVisible] = useState(false);
    const [completedVisible, setCompletedVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const insets = useSafeAreaInsets();

    const handleSubmit = async () => {
        if (!signatureData) {
            setSignatureError('Please provide your signature before submitting');
            return;
        }
        setSignatureError(null);
        // setIsSubmitting(true);
        setCompletedVisible(true);  //temporary 

        try {
            const cleanedBase64 = signatureData.replace('data:image/png;base64,', '');
            const assignedTask = workDetails.filter(task => task.assignedTo === cleaner.userId);
            const today = new Date();
            const singaporeDate = today.toLocaleDateString('en-CA', { timeZone: 'Asia/Singapore' });
            const singaporeTime = today.toLocaleTimeString('en-GB', { timeZone: 'Asia/Singapore', hour12: false });
            const payload = {
                contractorId: contractorDetails.id,
                contractorName: contractorDetails.ownerName,
                locationName: contractorDetails.locationName,
                contractorPhone: contractorDetails.ownerPhone,
                contractorEmail: contractorDetails.ownerEmail,
                cleanerId: cleaner.userId,
                cleanerName: cleaner.name,
                workStatus: assignedTask.map(task => ({
                    area: task.area,
                    status: task.status,
                })),
                signature: cleanedBase64.replace('data:image/png;base64,', ''),
                submissionDate: singaporeDate,
                submissionTime: singaporeTime,
            };

            const API = Config.API_URL;
            await axios.post(`${API}submissions`, payload, {
                headers: { 'Content-Type': 'application/json' }
            });
       
            setVerifyVisible(false);
            setCompletedVisible(true);

        } catch (error) {
            console.error('error sending data:', error);
        }
        finally {
            setIsSubmitting(false);
        }
    };

    const handleSignatureOK = (sig: string) => {
        setSignatureData(sig);
        setSignatureVisible(false);
        setSignatureError(null);
    };

    const handleCancelSignature = () => {
        setSignatureData(null);
        setSignatureError(null);
        signatureRef.current?.clearSignature();
        setVerifyVisible(false);
    };

    const saveSignature = () => { signatureRef.current?.readSignature(); };

    const clearSignature = () => { signatureRef.current?.clearSignature(); };

    const currentDate = new Date();
    const date = currentDate.toLocaleDateString('en-SG', { timeZone: 'Asia/Singapore' });
    // console.log(date)
    const time = currentDate.toLocaleTimeString('en-SG', { timeZone: 'Asia/Singapore' });
    // console.log(time)



    const contractorDetails: contractorDetails =
    {
        id: 'CT2025101',
        ownerName: 'William',
        locationName: 'Bayshore Global 28 Duxton Hill',
        ownerPhone: '9876543210',
        ownerEmail: 'William@gmail.com'
    }

    const cleanerDetails: cleanerDetails[] = [cleaner];

    const workDetails: workDetails[] = [
        {
            id: 1,
            area: 'Main entrance & Reception',
            status: 'completed',
            assignedTo: 'CL2025101'
        },
        {
            id: 2,
            area: 'Main waiting area',
            // status: 'pending',
            status: 'not started',
            assignedTo: 'CL2025101'
        },
        {
            id: 3,
            area: 'Pantry area',
            // status: 'pending',
            status: 'not started',
            assignedTo: 'CL2025101'
        },
        {
            id: 4,
            area: 'Stationary area',
            // status: 'pending',
            status: 'not started',
            assignedTo: 'CL2025101'
        },
        {
            id: 5,
            area: 'Restroom',
            // status: 'pending',
            status: 'not started',
            assignedTo: 'CL2025101'
        },
        {
            id: 6,
            area: 'Main entrance & Reception',
            status: 'completed',
            assignedTo: 'CL2025102'
        },
        {
            id: 7,
            area: 'Main waiting area',
            status: 'completed',
            assignedTo: 'CL2025102'
        },
        {
            id: 8,
            area: 'Pantry area',
            status: 'completed',
            assignedTo: 'CL2025102'
        },
        {
            id: 9,
            area: 'Stationary area',
            status: 'completed',
            assignedTo: 'CL2025102'
        },
        {
            id: 10,
            area: 'Restroom',
            status: 'completed',
            assignedTo: 'CL2025102'
        },


    ];

    const filteredWorkDetails = workDetails.filter(
        (task) => task.assignedTo === cleaner.userId
    );
    // console.log(filteredWorkDetails)




    return (
        <SafeAreaView className='flex-1 bg-primary' style={{ paddingTop: insets.top + 10, }}>

            {isSubmitting && <Loader />}

            <BackButton
                TouchablityOpacityclassName='flex-row gap-5 p-5 '
                className='text-[20px] font-outfit-semibold text-textWhite '
                name='Work Details' />

            {cleanerDetails && (
                <View className='bg-white rounded-3xl p-6 mx-5 mb-5'>
                    <View className='flex-row justify-between items-center'>
                        <View className='w-20 h-20 rounded-2xl overflow-hidden mr-4'>
                            <Image
                                source={cleaner.userImg}
                                style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                            />
                        </View>
                        <View className='flex-1'>
                            <Text className='text-2xl font-outfit-bold text-gray-600' numberOfLines={1}>
                                {cleaner.name}
                            </Text>
                            <Text className='text-gray-500'>ID: {cleaner.userId}</Text>
                        </View>
                    </View>
                </View>

            )}

            <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
                <View className='bg-white h-screen rounded-t-3xl flex-1 px-5 pt-6'>
                    <View className='items-center justify-between mb-6'>
                        <Text className='text-[18px] font-outfit-semibold text-gray-800'>
                            Bayshore Global 28 Duxton Hill
                        </Text>
                    </View>

                    {filteredWorkDetails.map((item) => (
                        <View key={item.id} className="bg-white border border-gray-100 rounded-2xl p-4 mb-5">
                            <View className="flex-row items-center justify-between">
                                <Text className="text-lg font-outfit-medium text-gray-800 mb-1">
                                    {item.area}
                                </Text>
                                <View
                                    className={`px-3 py-2 rounded-full min-w-[90px] items-center
                        ${item.status === 'pending' ? 'bg-orange-100'
                                            : item.status === 'completed' ? 'bg-green-100'
                                                : 'bg-red-100'}`}
                                >
                                    <Text
                                        className={`text-xs font-outfit capitalize
                            ${item.status === 'pending' ? 'text-orange-700'
                                                : item.status === 'completed' ? 'text-green-700'
                                                    : 'text-red-700'}`}
                                    >
                                        {item.status}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))}

                    <View className='p-5'>
                        <TouchableOpacity
                            className={`rounded-xl py-4 items-center shadow-sm 
                    ${filteredWorkDetails.every(item => item.status === 'completed')
                                    ? 'bg-primary'
                                    : 'bg-gray-300'
                                }`}
                            disabled={!filteredWorkDetails.every(item => item.status === 'completed')}
                            onPress={() => setVerifyVisible(true)}
                        >
                            <Text className='text-white text-[18px] font-semibold'>Verify</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>


            <Modal
                visible={verifyVisible}
                animationType='slide'
                transparent
                onRequestClose={() => setVerifyVisible(false)}
            >
                <View className='bg-background'>
                    <View className=' h-full pt-4'>

                        <View className='flex-row justify-center'>
                            <View className=' absolute left-5 w-[50px] h-[50px] rounded-full'>
                                <Image source={require('../../../assets/Login/logo.png')}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        resizeMode: 'cover',
                                    }}
                                    className='rounded-full' />
                            </View>
                            <View>
                                <Text className='text-[30px] font-outfit-semibold text-green-600 text-center capitalize'>kleenmatic</Text>
                                <Text className='text-[15px] font-outfit-medium text-gray-400 text-center'>service</Text>
                            </View>
                        </View>

                        <View className='bg-gray-300/50 h-[1px] mt-5' />

                        <ScrollView className='flex-1 px-6' showsVerticalScrollIndicator={false}>

                            {contractorDetails && (
                                <View className='bg-gray-50 rounded-2xl p-5  gap-2 mt-5 mb-5'>
                                    <View>
                                        <Text>Contractor Details</Text>
                                    </View>
                                    <View className='flex-row '>
                                        <Text className='w-[100px] font-outfit text-textLight'>Contract ID</Text>
                                        <Text className='w-[200px] font-outfit-semibold text-primary'><Text className='text-black'>:</Text> {contractorDetails.id || 'none'}</Text>
                                    </View>
                                    <View className='flex-row '>
                                        <Text className='w-[100px] font-outfit text-textLight '>Name</Text>
                                        <Text className='w-[200px] font-outfit capitalize'>: {contractorDetails.ownerName || 'none'}</Text>
                                    </View>
                                    <View className='flex-row '>
                                        <Text className='w-[100px] font-outfit text-textLight'>Address</Text>
                                        <Text className='w-[200px] font-outfit'>: {contractorDetails.locationName || 'none'}</Text>
                                    </View>
                                    <View className='flex-row '>
                                        <Text className='w-[100px] font-outfit text-textLight'>Email</Text>
                                        <Text className='w-[200px] font-outfit'>: {contractorDetails.ownerEmail || 'none'} </Text>
                                    </View>
                                    <View className='flex-row '>
                                        <Text className='w-[100px] font-outfit text-textLight'>Phone</Text>
                                        <Text className='w-[200px] font-outfit'>: {contractorDetails.ownerPhone || 'none'}</Text>
                                    </View>
                                </View>
                            )}

                            {cleanerDetails && (
                                <View className='bg-gray-50 rounded-2xl p-5  gap-2 mt-5 mb-5'>
                                    <View>
                                        <Text>Cleaner Details</Text>
                                    </View>
                                    <View className='flex-row '>
                                        <Text className='w-[100px] font-outfit text-textLight'>Contract ID</Text>
                                        <Text className='w-[200px] font-outfit-semibold text-primary'><Text className='text-black'>:</Text> {cleaner.userId || 'CL2025101'}</Text>
                                    </View>
                                    <View className='flex-row '>
                                        <Text className='w-[100px] font-outfit text-textLight '>Name</Text>
                                        <Text className='w-[200px] font-outfit cap'>: {cleaner.name}</Text>
                                    </View>
                                </View>
                            )}


                            <View className='bg-gray-50 rounded-2xl p-6 mb-6 gap-3'>
                                <Text className='text-lg font-outfit-light text-gray-800 '>Task Progress</Text>

                                <View className='flex-row justify-between '>
                                    <Text className='text-[10px] text-textLight'>Date: {date}</Text>
                                    <Text className='text-[10px] text-textLight'>Time: {time}</Text>
                                </View>

                                <View className='gap-3'>
                                    {filteredWorkDetails.map((item) => (
                                        <View key={item.id} className='bg-white rounded-xl p-4 border border-gray-200 '>
                                            <View className='flex-row items-center justify-between'>
                                                <View className='flex-1'>
                                                    <Text className='text-base font-outfit-medium text-gray-800 flex-shrink'
                                                        numberOfLines={1}
                                                        ellipsizeMode='tail'>
                                                        {item.area}
                                                    </Text>
                                                </View>
                                                <View className='ml-4'>
                                                    <View
                                                        className={`px-3 py-2 rounded-full min-w-[90px] items-center
                                                                ${item.status === 'pending' ? 'bg-orange-100'
                                                                : item.status === 'completed' ? 'bg-green-100'
                                                                    : 'bg-red-100'}`}
                                                    >
                                                        <Text
                                                            className={`text-xs font-outfit-semibold capitalize
                                                                    ${item.status === 'pending' ? 'text-orange-700'
                                                                    : item.status === 'completed' ? 'text-green-700'
                                                                        : 'text-red-700'}`}
                                                        >
                                                            {item.status}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            <View className='bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-8'>
                                <View className='items-center gap-4'>
                                    <Text className='text-lg font-outfit-medium text-gray-800'>Client Signature</Text>
                                    <Text className='text-sm font-outfit text-center text-gray-600'>Please provide your signature to approve the completed tasks</Text>

                                    <TouchableOpacity
                                        onPress={() => setSignatureVisible(true)}
                                        className={`bg-white rounded-xl p-4 border-2 border-dashed w-[180px] h-[90px] justify-center items-center
                                        ${signatureError ? 'border-red-600' : 'border-gray-300'}
                                        `}>
                                        {signatureData ? (
                                            <Image
                                                source={{ uri: signatureData }}
                                                className='w-48 h-16'
                                                resizeMode='contain'
                                            />
                                        ) : (
                                            <View className='items-center space-y-2'>
                                                <View className={`w-12 h-12 bg-blue-100 rounded-full items-center justify-center 
                                                    ${signatureError ? 'bg-red-200' : 'bg-blue-100'} `}>
                                                    {
                                                        signatureError ?
                                                            <Pencil stroke={'red'} /> : <Pencil stroke={'#0187fd'} />


                                                    }

                                                </View>
                                                <Text className='text-sm font-medium text-gray-600'>Tap to sign</Text>
                                            </View>
                                        )}
                                    </TouchableOpacity>

                                    {signatureError && (
                                        <Text className='text-red-600'>
                                            {signatureError}
                                        </Text>
                                    )}

                                </View>
                            </View>
                        </ScrollView>

                        <View className=' py-8 bg-white border-t border-gray-100'>
                            <View className='flex-row justify-center gap-10'>
                                <TouchableOpacity
                                    onPress={handleCancelSignature}
                                    className=' bg-red-100 border border-red-300 rounded-2xl w-[150px] h-10 justify-center'>
                                    <Text className='text-center font-outfit-semibold text-red-700 text-base'>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    className='bg-primary rounded-2xl w-[150px] h-10 justify-center'>
                                    <Text className='text-center font-outfit-semibold text-textWhite text-base'>Submit</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={signatureVisible}
                animationType='slide'
                transparent
                onRequestClose={() => setSignatureVisible(false)}
            >
                <View className='bg-black/50 flex-1 justify-center items-center'>
                    <View className='w-[90%] h-[50%] bg-white rounded-xl p-5'>
                        <Text className='text-center text-[16px] font-semibold mb-2'>Client Signature</Text>
                        <Signature
                            ref={signatureRef}
                            onOK={handleSignatureOK}
                            imageType='image/png'
                            webStyle={`
                                .m-signature-pad--body { background-color: #f0f0f0; }
                                .m-signature-pad--footer { display: none; }
                            `}
                        />
                        <TouchableOpacity
                            onPress={() => setSignatureVisible(false)}
                            className=' absolute top-3 right-3'>
                            <Close stroke={'red'} />
                        </TouchableOpacity>
                        <View className='flex-row justify-around '>
                            <TouchableOpacity onPress={clearSignature}
                                className='bg-red-100 border border-red-300 rounded-2xl w-[150px] h-10 justify-center'>
                                <Text className='text-center font-outfit-semibold text-red-700 text-base'>Clear</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={saveSignature}
                                className='bg-primary rounded-2xl w-[150px] h-10 justify-center'>
                                <Text className='text-center font-outfit-semibold text-textWhite text-base'>Submit</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={completedVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setCompletedVisible(false)}
                className='bg-primary'

            >
                <Completed
                    title="Thank You!"
                    message="Your details have been successfully submitted"
                    icon={require("../../../assets/Conformation/conformation2.png")}
                    buttonText="OK"
                    onPress={() => { navigation.navigate('OperatorHome'); }}
                />

            </Modal>


        </SafeAreaView>
    );
}






// import React, { useRef, useState } from 'react';
// import {SafeAreaView,Text,View,TouchableOpacity,ScrollView,Image,Modal,ImageSourcePropType,} from 'react-native';
// import Signature from 'react-native-signature-canvas';
// import BackButton from '../../../Utilites/Breadcrumbs/BackButton';
// import { Close, Pencil } from '../../../Ui/icons';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { configureReanimatedLogger } from 'react-native-reanimated';
// import Completed from '../../../Utilites/Completed/Completed';
// import { useRoute } from '@react-navigation/native';
// import type { RouteProp } from '@react-navigation/native';
// import axios from 'axios';
// import Loader from '../../../Ui/Loader/Loader';

// type RootStackParamList = {
//     CleanerDetails: {
//         cleaner: {
//             userId: string;
//             name: string;
//             userImg: ImageSourcePropType;
//         };
//     };
// };

// interface contractorDetails {
//     id: String;
//     ownerName: String;
//     locationName: String;
//     ownerPhone: String;
//     ownerEmail: String;
// }
// interface cleanerDetails {
//     userId: string;
//     name: string;
// }
// interface workDetails {
//     id: number;
//     area: string;
//     status: string;
//     assignedTo: string;
// }

// export default function CleanerDetails({ navigation }: { navigation: any }) {
//     const route = useRoute<RouteProp<RootStackParamList, 'CleanerDetails'>>();
//     const { cleaner } = route.params;
//     configureReanimatedLogger({ strict: false });
//     const signatureRef = useRef<any>(null);
//     const [signatureVisible, setSignatureVisible] = useState(false);
//     const [signatureData, setSignatureData] = useState<string | null>(null);
//     const [signatureError, setSignatureError] = useState<string | null>(null);
//     const [verifyVisible, setVerifyVisible] = useState(false);
//     const [completedVisible, setCompletedVisible] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const insets = useSafeAreaInsets();

//     const handleSubmit = async () => {
//         if (!signatureData) {
//             setSignatureError('Please provide your signature before submitting');
//             return;
//         }
//         setSignatureError(null);
//         setIsSubmitting(true);

//         try {
//             const cleanedBase64 = signatureData.replace('data:image/png;base64,', '');
//             const assignedTask = workDetails.filter(task => task.assignedTo === cleaner.userId);
//             const payload = {
//                 contractorDetails: {
//                     id: contractorDetails.id,
//                     ownerName: contractorDetails.ownerName,
//                     locationName: contractorDetails.locationName,
//                     ownerPhone: contractorDetails.ownerPhone,
//                     ownerEmail: contractorDetails.ownerEmail,
//                 },
//                 cleanerDetails: {
//                     userId: cleaner.userId,
//                     name: cleaner.name,
//                 },
//                 workStatus: assignedTask.map(task => ({
//                     area: task.area,
//                     status: task.status,
//                 })),
//                 signature: cleanedBase64,
//                 timestamp: {
//                     date,
//                     time,
//                 },
//             };
//             // console.log('Contractor Name:', payload.contractorDetails.ownerName, console.log(payload.contractorDetails.id))
//             // console.log('Cleaner Name:', payload.cleanerDetails.name)
//             // console.log('Contractor Signature:', payload.signature)
//             await axios.post('http://your-backend-url.com/api/submit-data', payload, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });
//             console.log('All data sent successfully', payload.cleanerDetails, payload.contractorDetails, payload.workStatus, payload.signature);
//             setVerifyVisible(false);
//             setCompletedVisible(true);

//         } catch (error) {
//             console.error('error sending data:', error);
//         }
//         finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleSignatureOK = (sig: string) => {
//         setSignatureData(sig);
//         setSignatureVisible(false);
//         setSignatureError(null);
//     };

//     const handleCancelSignature = () => {
//         setSignatureData(null);
//         setSignatureError(null);
//         signatureRef.current?.clearSignature();
//         setVerifyVisible(false);
//     };

//     const saveSignature = () => { signatureRef.current?.readSignature(); };

//     const clearSignature = () => { signatureRef.current?.clearSignature(); };

//     const currentDate = new Date();
//     const date = currentDate.toLocaleDateString('en-SG', { timeZone: 'Asia/Singapore' });
//     // console.log(date)
//     const time = currentDate.toLocaleTimeString('en-SG', { timeZone: 'Asia/Singapore' });
//     // console.log(time)



//     const contractorDetails: contractorDetails =
//     {
//         id: 'CT2025101',
//         ownerName: 'William',
//         locationName: 'Bayshore Global 28 Duxton Hill',
//         ownerPhone: '9876543210',
//         ownerEmail: 'William@gmail.com'
//     }

//     const cleanerDetails: cleanerDetails[] = [cleaner];

//     const workDetails: workDetails[] = [
//         {
//             id: 1,
//             area: 'Main entrance & Reception',
//             status: 'completed',
//             assignedTo: 'CL2025101'
//         },
//         {
//             id: 2,
//             area: 'Main waiting area',
//             status: 'pending',
//             assignedTo: 'CL2025101'
//         },
//         {
//             id: 3,
//             area: 'Pantry area',
//             status: 'pending',
//             assignedTo: 'CL2025101'
//         },
//         {
//             id: 4,
//             area: 'Stationary area',
//             status: 'pending',
//             assignedTo: 'CL2025101'
//         },
//         {
//             id: 5,
//             area: 'Restroom',
//             status: 'pending',
//             assignedTo: 'CL2025101'
//         },
//         {
//             id: 6,
//             area: 'Main entrance & Reception',
//             status: 'completed',
//             assignedTo: 'CL2025102'
//         },
//         {
//             id: 7,
//             area: 'Main waiting area',
//             status: 'completed',
//             assignedTo: 'CL2025102'
//         },
//         {
//             id: 8,
//             area: 'Pantry area',
//             status: 'completed',
//             assignedTo: 'CL2025102'
//         },
//         {
//             id: 9,
//             area: 'Stationary area',
//             status: 'completed',
//             assignedTo: 'CL2025102'
//         },
//         {
//             id: 10,
//             area: 'Restroom',
//             status: 'pending',
//             assignedTo: 'CL2025102'
//         },


//     ];

//     const filteredWorkDetails = workDetails.filter(
//         (task) => task.assignedTo === cleaner.userId
//     );
//     // console.log(filteredWorkDetails)




//     return (
//         <SafeAreaView className='flex-1 bg-primary' style={{ paddingTop: insets.top + 10, }}>

//             {isSubmitting && <Loader />}

//             <BackButton
//                 TouchablityOpacityclassName='flex-row gap-5 p-5 '
//                 className='text-[20px] font-outfit-semibold text-textWhite '
//                 name='Work Details' />

//             {cleanerDetails && (
//                 <View className='bg-white rounded-3xl p-6 mx-5 mb-5'>
//                     <View className='flex-row justify-between items-center'>
//                         <View className='w-20 h-20 rounded-2xl overflow-hidden mr-4'>
//                             <Image
//                                 source={cleaner.userImg}
//                                 style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
//                             />
//                         </View>
//                         <View className='flex-1'>
//                             <Text className='text-2xl font-outfit-bold text-gray-600' numberOfLines={1}>
//                                 {cleaner.name}
//                             </Text>
//                             <Text className='text-gray-500'>ID: {cleaner.userId}</Text>
//                         </View>
//                     </View>
//                 </View>

//             )}

//             <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
//                 <View className='bg-white h-screen rounded-t-3xl flex-1 px-5 pt-6'>
//                     <View className='items-center justify-between mb-6'>
//                         <Text className='text-[18px] font-outfit-semibold text-gray-800'>Bayshore Global 28 Duxton Hill</Text>
//                     </View>

//                     {filteredWorkDetails.map((item) => (
//                         <View key={item.id} className="bg-white border border-gray-100 rounded-2xl p-4 mb-5">
//                             <View className="flex-row items-center justify-between">
//                                 <Text className="text-lg font-outfit-medium text-gray-800 mb-1">
//                                     {item.area}
//                                 </Text>
//                                 <View
//                                     className={`px-3 py-2 rounded-full min-w-[90px] items-center
//                                     ${item.status === 'pending' ? 'bg-orange-100'
//                                     : item.status === 'completed' ? 'bg-green-100'
//                                     : 'bg-red-100'}`}
//                                 >
//                                     <Text
//                                         className={`text-xs font-outfit capitalize
//                                         ${item.status === 'pending' ? 'text-orange-700'
//                                         : item.status === 'completed' ? 'text-green-700'
//                                         : 'text-red-700'}`}
//                                     >
//                                         {item.status}
//                                     </Text>
//                                 </View>
//                             </View>
//                         </View>
//                     ))}

//                     <View className='p-5'>
//                         <TouchableOpacity
//                             className='bg-primary rounded-xl py-4 items-center shadow-sm'
//                             onPress={() => setVerifyVisible(true)}
//                         >
//                             <Text className='text-white text-[18px] font-semibold'>Verify</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </ScrollView>

//             <Modal
//                 visible={verifyVisible}
//                 animationType='slide'
//                 transparent
//                 onRequestClose={() => setVerifyVisible(false)}
//             >
//                 <View className='bg-background'>
//                     <View className=' h-full pt-4'>

//                         <View className='flex-row justify-center'>
//                             <View className=' absolute left-5 w-[50px] h-[50px] rounded-full'>
//                                 <Image source={require('../../../assets/Login/logo.png')}
//                                     style={{
//                                         width: '100%',
//                                         height: '100%',
//                                         resizeMode: 'cover',
//                                     }}
//                                     className='rounded-full' />
//                             </View>
//                             <View>
//                                 <Text className='text-[30px] font-outfit-semibold text-green-600 text-center capitalize'>kleenmatic</Text>
//                                 <Text className='text-[15px] font-outfit-medium text-gray-400 text-center'>service</Text>
//                             </View>
//                         </View>

//                         <View className='bg-gray-300/50 h-[1px] mt-5' />

//                         <ScrollView className='flex-1 px-6' showsVerticalScrollIndicator={false}>
                            
//                             {contractorDetails && (
//                                 <View className='bg-gray-50 rounded-2xl p-5  gap-2 mt-5 mb-5'>
//                                     <View>
//                                         <Text>Contractor Details</Text>
//                                     </View>
//                                     <View className='flex-row '>
//                                         <Text className='w-[100px] font-outfit text-textLight'>Contract ID</Text>
//                                         <Text className='w-[200px] font-outfit-semibold text-primary'><Text className='text-black'>:</Text> {contractorDetails.id || 'none'}</Text>
//                                     </View>
//                                     <View className='flex-row '>
//                                         <Text className='w-[100px] font-outfit text-textLight '>Name</Text>
//                                         <Text className='w-[200px] font-outfit capitalize'>: {contractorDetails.ownerName || 'none'}</Text>
//                                     </View>
//                                     <View className='flex-row '>
//                                         <Text className='w-[100px] font-outfit text-textLight'>Address</Text>
//                                         <Text className='w-[200px] font-outfit'>: {contractorDetails.locationName || 'none'}</Text>
//                                     </View>
//                                     <View className='flex-row '>
//                                         <Text className='w-[100px] font-outfit text-textLight'>Email</Text>
//                                         <Text className='w-[200px] font-outfit'>: {contractorDetails.ownerEmail || 'none'} </Text>
//                                     </View>
//                                     <View className='flex-row '>
//                                         <Text className='w-[100px] font-outfit text-textLight'>Phone</Text>
//                                         <Text className='w-[200px] font-outfit'>: {contractorDetails.ownerPhone || 'none'}</Text>
//                                     </View>
//                                 </View>
//                             )}

//                             {cleanerDetails && (
//                                 <View className='bg-gray-50 rounded-2xl p-5  gap-2 mt-5 mb-5'>
//                                     <View>
//                                         <Text>Cleaner Details</Text>
//                                     </View>
//                                     <View className='flex-row '>
//                                         <Text className='w-[100px] font-outfit text-textLight'>Contract ID</Text>
//                                         <Text className='w-[200px] font-outfit-semibold text-primary'><Text className='text-black'>:</Text> {cleaner.userId || 'CL2025101'}</Text>
//                                     </View>
//                                     <View className='flex-row '>
//                                         <Text className='w-[100px] font-outfit text-textLight '>Name</Text>
//                                         <Text className='w-[200px] font-outfit cap'>: {cleaner.name}</Text>
//                                     </View>
//                                 </View>
//                             )}


//                             <View className='bg-gray-50 rounded-2xl p-6 mb-6 gap-3'>
//                                 <Text className='text-lg font-outfit-light text-gray-800 '>Task Progress</Text>

//                                 <View className='flex-row justify-between '>
//                                     <Text className='text-[10px] text-textLight'>Date: {date}</Text>
//                                     <Text className='text-[10px] text-textLight'>Time: {time}</Text>
//                                 </View>

//                                 <View className='gap-3'>
//                                     {filteredWorkDetails.map((item) => (
//                                         <View key={item.id} className='bg-white rounded-xl p-4 border border-gray-200 '>
//                                             <View className='flex-row items-center justify-between'>
//                                                 <View className='flex-1'>
//                                                     <Text className='text-base font-outfit-medium text-gray-800 flex-shrink'
//                                                         numberOfLines={1}
//                                                         ellipsizeMode='tail'>
//                                                         {item.area}
//                                                     </Text>
//                                                 </View>
//                                                 <View className='ml-4'>
//                                                     <View
//                                                         className={`px-3 py-2 rounded-full min-w-[90px] items-center
//                                                                 ${item.status === 'pending' ? 'bg-orange-100'
//                                                                 : item.status === 'completed' ? 'bg-green-100'
//                                                                     : 'bg-red-100'}`}
//                                                     >
//                                                         <Text
//                                                             className={`text-xs font-outfit-semibold capitalize
//                                                                     ${item.status === 'pending' ? 'text-orange-700'
//                                                                     : item.status === 'completed' ? 'text-green-700'
//                                                                         : 'text-red-700'}`}
//                                                         >
//                                                             {item.status}
//                                                         </Text>
//                                                     </View>
//                                                 </View>
//                                             </View>
//                                         </View>
//                                     ))}
//                                 </View>
//                             </View>

//                             <View className='bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-8'>
//                                 <View className='items-center gap-4'>
//                                     <Text className='text-lg font-outfit-medium text-gray-800'>Client Signature</Text>
//                                     <Text className='text-sm font-outfit text-center text-gray-600'>Please provide your signature to approve the completed tasks</Text>
                                    
//                                     <TouchableOpacity
//                                         onPress={() => setSignatureVisible(true)}
//                                         className={`bg-white rounded-xl p-4 border-2 border-dashed w-[180px] h-[90px] justify-center items-center
//                                         ${signatureError ? 'border-red-600' : 'border-gray-300'}
//                                         `}>
//                                         {signatureData ? (
//                                             <Image
//                                                 source={{ uri: signatureData }}
//                                                 className='w-48 h-16'
//                                                 resizeMode='contain'
//                                             />
//                                         ) : (
//                                             <View className='items-center space-y-2'>
//                                                 <View className={`w-12 h-12 bg-blue-100 rounded-full items-center justify-center 
//                                                     ${signatureError ? 'bg-red-200' : 'bg-blue-100'} `}>
//                                                     {
//                                                         signatureError ?
//                                                             <Pencil stroke={'red'} /> : <Pencil stroke={'#0187fd'} />


//                                                     }

//                                                 </View>
//                                                 <Text className='text-sm font-medium text-gray-600'>Tap to sign</Text>
//                                             </View>
//                                         )}
//                                     </TouchableOpacity>

//                                     {signatureError && (
//                                         <Text className='text-red-600'>
//                                             {signatureError}
//                                         </Text>
//                                     )}

//                                 </View>
//                             </View>
//                         </ScrollView>

//                         <View className=' py-8 bg-white border-t border-gray-100'>
//                             <View className='flex-row justify-center gap-10'>
//                                 <TouchableOpacity
//                                     onPress={handleCancelSignature}
//                                     className=' bg-red-100 border border-red-300 rounded-2xl w-[150px] h-10 justify-center'>
//                                     <Text className='text-center font-outfit-semibold text-red-700 text-base'>Cancel</Text>
//                                 </TouchableOpacity>

//                                 <TouchableOpacity
//                                     onPress={handleSubmit}
//                                     className='bg-primary rounded-2xl w-[150px] h-10 justify-center'>
//                                     <Text className='text-center font-outfit-semibold text-textWhite text-base'>Submit</Text>
//                                 </TouchableOpacity>

//                             </View>
//                         </View>
//                     </View>
//                 </View>
//             </Modal>

//             <Modal
//                 visible={signatureVisible}
//                 animationType='slide'
//                 transparent
//                 onRequestClose={() => setSignatureVisible(false)}
//             >
//                 <View className='bg-black/50 flex-1 justify-center items-center'>
//                     <View className='w-[90%] h-[50%] bg-white rounded-xl p-5'>
//                         <Text className='text-center text-[16px] font-semibold mb-2'>Client Signature</Text>
//                         <Signature
//                             ref={signatureRef}
//                             onOK={handleSignatureOK}
//                             imageType='image/png'
//                             webStyle={`
//                                 .m-signature-pad--body { background-color: #f0f0f0; }
//                                 .m-signature-pad--footer { display: none; }
//                             `}
//                         />
//                         <TouchableOpacity
//                             onPress={() => setSignatureVisible(false)}
//                             className=' absolute top-3 right-3'>
//                             <Close stroke={'red'} />
//                         </TouchableOpacity>
//                         <View className='flex-row justify-around '>
//                             <TouchableOpacity onPress={clearSignature}
//                                 className='bg-red-100 border border-red-300 rounded-2xl w-[150px] h-10 justify-center'>
//                                 <Text className='text-center font-outfit-semibold text-red-700 text-base'>Clear</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity onPress={saveSignature}
//                                 className='bg-primary rounded-2xl w-[150px] h-10 justify-center'>
//                                 <Text className='text-center font-outfit-semibold text-textWhite text-base'>Submit</Text>
//                             </TouchableOpacity>

//                         </View>
//                     </View>
//                 </View>
//             </Modal>

//             <Modal
//                 visible={completedVisible}
//                 transparent
//                 animationType="slide"
//                 onRequestClose={() => setCompletedVisible(false)}
//                 className='bg-primary'
               
//             >
//                 <Completed
//                     title="Thank You!"
//                     message="Your details have been successfully submitted"
//                     icon={require("../../../assets/Conformation/conformation2.png")}
//                     buttonText="OK"
//                     onPress={() => { navigation.navigate('OperatorHome'); }}
//                 />

//             </Modal>


//         </SafeAreaView>
//     );
// }
