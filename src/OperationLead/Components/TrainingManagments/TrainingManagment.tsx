import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  ImageSourcePropType,
  SafeAreaView,
  Image,
} from "react-native";
import BackButton from "../../../Utilites/Breadcrumbs/BackButton";
import LinearGradient from "react-native-linear-gradient";
import { Search } from "../../../Ui/icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Cleaner {
  id: string;
  name: string;
  imagePath: ImageSourcePropType;
}

interface AssignedTraining {
  id: string;
  name: string;
  type: string;
}

const cleaners: Cleaner[] = [
  { id: "C001", name: "Tan Wei Ming", imagePath: require('../../../assets/OperationLead/User/user.png') },
  { id: "C002", name: "Lim Jia Hui", imagePath: require('../../../assets/OperationLead/User/user.png') },
  { id: "C003", name: "Ng Kok Leong", imagePath: require('../../../assets/OperationLead/User/user.png') },
  { id: "C004", name: "Chong Li Ting", imagePath: require('../../../assets/OperationLead/User/user.png') },
  { id: "C005", name: "Teo Jun Hao", imagePath: require('../../../assets/OperationLead/User/user.png') },
  { id: "C006", name: "Goh Mei Ling", imagePath: require('../../../assets/OperationLead/User/user.png') },
  { id: "C007", name: "Ong Wei Jie", imagePath: require('../../../assets/OperationLead/User/user.png') },
  { id: "C008", name: "Chia Hui Min", imagePath: require('../../../assets/OperationLead/User/user.png') },
  { id: "C009", name: "Yong Zi Xuan", imagePath: require('../../../assets/OperationLead/User/user.png') },
  { id: "C010", name: "Wong Chee Keong", imagePath: require('../../../assets/OperationLead/User/user.png') },
  { id: "C011", name: "Tan Hui Ying", imagePath: require('../../../assets/OperationLead/User/user.png') },
  { id: "C012", name: "Sim Jun Jie", imagePath: require('../../../assets/OperationLead/User/user.png') },
  { id: "C013", name: "Pang Yi Xuan", imagePath: require('../../../assets/OperationLead/User/user.png') },
  { id: "C014", name: "Koh Wen Jie", imagePath: require('../../../assets/OperationLead/User/user.png') },
  { id: "C015", name: "Chew Siew Ling", imagePath: require('../../../assets/OperationLead/User/user.png') },
  { id: "C016", name: "Foo Jia En", imagePath: require('../../../assets/OperationLead/User/user.png') },
  { id: "C017", name: "Chan Zhi Hao", imagePath: require('../../../assets/OperationLead/User/user.png') },
  { id: "C018", name: "Low Hui Shan", imagePath: require('../../../assets/OperationLead/User/user.png') },
  { id: "C019", name: "Seah Yi Heng", imagePath: require('../../../assets/OperationLead/User/user.png') },
  { id: "C020", name: "Ho Wei Lun", imagePath: require('../../../assets/OperationLead/User/user.png') },
];

