import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Dot } from '../../../Ui/icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackButton from '../../../Utilites/Breadcrumbs/BackButton';

const Training = () => {
    const insets = useSafeAreaInsets();
  
  return (
    <SafeAreaView className="flex-1  bg-primary ">
      <View
        className=" "
        style={{
          paddingTop: insets.top +1,
          paddingBottom: 10,
          borderBottomLeftRadius: 28,
          borderBottomRightRadius: 28,
        }}
      >
        <BackButton
          TouchablityOpacityclassName="flex-row gap-2 px-6 py-4"
          className="text-[22px] font-outfit-semibold text-white"
          name="Training"
        />
        <View className=" flex w-full h-screen bg-background rounded-t-3xl mt-2 ">
          <View className="mt-3">
            <View className="w-full h-20  flex-row  justify-between item-center py-4 px-3">
              <Text className="text-3xl font-outfit-semibold ">
                {/* Training Schedule */}
              </Text>
              <Dot
                width={30}
                height={30}
                style={{
                  transform: [{ rotateZ: '90deg' }],
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Training;
