
// import React, { useState } from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   View,
//   Text,
//   TouchableOpacity,
//   StatusBar,
// } from 'react-native';
// import BackButton from '../../../Utilites/Breadcrumbs/BackButton';

// interface ReportData {
//   title: string;
//   data1: string;
//   data2: string;
//   data3: string;
//   data4: string;
// }

// export default function QualityManagement({ navigation }: { navigation: any }) {

//   const tableHead: ReportData = {
//     title: 'Metrics',
//     data1: 'Poor',
//     data2: 'Average',
//     data3: 'Good',
//     data4: 'Excellent',
//   };

//   const tableData: ReportData[] = [
//     {
//       title: 'Main entrance & Reception area',
//       data1: '1',
//       data2: '2',
//       data3: '3',
//       data4: '4'
//     },
//     {
//       title: 'Main waiting area',
//       data1: '1',
//       data2: '2',
//       data3: '3',
//       data4: '4'
//     },
//     {
//       title: 'Pantry area',
//       data1: '1',
//       data2: '2',
//       data3: '3',
//       data4: '4'
//     },
//     {
//       title: 'Stationary area',
//       data1: '1',
//       data2: '2',
//       data3: '3',
//       data4: '4'
//     },
//     {
//       title: 'Restroom',
//       data1: '1',
//       data2: '2',
//       data3: '3',
//       data4: '4'
//     }


//   ];

//   return (
//     <SafeAreaView className="flex-1 bg-slate-50">
//       <BackButton
//         TouchablityOpacityclassName="flex-row gap-5 mt-12 p-5 bg-white"
//         className="text-[20px] font-outfit-semibold text-black"
//         name="Quality Management"
//       />

//       <View className='bg-gray-200 h-fit border border-gray-200  p-5'>
//         <View className='bg-gray-700 h-[50px] border flex-row justify-around items-center'>
//           <View>
//             <Text></Text>
//           </View>
//           <View>
//             <Text className=' items-center'>Poor</Text>
//           </View>
//           <View>
//             <Text  className=' items-center'>Avg</Text>
//           </View>
//           <View>
//             <Text  className=' items-center'>Good</Text>
//           </View>
//           <View>
//             <Text  className=' items-center'>Super</Text>
//           </View>
//         </View>
//         <View className='bg-white h-[50px] flex-row justify-around items-center'>
//           <View  className=' items-center'>
//             <Text >a</Text>
//           </View>
//           <View>
//             <Text>a</Text>
//           </View>
//           <View>
//             <Text>a</Text>
//           </View>
//           <View>
//             <Text>a</Text>
//           </View>
//           <View>
//             <Text>a</Text>
//           </View>
//         </View>

//       </View>
//     </SafeAreaView>
//   );
// }

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



export default function QualityManagement({ navigation }: { navigation: any }) {








  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackButton
        TouchablityOpacityclassName="flex-row gap-5 mt-12 p-5 bg-white"
        className="text-[20px] font-outfit-semibold text-black"
        name="Quality Management"
      />

     
       
    </SafeAreaView>
  );
}
