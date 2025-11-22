import React from 'react';
import { SafeAreaView, View, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';

export default function PdfViewer({ route }: any) {
  const { pdfFile } = route.params;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <Pdf
          source={pdfFile}
          style={{ flex: 1, width: Dimensions.get('window').width }}
        />
      </View>
    </SafeAreaView>
  );
}