export default function TrainingManagement() {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Cleaner[]>(cleaners);

  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [assignModalVisible, setAssignModalVisible] = useState(false);

  const [selectedCleaner, setSelectedCleaner] = useState<Cleaner | null>(null);
  const [trainingType, setTrainingType] = useState<string>("");

  const [assignedTrainings, setAssignedTrainings] = useState<AssignedTraining[]>([]);

  const handleSearch = (text: string) => {
    setSearch(text);
    setFiltered(
      cleaners.filter(
        (c) =>
          c.name.toLowerCase().includes(text.toLowerCase()) ||
          c.id.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const handleSelectCleaner = (cleaner: Cleaner) => {
    setSelectedCleaner(cleaner);
    setSearchModalVisible(false);
    setAssignModalVisible(true);
  };

  const assignTraining = () => {
    if (selectedCleaner && trainingType) {
      const exists = assignedTrainings.some(
        (t) => t.id === selectedCleaner.id && t.type === trainingType
      );
      if (!exists) {
        setAssignedTrainings((prev) => [
          ...prev,
          {
            id: selectedCleaner.id,
            name: selectedCleaner.name,
            type: trainingType,
          },
        ]);
      }
      setAssignModalVisible(false);
      setSelectedCleaner(null);
      setTrainingType("");
      setSearch("");
      setFiltered(cleaners);
    }
  };

  const getAssignedTrainingType = (cleanerId: string) => {
    const assigned = assignedTrainings.find((t) => t.id === cleanerId);
    return assigned ? assigned.type : null;
  };

  return (
    <SafeAreaView className="flex-1 bg-primary"
      style={{ paddingTop: insets.top + 10 }}>
      <BackButton
        TouchablityOpacityclassName="flex-row gap-5  p-5"
        className="text-[20px] font-outfit-semibold text-textWhite"
        name="Training Management"
      />

      <View className="bg-background h-full rounded-t-3xl p-5">

        <TouchableOpacity
          className="bg-blue-500 rounded-2xl px-4 py-3 mb-4 shadow-md"
          onPress={() => setSearchModalVisible(true)}
        >
          <Text className="text-white text-center font-semibold text-base">
            Assign Training
          </Text>
        </TouchableOpacity>

        <Text className="mb-5 text-lg font-semibold text-gray-800">
          Assigned Cleaner
        </Text>

        <View>
          {assignedTrainings.length === 0 ? (
            <View className="items-center mt-10">
              <Text className="text-gray-500 text-base">No trainings have been assigned yet</Text>
            </View>
          ) : (
            assignedTrainings.map((item, i) => (
              <View
                key={i}
                className="bg-white rounded-2xl px-4 py-4 mb-4"
                style={{
                  shadowColor: "#000",
                  shadowOpacity: 0.05,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <Text className="text-base font-semibold text-gray-800">
                  {item.name}
                </Text>
                <Text className="text-sm text-gray-500">ID: {item.id}</Text>
                <Text className="font-medium">
                  Assigned:
                  <Text className="text-green-600"> {item.type}</Text>
                </Text>
              </View>
            ))
          )}
        </View>

      </View>


      <Modal
        transparent
        visible={searchModalVisible}
        animationType="slide"
        onRequestClose={() => setSearchModalVisible(false)}
      >
        <View className="bg-primary rounded-2xl w-full h-full">
          <BackButton
            TouchablityOpacityclassName="flex-row gap-5 p-5"
            className="text-[20px] font-outfit-semibold text-white"
            name="Select Cleaner"
          />

          <View className="bg-background flex-1 rounded-t-3xl">
            <View className="p-6">
              <View className="relative">
                <View className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                <Search stroke={'gray'}/>
                </View>
                <TextInput
                  value={search}
                  onChangeText={handleSearch}
                  placeholder="Search by name or Cleaner ID..."
                  placeholderTextColor="#9CA3AF"
                  className="bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-4 text-base text-gray-700 font-outfit-medium"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 8,
                    elevation: 3,
                  }}
                />
              </View>
            </View>

            <View className="flex-1 px-6">
              {filtered.length === 0 ? (
                <View className="flex-1 items-center justify-center">
                  <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
                    <Text className="text-gray-400 text-3xl">🔍</Text>
                  </View>
                  <Text className="text-gray-500 text-lg font-outfit-semibold mb-2">
                    No cleaners found
                  </Text>
                  <Text className="text-gray-400 text-sm font-outfit-medium text-center">
                    Try adjusting your search terms
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={filtered}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 100 }}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      className="bg-white rounded-2xl p-4 flex-row items-center border-b border-gray-100"
                      onPress={() => handleSelectCleaner(item)}
                    >
                      <View className="w-14 h-14 mr-3">
                        <Image
                          source={item.imagePath}
                          style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "cover",
                          }}
                          className="rounded-full"
                        />
                      </View>
                      <View className="flex-1">
                        <Text className="text-gray-800 text-base font-outfit-bold mb-1">
                          {item.name}
                        </Text>
                        <Text className="text-gray-600 text-xs font-outfit-medium">
                          ID: {item.id}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        transparent
        visible={assignModalVisible}
        animationType="slide"
        onRequestClose={() => setAssignModalVisible(false)}
      >
        <View className="bg-primary h-full w-full">
          <BackButton
            TouchablityOpacityclassName="flex-row gap-5 p-5"
            className="text-[20px] font-outfit-semibold text-white"
            name="Assign Training"
          />

          <View className="bg-background w-full h-full rounded-t-3xl">


            <View className="flex-1 p-6">
              {selectedCleaner && (
                <View className=" items-center gap-5 p-5 justify-center">

                  <View className="w-[80px] h-[80px] mr-3">
                    <Image
                      source={selectedCleaner.imagePath}
                      style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "cover",
                      }}
                      className="rounded-full"
                    />
                  </View>

                  <View className=" items-center justify-center">
                    <Text className="text-gray-900 text-lg font-outfit-bold">
                      {selectedCleaner.name}
                    </Text>
                    <Text className="bg-gray-100 px-5 py-1 rounded text-gray-600 text-sm font-outfit-medium">
                      ID: {selectedCleaner.id}
                    </Text>
                  </View>
                </View>
              )}
              <View className="mb-6">
                <Text className="text-gray-800 text-lg font-outfit-semibold mb-4">
                  Training Type
                </Text>

                <View className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.06,
                    shadowRadius: 8,
                    elevation: 3
                  }}>

                  <TouchableOpacity
                    onPress={() => setTrainingType('Routine Cleaning')}
                    className={`p-5 border-b border-gray-100 flex-row items-center`}
                  >
                    <View className="flex-1">
                      <Text className={`text-base font-outfit-semibold ${trainingType === 'Routine Cleaning' ? 'text-blue-600' : 'text-gray-800'}`}>
                        Routine Cleaning
                      </Text>
                      <Text className="text-gray-500 text-sm font-outfit-medium mt-1">
                        Daily cleaning procedures and standards
                      </Text>
                    </View>

                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setTrainingType('Periodic Cleaning')}
                    className={`p-5 border-b border-gray-100 flex-row items-center`}
                  >
                    <View className="flex-1">
                      <Text className={`text-base font-outfit-semibold ${trainingType === 'Periodic Cleaning' ? 'text-blue-600' : 'text-gray-800'}`}>
                        Periodic Cleaning
                      </Text>
                      <Text className="text-gray-500 text-sm font-outfit-medium mt-1">
                        Weekly and monthly deep cleaning tasks
                      </Text>
                    </View>

                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setTrainingType('Ad-hoc Cleaning')}
                    className={`p-5 flex-row items-center `}
                  >
                    <View className="flex-1">
                      <Text className={`text-base font-outfit-semibold ${trainingType === 'Ad-hoc Cleaning' ? 'text-blue-600' : 'text-gray-800'}`}>
                        Ad-hoc Cleaning
                      </Text>
                      <Text className="text-gray-500 text-sm font-outfit-medium mt-1">
                        Special cleaning requirements and emergency tasks
                      </Text>
                    </View>

                  </TouchableOpacity>

                </View>
              </View>




              <View className="flex-row gap-10 justify-center mt-10">
                <TouchableOpacity
                  className=" bg-gray-100 rounded-2xl w-[150px] h-[50px] justify-center items-center"
                  onPress={() => setAssignModalVisible(false)}
                >
                  <Text className="text-gray-600 text-base font-outfit-semibold">
                    Cancel
                  </Text>
                </TouchableOpacity>

                {trainingType ? (
                  <TouchableOpacity
                    onPress={assignTraining}
                    className="bg-primary rounded-2xl w-[150px] h-[50px] justify-center items-center"

                  >

                    <Text className="text-base font-outfit-bold text-white  ">
                      Assign Training
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    disabled
                    className=" bg-gray-100 rounded-2xl w-[150px] h-[50px] justify-center items-center"
                  >
                    <Text className="text-gray-600 text-base font-outfit-semibold">
                      Assign Training
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
