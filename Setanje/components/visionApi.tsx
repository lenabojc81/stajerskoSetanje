import React, { useState } from 'react';
import { View, Button, Image, Text, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const ImageUpload = () => {
  const [image, setImage] = useState<string | null>(null);
  const [landmarks, setLandmarks] = useState<Array<{ name: string, score: number, locations: Array<{ latitude: number, longitude: number }> }>>([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await analyzeImage(result.assets[0].uri);
    }
  };

  const analyzeImage = async (imageUri: string) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const response = await fetch('https://europe-west6-stajerska-setnja-427315.cloudfunctions.net/googleVisionAPI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64 }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response not OK:', response.status, errorText);
        throw new Error(`Network response was not ok: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setLandmarks(data);
      } else if (data.message) {
        console.log(data.message);
        setLandmarks([]);
      }
    } catch (error) {
      console.error('Error analyzing image:', error);
    }
  };

  return (
    <ScrollView>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {landmarks.map((landmark, index) => (
        <View key={index}>
          <Text>{`Landmark: ${landmark.name}`}</Text>
          <Text>{`Confidence: ${(landmark.score * 100).toFixed(2)}%`}</Text>
          {landmark.locations.map((location, locIndex) => (
            <Text key={locIndex}>{`Location: ${location.latitude}, ${location.longitude}`}</Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default ImageUpload;